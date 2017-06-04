

export const handleEventStore = (
    command,
    createEventStore
) => {
    let newHistory = []
    console.log('parse command here...', command)
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



    return newHistory

}