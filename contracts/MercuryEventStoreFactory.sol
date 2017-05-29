pragma solidity ^0.4.8;
import "./MercuryEventStore.sol";
import "./TransmuteFramework/EventStore.sol";
import "./TransmuteFramework/SetLib/AddressSet/AddressSetLib.sol";
import "./TransmuteFramework/Utils/StringUtils.sol";

contract MercuryEventStoreFactory is EventStore {
  using AddressSetLib for AddressSetLib.AddressSet;
  mapping (address => AddressSetLib.AddressSet) creatorEventStoreMapping;
  AddressSetLib.AddressSet EventStoreAddresses;

  // Fallback Function
  function() payable {}

  // Constructor
  function MercuryEventStoreFactory() payable {
    uint eventIndex = solidityEventCount;
    writeSolidityEvent('FACTORY_CREATED', 1, '');
    writeSolidityEventProperty(eventIndex, 0, 'ContractOwnerAddress', 'Address', msg.sender, 0, '');
  }

  // Modifiers
  modifier checkExistence(address _EventStoreAddress) {
    if (!EventStoreAddresses.contains(_EventStoreAddress))
      throw;
    _;
  }

  // Helper Functions
  function getEventStoresByCreator() constant
    returns (address[])
  {
    return creatorEventStoreMapping[msg.sender].values;
  }

  function getMercuryEventStores() constant
    returns (address[])
  {
    return EventStoreAddresses.values;
  }

  // Interface
	function createMercuryEventStore() payable
    returns (address)
  {
    // Interact With Other Contracts
		MercuryEventStore _newEventStore = new MercuryEventStore();

    // Update State Dependent On Other Contracts
    EventStoreAddresses.add(address(_newEventStore));
    creatorEventStoreMapping[msg.sender].add(address(_newEventStore));

    uint eventIndex = solidityEventCount;

    writeSolidityEvent('FACTORY_EVENT_STORE_CREATED', 2, '');
    writeSolidityEventProperty(eventIndex, 0, 'ContractAddress', 'Address', address(_newEventStore), 0, '');
    writeSolidityEventProperty(eventIndex, 1, 'ContractOwnerAddress', 'Address', msg.sender, 0, '');

    return address(_newEventStore);
	}

  function killEventStore(address _address) checkExistence(_address) {
    // Validate Local State
    if (this.owner() != msg.sender || creatorEventStoreMapping[msg.sender].values.length == 0) {
      throw;
    }

    // Update Local State
    creatorEventStoreMapping[msg.sender].remove(_address);
    EventStoreAddresses.remove(_address);

    // Interact With Other Contracts
    MercuryEventStore _eventStore = MercuryEventStore(_address);
    _eventStore.kill();

    uint eventIndex = solidityEventCount;

    writeSolidityEvent('FACTORY_EVENT_STORE_DESTROYED', 1, StringUtils.uintToBytes(eventIndex));
    writeSolidityEventProperty(eventIndex, 0, 'ContractAddress', 'Address', _address, 0, '');
  }
}
