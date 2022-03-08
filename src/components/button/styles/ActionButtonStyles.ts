import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { BASE_APP_COLOR_WHITE, BASE_APP_COLOR_YELLOW} from "../../../configs/StyleConstants";

export const useActionButtonStyles = makeStyles((theme: Theme) =>
  createStyles({
    round: {
      borderRadius: "100%",
      backgroundColor: BASE_APP_COLOR_YELLOW,
      width: 60,
      height: 60,
      fontSize: 30,
      color: BASE_APP_COLOR_WHITE,
      border: "none"
    }
  })
)