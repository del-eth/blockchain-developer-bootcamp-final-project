// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title Proof of Trees
/// @author del.eth
/// @notice This contract is for demonstration purposes!
/// @dev All function calls are implemented with explicit access
contract ProofOfTrees is ERC20 {
    address public owner;

    /// @dev track curator to use when creating a tree
    uint256 public nextCurator;

    /// @dev mapping of unique EXIF hashes (unique identifier) to determined tree data
    mapping(string => Tree) public trees;
    /// @dev track trees in a simple array for ui purposes
    Tree[] public treeArray;
    /// @dev track total number of trees
    uint256 public treeCount;

    /// @dev create a unique set of curators and their index. See https://ethereum.stackexchange.com/a/30481 for inspiration
    mapping(address => uint256) curatorIndex;
    /// @dev track curators in a simple array to easily reference from their index and for ui purposes
    address[] public curators;
    /// @dev track total number of curators
    uint256 public curatorCount;

    /**
    /// @notice 
    Status goes 1) Pending (default upon creation) 2) Rejected -or- Paid (based on curator decision)
    */
    enum TreeStatus {
        Paid,
        Pending,
        Rejected
    }

    /// @notice only track two types of tress for now
    enum TreeType {
        Disiduous,
        Evergreen
    }

    /** 
    * @notice Tree structure has:
    * - the hippie who found it
    * - the curator assigned with reviewing it, the unique 
    * - the unique exifSHA (ideally we'd rely on an some DAO-approved service to hash this information before giving it to the contract)
    * - the rejected reason, if applicable
    * - the status for the curation process
    * - the type of tree
    * - the latitude
    * - the longitude 
    * - the valid flag - this is used internally
     @dev the valid flag is used to address whether the tree has been created by the createTree function
    */
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

    /// @dev log that a tree has been paid (approved by a curator)
    /// @param exifSHA, the id for tree Paid
    event LogPaid(string exifSHA);

    /// @dev log that a tree has been rejected by a curator
    /// @param exifSHA, the id for tree Rejected
    event LogRejected(string exifSHA);

    /// @dev log that a tree has been put in the Pending curation state (submitted/created by a Hippie)
    /// @param exifSHA, the id for tree Pending
    event LogPending(string exifSHA);

    /// @dev log that a curator has been added to the list of curators
    /// @param curator, the ethereum public account of the curator
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
        require(!trees[_exifSHA].valid, "this tree sha already exists");
        _;
    }

    modifier validTreeType(uint8 _tType) {
        require(
            uint256(TreeType.Evergreen) >= _tType,
            "this tree type is not valid"
        );
        _;
    }

    /**
        @notice this function creates a tree
        @dev Proof Of Trees (TREE) contract
        - instantiates 
    */
    constructor() ERC20("Proof of Trees", "TREE") {
        _mint(msg.sender, 10**decimals());
        owner = msg.sender;
        treeCount = 0;
        curatorCount = 0;
        // We will use position 0 to flag invalid address
        curators.push(address(address(0x0)));
        becomeCurator();
        nextCurator = 1;
    }

    /*
     * Functions
     */

    /**
        @dev increments to the next available curator or goes back to the beginning if we're at the end
    */
    function incrementNextCurator() private {
        //since position 0 is invalid address, just use the length
        if (nextCurator == curators.length) {
            nextCurator = 1;
        } else {
            nextCurator++;
        }
    }

    /**
        @notice this function creates a tree
        @dev the contract must have some curators who are not the hippie submitting the image
        - we prevent SWC-107: Reentrancy by requiring that the curator is not the hippie even after incrementing to round-robin curators
        - exifSHA is validated as unique and tree type must be valid
        @param _exifSHA the unique sha of the EXIF data from the image used to identify the tree
        @param _tType the type of tree (0 = Disiduous, 1 = Evergreen)
        @param _lat the latitude of the tree
        @param _long the longitude of the tree
    */
    function createTree(
        string memory _exifSHA,
        uint8 _tType,
        int256 _lat,
        int256 _long
    ) public multipleCurators validTreeType(_tType) treeUnique(_exifSHA) {
        //do not let the sender be the curator, pick the next curator
        if (getCuratorAtPosition(nextCurator) == msg.sender) {
            incrementNextCurator();
        }
        //some gas optimization avoiding an extra call upon Tree instantiation
        address _curator = getCuratorAtPosition(nextCurator);
        //if the curator is still the sender, that means they're the only curator
        require(
            _curator != msg.sender,
            "there are not enough curators to process tree submissions"
        );
        trees[_exifSHA] = Tree({
            curator: payable(_curator),
            hippie: payable(msg.sender),
            exifSHA: _exifSHA,
            rejectedReason: "",
            tStatus: TreeStatus.Pending,
            tType: TreeType(_tType),
            lat: _lat,
            long: _long,
            valid: true
        });
        incrementNextCurator();
        treeCount++;
        emit LogPending(_exifSHA);
    }

    /**
        @notice this function allows a curator to reject a tree
        @dev must be a curator assigned to the tree and the tree must be in a pending state
        @param _exifSHA unique identifier of the tree
        @param _rejectReason arbitraty reason the tree was rejected by the curator
    */
    function reject(string memory _exifSHA, string memory _rejectReason)
        public
        isCurator(_exifSHA)
        pending(_exifSHA)
    {
        trees[_exifSHA].tStatus = TreeStatus.Rejected;
        trees[_exifSHA].rejectedReason = _rejectReason;
        emit LogRejected(_exifSHA);
    }

    /**
        @notice this function allows a curator to pay out TREE tokens for a Hippie's tree
        @dev must be a curator assigned to the tree and the tree must be in a pending state
        @param _exifSHA unique identifier of the tree
    */
    function pay(string memory _exifSHA)
        public
        isCurator(_exifSHA)
        pending(_exifSHA)
    {
        trees[_exifSHA].tStatus = TreeStatus.Paid;
        _mint(trees[_exifSHA].hippie, 10**decimals());

        emit LogPaid(_exifSHA);
    }

    /**
        @notice this function currently allows anyone to become a curator
        @dev this appends a curator to the list if they are not already a curator
    */
    function becomeCurator() public {
        require(!curatorInArray(msg.sender), "you are already a curator!");
        curatorIndex[msg.sender] = curators.length;
        curators.push(msg.sender);
        curatorCount++;
        emit LogCuratorAdded(msg.sender);
    }

    /**
        @notice answers true if curator address has been added to list of curators
        @dev returns true if address is in curatorIndex
        @param curator address to check if curator
        @return true if address is a curator
    */
    function curatorInArray(address curator) public view returns (bool) {
        // address address(address(0x0)) is not valid if position is 0 is not in the array
        if (curator != address(address(0x0)) && curatorIndex[curator] > 0) {
            return true;
        }
        return false;
    }

    /**
        @dev gets curator address at a known positionin curators array
        @param position position in the index
        @return address of the curator at known position
    */
    function getCuratorAtPosition(uint256 position)
        public
        view
        returns (address)
    {
        // Position 0 is always an invalid address
        require(position > 0, "invalid position of zero");
        return curators[position];
    }

    /**
        @dev use this for testing or for finding information about a particular tree
        @param _exifSHA unique identifier of a tree
    */
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
        return (
            curator,
            hippie,
            exifSHA,
            rejectedReason,
            tStatus,
            tType,
            lat,
            long,
            valid
        );
    }

    /**
        @notice gives the array of curators
        @dev use this for testing or for all curators
        @return address[] array of curators
    */
    function fetchCurators() public view returns (address[] memory) {
        return curators;
    }
}
