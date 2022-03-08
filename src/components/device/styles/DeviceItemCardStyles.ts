import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {BASE_APP_COLOR_WHITE, MIN_DEVICE_CARD_PADDING,  DEVICE_CARD_MARGIN,  
  MIN_DEVICE_CARD_WIDTH, MIN_DEVICE_CARD_HEIGHT, BASE_APP_COLOR_YELLOW, BASE_APP_COLOR_LIGHT, 
  DEVICE_CARD_BORDER_RADIUS, BASE_APP_COLOR } from "../../../configs/StyleConstants";

export const useDeviceItemCardStyles = makeStyles((theme: Theme) =>
  createStyles({
    yellowCard: {
      display:"flex",
      flexDirection:"row",
      height: MIN_DEVICE_CARD_HEIGHT,
      padding:MIN_DEVICE_CARD_PADDING,
      borderRadius: DEVICE_CARD_BORDER_RADIUS,
      marginBottom: DEVICE_CARD_MARGIN,
      width:MIN_DEVICE_CARD_WIDTH,

      color: BASE_APP_COLOR_WHITE,
      backgroundColor:BASE_APP_COLOR_YELLOW,
    },
    baseCard: {
      display:"flex",
      flexDirection:"row",
      height: MIN_DEVICE_CARD_HEIGHT,
      padding:MIN_DEVICE_CARD_PADDING,
      borderRadius: DEVICE_CARD_BORDER_RADIUS,
      marginBottom: DEVICE_CARD_MARGIN,
      width:MIN_DEVICE_CARD_WIDTH,

      backgroundColor:BASE_APP_COLOR,
      color: BASE_APP_COLOR_WHITE,

    },
    lightCard: {
      display:"flex",
      flexDirection:"row",
      height: MIN_DEVICE_CARD_HEIGHT,
      padding:MIN_DEVICE_CARD_PADDING,
      borderRadius: DEVICE_CARD_BORDER_RADIUS,
      marginBottom: DEVICE_CARD_MARGIN,
      width:MIN_DEVICE_CARD_WIDTH,

      color: BASE_APP_COLOR,
      backgroundColor:BASE_APP_COLOR_LIGHT,
    },

    contentArea: {
      padding:MIN_DEVICE_CARD_PADDING,
      borderRadius: DEVICE_CARD_BORDER_RADIUS
    },
    cardLabel: {
      margin:10,
      paddingBottom: 5
    },

    icon: {
      cursor: "pointer",
      opacity:0.8
    },
  })
)