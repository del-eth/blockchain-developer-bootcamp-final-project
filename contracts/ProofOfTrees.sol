// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <0.9.0;

contract ProofOfTrees {
    address payable public owner;

    // <trees mapping>
    mapping(uint256 => Tree) trees;
    enum TreeState {
        Submitted,
        UnderReview,
        Approved,
        Paid
    }

    enum TreeType {
        Evergreen,
        Disiduous
    }

    struct Tree {
        string name;
        string exifSHAHash;
        uint256 lat;
        uint256 long;
        TreeType ttype;
        TreeState state;
    }
}
