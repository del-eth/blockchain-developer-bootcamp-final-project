// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProofOfTrees {
    address payable public owner;

    //map of unique EXIF hash to determined tree data
    mapping(string => Tree) trees;
    
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
    }
}
