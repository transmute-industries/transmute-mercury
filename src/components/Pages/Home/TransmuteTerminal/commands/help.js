export default [
  { value: 'commands:' },

  { value: 'transmute help - show this menu' },
  { value: '- show this menu' },

  { value: 'transmute migrate' },
  { value: '- deploy contracts to ethereum network with truffle' },

  { value: 'transmute eventstore create --from 0x23b...' },
  { value: '- create a new event store' },

  { value: 'transmute eventstore show' },
  { value: '- show the current event store read model' },

  { value: `transmute eventstore write --from 0x23b... --event { type: '...', payload: {...} }` },
  { value: `- write and display a transmute event` },
  
]