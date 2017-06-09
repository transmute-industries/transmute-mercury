

import help from './help'
import migrate from './migrate'

import { handleEventStore } from './eventStore'

export default (mercury, actions) => {

    // console.log('mercuryState: ', mercuryState)
    // console.log('createEventStore: ', createEventStore)

    const transmute = {
        exec: ({ structure, history, cwd }, command) => {
            let data = []

            if (command.args) {
                if (command.args[0] === 'help') {
                    data = help
                }
                if (command.args[0] === 'migrate') {
                    data = migrate
                }
                if (command.args[0] === 'eventstore') {
                    data = handleEventStore(command, mercury, actions)
                    // console.log('data: ', data)
                }
            }
            return { structure, cwd, history: history.concat(data) }
        }
    }

    return {
        transmute
    }
}

