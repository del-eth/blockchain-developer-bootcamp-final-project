if (typeof web3 !== "undefined") {
  Web3 = new Web3(web3.currentProvider);
} else {
  Web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
}

// window.ethereum
const accounts = await ethereum.request({ method: "eth_accounts" });
const treesWeb3 = Web3.eth.contract([
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
    inputs: [],
    name: "treeCount",
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
]);

var ProofOfTree = treesWeb3.at("0x8ddF13e2cd8bDcba070c2A8B9982C24ecEd666Eb");
console.log(ProofOfTree);
var pendingEvent = ProofOfTree.LogPending();
pendingEvent.watch(function (error, result) {
  if (!error) {
    $("#loader").hide();
    $("#logPending").html(result.args.exifSHA);
  } else {
    $("#loader").hide();
    console.log(error);
  }
});
$("#createTreeButton").click(function () {
  var tree = 0;
  var radioButtons = document.getElementsByName("selectedTree");
  if (radioButtons[1].checked) {
    tree = 1;
  }
  console.log(tree);
  ProofOfTree.createTree($("#exifSha"), tree, $("#lat"), $("#long"));
});
