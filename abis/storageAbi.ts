export const StorageAbi = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newVDIDAddress",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "OwnableInvalidOwner",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "account",
          "type": "address"
        }
      ],
      "name": "OwnableUnauthorizedAccount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "StorageAlreadyInitialized",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "StorageCurrentOwnerCanNotBeInvalid",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "StorageInvalidAdmin",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "StorageInvalidVDID",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "StorageNotInitializedYet",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "StorageUnauthorized",
      "type": "error"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "VDIDAddressModified",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "VDIDAddressNowInvalid",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "vehicleMasterAccount",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "attestationUID",
          "type": "string"
        }
      ],
      "name": "addAttestation",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAdminAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "vehicleMasterAccount",
          "type": "address"
        }
      ],
      "name": "getAttestationsOf",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenIde",
          "type": "uint256"
        }
      ],
      "name": "getMasterAccountOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "VIN",
          "type": "string"
        }
      ],
      "name": "getTokenIdByVIN",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getTokenToMint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "userAddress",
          "type": "address"
        }
      ],
      "name": "getUserTokens",
      "outputs": [
        {
          "internalType": "uint256[]",
          "name": "",
          "type": "uint256[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getVDIDAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenIde",
          "type": "uint256"
        }
      ],
      "name": "getVDIDOf",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "nftOwner",
              "type": "address"
            },
            {
              "internalType": "address",
              "name": "ERC6551Account",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "tokenId",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "vdidURI",
              "type": "string"
            },
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "VIN",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "make",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "model",
                  "type": "string"
                }
              ],
              "internalType": "struct Storage.VehicleData",
              "name": "data",
              "type": "tuple"
            }
          ],
          "internalType": "struct Storage.VDID",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenIde",
          "type": "uint256"
        }
      ],
      "name": "getVDIDOwner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "initialize",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "modifyAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenIde",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "oldOwner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "modifyNFTOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newVDIDAddress",
          "type": "address"
        }
      ],
      "name": "modifyVDIDAddress",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "validVDID",
          "type": "address"
        }
      ],
      "name": "setInvalidVDID",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "nftOwner",
          "type": "address"
        },
        {
          "internalType": "address",
          "name": "accountAddress",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "vdidURI",
          "type": "string"
        },
        {
          "components": [
            {
              "internalType": "string",
              "name": "VIN",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "make",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "model",
              "type": "string"
            }
          ],
          "internalType": "struct Storage.VehicleData",
          "name": "data",
          "type": "tuple"
        }
      ],
      "name": "storeVDID",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
] as const;
