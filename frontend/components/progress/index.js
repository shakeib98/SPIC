import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate(props) {
  return <CircularProgress size={30} style={props.style ? props.style : {}} />;
}
