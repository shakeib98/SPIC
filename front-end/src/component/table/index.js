import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable(props) {
    console.log('table -->',props.data)
  return (
    <TableContainer component={Paper} style={{marginBottom:"20px"}} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {props.data && Object.keys(props?.data[0]).map((data) => {
              return <TableCell align="center">{data}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.data?.map((row, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {Object.keys(props?.data[0]).map((data) => {
                return (
                  <TableCell align="center" component="th" scope="row">
                    {row[data]}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
