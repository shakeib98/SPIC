import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { truncateAddress } from "../../utils";

export default function ButtonAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SPIC
          </Typography>
          <Button
            onClick={props.wallet ? props.disConnectWallet : props.metamask}
            color="inherit"
          >
            {props.wallet ? truncateAddress(props.wallet) : "Connect Wallet"}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
