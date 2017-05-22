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
import CreateUser from './CreateUser'
import CreateEncounter from './CreateEncounter'
import LinkEncounter from './LinkEncounter'
import AuthorizeEncounter from './AuthorizeEncounter'

class VerticalLinearStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
  }

  handleNext = () => {
    const {stepIndex} = this.state
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    })
  }

  handlePrev = () => {
    const {stepIndex} = this.state
    if (stepIndex > 0) {
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
        <RaisedButton
          label={stepIndex === 4 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
      </div>
    )
  }

  render() {
    const {finished, stepIndex} = this.state

    return (
      <div>
        <Stepper activeStep={stepIndex} orientation='vertical'>
          <Step>
            <StepLabel>Create Event Store</StepLabel>
            <StepContent>
            <CreateEventStore />
            {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Create User</StepLabel>
            <StepContent>
            <CreateUser />
            {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Create Encounter</StepLabel>
            <StepContent>
            <CreateEncounter />
            {this.renderStepActions(2)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Link Encounter</StepLabel>
            <StepContent>
            <LinkEncounter />
            {this.renderStepActions(3)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Authorize Encounter</StepLabel>
            <StepContent>
            <AuthorizeEncounter />
            {this.renderStepActions(4)}
            </StepContent>
          </Step>
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

export default VerticalLinearStepper
