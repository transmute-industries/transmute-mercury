

export const handleEventStore = (
    command,
    createMercuryEventStore
) => {
    let newHistory = []
    console.log('parse command here...', command)
    // createMercuryEventStore({
    //     name: 'from-command-args',
    // })

    if (command.args[1] === 'create'){
        let {name, from} = command.args
        let bindingModel = {
            name: name,
            fromAddress: from
        }
        // console.log('bindingModel: ', bindingModel)

        createMercuryEventStore(bindingModel)

        newHistory.push({
            value: '🤖 eventstore created!'
        })
    }

   

    return newHistory

}