import React, { Component } from 'react'
import { connect } from 'react-redux'

import HeroRow from 'components/common/HeroRow'
import CircularProgress from 'material-ui/CircularProgress'
import Stepper from './Stepper'
import TransmuteTerminal from './TransmuteTerminal'

@connect(
  ({ web3 }) => ({
    web3: web3
  })
)
export default class HomePage extends Component {

  render() {
    let { web3 } = this.props

    const isLoaded = () => {
      return web3.defaultAddress !== null
    }

    const HeroContent = () => {
      if (isLoaded()) {
        return (
          <div style={{ textAlign: 'center' }}>
            <h1>Mercury</h1>
            <h3> Event Sourcing Blockchain</h3>
            {/*<h4>{web3.defaultAddress}</h4>*/}
          </div>
        )
      } else {
        return (
          <CircularProgress mode='indeterminate' size={80} />
        )
      }
    }
    return (
      <div style={{ paddingBottom: '20px' }}>
        <HeroRow renderParticles>
          <HeroContent />
        </HeroRow>
        {/*<Stepper />*/}
        <TransmuteTerminal />
      </div>
    )
  }
}
