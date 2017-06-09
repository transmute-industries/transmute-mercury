import {
  teal400,
  teal800,
  teal900,
  purple400,
  purpleA100,
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
    primary1Color: teal900,
    primary2Color: teal800,
    primary3Color: teal400,
    accent1Color: purple400,
    accent2Color: purpleA100,
    accent3Color: purple400,
    textColor: grey900,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey400,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: purple400
  }
}
