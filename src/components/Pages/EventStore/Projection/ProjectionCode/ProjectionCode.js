import React, {Component} from 'react'
import { render } from 'react-dom'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/monokai'

function onChange(newValue) {
  console.log('change',newValue)
}

import classes from './ProjectionCode.scss'


export default class ProjectionCode extends Component {
  render() {
    return (
        <div className={classes.ProjectionCodeWrapper}>
        <AceEditor
            mode='javascript'
            theme='monokai'
            onChange={onChange}
            name='ProjectionCode'
            editorProps={{$blockScrolling: true}}
            />
        </div>
    )
  }
}
