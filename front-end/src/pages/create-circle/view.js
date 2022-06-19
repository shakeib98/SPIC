import { Box, Button, TextField } from "@mui/material";
import Container from "../../component/container";
import DatePicker from "../../component/date-picker"
import { walletContext } from "../../utils";

function View(props) {
  return (
    <>
      <walletContext.Consumer>
        {(wallet) =>
          wallet && (
            <Container {...props}>
              <h1 style={{ textAlign: "center" }}>Create a Circle</h1>
              <p style={{ textAlign: "center" }}>
                SPIC circles allow you to collectively reward circle members
                through equitable and transparent payments. To start a circle,
                we need just a bit of information.
              </p>
              <h4>Basic Information</h4>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "20px 0px",
                }}
              >
                <TextField
                  value={wallet}
                  style={{ width: "40%" }}
                  name="address"
                  id="ETH Address"
                  label="ETH Address"
                  variant="outlined"
                  disabled
                  onChange={props?.onChange}
                />
                <TextField
                  style={{ width: "40%" }}
                  value={props?.userData?.circleName}
                  id="Circle Name"
                  label="Circle Name"
                  name="circleName"
                  variant="outlined"
                  onChange={props?.onChange}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  // justifyContent: "space-around",
                  padding: "20px 40px",
                }}
              >
                <TextField
                  style={{ width: "45%" }}
                  id="Organization Name"
                  value={props?.userData?.organizationName}
                  label="Organization Name"
                  name="organizationName"
                  variant="outlined"
                  onChange={props?.onChange}
                />
              </Box>
              <h4>Epoch Information</h4>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  padding: "20px 0px",
                }}
              >
                <DatePicker
                  style={{ width: "40%" }}
                  name="from"
                  value={props?.epoch.from}
                  id="from"
                  label="Epoch from"
                  variant="outlined"
                  onChange={props?.onDateChange}
                />
                <DatePicker
                  style={{ width: "40%" }}
                  name="to"
                  value={props?.epoch.to}
                  id="to"
                  label="Epoch to"
                  variant="outlined"
                  onChange={props?.onDateChange}
                />
              </Box>
              <div style={{ textAlign: "center", paddingTop: 30 }}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={props?.onLaunchCircleClick}
                >
                  Launch this Circle
                </Button>
              </div>
            </Container>
          )
        }
      </walletContext.Consumer>
    </>
  );
}

export default View;
