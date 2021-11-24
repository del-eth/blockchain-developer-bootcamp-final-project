// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProofOfTrees {
    address payable public owner;

    //map of unique EXIF hash to determined tree data
    //TODO: public necessary?
    mapping(string => Tree) public trees;
    
    enum TreeState {
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
        TreeState tState;
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
        require(
            msg.sender == owner,
            "Only the owner can call this function."
        );
        _;
    }

    modifier isHippie(string memory _exifSHA) {
        require(
            msg.sender == trees[_exifSHA].hippie,
            "Only the Hippie can call this function."
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
}
