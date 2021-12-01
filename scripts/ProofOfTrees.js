if (typeof web3 !== "undefined") {
  console.log("using currentProvider");
  Web3 = new Web3(window.web3.currentProvider);
  window.ethereum.enable();
} else {
  Web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
}

ethereum.request({ method: "eth_requestAccounts" });
const accounts = await ethereum.request({ method: "eth_requestAccounts" });
const account = accounts[0];
console.log(typeof account === "string");

$("#showAccount").html(account);

const treesWeb3 = new Web3.eth.Contract(
  [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "curator",
          type: "address",
        },
      ],
      name: "LogCuratorAdded",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "exifSHA",
          type: "string",
        },
      ],
      name: "LogPaid",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "exifSHA",
          type: "string",
        },
      ],
      name: "LogPending",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "exifSHA",
          type: "string",
        },
      ],
      name: "LogRejected",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "curators",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "subtractedValue",
          type: "uint256",
        },
      ],
      name: "decreaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "addedValue",
          type: "uint256",
        },
      ],
      name: "increaseAllowance",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "nextCurator",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "treeArray",
      outputs: [
        {
          internalType: "address payable",
          name: "curator",
          type: "address",
        },
        {
          internalType: "address payable",
          name: "hippie",
          type: "address",
        },
        {
          internalType: "string",
          name: "exifSHA",
          type: "string",
        },
        {
          internalType: "string",
          name: "rejectedReason",
          type: "string",
        },
        {
          internalType: "enum ProofOfTrees.TreeStatus",
          name: "tStatus",
          type: "uint8",
        },
        {
          internalType: "enum ProofOfTrees.TreeType",
          name: "tType",
          type: "uint8",
        },
        {
          internalType: "int256",
          name: "lat",
          type: "int256",
        },
        {
          internalType: "int256",
          name: "long",
          type: "int256",
        },
        {
          internalType: "bool",
          name: "valid",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      name: "trees",
      outputs: [
        {
          internalType: "address payable",
          name: "curator",
          type: "address",
        },
        {
          internalType: "address payable",
          name: "hippie",
          type: "address",
        },
        {
          internalType: "string",
          name: "exifSHA",
          type: "string",
        },
        {
          internalType: "string",
          name: "rejectedReason",
          type: "string",
        },
        {
          internalType: "enum ProofOfTrees.TreeStatus",
          name: "tStatus",
          type: "uint8",
        },
        {
          internalType: "enum ProofOfTrees.TreeType",
          name: "tType",
          type: "uint8",
        },
        {
          internalType: "int256",
          name: "lat",
          type: "int256",
        },
        {
          internalType: "int256",
          name: "long",
          type: "int256",
        },
        {
          internalType: "bool",
          name: "valid",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_exifSHA",
          type: "string",
        },
        {
          internalType: "uint8",
          name: "_tType",
          type: "uint8",
        },
        {
          internalType: "int256",
          name: "_lat",
          type: "int256",
        },
        {
          internalType: "int256",
          name: "_long",
          type: "int256",
        },
      ],
      name: "createTree",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_exifSHA",
          type: "string",
        },
        {
          internalType: "string",
          name: "_rejectReason",
          type: "string",
        },
      ],
      name: "reject",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_exifSHA",
          type: "string",
        },
      ],
      name: "pay",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "becomeCurator",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "curator",
          type: "address",
        },
      ],
      name: "curatorInArray",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "position",
          type: "uint256",
        },
      ],
      name: "getCuratorAtPosition",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_exifSHA",
          type: "string",
        },
      ],
      name: "fetchTree",
      outputs: [
        {
          internalType: "address payable",
          name: "curator",
          type: "address",
        },
        {
          internalType: "address payable",
          name: "hippie",
          type: "address",
        },
        {
          internalType: "string",
          name: "exifSHA",
          type: "string",
        },
        {
          internalType: "string",
          name: "rejectedReason",
          type: "string",
        },
        {
          internalType: "uint8",
          name: "tStatus",
          type: "uint8",
        },
        {
          internalType: "uint8",
          name: "tType",
          type: "uint8",
        },
        {
          internalType: "int256",
          name: "lat",
          type: "int256",
        },
        {
          internalType: "int256",
          name: "long",
          type: "int256",
        },
        {
          internalType: "bool",
          name: "valid",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "fetchCurators",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "getCuratorCount",
      outputs: [
        {
          internalType: "uint256",
          name: "count",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
    {
      inputs: [],
      name: "getTreesCount",
      outputs: [
        {
          internalType: "uint256",
          name: "count",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
      constant: true,
    },
  ],
  "0xE2157201a5E7853f3F88DA05420f0bF572cC4958",
  { from: account }
);
let curators = [];
let trees = [];
const curatorCount = await treesWeb3.methods.getCuratorCount().call();
console.log(curatorCount);

const treeCount = await treesWeb3.methods.getTreesCount().call();
console.log(treeCount);

for (let i = 0; i < curatorCount; i++) {
  const curator = await treesWeb3.methods.curators(i).call();
  curators.push(curator);
  $("#curators").append("<li>" + curator + "</li>");
}
console.log(curators);
// $("#curators").html(curators);

for (let i = 0; i < treeCount; i++) {
  const tree = await treesWeb3.methods.trees(i).call();
  trees.push(tree);
  if (tree.valid) {
    $("#trees").append(
      "<li>" +
        tree.exifSHA +
        " - Hippie:" +
        tree.hippie +
        ", Curator: " +
        tree.curator +
        "</li>"
    );
  }
}
console.log(trees);
$("#createTreeButton").click(function () {
  $("#loader").show();
  var tree = 0;
  var radioButtons = document.getElementsByName("selectedTree");
  if (radioButtons[1].checked) {
    tree = 1;
  }
  console.log(typeof $("#exifSHACreate").val() === "string");
  console.log(typeof parseFloat($("#long").val()) === "string");
  console.log(typeof parseFloat($("#lat").val()) === "string");
  treesWeb3.methods
    .createTree(
      $("#exifSHACreate").val(),
      tree,
      parseInt($("#lat").val()),
      parseInt($("#long").val())
    )
    .send(function (error, result) {
      if (error) {
        $("#loader").hide();
        $("#hippieResult").html("error submitting tree: " + error.message);
      } else {
        $("#loader").hide();
        $("#hippieResult").html(
          $("#exifSHACreate").val() + " has been created"
        );
      }
    });
});
$("#becomeCurator").click(function () {
  $("#loader").show();
  treesWeb3.methods.becomeCurator().send(function (error, result) {
    if (error) {
      $("#loader").hide();
      $("#curatorResult").html("error becoming a curator: " + error.message);
    } else {
      $("#loader").hide();
      $("#curatorResult").html(address + " is now a curator");
    }
  });
});
$("#approveTreeButton").click(function () {
  $("#loader").show();
  treesWeb3.methods
    .pay($("#exifSHAApprove").val())
    .send(function (error, result) {
      if (error) {
        $("#loader").hide();
        $("#curatorResult").html(
          "error paying out tree reward: " + error.message
        );
      } else {
        $("#loader").hide();
        $("#curatorResult").html($("#exifSHAApprove").val() + " is now paid");
      }
    });
});
$("#rejectTreeButton").click(function () {
  $("#loader").show();
  treesWeb3.methods
    .reject($("#exifSHAReject").val(), $("#rejectReason").val())
    .send(function (error, result) {
      if (error) {
        console.log(error);
        $("#loader").hide();
        $("#curatorResult").html("error rejecting tree: " + error.message);
      } else {
        $("#loader").hide();
        $("#curatorResult").html(
          $("#exifSHAReject").val() +
            " is now rejected for " +
            $("#rejectReason").val()
        );
      }
    });
});
