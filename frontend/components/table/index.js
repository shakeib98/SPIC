import * as React from "react";
import {TableContainer, Table, Thead, Tr, Th, Td, Tbody} from "@chakra-ui/react"
import format from "date-fns/format";
import { parseISO } from "date-fns";

export default function BasicTable(props) {
  // debugger
  console.log("table ---",props)
  return (
    <TableContainer component={Paper} style={{ marginBottom: "20px" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <Thead>
          <Tr>
            {props.data &&
              Object.keys(props.data[0]).map((data, i) => {
                return (
                  <Th key={i} align="center">
                    {data}
                  </Th>
                );
              })}
          </Tr>
        </Thead>
        {props.data && (
          <Tbody>
            {
              props?.data?.map((row, i) => (
                <Tr
                  key={i}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {props.data &&
                    Object.keys(props.data[0]).map((data, i) => {
                      return (
                        <Td
                          key={i}
                          align="center"
                          component="th"
                          scope="row"
                        >
                          {Object.keys(props.data[0]).includes("To") ? format(parseISO(row[data]), "MM/dd/yyyy") : row[data]}
                        </Td>
                      );
                    })}
                </Tr>
              ))}
          </Tbody>
        )}
      </Table>
    </TableContainer>
  );
}
