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


@connect(
  ({ mercury, web3 }) => ({
    web3: web3,
    mercury: mercury
  }),
  {
      saveEvent: (contractAddress, fromAddress, event) => (dispatch) => {
       let bindingModel = {
        contractAddress: contractAddress,
        fromAddress:  fromAddress,
        event: event
      }
      dispatch(Mercury.saveEvent(bindingModel))
    },
    setStep: (step)  => (dispatch) => {
      dispatch(Mercury.setStep(step))
    }
  }
)
export default class VerticalLinearStepper extends React.Component {

  state = {
    data: [],
    finished: false,
    stepIndex: 0,
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.mercury.step){
      this.setState({
        stepIndex: nextProps.mercury.step
      })
    }
  }

  handleNext = () => {
    const {stepIndex} = this.state
    this.props.setStep(stepIndex + 1)
    this.setState({
      stepIndex: stepIndex + 1,
      finished: this.props.mercury.step === 5,
    })
  }

  saveEvent = () => {
     const { saveEvent, mercury, web3} = this.props
     saveEvent(mercury.EventStore.ContractAddress, web3.defaultAddress, mercury.events[mercury.step])
  }

  handlePrev = () => {
    const {stepIndex} = this.state
    if (stepIndex > 0) {
      this.props.setStep(stepIndex - 1)
      this.setState({stepIndex: stepIndex - 1})
    }
  }

  renderStepActions(step) {
    const {stepIndex} = this.state
  
    return (
      <div style={{margin: '12px 0', textAlign:'right'}}>
        {step > 0 && (
          <FlatButton
            label='Back'
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
        <FlatButton
          label={stepIndex === 5 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />

        {
          stepIndex !== 0 && 
          <RaisedButton
            label='Save Event'
            disableTouchRipple={true}
            disableFocusRipple={true}
            secondary={true}
            onTouchTap={ this.saveEvent }
            style={{marginRight: 12}}
            />
        }
         
      </div>
    )
  }

  render() {
    const {finished, stepIndex} = this.state
    // const stepData = this.state.data[stepIndex]
    const events = this.props.mercury.events
    return (
      <div>
        <Stepper activeStep={stepIndex} orientation='vertical'>
           
          {
            events.map((step, index) => {

              if (index === 0){
              return (
                <Step key={index}>
                <StepLabel>{step.Type}</StepLabel>
                <StepContent>
                <CreateEventStore />
                {this.renderStepActions(0)}
                </StepContent>
                </Step>
              )
              }
              return (
                <Step key={index}>
                  <StepLabel>{step.Type}</StepLabel>
                  <StepContent>
                    {/*{JSON.stringify(step)}*/}
                    <CreateEvent style={{wdith: '100%'}}/>
                    {this.renderStepActions(index + 1)}
                  </StepContent>
                </Step>
              )
            })
          }
        </Stepper>
        {finished && (
          <div style={{margin: '20px 0', textAlign: 'center'}}>
            <RaisedButton
            label='Reset'
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onTouchTap={ () =>{this.setState({stepIndex: 0, finished: false})} }
            style={{marginRight: 12}}
            />
          </div>
        )}
      </div>
    )
  }
}
