//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import { PoseidonT3 } from "./Poseidon.sol"; //an existing library to perform Poseidon hash on solidity
import "./verifier.sol"; //inherits with the MerkleTreeInclusionProof verifier contract
import "hardhat/console.sol";


contract MerkleTree is Verifier {
    uint256[] public hashes; // the Merkle tree in flattened array form
    uint256 public index = 0; // the current index of the first unfilled leaf
    uint256 public root; // the current Merkle root
    
    uint256 public n = 8;


    constructor() {
        // [assignment] initialize a Merkle tree of 8 with blank leaves
      hashes = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        
    }

   

    function insertLeaf(uint256 hashedLeaf) public returns (uint256) {
        // [assignment] insert a hashed leaf into the Merkle tree       
        hashes[index] = hashedLeaf;
           
         for(uint256 i=0; i < n-1; i++) {
             uint256[2] memory inputs=[hashes[2*i],hashes[2*i+1]];
             hashes[i+8] = PoseidonT3.poseidon(inputs);
        }

        index +=1;
        root = hashes[14];
        return root;  
    }
    
    

    function verify(
            uint[2] memory a,
            uint[2][2] memory b,
            uint[2] memory c,
            uint[1] memory input
        ) public view returns (bool) {

        // [assignment] verify an inclusion proof and check that the proof root matches current root
        require(input[0] == root);
        return verifyProof(a, b, c, input);
       
    }
}
