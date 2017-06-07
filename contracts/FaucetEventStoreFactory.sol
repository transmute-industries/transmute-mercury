pragma solidity ^0.4.8;
import "./TransmuteFramework/EventStore.sol";
import "./TransmuteFramework/SetLib/AddressSet/AddressSetLib.sol";
import "./TransmuteFramework/Utils/StringUtils.sol";

contract FaucetEventStoreFactory is EventStore {
  using AddressSetLib for AddressSetLib.AddressSet;
  mapping (address => AddressSetLib.AddressSet) creatorEventStoreMapping;
  AddressSetLib.AddressSet FaucetEventStoreAddresses;
  bytes32 Domain = 'Faucet';

  // Fallback Function
  function() payable {}

  // Constructor
  function FaucetEventStoreFactory() payable {
    writeEvent('FAUCET_FACTORY_CREATED', 'v0', 'Address', Domain, tx.origin, 0, '', 0);
  }

  // Modifiers
  modifier checkExistence(address _EventStoreAddress) {
    if (!FaucetEventStoreAddresses.contains(_EventStoreAddress))
      throw;
    _;
  }

  // Helper Functions
  function getFaucetEventStoresByCreator() constant
    returns (address[])
  {
    return creatorEventStoreMapping[msg.sender].values;
  }

  function getFaucetEventStores() constant
    returns (address[])
  {
    return FaucetEventStoreAddresses.values;
  }

  // Interface
	function createFaucetEventStore() payable
    returns (address)
  {
    // Interact With Other Contracts
		EventStore _newEventStore = new EventStore();

    // Update State Dependent On Other Contracts
    FaucetEventStoreAddresses.add(address(_newEventStore));
    creatorEventStoreMapping[msg.sender].add(address(_newEventStore));

    writeEvent('FAUCET_EVENT_STORE_CREATED', 'v0', 'Address', Domain, address(_newEventStore), 0, '', 0);
    return address(_newEventStore);
	}

  function killFaucetEventStore(address _address) checkExistence(_address) {
    // Validate Local State
    if (this.owner() != msg.sender || creatorEventStoreMapping[msg.sender].values.length == 0) {
      throw;
    }

    // Update Local State
    creatorEventStoreMapping[msg.sender].remove(_address);
    FaucetEventStoreAddresses.remove(_address);

    // Interact With Other Contracts
    EventStore _eventStore = EventStore(_address);
    _eventStore.kill();

    writeEvent('FAUCET_EVENT_STORE_DESTROYED', 'v0', 'Address', Domain, address(_address), 0, '', 0);
  }
}
