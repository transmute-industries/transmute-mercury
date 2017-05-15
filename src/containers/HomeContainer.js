import React, { Component } from 'react'
import { connect } from 'react-redux'

import HeroRow from 'components/common/HeroRow'
import CircularProgress from 'material-ui/CircularProgress'

@connect(
  ({ web3 }) => ({
    web3: web3
  })
)
export default class Home extends Component {

  render() {
    let { web3 } = this.props

    const isLoaded = () => {
      return web3.defaultAddress !== null
    }

    const HeroContent = () => {
      if (isLoaded()) {
        return (
          <h1 style={{ textAlign: 'center' }} >
            Transmute Mercury
          </h1>
        )
      } else {
        return (
          <CircularProgress mode='indeterminate' size={80} />
        )
      }
    }

    const DefaultView = () => {
      if (isLoaded()) {
        if (web3.defaultAddress !== undefined) {
          return (
            <div>
              a
            </div>
          )
        } else {
          return (
            <div>
              b
            </div>
          )
        }
      } else {
        return (<div />)
      }
    }
    return (
      <div style={{ paddingBottom: '20px' }}>
        <HeroRow renderParticles>
          <HeroContent />
        </HeroRow>
        <DefaultView />
      </div>
    )
  }
}
