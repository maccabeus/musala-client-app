import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export const useDeviceListViewStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {display: "flex", flexDirection: "row", justifyContent: "space-between" , flexWrap:"wrap"},
  })
)