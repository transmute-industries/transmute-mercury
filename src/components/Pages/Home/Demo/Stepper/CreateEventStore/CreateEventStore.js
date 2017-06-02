import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import { CREATE_EVENT_STORE_FORM_NAME } from 'constants/formNames'

import Mercury from 'store/ethereum/mercury'
import CreateEventStoreForm from './CreateEventStoreForm'
import Terminal from 'react-bash'

const styles = {
  borderRadius: '5px',
  display: 'flex',
  flexDirection: 'column',
  fontFamily: '\'Inconsolata\', monospace',
  fontSize: '13px',
  fontWeight: '400',
  // height: '100%',
  overflow: 'hidden',
  textAlign: 'left',
  prefix: {
    color: '#29B6F6',
    paddingRight: '4px'
  },
  // body: {
  //   color: '#bd081c',
  //   // backgroundColor: '#fff'
  // },
  // header: {
  //   // backgroundColor: '#eee',
  // }
}

@connect(
  // Map redux state to props
  ({ web3 }) => ({
    web3: web3
  }),
  {
    // action for submitting redux-form
    submitForm: () => (dispatch) => dispatch(submit(CREATE_EVENT_STORE_FORM_NAME)),
    onSubmit: (bindingModel) => (dispatch) => {
      // console.log('bindingModel: ', bindingModel)
      dispatch(Mercury.createMercuryEventStore(bindingModel))
    }
  }
)
export default class CreateEventSchemaStep extends React.Component {
  render() {
    const { web3, submitForm, onSubmit } = this.props

    const history = [{ value: 'Welcome to the terminal!' }]

    const clear = {
      exec: ({ structure, history, cwd }, command) => {
        return { structure, cwd, history: [] }
      }
    }

    const transmute = {
      exec: ({ structure, history, cwd }, command) => {
        let data = history.concat([
          {
            value: 'cute emojis here..'
          },
          {
            value: 'cute emojis here..'
          },
          {
            value: 'cute emojis here..'
          },
        ])

        setTimeout(()=>{
          data.push( {
          value: 'cute emojis here..'
          })
        }, 500)
        // dispatch command here...
        // onSubmit({
        //   name: 'cmd-line-demo'
        // })
        return { structure, cwd, history: data }
      }
    }

    const extensions = { clear, transmute }

    setTimeout(()=>{
      let input = document.querySelector(".ReactBash input:enabled")
      input.value = 'transmute'
      // console.log()
    }, 1 * 1000)

    const structure = {
      src: {
        file1: { content: 'This is the text content for <file1> of <src>' },
        file2: { content: 'This is the text content for <file2> of <src>' },
        childDir1: {
          file: { content: 'This is the text content for <file> of <src/childDir1>' },
        },
        childDir2: {
        }
      },
      '.hiddenDir': {
      },
      '.hiddenFile': { content: 'This is a hidden file' },
      file: { content: 'This is the text content for <file> of the root directory' },
    }
    return (
      <div className='term-container'>
        <Terminal
          prefix='user'
          history={history}
          structure={structure}
          extensions={extensions}
          theme={Terminal.Themes.DARK}
          styles={styles}
        />
      </div>
    )
  }
}

{/*<CreateEventStoreForm
  web3={web3}
  submitForm={submitForm}
  onSubmit={onSubmit}
/>*/}

/*
   
*/
