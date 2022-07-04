import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import format from "date-fns/format";
import { parseISO } from "date-fns";

export default function BasicTable(props) {
  // debugger
  console.log("table ---",props)
  return (
    <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {props.data &&
              Object.keys(props.data[0]).map((data, i) => {
                return (
                  <TableCell key={i} align="center">
                    {data}
                  </TableCell>
                );
              })}
          </TableRow>
        </TableHead>
        {props.data && (
          <TableBody>
            {
              props?.data?.map((row, i) => (
                <TableRow
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {props.data &&
                    Object.keys(props.data[0]).map((data, i) => {
                      return (
                        <TableCell
                          key={i}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {Object.keys(props.data[0]).includes("To") ? format(parseISO(row[data]), "MM/dd/yyyy") : row[data]}
                        </TableCell>
                      );
                    })}
                </TableRow>
              ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
