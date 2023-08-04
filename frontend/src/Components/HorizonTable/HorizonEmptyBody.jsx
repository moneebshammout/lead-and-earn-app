import { TableBody, TableRow, TableCell } from "@material-ui/core";
export const HorizonEmptyBody = ({ cellsEachRow, ...props }) => {
  return (
    <TableBody {...props}>
      {Array.from(Array(10), (e, i) => {
        return (
          <TableRow key={i} style={{ border: "none" }}>
            {Array.from(Array(cellsEachRow), () => {
              // eslint-disable-next-line react/jsx-key
              return <TableCell style={{ border: "none" }} />;
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};
