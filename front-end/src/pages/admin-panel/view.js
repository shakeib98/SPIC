import { Box, Button, TextField } from "@mui/material";
import Container from "../../component/container";
import Table from "../../component/table";
import Dialog from "../../component/Dialog";
import { walletContext } from "../../utils";

function View(props) {
  console.log("admin --->", props);
  return (
    <>
      <walletContext.Consumer>
        {(wallet) =>
          wallet && (
            <Container {...props}>
              <Box
                sx={{
                  backgroundColor: "#eef3ed",
                  padding: "0px 20px",
                  borderRadius: 2,
                  marginTop: 5,
                  paddingBottom: 2,
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h1 style={{ display: "inline-block" }}>
                    {props?.circleData?.user?.circleName}{" "}
                    Circle
                  </h1>
                  <div style={{ display: "inline-block", marginTop: 25 }}>
                    {/* <Button style={{ marginRight: 10 }} variant="outlined">
                      Create Epoch
                    </Button> */}
                    <Button variant="outlined">Add Contributer</Button>
                  </div>
                </div>
                <div>
                  <h4>Epoch Details</h4>
                  {props?.table?.epoch ? <Table data={[props?.table?.epoch]} /> : <p
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      textAlign: "center",
                    }}
                  >
                    No Epoch Created
                  </p>}
                </div>
                <div>
                  <h4>Contributor Details</h4>
                  <Table data={[props?.table?.users ? props?.table?.users : ""]} />
                </div>
                <Dialog title="Add Contributer" >
                  <TextField
                    style={{ width: "40%" }}
                    name="name"
                    // value={props?.userData.name}
                    id="Username"
                    label="Username"
                    variant="outlined"
                    // onChange={props?.onChange}
                  />
                  <TextField
                    style={{ width: "40%" }}
                    name="name"
                    // value={props?.userData.name}
                    id="Username"
                    label="Username"
                    variant="outlined"
                    // onChange={props?.onChange}
                  />
                </Dialog>
              </Box>
            </Container>
          )
        }
      </walletContext.Consumer>
    </>
  );
}

export default View;
