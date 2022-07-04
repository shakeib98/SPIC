import { Box, Button, TextField } from "@mui/material";
import Container from "../../components/container";
import DatePicker from "../../components/date-picker";
import Loader from "../../components/progress";

function View(props) {
  return (
    <>
      {props.isConnected && (
        <Container {...props}>
          <h1 style={{ textAlign: "center" }}>Create a Circle</h1>
          <p style={{ textAlign: "center" }}>
            SPIC circles allow you to collectively reward circle members through
            equitable and transparent payments. To start a circle, we need just
            a bit of information.
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
              value={props.account}
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
              justifyContent: "space-around",
              padding: "20px 0px",
            }}
          >
            <TextField
              style={{ width: "40%" }}
              id="Organization Name"
              value={props?.userData?.organizationName}
              label="Organization Name"
              name="organizationName"
              variant="outlined"
              onChange={props?.onChange}
            />
            <TextField
              style={{ width: "40%" }}
              value={props?.userData?.nft}
              id="nft"
              label="NFT Address"
              name="nft"
              variant="outlined"
              onChange={props?.onChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              padding: "20px 0px",
            }}
          >
            <TextField
              style={{ width: "40%" }}
              value={props?.userData?.erc20}
              id="erc20"
              label="ERC20 Address"
              name="erc20"
              variant="outlined"
              onChange={props?.onChange}
            />
            <TextField
              style={{ width: "40%" }}
              value={props?.userData?.erc20Amount}
              id="erc20Amount"
              label="ERC20 Amount"
              name="erc20Amount"
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
              value={props?.userData?.incentive}
              id="incentive"
              label="Voter Incentive %"
              name="incentive"
              variant="outlined"
              type="number"
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
              disabled={true}
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
          <div
            style={{ textAlign: "center", paddingTop: 30, paddingBottom: 30 }}
          >
            {props.loader ? (
              <Loader />
            ) : (
              <Button
                size="large"
                variant="contained"
                onClick={props?.onLaunchCircleClick}
              >
                Launch this Circle
              </Button>
            )}
          </div>
        </Container>
      )}
    </>
  );
}

export default View;
