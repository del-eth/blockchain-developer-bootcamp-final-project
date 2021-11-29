# General techniques

## Inheritance

- I decided to implement the OpenZeppelin ERC20 interface

## Gas Optimization

- Avoiding expensive loop operations:
- - I modeled handling Curators after this (https://ethereum.stackexchange.com/a/30481) to implement what is effectively a set/unique array. This allows me to validate if a curator is already in the array
