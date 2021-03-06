import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import classes from './Navbar.scss'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  pathToJS,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import {
  PROJECTS_PATH,
  ACCOUNT_PATH,
  WEB3_PATH,
  LOGIN_PATH,
  FACTORY_PATH
} from 'constants/paths'

// Components
import AppBar from 'material-ui/AppBar'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import DownArrow from 'material-ui/svg-icons/hardware/keyboard-arrow-down'
import Avatar from 'material-ui/Avatar'

import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more'

import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'

const buttonStyle = {
  color: 'white',
  textDecoration: 'none',
  alignSelf: 'center'
}

const avatarStyles = {
  wrapper: { marginTop: 0 },
  button: { marginRight: '.5rem', width: '200px', height: '64px' },
  buttonSm: { marginRight: '.5rem', width: '30px', height: '64px', padding: '0' }
}

@firebaseConnect()
@connect(
  ({ firebase, web3 }) => ({
    authError: pathToJS(firebase, 'authError'),
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile'),
    web3: web3
  })
)
export default class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    auth: PropTypes.object,
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  handleLogout = () => {
    this.props.firebase.logout()
    this.context.router.push('/')
  }

  render() {
    let defaultAvatar = 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg'
    const { account } = this.props
    const accountExists = isLoaded(account) && !isEmpty(account)
    const iconButton = (
      <IconButton style={avatarStyles.button} disableTouchRipple>
        <div className={classes.avatar}>
          <div className='hidden-mobile'>
            <Avatar
              src={accountExists && account.avatarUrl ? account.avatarUrl : defaultAvatar}
            />
          </div>
          <div className={classes['avatar-text']}>
            <span className={`${classes['avatar-text-name']} hidden-mobile`}>
              {accountExists && account.displayName ? account.displayName : 'User'}
            </span>
            <DownArrow color='white' />
          </div>
        </div>
      </IconButton>
    )


    const mainMenu = (

       <ToolbarGroup>
        <FlatButton
          className='visible-sm'
          href='https://news.transmute.industries'
          label='News'
          style={buttonStyle}
        />
        <FlatButton
          className='visible-sm'
          href='https://framework.transmute.industries'
          label='Docs'
          style={buttonStyle}
        />
        <FlatButton
          className='visible-sm'
          href=''
          label='Source'
          style={buttonStyle}
        />
  
        <ToolbarSeparator />
          <IconMenu
            iconButtonElement={
              <IconButton touch={true}>
                <NavigationExpandMoreIcon color='white'/>
              </IconButton>
            }
          >
            <MenuItem
              primaryText='Factory'
              onTouchTap={() => this.context.router.push(FACTORY_PATH)}
            />
            <MenuItem
              primaryText='Web3'
              onTouchTap={() => this.context.router.push(WEB3_PATH)}
            />
            <MenuItem
              className='hidden-sm'
              primaryText='News'
              onTouchTap={() => window.location.href = 'https://news.transmute.industries'}
            />
            <MenuItem
              className='hidden-sm'
              primaryText='Docs'
              onTouchTap={() => window.location.href = 'https://framework.transmute.industries'}
            />
            <MenuItem
              className='hidden-sm'
              primaryText='Source'
              onTouchTap={() => window.location.href = 'https://github.com/transmute-industries/transmute-mercury'}
            />
          </IconMenu>
        </ToolbarGroup>
    )

    const rightMenu = accountExists ? (
      <IconMenu
        iconButtonElement={iconButton}
        targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        animated={false}
      >
        <MenuItem
          primaryText='Account'
          onTouchTap={() => this.context.router.push(ACCOUNT_PATH)}
        />
        <MenuItem
          primaryText='Projects'
          onTouchTap={() => this.context.router.push(PROJECTS_PATH)}
        />
        <MenuItem
          primaryText='Web3'
          onTouchTap={() => this.context.router.push(WEB3_PATH)}
        />
        <MenuItem
          primaryText='Sign out'
          onTouchTap={this.handleLogout}
        />
      </IconMenu>
    ) : mainMenu

    return (
      <AppBar
        title={
          <Link to={accountExists ? `${PROJECTS_PATH}` : '/'} className={classes.brand}>
            <img src='/transmute.logo.white.png' style={{ height: '52px' }} />
          </Link>
        }
        showMenuIconButton={false}
        iconElementRight={rightMenu}
        iconStyleRight={accountExists ? avatarStyles.wrapper : {}}
        className={classes.appBar}
      />
    )
  }
}
