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

  modifier onlyReadAuthorized(bytes32 _domain) {
    if (!ACLMapping[tx.origin][_domain].read)
      throw;
    _;
  }

  modifier onlyWriteAuthorized(bytes32 _domain) {
    if (!ACLMapping[tx.origin][_domain].write)
      throw;
    _;
  }

  modifier onlyReadAndWriteAuthorized(bytes32 _domain) {
    if (!ACLMapping[tx.origin][_domain].write || !ACLMapping[tx.origin][_domain].read)
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

  function addACLAddress(bytes32 _type, bytes32 _readType, bytes32 _writeType, address _address, bytes32 _domain) public {
    if (ACLAddresses.contains(_address))
      throw;
    ACLAddresses.add(_address);
    ACLMapping[_address][_domain] = ACL(false, false);
    writeEvent(_type, 'v0', 'Address', _domain, _address, 0, '', 0);

    if (_readType.length != 0)
      grantReadAccess(_readType, _domain, _address);
    if (_writeType.length != 0)
      grantWriteAccess(_writeType, _domain, _address);
  }

  function grantReadAccess(bytes32 _type, bytes32 _domain, address _address)
    public isACLAddress(_address)
  {
    if (ACLMapping[_address][_domain].read)
      throw;
    ACL storage updatedACL = ACLMapping[_address][_domain];
    updatedACL.read = true;

    writeEvent(_type, 'v0', 'Address', _domain, _address, 0, '', 0);
  }

  function revokeReadAccess(bytes32 _type, bytes32 _domain, address _address)
    public isACLAddress(_address)
  {
    if (!ACLMapping[_address][_domain].read)
      throw;
    ACL storage updatedACL = ACLMapping[_address][_domain];
    updatedACL.read = false;

    writeEvent(_type, 'v0', 'Address', _domain, _address, 0, '', 0);
  }

  function grantWriteAccess(bytes32 _type, bytes32 _domain, address _address)
    public isACLAddress(_address)
  {
    if (ACLMapping[_address][_domain].write)
      throw;
    ACL storage updatedACL = ACLMapping[_address][_domain];
    updatedACL.write = true;

    writeEvent(_type, 'v0', 'Address', _domain, _address, 0, '', 0);
  }

  function revokeWriteAccess(bytes32 _type, bytes32 _domain, address _address)
    public isACLAddress(_address)
  {
    if (!ACLMapping[_address][_domain].write)
      throw;
    ACL storage updatedACL = ACLMapping[_address][_domain];
    updatedACL.write = false;

    writeEvent(_type, 'v0', 'Address', _domain, _address, 0, '', 0);
  }

  // WRITE EVENT
  function writeEvent(bytes32 _type, bytes32 _version, bytes32 _valueType, bytes32 _domain, address _addressValue, uint _uintValue, bytes32 _bytes32Value , uint _propCount)
    public onlyWriteAuthorized(_domain)
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

  function writeEventProperty(uint _eventIndex, uint _eventPropertyIndex, bytes32 _name, bytes32 _type, bytes32 _domain, address _address, uint _uint, bytes32 _string)
    public onlyWriteAuthorized(_domain)
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
  function readEvent(bytes32 _domain, uint _eventIndex)
    public onlyReadAuthorized(_domain)
    returns (uint, bytes32, bytes32, bytes32, address, uint, bytes32, address, uint, uint)
  {
    EsEventStruct memory solidityEvent = solidityEvents[_eventIndex];
    return (solidityEvent.Id, solidityEvent.Type, solidityEvent.Version, solidityEvent.ValueType, solidityEvent.AddressValue, solidityEvent.UIntValue, solidityEvent.Bytes32Value, solidityEvent.TxOrigin, solidityEvent.Created, solidityEvent.PropertyCount);
  }

  function readEventProperty(bytes32 _domain, uint _eventIndex, uint _eventPropertyIndex)
    public onlyReadAuthorized(_domain)
    returns (uint, uint, bytes32, bytes32, address, uint, bytes32)
  {
    EsEventPropertyStruct memory prop = solidityEvents[_eventIndex].PropertyValues[_eventPropertyIndex];
    return (_eventIndex, _eventPropertyIndex, prop.Name, prop.ValueType, prop.AddressValue, prop.UIntValue, prop.Bytes32Value);
  }
}
