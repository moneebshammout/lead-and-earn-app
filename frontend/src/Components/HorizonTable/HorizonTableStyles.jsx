import { withStyles } from '@material-ui/core';
import { TableRow, TableCell } from '@material-ui/core';

const brandColors = {
  primary: '#415464',
  secondary: '#B4B865',
  blueGrey: '#7B98AC',
  maroon: '#5A2D3F',
  grey: '#707271',
};

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontSize: 18,
    fontWeight: 700,
    color: theme.palette.common.white,
    borderRight: `2px solid #F3F3F3`,
    background: brandColors.primary,
  },
  body: {
    fontSize: 16,
    fontWeight: 550,
    borderRight: '2px solid #F3F3F3',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: 'lightgrey',
      '&:hover': {
        backgroundColor: brandColors.blueGrey,
      },
    },
    '&:nth-of-type(even)': {
      backgroundColor: 'white',
      '&:hover': {
        backgroundColor: brandColors.blueGrey,
      },
    },
  },
}))(TableRow);

export { StyledTableCell, StyledTableRow };
