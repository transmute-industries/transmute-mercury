pragma solidity ^0.4.8;
import "./TransmuteFramework/EventStore.sol";
import './TransmuteFramework/zeppelin/lifecycle/Killable.sol';
import "./TransmuteFramework/Utils/StringUtils.sol";

contract FaucetEventStore is EventStore {

  bytes32 Domain = 'Faucet';

  // CONSTRUCTOR
  function () payable {}
  function FaucetEventStore() payable {
    creator = tx.origin;
    ACLAddresses.add(creator);
    ACLMapping[creator][Domain] = ACL({read:true, write:true});
  }

  // VERSION
  function getVersion() public constant
    returns (uint)
  {
    return 1;
  }

  // ACCESS CONTROL
  function getRequestorAddresses() constant
    returns (address[])
  {
    return ACLAddresses.values;
  }

  function addRequestorAddress(address _address) public {
    addACLAddress('FAUCET_WRITE_ACCESS_REQUESTED', 'FAUCET_READ_ACCESS_GRANTED', '', _address, Domain);
  }

  function grantFaucetWriteAccess(address _address)
    public onlyCreator
  {
    grantWriteAccess('FAUCET_WRITE_ACCESS_GRANTED', Domain, _address);
  }

  function revokeFaucetWriteAccess(address _address)
    public onlyCreator
  {
    revokeWriteAccess('FAUCET_WRITE_ACCESS_REVOKED', Domain, _address);
  }

  function grantFaucetReadAccess(address _address)
    public onlyCreator
  {
    grantWriteAccess('FAUCET_WRITE_ACCESS_GRANTED', Domain, _address);
  }

  function revokeFaucetReadAccess(address _address)
    public onlyCreator
  {
    revokeWriteAccess('FAUCET_WRITE_ACCESS_REVOKED', Domain, _address);
  }
}
