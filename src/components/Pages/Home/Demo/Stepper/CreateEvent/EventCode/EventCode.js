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
export default class EventCode extends Component {

    state = {
        defaultCode:  JSON.stringify(this.props.mercury.events[this.props.mercury.step],  null, "\t")
    }

    componentWillReceiveProps(nextProps){
      let event_code = nextProps.mercury.events[nextProps.mercury.step]
      console.log('events: ', JSON.stringify(nextProps.mercury.events))
      console.log('can has the correct event code...', event_code)
      this.setState({
        defaultCode:  JSON.stringify(event_code,  null, "\t")
      })
    }

  render() {
    return (
        <AceEditor
            mode='json'
            theme='monokai'
            onChange={onChange}
            name='EventCode'
            width={'500px'}
            height={'400px'}
            value={this.state.defaultCode}
            editorProps={{$blockScrolling: true}}
            />
    )
  }
}
