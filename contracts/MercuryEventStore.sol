pragma solidity ^0.4.8;
import './TransmuteFramework/zeppelin/lifecycle/Killable.sol';
import "./TransmuteFramework/EventStore.sol";
import "./TransmuteFramework/SetLib/AddressSet/AddressSetLib.sol";

contract MercuryEventStore is EventStore {
    using AddressSetLib for AddressSetLib.AddressSet;

    string public name;

    function () payable {}
    function MercuryEventStore(string _name) payable {
        name = _name;
        uint eventIndex = solidityEventCount;
        writeSolidityEvent('MERCURY_EVENT_STORE_CREATED', 1, 'NO_INTEGRITY_HASH');
        writeSolidityEventProperty(eventIndex, 0, 'Name', 'String', address(tx.origin), 0, _name);
    }
}
