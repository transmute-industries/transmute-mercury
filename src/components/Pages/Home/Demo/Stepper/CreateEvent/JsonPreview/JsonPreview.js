import React, {Component} from 'react'
import { render } from 'react-dom'
import brace from 'brace'
import AceEditor from 'react-ace'

import 'brace/mode/json'
import 'brace/theme/monokai'

function onChange(newValue) {
  console.log('change',newValue)
}

import { connect } from 'react-redux'

@connect(
  ({ mercury }) => ({
    mercury
  }),
  {
  }
)
export default class JsonPreview extends Component {

    state = {
        defaultCode: JSON.stringify(this.props.mercury.EventStore,  null, "\t")
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        defaultCode: JSON.stringify(nextProps.mercury.EventStore,  null, "\t")
      })
    }
  render() {
    return (
        <AceEditor
            mode='json'
            theme='monokai'
            onChange={onChange}
            name='JsonPreview'
            value={this.state.defaultCode}
            width={'500px'}
            height={'400px'}
            editorProps={{$blockScrolling: true}}
            />
    )
  }
}
