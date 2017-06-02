import React from 'react'
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import CreateEventStore from './CreateEventStore'
import CreateEvent from './CreateEvent'
import { connect } from 'react-redux'
import Mercury from 'store/ethereum/mercury'

import moment from 'moment'
import classes from './Stepper.scss'

// npm install --save react-bash (add to demo)
// https://github.com/zackargyle/react-bash

@connect(
  ({ mercury, web3 }) => ({
    web3: web3,
    mercury: mercury
  }),
  {
    saveEvent: (contractAddress, fromAddress, event) => (dispatch) => {
      let bindingModel = {
        contractAddress: contractAddress,
        fromAddress: fromAddress,
        event: event
      }
      dispatch(Mercury.saveEvent(bindingModel))
    },
    setStep: (step) => (dispatch) => {
      dispatch(Mercury.setStep(step))
    }
  }
)
export default class VerticalLinearStepper extends React.Component {

  saveEvent = () => {
    const { saveEvent, mercury, web3 } = this.props
    saveEvent(mercury.EventStore.ContractAddress, web3.defaultAddress, mercury.events[mercury.step])
  }

  handleNext = () => {
    this.props.onNextStep(
      this.props.mercury.step + 1
    )
  }

  handlePrev = () => {
    this.props.onNextStep(
      this.props.mercury.step - 1
    )
  }

  handleUserLogin = () => {
    this.props.handleUserLogin()
  }

  getStepContent(step) {
    switch (step) {
      case 0:
        return <CreateEventStore />
      default:
        return <CreateEvent />
    }
  }

  resetDemo = () => {
    this.props.onDemoReset()
  }

  render() {
    const { step, events } = this.props.mercury
    return (
      <div>
        <Stepper activeStep={step} orientation='horizontal'>
          {
            events.map((step, index) => {
              return (
                <Step key={index}>
                  <StepLabel>
                    <span className='hidden-xs hidden-sm'>{step.Type}</span>
                  </StepLabel>
                </Step>
              )
            })
          }
        </Stepper>

        {this.getStepContent(step)}

        {step === 4 && (
          <div style={{ margin: '20px 0', textAlign: 'center' }}>
            <p>
              Click here to reset the example.
                        </p>
            <RaisedButton secondary={true} type='buton' label='Reset Demo'
              onClick={(event) => {
                event.preventDefault()
                this.resetDemo()
              }}
            />
          </div>
        )}

        <div className={classes.StepperActions}>
          {
            step !== 0 &&
            <div>
              <FlatButton primary={true} type='buton' label='Reset Demo' onClick={this.resetDemo} />
              <FlatButton
                label='Back'
                disabled={step === 0}
                onTouchTap={this.handlePrev}
                style={{ marginRight: 12 }}
              />
              <RaisedButton
                label='Save Event'
                disableTouchRipple={true}
                disableFocusRipple={true}
                secondary={true}
                onTouchTap={this.saveEvent}
                style={{ marginRight: 12 }}
              />
            </div>
          }
        </div>
      </div>
    )
  }
}
