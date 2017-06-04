

export const handleEventStore = (
    command,
    mercury,
    actions
) => {
    let newHistory = []
    console.log('command: ', command)
    console.log('mercury: ', mercury)

    if (command.args[1] === 'create') {
        let { from } = command.args
        let bindingModel = {
            fromAddress: from
        }
        // console.log('bindingModel: ', bindingModel)
        actions.createEventStore(bindingModel)
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
    }

    if (command.args[1] === 'write') {
        // magically read state here...
        let { event, from } = command.args
        let bindingModel = {
            event: JSON.parse(event), 
            // this is super unsafe... like terrible...
            fromAddress: from,
            contractAddress: mercury.eventStoreAddress

        }
        console.log('bindingModel: ', bindingModel)
        actions.writeEvent(bindingModel)
    }
    newHistory.push({
        value: '🤖 completed...'
    })
    return newHistory
}