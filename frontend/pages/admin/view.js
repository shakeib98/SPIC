import { Box, Button, TextField } from "@mui/material";
import Container from "../../components/container";
import Table from "../../components/table";
import Dialog from "../../components/Dialog";

function View(props) {
  console.log("admin --->", props);
  const propsData = {
    title: "Add Contributers",
    open: props.contributerModal,
    handleClose: props.onContributorToggle,
    handleSubmit: props.addContributers,
    loader: props.loader
  };

  const addresses = props.contributerAddress.map((el, i) => {
    return (
      <TextField
        key={i}
        style={{ width: "400px", marginTop: "10px" }}
        name={el.address}
        value={el.address}
        id={el.address}
        label="Contributer Address"
        variant="outlined"
        onChange={(e) => props?.onChange(e, i)}
      />
    );
  });
  return (
    <>
      {props.isConnected && (
        <Container {...props}>
          <Box
            sx={{
              backgroundColor: "#eef3ed",
              padding: "0px 20px",
              borderRadius: 2,
              marginTop: 5,
              paddingBottom: 2,
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1 style={{ display: "inline-block" }}>
                {props?.circleData?.user?.circleName} Circle
              </h1>
              <div style={{ display: "inline-block", marginTop: 25 }}>
                {/* <Button style={{ marginRight: 10 }} variant="outlined">
                      Create Epoch
                    </Button> */}
                <Button variant="outlined" onClick={props.onContributorToggle}>
                  Add Contributer
                </Button>
              </div>
            </div>
            <div>
              <h4>Epoch Details</h4>
              {props?.table?.epoch ? (
                <Table data={[props?.table?.epoch]} />
              ) : (
                <p
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    textAlign: "center",
                  }}
                >
                  No Epoch Created
                </p>
              )}
            </div>
            <div>
              <h4>Contributor Details</h4>
              {console.log("table before ---",props?.table?.users)}
              {props?.table?.users ? (
                <Table data={props?.table?.users} />
              ) : (
                ""
              )}
            </div>
            <Dialog {...propsData}>
              <p style={{ fontSize: "small", marginTop: "0px" }}>
                Add the contributors in circle by giving their addresses below.
                Notice that you can not add more than 4 contributors in a
                circle.
              </p>
              <div>{addresses}</div>
              <Button
                style={{ marginTop: 10 }}
                variant="outlined"
                onClick={props.onAddField}
              >
                + More
              </Button>
            </Dialog>
          </Box>
        </Container>
      )}
    </>
  );
}

export default View;
