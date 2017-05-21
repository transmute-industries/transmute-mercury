pragma solidity ^0.4.8;
import './zeppelin/lifecycle/Killable.sol';
import "./SetLib/AddressSet/AddressSetLib.sol";

contract EventStore is Killable {
  using AddressSetLib for AddressSetLib.AddressSet;


  event SOLIDITY_EVENT_PROPERTY(
    uint EventIndex,
    uint EventPropertyIndex,
    string Name,
    string Type,
    address AddressValue,
    uint UIntValue,
    string StringValue
  );

  event SOLIDITY_EVENT(
    uint Id,
    string Type,
    uint Created,
    uint PropertyCount,
    string IntegrityHash
  );

  struct SolidityEventProperty {
    string Name;
    string Type;
    address AddressValue;
    uint UIntValue;
    string StringValue;
  }

  struct SolidityEvent {
    uint Id;
    string Type;
    uint Created;
    uint PropertyCount;
    mapping (uint => SolidityEventProperty) PropertyValues;
    string IntegrityHash;
  }

  uint public solidityEventCount;
  mapping (uint => SolidityEvent) solidityEvents;

  mapping (address => bool) authorizedAddressesMapping;
  AddressSetLib.AddressSet requestorAddresses;
  address public creator;
  uint public timeCreated;

  // Modifiers
  modifier onlyCreator() {
    if (tx.origin != creator)
      throw;
    _;
  }

  modifier onlyAuthorized() {
    if (tx.origin != creator && !authorizedAddressesMapping[tx.origin])
      throw;
    _;
  }
  
  function () payable {}
  function EventStore() payable {}

  function getRequestorAddresses() constant
    returns (address[])
  {
    return requestorAddresses.values;
  }

  function addRequestorAddress(address _requestor) public {
    if (requestorAddresses.contains(_requestor))
      throw;
    requestorAddresses.add(_requestor);
    authorizedAddressesMapping[_requestor] = false;
    // EMIT a ES Event here...
  }

  function authorizeRequestorAddress(address _requestor) public
    onlyCreator
  {
    if (!requestorAddresses.contains(_requestor))
      throw;
    if (authorizedAddressesMapping[_requestor])
      throw;
    authorizedAddressesMapping[_requestor] = true;
    // EMIT an ES Event here
  }

  function revokeRequestorAddress(address _requestor) public
    onlyCreator
  {
    if (!requestorAddresses.contains(_requestor))
      throw;
    if (!authorizedAddressesMapping[_requestor])
      throw;
    authorizedAddressesMapping[_requestor] = false;
    // EMIT an ES Event here
    // uint eventIndex = solidityEventCount;

    // writeSolidityEvent('EVENT_STORE_CREATED', 1, '0x0');
    // writeSolidityEventProperty(eventIndex, 0, 'ContractAddress', 'Address', address(_newEventStore), 0, '');

    // eventIndex = solidityEventCount;

    // writeSolidityEvent('EVENT_STORE_AUDIT_LOG', 2, '0x1');
    // writeSolidityEventProperty(eventIndex, 0, 'ContractAddress', 'Address', address(_newEventStore), 0, '');
    // writeSolidityEventProperty(eventIndex, 1, 'ContractOwnerAddress', 'Address', address(msg.sender), 0, '');

  }

  function isAddressAuthorized(address _address) public constant
    returns (bool)
  {
    return authorizedAddressesMapping[_address];
  }


  function getVersion() public constant
    returns (uint)
  {
    return 1;
  }

  function writeSolidityEventProperty(uint _eventIndex, uint _eventPropertyIndex, string _name, string _type, address _address, uint _uint, string _string) public
    returns (uint)
  {
    SolidityEventProperty memory solidityEventProperty;
    solidityEventProperty.Name = _name;
    solidityEventProperty.Type = _type;
    solidityEventProperty.AddressValue = _address;
    solidityEventProperty.UIntValue = _uint;
    solidityEventProperty.StringValue = _string;
    solidityEvents[_eventIndex].PropertyValues[_eventPropertyIndex] = solidityEventProperty;

    SOLIDITY_EVENT_PROPERTY(_eventIndex, _eventPropertyIndex, _name, _type, _address, _uint, _string);
    return solidityEventCount;
  }

  function writeSolidityEvent(string _type, uint _propCount, string _integrity) public
    returns (uint)
  {
    uint _created = now;

    SolidityEvent memory solidityEvent;
    solidityEvent.Id = solidityEventCount;
    solidityEvent.Type = _type;
    solidityEvent.Created = _created;
    solidityEvent.PropertyCount = _propCount;
    solidityEvent.IntegrityHash = _integrity;
    solidityEvents[solidityEventCount] = solidityEvent;

    SOLIDITY_EVENT(solidityEventCount, _type, _created, _propCount, _integrity);
    solidityEventCount += 1;
    return solidityEventCount;
  }

  function readSolidityEventType(uint _eventIndex) public
    returns (string)
  {
    return solidityEvents[_eventIndex].Type;
  }
  function readSolidityEventCreated(uint _eventIndex) public
    returns (uint)
  {
    return solidityEvents[_eventIndex].Created;
  }
  function readSolidityEventPropertyCount(uint _eventIndex) public
    returns (uint)
  {
    return solidityEvents[_eventIndex].PropertyCount;
  }
  function readSolidityEventIntegrityHash(uint _eventIndex) public
    returns (string)
  {
    return solidityEvents[_eventIndex].IntegrityHash;
  }

  function readSolidityEventPropertyName(uint _eventIndex, uint _eventPropertyIndex) public
    returns (string)
  {
    return solidityEvents[_eventIndex].PropertyValues[_eventPropertyIndex].Name;
  }

  function readSolidityEventPropertyType(uint _eventIndex, uint _eventPropertyIndex) public
    returns (string)
  {
    return solidityEvents[_eventIndex].PropertyValues[_eventPropertyIndex].Type;
  }

  function readSolidityEventPropertyAddressValue(uint _eventIndex, uint _eventPropertyIndex) public
    returns (address)
  {
    return solidityEvents[_eventIndex].PropertyValues[_eventPropertyIndex].AddressValue;
  }

  function readSolidityEventPropertyUIntValue(uint _eventIndex, uint _eventPropertyIndex) public
    returns (uint)
  {
    return solidityEvents[_eventIndex].PropertyValues[_eventPropertyIndex].UIntValue;
  }

  function readSolidityEventPropertyStringValue(uint _eventIndex, uint _eventPropertyIndex) public
    returns (string)
  {
    return solidityEvents[_eventIndex].PropertyValues[_eventPropertyIndex].StringValue;
  }

}
