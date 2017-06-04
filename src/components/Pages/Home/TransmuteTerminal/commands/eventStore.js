

export const handleEventStore = (
    command,
    mercury,
    createEventStore
) => {
    let newHistory = []
    console.log('command: ', command)
    console.log('mercury: ', mercury)
    // createEventStore({
    //     name: 'from-command-args',
    // })

    if (command.args[1] === 'create') {
        let { from } = command.args
        let bindingModel = {
            fromAddress: from
        }
        // console.log('bindingModel: ', bindingModel)

        createEventStore(bindingModel)

        newHistory.push({
            value: '🤖 eventstore created!'
        })
    }

    if (command.args[1] === 'show') {
        // magically read state here...
        let asString = JSON.stringify(mercury.EventStore,  null, "\t")
        let asLines = asString.split('\n')
        let asValues = asLines.map((line) =>{
            return {
                value: line
            }
        })
        newHistory = newHistory.concat(asValues)
        newHistory.push({
            value: '🤖 completed...'
        })
    }
    return newHistory
}