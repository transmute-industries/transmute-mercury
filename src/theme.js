import {
  blue500,
  blue700,
  deepOrange500,
  deepOrangeA100,
  lightBlue500,
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
    primary1Color: blue500,
    primary2Color: blue700,
    primary3Color: blue500,
    accent1Color: deepOrange500,
    accent2Color: deepOrangeA100,
    accent3Color: deepOrange500,
    textColor: grey900,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey400,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: deepOrange500
  }
}
