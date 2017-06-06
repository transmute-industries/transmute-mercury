pragma solidity ^0.4.8;
import './zeppelin/lifecycle/Killable.sol';
import "./SetLib/AddressSet/AddressSetLib.sol";
import "./Utils/StringUtils.sol";

contract EventStore is Killable {
  using AddressSetLib for AddressSetLib.AddressSet;

  struct EsEventStruct {
    uint Id;
    bytes32 Type;
    bytes32 Version;

    bytes32 ValueType;
    address AddressValue;
    uint UIntValue;
    bytes32 Bytes32Value;

    address TxOrigin;
    uint Created;
    uint PropertyCount;
    mapping (uint => EsEventPropertyStruct) PropertyValues;
  }
  event EsEvent(
    uint Id,
    bytes32 Type,
    bytes32 Version,

    bytes32 ValueType,
    address AddressValue,
    uint UIntValue,
    bytes32 Bytes32Value,

    address TxOrigin,
    uint Created,
    uint PropertyCount
  );

  struct EsEventPropertyStruct {
    bytes32 Name;
    bytes32 ValueType;
    address AddressValue;
    uint UIntValue;
    bytes32 Bytes32Value;
  }
  event EsEventProperty(
    uint EventIndex,
    uint EventPropertyIndex,
    bytes32 Name,
    bytes32 ValueType,
    address AddressValue,
    uint UIntValue,
    bytes32 Bytes32Value
  );

  uint public solidityEventCount;
  mapping (uint => EsEventStruct) solidityEvents;

  AddressSetLib.AddressSet ACLAddresses;

  mapping (address => mapping (bytes32 => ACL)) ACLMapping;
  struct ACL {
    bool read;
    bool write;
  }

  address public creator;
  uint public timeCreated;

  // Modifiers
  modifier onlyCreator() {
    if (tx.origin != creator)
      throw;
    _;
  }

  modifier onlyReadAuthorized(bytes32 _domainName) {
    if (!ACLMapping[tx.origin][_domainName].read)
      throw;
    _;
  }

  modifier onlyWriteAuthorized(bytes32 _domainName) {
    if (!ACLMapping[tx.origin][_domainName].write)
      throw;
    _;
  }

  modifier onlyReadAndWriteAuthorized(bytes32 _domainName) {
    if (!ACLMapping[tx.origin][_domainName].write || !ACLMapping[tx.origin][_domainName].read)
      throw;
    _;
  }

  modifier isACLAddress(address _address) {
    if (!ACLAddresses.contains(_address))
      throw;
    _;
  }

  // CONSTRUCTOR
  function () payable {}
  function EventStore() payable {}

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

  function addACLAddress(address _address, bytes32 _domainName, bool read, bool write) public {
    if (ACLAddresses.contains(_address))
      throw;
    ACLAddresses.add(_address);
    ACLMapping[_address][_domainName] = ACL(false, false);
    writeEvent('EVENT_STORE_ACCESS_REQUESTED', 'v0', 'Address', _domainName, _address, 0, '', 0);

    if (read)
      grantReadAccess(_domainName, _address);
    if (write)
      grantWriteAccess(_domainName, _address);
  }

  function grantReadAccess(bytes32 _domainName, address _address)
    public onlyCreator isACLAddress(_address)
  {
    if (ACLMapping[_address][_domainName].read)
      throw;
    ACL storage updatedACL = ACLMapping[_address][_domainName];
    updatedACL.read = true;

     writeEvent('EVENT_STORE_READ_ACCESS_GRANTED', 'v0', 'Address', _domainName, _address, 0, '', 0);
  }

  function revokeReadAccess(bytes32 _domainName, address _address)
    public onlyCreator isACLAddress(_address)
  {
    if (!ACLMapping[_address][_domainName].read)
      throw;
    ACL storage updatedACL = ACLMapping[_address][_domainName];
    updatedACL.read = false;

     writeEvent('EVENT_STORE_READ_ACCESS_REVOKED', 'v0', 'Address', _domainName, _address, 0, '', 0);
  }

  function grantWriteAccess(bytes32 _domainName, address _address)
    public onlyCreator isACLAddress(_address)
  {
    if (ACLMapping[_address][_domainName].write)
      throw;
    ACL storage updatedACL = ACLMapping[_address][_domainName];
    updatedACL.write = true;

     writeEvent('EVENT_STORE_WRITE_ACCESS_GRANTED', 'v0', 'Address', _domainName, _address, 0, '', 0);
  }

  function revokeWriteAccess(bytes32 _domainName, address _address)
    public onlyCreator isACLAddress(_address)
  {
    if (!ACLMapping[_address][_domainName].write)
      throw;
    ACL storage updatedACL = ACLMapping[_address][_domainName];
    updatedACL.write = false;

     writeEvent('EVENT_STORE_WRITE_ACCESS_REVOKED', 'v0', 'Address', _domainName, _address, 0, '', 0);
  }

  // WRITE EVENT
  function writeEvent(bytes32 _type, bytes32 _version, bytes32 _valueType, bytes32 _domainName, address _addressValue, uint _uintValue, bytes32 _bytes32Value , uint _propCount)
    public onlyWriteAuthorized(_domainName)
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

  function writeEventProperty(uint _eventIndex, uint _eventPropertyIndex, bytes32 _name, bytes32 _type, bytes32 _domainName, address _address, uint _uint, bytes32 _string)
    public onlyWriteAuthorized(_domainName)
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
  function readEvent(bytes32 _domainName, uint _eventIndex)
    public onlyReadAuthorized(_domainName)
    returns (uint, bytes32, bytes32, bytes32, address, uint, bytes32, address, uint, uint)
  {
    EsEventStruct memory solidityEvent = solidityEvents[_eventIndex];
    return (solidityEvent.Id, solidityEvent.Type, solidityEvent.Version, solidityEvent.ValueType, solidityEvent.AddressValue, solidityEvent.UIntValue, solidityEvent.Bytes32Value, solidityEvent.TxOrigin, solidityEvent.Created, solidityEvent.PropertyCount);
  }

  function readEventProperty(bytes32 _domainName, uint _eventIndex, uint _eventPropertyIndex)
    public onlyReadAuthorized(_domainName)
    returns (uint, uint, bytes32, bytes32, address, uint, bytes32)
  {
    EsEventPropertyStruct memory prop = solidityEvents[_eventIndex].PropertyValues[_eventPropertyIndex];
    return (_eventIndex, _eventPropertyIndex, prop.Name, prop.ValueType, prop.AddressValue, prop.UIntValue, prop.Bytes32Value);
  }
}
