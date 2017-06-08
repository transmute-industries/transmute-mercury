pragma solidity ^0.4.8;
import "./EventStore.sol";
import "./SetLib/AddressSet/AddressSetLib.sol";

contract EventStoreFactory is EventStore {
  using AddressSetLib for AddressSetLib.AddressSet;
  mapping (address => AddressSetLib.AddressSet) creatorEventStoreMapping;
  AddressSetLib.AddressSet EventStoreAddresses;
  bytes32 ESFactoryPermissionDomain = 'ESF';
  bytes32 ESPermissionDomain = 'ES';

  // Fallback Function
  function() payable {}

  // Constructor
  function EventStoreFactory() payable
  {
    addACLAddress('ESF_CREATED', 'ESF_READ_GRANTED', 'ESF_WRITE_GRANTED', false, ESFactoryPermissionDomain, tx.origin);
  }

  // Modifiers
  modifier checkExistence(address _EventStoreAddress) {
    if (!EventStoreAddresses.contains(_EventStoreAddress))
      throw;
    _;
  }

  // Helper Functions
  function getEventStoresByCreator() constant
    isACLAddress(msg.sender)
    returns (address[])
  {
    return creatorEventStoreMapping[msg.sender].values;
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
    // Interact With Other Contracts
		EventStore _newEventStore = new EventStore();

    // Update State Dependent On Other Contracts
    EventStoreAddresses.add(address(_newEventStore));
    creatorEventStoreMapping[msg.sender].add(address(_newEventStore));

    writeEvent('ES_CREATED', 'v0', 'Address', false, ESPermissionDomain, address(_newEventStore), 0, '', 0);

    return address(_newEventStore);
	}

  function killEventStore(address _address)
    checkExistence(_address)
  {
    // Validate Local State
    if (this.owner() != msg.sender || creatorEventStoreMapping[msg.sender].values.length == 0) {
      throw;
    }

    // Update Local State
    creatorEventStoreMapping[msg.sender].remove(_address);
    EventStoreAddresses.remove(_address);

    // Interact With Other Contracts
    EventStore _eventStore = EventStore(_address);
    _eventStore.kill();

    writeEvent('ES_DESTROYED', 'v0', 'Address', false, ESPermissionDomain, address(_address), 0, '', 0);
  }
}
