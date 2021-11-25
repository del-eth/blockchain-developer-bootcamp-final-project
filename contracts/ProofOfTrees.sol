// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProofOfTrees {
    address public owner;
    uint256 public treeCount;
    uint256 public lastCurator;

    //map of unique EXIF hash to determined tree data
    mapping(string => Tree) public trees;
    //map of addresses for curators (true) and former curators (false)
    // mapping(address => bool) public curators;
    address[] curators;

    /*
    Status goes
    1) Pending (default upon creation)
    2) Submitted (assign to a curator)
    3) Rejected -or- Paid
    */
    enum TreeStatus {
        Paid,
        Pending,
        Rejected,
        Submitted
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
        uint256 lat;
        uint256 long;
    }

    /*
     * Events
     */

    // <LogApproved event: string exifSHA>
    event LogApproved(string exifSHA);

    // <LogPaid event: string exifSHA>
    event LogPaid(string exifSHA);

    // <LogRejected event: string exifSHA>
    event LogRejected(string exifSHA);

    // <LogSubmitted event: string exifSHA>
    event LogSubmitted(string exifSHA);

    // <LogUnderReview event: string exifSHA>
    event LogUnderReview(string exifSHA);

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
    modifier rejected(string memory _exifSHA) {
        require(
            trees[_exifSHA].tStatus == TreeStatus.Rejected,
            "This tree is not Rejected."
        );
        _;
    }
    modifier submitted(string memory _exifSHA) {
        require(
            trees[_exifSHA].tStatus == TreeStatus.Submitted,
            "This tree is not Submitted."
        );
        _;
    }

    constructor() {
        owner = msg.sender;
        curators.push(msg.sender);
        treeCount = 0;
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
        lastCurator++;
    }

    function createTree(
        string memory _exifSHA,
        uint8 _tType,
        uint256 _lat,
        uint256 _long
    ) public {
          require(uint(TreeType.Evergreen) >= _tType);
            trees[_exifSHA] = Tree({
                curator: payable(curators[lastCurator]),
                //might want a way to validate that the hippie is also not the curator for this tree
                hippie: payable(msg.sender),
                exifSHA: _exifSHA,
                rejectedReason: '',
                tStatus: TreeStatus.Pending,
                tType: TreeType(_tType),
                lat: _lat,
                long: _long
            });
           incrementCurator();
    }

    function submit(string memory _exifSHA) public isHippie(_exifSHA) {
        trees[_exifSHA].tStatus = TreeStatus.Submitted;
        emit LogSubmitted(_exifSHA);
    }

    function reject(string memory _exifSHA, string memory _rejectReason)
        public
        isCurator(_exifSHA)
    {
        trees[_exifSHA].tStatus = TreeStatus.Rejected;
        trees[_exifSHA].rejectedReason = _rejectReason;
        emit LogRejected(_exifSHA);
    }

    function pay(string memory _exifSHA) public isCurator(_exifSHA) {
        //TODO: come up with some arbitrary way to give token (make something in constructor)
    }
}
