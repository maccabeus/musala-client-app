import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { HEADER_HEIGHT, BASE_APP_COLOR } from "../../../configs/StyleConstants";


export const useLayoutStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    header: {
      flexGrow: 1,
      padding: theme.spacing(3),
      minWidth: '100vw',
      backgroundColor: BASE_APP_COLOR 
    },
    content: {
      display: 'grid',
      gap: 1,
      gridTemplateColumns: 'repeat(2, 1fr)',
      padding: theme.spacing(3),
      height: `calc(100vh - ${HEADER_HEIGHT}px)`,
      overflowY: "auto",
      background: theme.palette.background.paper,
      marginLeft: theme.spacing(0) + 1,
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(0) + 1,
      },
    }
  })
)