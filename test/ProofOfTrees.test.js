let BN = web3.utils.BN;
let ProofOfTrees = artifacts.require("ProofOfTrees");
let { catchRevert } = require("./exceptionsHelpers.js");
const {
  trees: TreeStruct,
  isDefined,
  isPayable,
  isType,
} = require("./ast-helper");

contract("ProofOfTrees", function (accounts) {
  const [_owner, alice, bob] = accounts;
  const emptyAddress = "0x0000000000000000000000000000000000000000";

  //multiply lat and long by 1m to offset decimal for five points of precision
  const lat = "39742043";
  const long = "-104991531";
  const exifSHA = "asd654fasfd54f6as5d4";

  let instance;

  beforeEach(async () => {
    instance = await ProofOfTrees.new();
  });

  describe("Variables", () => {
    it("should have an owner", async () => {
      assert.equal(
        typeof instance.owner,
        "function",
        "the contract has no owner"
      );
    });

    it("should have a treeCount", async () => {
      assert.equal(
        typeof instance.treeCount,
        "function",
        "Contract has no treeCount"
      );
    });

    it("should have a thisCurator", async () => {
      assert.equal(
        typeof instance.thisCurator,
        "function",
        "Contract has no thisCurator"
      );
    });

    it("should have curators", async () => {
      assert.equal(
        typeof instance.curators,
        "function",
        "Contract has no curators"
      );
    });

    it("should have a trees", async () => {
      assert.equal(typeof instance.trees, "function", "Contract has no trees");
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
          enumTreeStatus.hasOwnProperty("Paid"),
          "The enum does not have a `Paid` value"
        );
      });

      it("should define `Pending`", () => {
        assert(
          enumTreeStatus.hasOwnProperty("Pending"),
          "The enum does not have a `Pending` value"
        );
      });

      it("should define `Rejected`", () => {
        assert(
          enumTreeStatus.hasOwnProperty("Rejected"),
          "The enum does not have a `Rejected` value"
        );
      });

      //   it("should define `Submitted`", () => {
      //     assert(
      //       enumTreeStatus.hasOwnProperty("Submitted"),
      //       "The enum does not have a `Submitted` value"
      //     );
      //   });
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
          enumTreeType.hasOwnProperty("Evergreen"),
          "The enum does not have a `Evergreen` value"
        );
      });

      it("should define `Disiduous`", () => {
        assert(
          enumTreeType.hasOwnProperty("Disiduous"),
          "The enum does not have a `Disiduous` value"
        );
      });
    });

    describe("Tree Struct", () => {
      let treeStruct;

      before(() => {
        treeStruct = TreeStruct(ProofOfTrees);
        assert(
          treeStruct !== null,
          "The contract should define an `Tree Struct`"
        );
      });

      it("should have an `exifSHA`", () => {
        assert(
          isDefined(treeStruct)("exifSHA"),
          "Tree Struct should have an `exifSHA` member"
        );
        assert(
          isType(treeStruct)("exifSHA")("string"),
          "`exifSHA` should be of type `string`"
        );
      });

      it("should have a `rejectedReason`", () => {
        assert(
          isDefined(treeStruct)("rejectedReason"),
          "Tree Struct should have an `rejectedReason` member"
        );
        assert(
          isType(treeStruct)("rejectedReason")("string"),
          "`rejectedReason` should be of type `string`"
        );
      });

      it("should have a `lat`", () => {
        assert(
          isDefined(treeStruct)("lat"),
          "Tree Struct should have a `lat` member"
        );
        assert(
          isType(treeStruct)("lat")("int256"),
          "`lat` should be of type `int256`"
        );
      });

      it("should have a `long`", () => {
        assert(
          isDefined(treeStruct)("long"),
          "Tree Struct should have a `long` member"
        );
        assert(
          isType(treeStruct)("long")("int256"),
          "`long` should be of type `int256`"
        );
      });

      it("should have a `tStatus`", () => {
        assert(
          isDefined(treeStruct)("tStatus"),
          "Tree Struct should have a `tStatus` member"
        );
        // assert(
        //   isType(treeStruct)("tStatus")("TreeStatus"),
        //   "`tStatus` should be of type `TreeStatus`"
        // );
      });

      it("should have a `tType`", () => {
        assert(
          isDefined(treeStruct)("tType"),
          "Tree Struct should have a `tType` member"
        );
        //   assert(
        //     isType(treeStruct)("tType")("TreeType"),
        //     "`tType` should be of type `TreeType`"
        //   );
      });

      it("should have a `curator`", () => {
        assert(
          isDefined(treeStruct)("curator"),
          "Tree Struct should have a `curator` member"
        );
        assert(
          isType(treeStruct)("curator")("address"),
          "`curator` should be of type `address`"
        );
        assert(isPayable(treeStruct)("curator"), "`curator` should be payable");
      });

      it("should have a `hippie`", () => {
        assert(
          isDefined(treeStruct)("hippie"),
          "Tree Struct should have a `hippie` member"
        );
        assert(
          isType(treeStruct)("hippie")("address"),
          "`hippie` should be of type `address`"
        );
        assert(isPayable(treeStruct)("hippie"), "`hippie` should be payable");
      });
    });
  });

  describe("Use cases", () => {
    it("should give the creator a token and mint only one", async () => {
      let balance = await instance.balanceOf(accounts[0]);
      balance = web3.utils.fromWei(balance, "ether");

      let totalSupply = await instance.totalSupply();
      totalSupply = web3.utils.fromWei(totalSupply, "ether");

      assert.equal(
        balance,
        "1",
        "Contract creator should get a token upon creation"
      );
      assert.equal(totalSupply, "1", "There should only be one token");
    });

    it("should be able to transfer between accounts", async () => {
      let amount = web3.utils.toWei("1", "ether");
      await instance.transfer(accounts[1], amount, { from: accounts[0] });

      let aliceBalance = await instance.balanceOf(accounts[1]);
      aliceBalance = web3.utils.fromWei(aliceBalance, "ether");
      let ownerBalance = await instance.balanceOf(accounts[0]);
      ownerBalance = web3.utils.fromWei(ownerBalance, "ether");
      assert.equal(aliceBalance, "1", "Alice should now own a token");
      assert.equal(ownerBalance, "0", "The Owner should now own zero tokens");
    });

    it("should allow someone to become a curator", async () => {
      const tx = await instance.becomeCurator({ from: alice });
      let eventEmitted = false;

      if (tx.logs[0].event == "LogCuratorAdded") {
        eventEmitted = true;
      }

      assert.equal(
        eventEmitted,
        true,
        "adding a curator should emit a Curator Added Event"
      );

      let curators = await instance.fetchCurators();
      assert.equal(curators[2], accounts[1], "Alice should now be a curator");
    });

    it("should add a tree with exifSHA and other struct variables", async () => {
      await instance.createTree(exifSHA, 0, lat, long, { from: alice });

      const result = await instance.fetchTree.call(exifSHA);

      assert.equal(
        result[0],
        _owner,
        "the curator address should be the owner (the only curator available)"
      );
      assert.equal(
        result[1],
        alice,
        "the address creating the tree should be listed as the hippie"
      );
      assert.equal(
        result[2],
        exifSHA,
        "the exifSHA of the last created tree does not match the expected value"
      );
      assert.equal(
        result[3],
        "",
        "the rejectedReason of the last created tree does not match the expected value"
      );
      assert.equal(
        result[4].toString(10),
        ProofOfTrees.TreeStatus.Pending,
        'the Status of the tree should be "Pending"'
      );
      assert.equal(
        result[5].toString(10),
        ProofOfTrees.TreeType.Disiduous,
        'the type of the tree should be "Disiduous"'
      );
      assert.equal(
        result[6].toString(10),
        lat,
        "the lat does not match the expected value"
      );
      assert.equal(
        result[7].toString(10),
        long,
        "the long does not match the expected value"
      );
    });

    it("should be able to move a tree through the rejection curation process ", async () => {
      await instance.createTree(exifSHA, 0, lat, long, { from: alice });
      await instance.becomeCurator({ from: bob });

      var result = await instance.fetchTree.call(exifSHA);

      assert.equal(
        result[4].toString(10),
        ProofOfTrees.TreeStatus.Pending,
        'the Status of the tree should be "Pending"'
      );

      const rejectionReason = "this is not even a tree";
      await instance.reject(exifSHA, rejectionReason, { from: _owner });
      result = await instance.fetchTree.call(exifSHA);

      assert.equal(
        result[4].toString(10),
        ProofOfTrees.TreeStatus.Rejected,
        'the Status of the tree should be "Rejected"'
      );
      assert.equal(
        result[3],
        rejectionReason,
        "the rejectedReason of tree does not match the expected value"
      );
    });

    it("should be able to move a tree through the paid curation process ", async () => {
      await instance.createTree(exifSHA, 0, lat, long, { from: alice });
      await instance.becomeCurator({ from: bob });

      var result = await instance.fetchTree.call(exifSHA);

      var aliceBalance = await instance.balanceOf(alice);
      aliceBalance = web3.utils.fromWei(aliceBalance, "ether");

      assert.equal(aliceBalance, "0", "Alice should have no tokens, yet");

      assert.equal(
        result[4].toString(10),
        ProofOfTrees.TreeStatus.Pending,
        'the Status of the tree should be "Pending"'
      );

      let eventEmitted = false;
      const payTx = await instance.pay(exifSHA, { from: _owner });
      result = await instance.fetchTree.call(exifSHA);

      payTx.logs.forEach(function (log) {
        if (log.event && log.event == "LogPaid") {
          eventEmitted = true;
        }
      });

      assert.equal(
        eventEmitted,
        true,
        "paying a tree/hippie should log a paid event"
      );

      aliceBalance = await instance.balanceOf(alice);
      aliceBalance = web3.utils.fromWei(aliceBalance, "ether");

      assert.equal(aliceBalance, "1", "Alice should have a token");

      assert.equal(
        result[4].toString(10),
        ProofOfTrees.TreeStatus.Paid,
        'the Status of the tree should be "Paid"'
      );
      assert.equal(
        result[3],
        "",
        "the rejectedReason of tree does not match the expected value"
      );
    });

    it("should emit a LogPending event when a tree is created", async () => {
      let eventEmitted = false;
      const tx = await instance.createTree(exifSHA, 0, lat, long, {
        from: alice,
      });

      if (tx.logs[0].event == "LogPending") {
        eventEmitted = true;
      }

      assert.equal(
        eventEmitted,
        true,
        "creating a tree should log a pending event"
      );
    });
  });
});
