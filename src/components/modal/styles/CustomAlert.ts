import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useCustomAlertStyles = makeStyles((theme: Theme) =>
  createStyles({
    alert: {position:"fixed", right:100, top:15, width:"50%", borderRadius:10}
  })
)