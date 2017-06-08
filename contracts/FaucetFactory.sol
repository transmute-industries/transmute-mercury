pragma solidity ^0.4.8;
import "./TransmuteFramework/EventStore.sol";
import "./TransmuteFramework/SetLib/AddressSet/AddressSetLib.sol";
import "./Faucet.sol";

contract FaucetFactory is EventStore {
  using AddressSetLib for AddressSetLib.AddressSet;
  mapping (address => AddressSetLib.AddressSet) creatorFaucetMapping;
  AddressSetLib.AddressSet FaucetAddresses;
  bytes32 FactoryPermissionDomain = 'FF';
  bytes32 FaucetPermissionDomain = 'F';

  // Fallback Function
  function() payable {}

  // Constructor
  function FaucetFactory() payable {
    addACLAddress('FF_CREATED', 'FF_READ_GRANTED', 'FF_WRITE_GRANTED', false, FactoryPermissionDomain, tx.origin);
  }

  // Modifiers
  modifier checkExistence(address _faucetAddress) {
    if (!FaucetAddresses.contains(_faucetAddress))
      throw;
    _;
  }

  // Helper Functions
  function getFaucetsByCreator() constant
    isACLAddress(msg.sender)
    returns (address[])
  {
    return creatorFaucetMapping[msg.sender].values;
  }

  function getFaucets() constant
    returns (address[])
  {
    return FaucetAddresses.values;
  }

  // Interface
	function createFaucet() payable
    returns (address)
  {
    // Interact With Other Contracts
		Faucet _faucet = new Faucet();

    // Update State Dependent On Other Contracts
    FaucetAddresses.add(address(_faucet));
    creatorFaucetMapping[msg.sender].add(address(_faucet));

    writeEvent('FAUCET_CREATED', 'v0', 'Address', false, FaucetPermissionDomain, address(_faucet), 0, '', 0);

    return address(_faucet);
	}

  function killFaucet(address _faucetAddress)
    checkExistence(_faucetAddress)
  {
    // Validate Local State
    if (this.owner() != msg.sender || creatorFaucetMapping[msg.sender].values.length == 0) {
      throw;
    }

    // Update Local State
    creatorFaucetMapping[msg.sender].remove(_faucetAddress);
    FaucetAddresses.remove(_faucetAddress);

    // Interact With Other Contracts
    Faucet _faucet = Faucet(_faucetAddress);
    _faucet.kill();

    writeEvent('FAUCET_DESTROYED', 'v0', 'Address', false, FaucetPermissionDomain, address(_faucetAddress), 0, '', 0);
  }
}
