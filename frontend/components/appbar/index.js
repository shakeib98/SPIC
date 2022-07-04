import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ConnectButton from "../Account";

export default function ButtonAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">
              <span style={{ cursor: "pointer" }}>SPIC</span>
            </Link>
          </Typography>
          <ConnectButton {...props} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
