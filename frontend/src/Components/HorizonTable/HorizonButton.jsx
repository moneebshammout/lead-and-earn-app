import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const brandColors = {
  primary: '#415464',
  secondary: '#B4B865',
  blueGrey: '#7B98AC',
  maroon: '#5A2D3F',
  grey: '#707271',
};

const useStyles = makeStyles(theme => ({
  primaryButton: {
    background: "#1779ba",
    "&:hover": {
      background: "#126195"
    }
  },
  secondaryButton: {
    background: brandColors.secondary,
    "&:hover": {
      background: "#989c54"
    }
  }
}));

export const HorizonButton = ({ children, ...props }) => {
  const classes = useStyles();

  return (
    <Button
      {...props}
      variant="contained"
      className={
        props.color === "primary"
          ? classes.primaryButton
          : classes.secondaryButton
      }
    >
      {children}
    </Button>
  );
};
