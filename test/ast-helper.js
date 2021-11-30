// Forked from supply chain exercise :)
// Novel way to drive behavior of Smart Contract.

const CDTYPE = "ContractDefinition";
const CNAME = "ProofOfTrees";
const contractDefn = ca =>
  ca.ast.nodes.find(n => n.nodeType === CDTYPE && n.name === CNAME);

const trees = (ca) => {
  const tree = contractDefn(ca).nodes.find((n) => n.name === "Tree");
  if (!tree) return null;

  return tree
    .members
    .map((t) => ({
      name: t.name,
      nodeType: t.nodeType,
      stateVariable: t.stateVariable,
      type: t.typeName.name,
      mutability: t.typeName.stateMutability,
    }));
};

const isDefined = members => variableName => {
  return members 
    ? members.find((tree) => tree.name === variableName) 
    : null;
};

const isPayable = members => variableName => {
  if (members === undefined) return false;
  const definition = members.find((tree) => tree.name === variableName);
  return definition && definition.mutability === "payable";
};

const isType = members => variableName => type => {
  if (members === undefined) return false;
  const definition = members.find((tree) => tree.name === variableName);
  return definition && definition.type === type;
};

module.exports = {
  trees,
  isDefined,
  isPayable,
  isType,
};
