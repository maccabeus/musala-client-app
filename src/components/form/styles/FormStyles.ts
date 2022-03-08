import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { BASE_APP_COLOR_LIGHT, FORM_INPUT_MARGIN,  BASE_APP_COLOR,
   FORM_PADDING_TOP, MIN_FORM_HEIGHT,  MIN_FORM_BORDER, MIN_FORM_WIDTH, 
   FORM_FONT_SIZE } from "../../../configs/StyleConstants";

export const useFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      height: "50%",
      width: "50%",
      minWidth: MIN_FORM_WIDTH,
      minHeight: MIN_FORM_HEIGHT,
      justifyContent: "flex-start",
    },
    formHeader: {
      display: "flex",
      flexDirection: "row",
      height: FORM_PADDING_TOP,
      justifyContent: "center",
      backgroundColor: BASE_APP_COLOR,
      borderTopRightRadius:  MIN_FORM_BORDER,
      borderTopLeftRadius:  MIN_FORM_BORDER
    },
    content: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: BASE_APP_COLOR_LIGHT,
      padding: FORM_PADDING_TOP-20,
      borderBottomRightRadius:  MIN_FORM_BORDER,
      borderBottomLeftRadius:  MIN_FORM_BORDER
    },
    input: {
      height: 50,
      minWidth: 300,
      fontSize:  FORM_FONT_SIZE,
      borderRadius:  MIN_FORM_BORDER-3,
      borderColor:BASE_APP_COLOR_LIGHT,
      marginBottom:FORM_INPUT_MARGIN,
      paddingLeft:FORM_INPUT_MARGIN,
    }
  })
)