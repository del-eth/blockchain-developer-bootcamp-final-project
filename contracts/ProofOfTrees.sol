// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProofOfTrees {
    address public owner;
    uint256 public treeCount;

    //map of unique EXIF hash to determined tree data
    //TODO: public necessary?
    mapping(string => Tree) public trees;

    enum TreeStatus {
        Approved,
        Paid,
        Rejected,
        Submitted,
        UnderReview
    }

    enum TreeType {
        Disiduous,
        Evergreen
    }

    struct Tree {
        string exifSHA;
        string name;
        TreeStatus tStatus;
        TreeType tType;
        uint256 lat;
        uint256 long;
        address payable hippie;
        address payable curator;
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
            "Only the Curator can call this function."
        );
        _;
    }

    modifier verifyCaller(address _address) {
        require(msg.sender == _address);
        _;
    }

    modifier approved(string memory _exifSHA) {
        require(
            trees[_exifSHA].tStatus == TreeStatus.Approved,
            "This tree is not approved."
        );
        _;
    }
    modifier paid(string memory _exifSHA) {
        require(
            trees[_exifSHA].tStatus == TreeStatus.Paid,
            "This tree is not paid."
        );
        _;
    }
    modifier rejected(string memory _exifSHA) {
        require(
            trees[_exifSHA].tStatus == TreeStatus.Rejected,
            "This tree is not rejected."
        );
        _;
    }
    modifier submitted(string memory _exifSHA) {
        require(
            trees[_exifSHA].tStatus == TreeStatus.Submitted,
            "This tree is not submitted."
        );
        _;
    }
    modifier underReview(string memory _exifSHA) {
        require(
            trees[_exifSHA].tStatus == TreeStatus.UnderReview,
            "This tree is not under review."
        );
        _;
    }

    constructor() {
        owner = msg.sender;
        treeCount = 0;
    }

    /*
     * Functions
     */

    function decrementTreeCount() public {
        treeCount--;
    }

    function incrementTreeCount() public {
        treeCount++;
    }
}
