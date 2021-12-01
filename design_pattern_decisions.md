# General techniques

## Inheritance

- I decided to implement the OpenZeppelin ERC20 interface

## Access Control Design Patterns

- There's a lot of validations/modifiers around making sure a curator can't be a hippie or that a hippie can't also be a curator for the same tree.

## Gas Optimization

- Avoiding expensive loop operations:
- - I modeled handling Curators after this (https://ethereum.stackexchange.com/a/30481) to implement what is effectively a set/unique array. This allows me to validate if a curator is already in the array
