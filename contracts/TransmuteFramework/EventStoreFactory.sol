pragma solidity ^0.4.8;
import "./EventStore.sol";
import "./SetLib/AddressSet/AddressSetLib.sol";

contract EventStoreFactory is EventStore {
  using AddressSetLib for AddressSetLib.AddressSet;

  mapping (address => address) creatorEventStoreMapping;
  AddressSetLib.AddressSet EventStoreAddresses;

  // Fallback Function
  function() payable {}

  // Constructor
  function EventStoreFactory() payable {}

  // Modifiers
  modifier checkExistence(address _EventStoreAddress) {
    if (!EventStoreAddresses.contains(_EventStoreAddress))
      throw;
    _;
  }

  // Helper Functions
  function getEventStoreByCreator() constant
    returns (address)
  {
    return creatorEventStoreMapping[msg.sender];
  }

  function getEventStores() constant
    returns (address[])
  {
    return EventStoreAddresses.values;
  }

  // Interface
	function createEventStore() payable
    returns (address)
  {
    // Validate Local State
    if (creatorEventStoreMapping[msg.sender] != 0) {
      throw;
    }

    // Update Local State

    // Interact With Other Contracts
		EventStore _newEventStore = new EventStore();

    // Update State Dependent On Other Contracts
    EventStoreAddresses.add(address(_newEventStore));
    creatorEventStoreMapping[msg.sender] = address(_newEventStore);

    // Emit Events
    uint eventIndex = solidityEventCount;

    writeSolidityEvent('EVENT_STORE_CREATED', 1, '0x0');
    writeSolidityEventProperty(eventIndex, 0, 'ContractAddress', 'Address', address(_newEventStore), 0, '');

    eventIndex = solidityEventCount;

    writeSolidityEvent('EVENT_STORE_AUDIT_LOG', 2, '0x1');
    writeSolidityEventProperty(eventIndex, 0, 'ContractAddress', 'Address', address(_newEventStore), 0, '');
    writeSolidityEventProperty(eventIndex, 1, 'ContractOwnerAddress', 'Address', address(msg.sender), 0, '');

    return address(_newEventStore);
	}

  function killEventStore(address _address, address _creator)  {
    // Validate Local State
    if ((_creator != msg.sender && this.owner() != msg.sender) || creatorEventStoreMapping[_creator] == 0) {
      throw;
    }

    // Update Local State
    delete creatorEventStoreMapping[_creator];
    EventStoreAddresses.remove(_address);

    // Interact With Other Contracts
    EventStore _EventStore = EventStore(_address);
    _EventStore.kill();

    // Emit Events
    // USE EVENT STORE
  }
}