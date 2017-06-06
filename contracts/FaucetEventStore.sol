pragma solidity ^0.4.8;
import "./TransmuteFramework/EventStore.sol";
import './TransmuteFramework/zeppelin/lifecycle/Killable.sol';
import "./TransmuteFramework/SetLib/AddressSet/AddressSetLib.sol";
import "./TransmuteFramework/Utils/StringUtils.sol";

contract FaucetEventStore is EventStore {
  using AddressSetLib for AddressSetLib.AddressSet;

  AddressSetLib.AddressSet ACLAddresses;

  mapping (address => ACL) ACLMapping;
  struct ACL {
    bool read;
    bool write;
  }

  // Modifiers
  modifier onlyCreator() {
    if (tx.origin != creator)
      throw;
    _;
  }

  modifier onlyReadAuthorized() {
    if (!ACLMapping[tx.origin].read)
      throw;
    _;
  }

  modifier onlyWriteAuthorized() {
    if (!ACLMapping[tx.origin].write)
      throw;
    _;
  }

  modifier onlyReadAndWriteAuthorized() {
    if (!ACLMapping[tx.origin].write || !ACLMapping[tx.origin].read)
      throw;
    _;
  }

  // CONSTRUCTOR
  function () payable {}
  function FaucetEventStore() payable {
    creator = tx.origin;
    ACLAddresses.add(creator);
    ACLMapping[creator] = ACL({read:true, write:true});
  }

  // VERSION
  function getVersion() public constant
    returns (uint)
  {
    return 1;
  }

  // ACCESS CONTROL
  function getACLAddresses() constant
    returns (address[])
  {
    return ACLAddresses.values;
  }

  function addRequestorAddress(address _requestor) public {
    if (ACLAddresses.contains(_requestor))
      throw;
    ACLAddresses.add(_requestor);
    ACLMapping[_requestor] = ACL({read:true, write:false});

    writeEvent('EVENT_STORE_ACCESS_REQUESTED', 'v0', 'Address', _requestor, 0, '', 0);
  }

  function authorizeRequestorAddress(address _requestor)
    public onlyCreator
  {
    if (!ACLAddresses.contains(_requestor))
      throw;
    if (ACLMapping[_requestor].write)
      throw;
    ACLMapping[_requestor] = ACL({read:true, write:true});

    writeEvent('EVENT_STORE_ACCESS_GRANTED', 'v0', 'Address', _requestor, 0, '', 0);
  }

  function revokeRequestorAddress(address _requestor)
    public onlyCreator
  {
    if (!ACLAddresses.contains(_requestor))
      throw;
    if (!ACLMapping[_requestor].write)
      throw;
    ACLMapping[_requestor] = ACL({read:true, write:false});

     writeEvent('EVENT_STORE_ACCESS_REVOKED', 'v0', 'Address', _requestor, 0, '', 0);
  }

  // WRITE EVENT
  function writeEvent(bytes32 _type, bytes32 _version, bytes32 _valueType, address _addressValue, uint _uintValue, bytes32 _bytes32Value , uint _propCount)
    public onlyAuthorized
    returns (uint)
  {
    uint _created = now;

    EsEventStruct memory solidityEvent;
    solidityEvent.Id = solidityEventCount;
    solidityEvent.Type = _type;
    solidityEvent.Created = _created;
    solidityEvent.TxOrigin = tx.origin;
    solidityEvent.Version = _version;

    solidityEvent.ValueType = _valueType;
    solidityEvent.AddressValue = _addressValue;
    solidityEvent.UIntValue = _uintValue;
    solidityEvent.Bytes32Value = _bytes32Value;

    solidityEvent.PropertyCount = _propCount;
    solidityEvents[solidityEventCount] = solidityEvent;

    EsEvent(solidityEventCount, _type, _version, _valueType, _addressValue, _uintValue, _bytes32Value, tx.origin, _created, _propCount);
    solidityEventCount += 1;
    return solidityEventCount;
  }

  function writeEventProperty(uint _eventIndex, uint _eventPropertyIndex, bytes32 _name, bytes32 _type, address _address, uint _uint, bytes32 _string)
    public onlyAuthorized
    returns (uint)
  {
    if(solidityEvents[_eventIndex].PropertyValues[_eventPropertyIndex].ValueType != 0){
      throw;
    }
    EsEventPropertyStruct memory solidityEventProperty;
    solidityEventProperty.Name = _name;
    solidityEventProperty.ValueType = _type;
    solidityEventProperty.AddressValue = _address;
    solidityEventProperty.UIntValue = _uint;
    solidityEventProperty.Bytes32Value = _string;
    solidityEvents[_eventIndex].PropertyValues[_eventPropertyIndex] = solidityEventProperty;

    EsEventProperty(_eventIndex, _eventPropertyIndex, _name, _type, _address, _uint, _string);
    return solidityEventCount;
  }

  // READ EVENT
  function readEvent(uint _eventIndex)
    public onlyAuthorized
    returns (uint, bytes32, bytes32, bytes32, address, uint, bytes32, address, uint, uint)
  {
    EsEventStruct memory solidityEvent = solidityEvents[_eventIndex];
    return (solidityEvent.Id, solidityEvent.Type, solidityEvent.Version, solidityEvent.ValueType, solidityEvent.AddressValue, solidityEvent.UIntValue, solidityEvent.Bytes32Value, solidityEvent.TxOrigin, solidityEvent.Created, solidityEvent.PropertyCount);
  }

  function readEventProperty(uint _eventIndex, uint _eventPropertyIndex)
    public onlyAuthorized
    returns (uint, uint, bytes32, bytes32, address, uint, bytes32)
  {
    EsEventPropertyStruct memory prop = solidityEvents[_eventIndex].PropertyValues[_eventPropertyIndex];
    return (_eventIndex, _eventPropertyIndex, prop.Name, prop.ValueType, prop.AddressValue, prop.UIntValue, prop.Bytes32Value);
  }

}
