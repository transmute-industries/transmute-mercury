pragma solidity ^0.4.8;
import './zeppelin/lifecycle/Killable.sol';
import "./SetLib/AddressSet/AddressSetLib.sol";

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
    bool IsAuthorized;
    bytes32 PermissionDomain;
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

  modifier onlyReadAuthorized(uint _eventIndex) {
    EsEventStruct memory solidityEvent = solidityEvents[_eventIndex];
    if (solidityEvent.IsAuthorized && (!ACLAddresses.contains(tx.origin) || !ACLMapping[tx.origin][solidityEvent.PermissionDomain].read))
      throw;
    _;
  }

  modifier onlyWriteAuthorized(bool _isAuthorizedEvent, bytes32 _permissionDomain) {
    if (_isAuthorizedEvent && !ACLAddresses.contains(tx.origin))
      throw;
    _;
  }

  modifier onlyReadAndWriteAuthorized(bool _isAuthorizedEvent, bytes32 _permissionDomain) {
    if (_isAuthorizedEvent && (!ACLAddresses.contains(tx.origin) || !ACLMapping[tx.origin][_permissionDomain].write || !ACLMapping[tx.origin][_permissionDomain].read))
      throw;
    _;
  }

  modifier isACLAddress(address _ACLAddress) {
    if (!ACLAddresses.contains(_ACLAddress))
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

  function addACLAddress(bytes32 _eventType, bytes32 _readEventType, bytes32 _writeEventType, bool _isAuthorizedEvent, bytes32 _permissionDomain, address _ACLAddress)
    public
  {
    if (ACLAddresses.contains(_ACLAddress))
      throw;
    ACLAddresses.add(_ACLAddress);
    ACLMapping[_ACLAddress][_permissionDomain] = ACL(false, false);

    writeEvent(_eventType, 'v0', 'Address', _isAuthorizedEvent, _permissionDomain, _ACLAddress, 0, '', 0);

    if (_readEventType != '')
      grantReadAccess(_readEventType, _isAuthorizedEvent, _permissionDomain, _ACLAddress);
    if (_writeEventType != '')
      grantWriteAccess(_writeEventType, _isAuthorizedEvent, _permissionDomain, _ACLAddress);
  }

  function grantReadAccess(bytes32 _eventType, bool _isAuthorizedEvent, bytes32 _permissionDomain, address _ACLAddress)
    public isACLAddress(_ACLAddress)
  {
    if (ACLMapping[_ACLAddress][_permissionDomain].read)
      throw;
    ACL storage updatedACL = ACLMapping[_ACLAddress][_permissionDomain];
    updatedACL.read = true;

    writeEvent(_eventType, 'v0', 'Address', _isAuthorizedEvent, _permissionDomain, _ACLAddress, 0, '', 0);
  }

  function revokeReadAccess(bytes32 _eventType, bool _isAuthorizedEvent, bytes32 _permissionDomain, address _ACLAddress)
    public isACLAddress(_ACLAddress)
  {
    if (!ACLMapping[_ACLAddress][_permissionDomain].read)
      throw;
    ACL storage updatedACL = ACLMapping[_ACLAddress][_permissionDomain];
    updatedACL.read = false;

    writeEvent(_eventType, 'v0', 'Address', _isAuthorizedEvent, _permissionDomain, _ACLAddress, 0, '', 0);
  }

  function grantWriteAccess(bytes32 _eventType, bool _isAuthorizedEvent, bytes32 _permissionDomain, address _ACLAddress)
    public isACLAddress(_ACLAddress)
  {
    if (ACLMapping[_ACLAddress][_permissionDomain].write)
      throw;
    ACL storage updatedACL = ACLMapping[_ACLAddress][_permissionDomain];
    updatedACL.write = true;

    writeEvent(_eventType, 'v0', 'Address', _isAuthorizedEvent, _permissionDomain, _ACLAddress, 0, '', 0);
  }

  function revokeWriteAccess(bytes32 _eventType, bool _isAuthorizedEvent, bytes32 _permissionDomain, address _ACLAddress)
    public isACLAddress(_ACLAddress)
  {
    if (!ACLMapping[_ACLAddress][_permissionDomain].write)
      throw;
    ACL storage updatedACL = ACLMapping[_ACLAddress][_permissionDomain];
    updatedACL.write = false;

    writeEvent(_eventType, 'v0', 'Address', _isAuthorizedEvent, _permissionDomain, _ACLAddress, 0, '', 0);
  }

  // WRITE EVENT
  function writeEvent(bytes32 _eventType, bytes32 _version, bytes32 _valueType, bool _isAuthorizedEvent, bytes32 _permissionDomain, address _addressValue, uint _uintValue, bytes32 _bytes32Value, uint _propCount)
    onlyWriteAuthorized(_isAuthorizedEvent, _permissionDomain)
    returns (uint)
  {
    uint _created = now;

    EsEventStruct memory solidityEvent;
    solidityEvent.Id = solidityEventCount;
    solidityEvent.Type = _eventType;
    solidityEvent.Created = _created;
    solidityEvent.IsAuthorized = _isAuthorizedEvent;
    solidityEvent.PermissionDomain = _permissionDomain;
    solidityEvent.TxOrigin = tx.origin;
    solidityEvent.Version = _version;

    solidityEvent.ValueType = _valueType;
    solidityEvent.AddressValue = _addressValue;
    solidityEvent.UIntValue = _uintValue;
    solidityEvent.Bytes32Value = _bytes32Value;

    solidityEvent.PropertyCount = _propCount;
    solidityEvents[solidityEventCount] = solidityEvent;

    EsEvent(solidityEventCount, _eventType, _version, _valueType, _addressValue, _uintValue, _bytes32Value, tx.origin, _created, _propCount);
    solidityEventCount += 1;
    return solidityEventCount;
  }

  function writeEventProperty(uint _eventIndex, uint _eventPropertyIndex, bytes32 _name, bytes32 _propertyType, bool _isAuthorizedEvent, bytes32 _permissionDomain, address _address, uint _uint, bytes32 _string)
    onlyWriteAuthorized(_isAuthorizedEvent, _permissionDomain)
    returns (uint)
  {
    if(solidityEvents[_eventIndex].PropertyValues[_eventPropertyIndex].ValueType != 0){
      throw;
    }
    EsEventPropertyStruct memory solidityEventProperty;
    solidityEventProperty.Name = _name;
    solidityEventProperty.ValueType = _propertyType;
    solidityEventProperty.AddressValue = _address;
    solidityEventProperty.UIntValue = _uint;
    solidityEventProperty.Bytes32Value = _string;
    solidityEvents[_eventIndex].PropertyValues[_eventPropertyIndex] = solidityEventProperty;

    EsEventProperty(_eventIndex, _eventPropertyIndex, _name, _propertyType, _address, _uint, _string);
    return solidityEventCount;
  }

  // READ EVENT
  function readEvent(uint _eventIndex)
    public onlyReadAuthorized(_eventIndex)
    returns (uint, bytes32, bytes32, bytes32, address, uint, bytes32, address, uint, uint)
  {
    EsEventStruct memory solidityEvent = solidityEvents[_eventIndex];
    return (solidityEvent.Id, solidityEvent.Type, solidityEvent.Version, solidityEvent.ValueType, solidityEvent.AddressValue, solidityEvent.UIntValue, solidityEvent.Bytes32Value, solidityEvent.TxOrigin, solidityEvent.Created, solidityEvent.PropertyCount);
  }

  function readEventProperty(uint _eventIndex, uint _eventPropertyIndex)
    public onlyReadAuthorized(_eventIndex)
    returns (uint, uint, bytes32, bytes32, address, uint, bytes32)
  {
    EsEventPropertyStruct memory prop = solidityEvents[_eventIndex].PropertyValues[_eventPropertyIndex];
    return (_eventIndex, _eventPropertyIndex, prop.Name, prop.ValueType, prop.AddressValue, prop.UIntValue, prop.Bytes32Value);
  }
}
