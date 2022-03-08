import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useCustomModalStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }
  })
)