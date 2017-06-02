import React from 'react'
import { connect } from 'react-redux'

import Mercury from 'store/ethereum/mercury'

import Terminal from 'react-bash'


import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
}

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


const structure = {
  '.id_rsa': { 
    content: `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCqGKukO1De7zhZj6+H0qtjTkVxwTCpvKe4eCZ0FPqri0cb2JZfXJ/DgYSF6vUp
wmJG8wVQZKjeGcjDOL5UlsuusFncCzWBQ7RKNUSesmQRMSGkVb1/3j+skZ6UtW+5u09lHNsj6tQ5
1s1SPrCBkedbNf0Tp0GbMJDyR4e9T04ZZwIDAQABAoGAFijko56+qGyN8M0RVyaRAXz++xTqHBLh
3tx4VgMtrQ+WEgCjhoTwo23KMBAuJGSYnRmoBZM3lMfTKevIkAidPExvYCdm5dYq3XToLkkLv5L2
pIIVOFMDG+KESnAFV7l2c+cnzRMW0+b6f8mR1CJzZuxVLL6Q02fvLi55/mbSYxECQQDeAw6fiIQX
GukBI4eMZZt4nscy2o12KyYner3VpoeE+Np2q+Z3pvAMd/aNzQ/W9WaI+NRfcxUJrmfPwIGm63il
AkEAxCL5HQb2bQr4ByorcMWm/hEP2MZzROV73yF41hPsRC9m66KrheO9HPTJuo3/9s5p+sqGxOlF
L0NDt4SkosjgGwJAFklyR1uZ/wPJjj611cdBcztlPdqoxssQGnh85BzCj/u3WqBpE2vjvyyvyI5k
X6zk7S0ljKtt2jny2+00VsBerQJBAJGC1Mg5Oydo5NwD6BiROrPxGo2bpTbu/fhrT8ebHkTz2epl
U9VQQSQzY1oZMVX8i1m5WUTLPz2yLJIBQVdXqhMCQBGoiuSoSjafUhV7i1cEGpb88h5NBYZzWXGZ
37sJ5QsW+sJyoNde3xH8vdXhzU7eT82D6X/scw9RZz+/6rCJ4p0=
-----END RSA PRIVATE KEY-----` },
  'README.md': { 
    content: `
      list of commands here...
  ` },
}

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

    setTimeout(() => {
      data.push({
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
const history = [{ value: 'Welcome to the terminal!' }]

@connect(
  // Map redux state to props
  ({ web3, mercury }) => ({
    web3: web3,
    mercury: mercury
  }),
  {
    onSubmit: (bindingModel) => (dispatch) => {
      // console.log('bindingModel: ', bindingModel)
      dispatch(Mercury.createMercuryEventStore(bindingModel))
    }
  }
)
export default class TransmuteTerminal extends React.Component {
  
  state = {
    open: false,
  }

  handleOpen = () => {
    this.setState({open: true})
  }

  handleClose = () => {
    this.setState({open: false})
  }

  render() {
    const { web3, mercury, submitForm, onSubmit } = this.props

    // setTimeout(() => {
    //   let input = document.querySelector('.ReactBash input:enabled')
    //   input.value = 'transmute'
    //   // console.log()
    // }, 1 * 1000)

    return (
      <div style={{display: 'inline', paddingLeft: '16px'}}>
        <RaisedButton label='Demo' secondary={true} onTouchTap={this.handleOpen} />
        <Dialog
          title='Terminal Demo'
          actions={[
            <FlatButton
              label='Close'
              primary={true}
              onTouchTap={this.handleClose}
            />
          ]}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
          <div className='term-container'>
            <Terminal
            prefix='user'
            history={mercury.history}
            structure={structure}
            extensions={extensions}
            theme={Terminal.Themes.DARK}
            styles={styles}
            />
          </div>
          </Dialog>
        </div>

    )
  }
}
