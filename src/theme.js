import {
  teal700,
  teal800,
  teal900,
  lightBlue500,
  lightBlueA100,
  grey900,
  white,
  grey400,
  darkBlack
} from 'material-ui/styles/colors'
import { fade } from 'material-ui/utils/colorManipulator'
import spacing from 'material-ui/styles/spacing'
import zIndex from 'material-ui/styles/zIndex'

export default {
  spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: teal700,
    primary2Color: teal800,
    primary3Color: teal900,
    accent1Color: lightBlue500,
    accent2Color: lightBlueA100,
    accent3Color: lightBlue500,
    textColor: grey900,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey400,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: lightBlue500
  }
}
