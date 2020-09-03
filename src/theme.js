import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  brandImage: "/brand-light-wide.png",
  typography: {
    fontFamily: ['"Work Sans"', "sans-serif"].join(","),
  },
  props: {
    MuiPaper: {
      elevation: 0,
    },
    MuiCard: {
      elevation: 0,
    },
  },
  palette: {
    darkGrey: "#484D60",
    darkBackground: "#1F2438",
    darkPaper: "#3B4260",
    green: "#44B548",
    red: "#D11818",
    yellow: "#FAD82E",
    orange: "#ff7d2b",
    primary: {
      main: "#0055AB",
    },
    secondary: {
      main: "#ff7d2b",
    },
    common: {
      white: "#ffffff",
      black: "0C153A",
    },
    type: "light",
    background: {
      default: "#f3f3f4",
      paper: "#ffffff",
    },
  },
});
