let BN = web3.utils.BN;
let ProofOfTrees = artifacts.require("ProofOfTrees");
let { catchRevert } = require("./exceptionsHelpers.js");
const { trees: TreeStruct, isDefined, isPayable, isType } = require("./ast-helper");


contract("ProofOfTrees", function (accounts) {
    const [_owner, alice, bob] = accounts;
    const emptyAddress = "0x0000000000000000000000000000000000000000";
  
    //multiply lat and long by 1m to offset decimal for five points of precision 
    const lat = "39742043";
    const long = "-104991531";
    const exifSHA = "asd654fasfd54f6as5d4";
  
    let instance;
  
    beforeEach(async () => {
      instance = await ProofOfTrees.new(10);
    });
  
    describe("Variables", () => {
      it("should have an owner", async () => {
        assert.equal(typeof instance.owner, 'function', "the contract has no owner");
      });
  
      it("should have a treeCount", async () => {
        assert.equal(typeof instance.treeCount, 'function', "Contract has no treeCount");
      });
  
      it("should have a lastCurator", async () => {
        assert.equal(typeof instance.lastCurator, 'function', "Contract has no lastCurator");
      });
   
      it("should have curators", async () => {
        assert.equal(typeof instance.curators, 'function', "Contract has no curators");
      });
   
      it("should have a trees", async () => {
        assert.equal(typeof instance.trees, 'function', "Contract has no trees");
      });
  
      describe("enum TreeStatus", () => {
        let enumTreeStatus;
        before(() => {
          enumTreeStatus = ProofOfTrees.enums.TreeStatus;
          assert(
            enumTreeStatus,
            "The contract should define an Enum called TreeStatus"
          );
        });
  
        it("should define `Paid`", () => {
          assert(
            enumTreeStatus.hasOwnProperty('Paid'),
            "The enum does not have a `Paid` value"
          );
        });
  
        it("should define `Pending`", () => {
          assert(
            enumTreeStatus.hasOwnProperty('Pending'),
            "The enum does not have a `Pending` value"
          );
        });
  
        it("should define `Rejected`", () => {
          assert(
            enumTreeStatus.hasOwnProperty('Rejected'),
            "The enum does not have a `Rejected` value"
          );
        });
  
        it("should define `Submitted`", () => {
          assert(
            enumTreeStatus.hasOwnProperty('Submitted'),
            "The enum does not have a `Submitted` value"
          );
        });
      });
  
      describe("enum TreeType", () => {
        let enumTreeType;
        before(() => {
          enumTreeType = ProofOfTrees.enums.TreeType;
          assert(
            enumTreeType,
            "The contract should define an Enum called TreeType"
          );
        });
    
        it("should define `Evergreen`", () => {
          assert(
            enumTreeType.hasOwnProperty('Evergreen'),
            "The enum does not have a `Evergreen` value"
          );
        });
  
        it("should define `Disiduous`", () => {
          assert(
            enumTreeType.hasOwnProperty('Disiduous'),
            "The enum does not have a `Disiduous` value"
          );
        });
      });
  
      describe("Tree Struct", () => {
        let subjectStruct;
  
        before(() => {
          subjectStruct = TreeStruct(ProofOfTrees);
          assert(
            subjectStruct !== null, 
            "The contract should define an `Tree Struct`"
          );
        });
  
        it("should have an `exifSHA`", () => {
          assert(
            isDefined(subjectStruct)("exifSHA"), 
            "Tree Struct should have an `exifSHA` member"
          );
          assert(
            isType(subjectStruct)("exifSHA")("string"), 
            "`exifSHA` should be of type `string`"
          );
        });
  
        it("should have a `rejectedReason`", () => {
          assert(
            isDefined(subjectStruct)("rejectedReason"), 
            "Tree Struct should have an `rejectedReason` member"
          );
          assert(
            isType(subjectStruct)("rejectedReason")("string"), 
            "`rejectedReason` should be of type `string`"
          );
        });
  
        it("should have a `lat`", () => {
          assert(
            isDefined(subjectStruct)("lat"), 
            "Tree Struct should have a `lat` member"
          );
          assert(
            isType(subjectStruct)("lat")("int256"), 
            "`lat` should be of type `int256`"
          );
        });
  
        it("should have a `long`", () => {
          assert(
            isDefined(subjectStruct)("long"), 
            "Tree Struct should have a `long` member"
          );
          assert(
            isType(subjectStruct)("long")("int256"), 
            "`long` should be of type `int256`"
          );
        });
  
        it("should have a `tStatus`", () => {
          assert(
            isDefined(subjectStruct)("tStatus"), 
            "Tree Struct should have a `tStatus` member"
          );
        //   assert(
        //     isType(subjectStruct)("tStatus")("TreeStatus"), 
        //     "`tStatus` should be of type `TreeStatus`"
        //   );
        });
  
        it("should have a `tType`", () => {
          assert(
            isDefined(subjectStruct)("tType"), 
            "Tree Struct should have a `tType` member"
          );
        //   assert(
        //     isType(subjectStruct)("tType")("TreeType"), 
        //     "`tType` should be of type `TreeType`"
        //   );
        });
  
        it("should have a `curator`", () => {
          assert(
            isDefined(subjectStruct)("curator"), 
            "Tree Struct should have a `curator` member"
          );
          assert(
            isType(subjectStruct)("curator")("address"), 
            "`curator` should be of type `address`"
          );
          assert(
            isPayable(subjectStruct)("curator"), 
            "`curator` should be payable"
          );
        });
  
        it("should have a `hippie`", () => {
          assert(
            isDefined(subjectStruct)("hippie"), 
            "Tree Struct should have a `hippie` member"
          );
          assert(
            isType(subjectStruct)("hippie")("address"), 
            "`hippie` should be of type `address`"
          );
          assert(
            isPayable(subjectStruct)("hippie"), 
            "`hippie` should be payable"
          );
        });
      });
    });
  
    describe("Use cases", () => {
      it("should add a tree with exifSHA, type, and coordinates", async () => {
        await instance.createTree(exifSHA, 0, lat, long, { from: alice });
  
        const result = await instance.fetchTree.call(exifSHA);
  
        assert.equal(
          result[0],
          _owner,
          "the curator address should be the owner (the only curator available)",
        );
        assert.equal(
          result[1],
          alice,
          "the address creating the tree should be listed as the hippie",
        );
        assert.equal(
          result[2],
          name,
          "the exifSHA of the last created tree item does not match the expected value",
        );
        assert.equal(
          result[3],
          name,
          "the exifSHA of the last created tree item does not match the expected value",
        );
        assert.equal(
          result[4],
          name,
          "the exifSHA of the last created tree item does not match the expected value",
        );
        assert.equal(
          result[5].toString(10),
          ProofOfTrees.TreeStatus.Evergreen,
          'the type of the tree should be "Evergreen"',
        );
        assert.equal(
          result[6].toString(10),
          lat,
          "the lat does not match the expected value",
        );
        assert.equal(
          result[7].toString(10),
          long,
          "the long does not match the expected value",
        );
      });
  
    });
  
  });
  