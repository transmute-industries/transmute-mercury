import React, {Component} from 'react'
import { render } from 'react-dom'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/json'
import 'brace/theme/monokai'

function onChange(newValue) {
  console.log('change',newValue)
}

import classes from './TokenCode.scss'

let tokenCode = `
{
  "iss": "transmute.industries",
  "exp": 1300819380,
  "transmute.industries.name": "Bob Ross",
  "transmute.industries.admin": true
}
`


export default class TokenCode extends Component {
  render() {
    return (
        <div className={classes.TokenCode}>
        <AceEditor
            mode='json'
            theme='monokai'
            onChange={onChange}
            name='TokenCode'
            value={tokenCode}
            editorProps={{$blockScrolling: true}}
            />
        </div>
    )
  }
}
