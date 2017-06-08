pragma solidity ^0.4.8;
import "./TransmuteFramework/EventStore.sol";
import "./TransmuteFramework/SetLib/AddressSet/AddressSetLib.sol";

contract Faucet is EventStore {

  bytes32 FaucetDomain = 'FAUCET';

  // CONSTRUCTOR
  function () payable {}
  function Faucet() payable {
    creator = tx.origin;
    addACLAddress('FAUCET_WRITE_REQUESTED', 'FAUCET_READ_GRANTED', 'FAUCET_WRITE_GRANTED', false, FaucetDomain, creator);
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

  function addRequestorAddress(address _requestorAddress) public {
    addACLAddress('FAUCET_WRITE_REQUESTED', 'FAUCET_READ_GRANTED', '', false, FaucetDomain, _requestorAddress);
  }

  function grantFaucetWriteAccess(address _requestorAddress)
    public onlyCreator
  {
    grantWriteAccess('FAUCET_WRITE_GRANTED', true, FaucetDomain, _requestorAddress);
  }

  function revokeFaucetWriteAccess(address _requestorAddress)
    public onlyCreator
  {
    revokeWriteAccess('FAUCET_WRITE_REVOKED', true, FaucetDomain, _requestorAddress);
  }

  function grantFaucetReadAccess(address _requestorAddress)
    public onlyCreator
  {
    grantReadAccess('FAUCET_READ_GRANTED', true, FaucetDomain, _requestorAddress);
  }

  function revokeFaucetReadAccess(address _requestorAddress)
    public onlyCreator
  {
    revokeReadAccess('FAUCET_READ_REVOKED', true, FaucetDomain, _requestorAddress);
  }
}
