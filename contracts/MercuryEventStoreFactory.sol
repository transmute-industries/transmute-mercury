pragma solidity ^0.4.8;
import "./MercuryEventStore.sol";
import "./TransmuteFramework/EventStore.sol";
import "./TransmuteFramework/SetLib/AddressSet/AddressSetLib.sol";

contract MercuryEventStoreFactory is EventStore {

  using AddressSetLib for AddressSetLib.AddressSet;

  mapping (address => address) creatorMercuryEventStoreMapping;
  AddressSetLib.AddressSet MercuryEventStoreAddresses;

  // Fallback Function
  function() payable {}

  // Constructor
  function MercuryEventStoreFactory() payable {
    writeSolidityEvent('BEGIN', 1, 'NO_INTEGRITY_HASH');
  }

  // Modifiers
  modifier checkExistence(address _MercuryEventStoreAddress) {
    if (!MercuryEventStoreAddresses.contains(_MercuryEventStoreAddress))
      throw;
    _;
  }

  // Helper Functions
  function getMercuryEventStoreByCreator() constant
    returns (address)
  {
    return creatorMercuryEventStoreMapping[msg.sender];
  }

  function getMercuryEventStores() constant
    returns (address[])
  {
    return MercuryEventStoreAddresses.values;
  }

  // Interface
	function createMercuryEventStore(string _event_store_name) payable
    returns (address)
  {
    // Validate Local State
    if (creatorMercuryEventStoreMapping[msg.sender] != 0) {
      throw;
    }

    // Update Local State

    // Interact With Other Contracts
		MercuryEventStore _newMercuryEventStore = new MercuryEventStore(_event_store_name);

    // Update State Dependent On Other Contracts
    MercuryEventStoreAddresses.add(address(_newMercuryEventStore));
    creatorMercuryEventStoreMapping[msg.sender] = address(_newMercuryEventStore);

    // // Emit Events
    uint eventIndex = solidityEventCount;

    writeSolidityEvent('EVENT_STORE_CREATED', 1, 'NO_INTEGRITY_HASH');
    writeSolidityEventProperty(eventIndex, 0, 'ContractAddress', 'Address', address(_newMercuryEventStore), 0, '');

    return address(_newMercuryEventStore);
	}

  function killMercuryEventStore(address _address, address _creator)  {
    // Validate Local State
    if ((_creator != msg.sender && this.owner() != msg.sender) || creatorMercuryEventStoreMapping[_creator] == 0) {
      throw;
    }

    // Update Local State
    delete creatorMercuryEventStoreMapping[_creator];
    MercuryEventStoreAddresses.remove(_address);

    // Interact With Other Contracts
    MercuryEventStore _MercuryEventStore = MercuryEventStore(_address);
    _MercuryEventStore.kill();

    // Emit Events
    // USE EVENT STORE
  }
}