// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ProofOfTrees is ERC20{

    address public owner;
    uint256 public treeCount;
    uint256 public thisCurator;

    //map of unique EXIF hash to determined tree data
    mapping(string => Tree) public trees;

    mapping (address => uint) curatorIndex;
    address[] public curators;

    /*
    Status goes
    1) Pending (default upon creation)
    2) Rejected -or- Paid
    */
    enum TreeStatus {
        Paid,
        Pending,
        Rejected
    }

    enum TreeType {
        Disiduous,
        Evergreen
    }

    struct Tree {
        address payable curator;
        address payable hippie;
        string exifSHA;
        string rejectedReason;
        TreeStatus tStatus;
        TreeType tType;
        int256 lat; //latitude
        int256 long; //longitude
        bool valid;
    }

    /*
     * Events
     */


    // <LogPaid event: string exifSHA>
    event LogPaid(string exifSHA);

    // <LogRejected event: string exifSHA>
    event LogRejected(string exifSHA);

    // <LogPending event: string exifSHA>
    event LogPending(string exifSHA);

    // <LogCuratorAdded event: address curator>
    event LogCuratorAdded(address curator);

    /*
     * Modifiers
     */
    modifier isOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    modifier isHippie(string memory _exifSHA) {
        require(
            msg.sender == trees[_exifSHA].hippie,
            "Only the tree's Hippie can call this function."
        );
        _;
    }

    modifier isCurator(string memory _exifSHA) {
        require(
            msg.sender == trees[_exifSHA].curator,
            "Only the tree's Curator can call this function."
        );
        _;
    }

    modifier multipleCurators() {
        require(
            curators.length > 1,
            "There are not any curators to review this tree submission"
        );
        _;
    }

    modifier verifyCaller(address _address) {
        require(msg.sender == _address);
        _;
    }

    modifier pending(string memory _exifSHA) {
        require(
            trees[_exifSHA].tStatus == TreeStatus.Pending,
            "This tree is not Pending."
        );
        _;
    }
    modifier paid(string memory _exifSHA) {
        require(
            trees[_exifSHA].tStatus == TreeStatus.Paid,
            "This tree is not Paid."
        );
        _;
    }

    modifier treeUnique(string memory _exifSHA) {
        require(
            !trees[_exifSHA].valid, 
            "this tree sha already exists"   
        );
        _;
    }

    modifier validTreeType(uint8 _tType) {
        require(
            uint(TreeType.Evergreen) >= _tType, 
            "this tree type is not valid"   
        );
        _;
    }

    constructor() ERC20("Tree Proof", "TREE") {
        _mint (msg.sender, 10 ** decimals());
        owner = msg.sender;
        treeCount = 0;
        // We will use position 0 to flag invalid address
        curators.push(address(address(0x0)));
        becomeCurator();
        thisCurator = 1;
    }

    /*
     * Functions
     */

    function decrementTreeCount() private {
        treeCount--;
    }

    function incrementTreeCount() private {
        treeCount++;
    }

    function incrementCurator() private {
        //since position 0 is invalid address, just use the length 
        if (thisCurator == curators.length) {
            thisCurator = 1;
        } else {
            thisCurator++;
        }
    }

    function createTree(
        string memory _exifSHA,
        uint8 _tType,
        int256 _lat,
        int256 _long
    ) public multipleCurators() validTreeType(_tType) treeUnique(_exifSHA) {

        //do not let the sender be the curator
        if (getCuratorPosition(thisCurator) == msg.sender) {
            incrementCurator();
        }
        trees[_exifSHA] = Tree({
            curator: payable(getCuratorPosition(thisCurator)),
            //might want a way to validate that the hippie is also not the curator for this tree
            hippie: payable(msg.sender),
            exifSHA: _exifSHA,
            rejectedReason: '',
            tStatus: TreeStatus.Pending,
            tType: TreeType(_tType),
            lat: _lat,
            long: _long,
            valid: true
        });
        incrementCurator();
        emit LogPending(_exifSHA);
    }

    function reject(string memory _exifSHA, string memory _rejectReason)
        public
        isCurator(_exifSHA)
        pending(_exifSHA)
    {
        trees[_exifSHA].tStatus = TreeStatus.Rejected;
        trees[_exifSHA].rejectedReason = _rejectReason;
        emit LogRejected(_exifSHA);
    }

    function pay(string memory _exifSHA) public isCurator(_exifSHA) pending(_exifSHA) {
        trees[_exifSHA].tStatus = TreeStatus.Paid;
        _mint (trees[_exifSHA].hippie, 10 ** decimals());

        emit LogPaid(_exifSHA);

    }

    function becomeCurator() public {
        if (!curatorInArray(msg.sender)) {
            // Append
            curatorIndex[msg.sender] = curators.length;
            curators.push(msg.sender);
            emit LogCuratorAdded(msg.sender);
        }
    }

    function curatorInArray(address curator) public view returns (bool) {
        // address address(address(0x0)) is not valid if pos is 0 is not in the array
        if (curator != address(address(0x0)) && curatorIndex[curator] > 0) {
            return true;
        }
        return false;
    }

    function getCuratorPosition(uint256 pos) public view returns (address) {
        // Position 0 is always an invalid address
        require(pos > 0, "invalid position of zero"); 
        return curators[pos];
    }
    
    function fetchTree(string memory _exifSHA)
        public
        view
        returns (
            address payable curator,
            address payable hippie,
            string memory exifSHA,
            string memory rejectedReason,
            uint8 tStatus,
            uint8 tType,
            int256 lat,
            int256 long,
            bool valid
        )
    {
        curator = trees[_exifSHA].curator;
        hippie = trees[_exifSHA].hippie;
        exifSHA = trees[_exifSHA].exifSHA;
        rejectedReason = trees[_exifSHA].rejectedReason;
        tStatus = uint8(trees[_exifSHA].tStatus);
        tType = uint8(trees[_exifSHA].tType);
        lat = trees[_exifSHA].lat;
        long = trees[_exifSHA].long;
        valid = trees[_exifSHA].valid;
        return (curator, hippie, exifSHA, rejectedReason, tStatus, tType, lat, long, valid);
    }


    function fetchCurators() public view returns(address[] memory) {
        return curators;
    }
}
