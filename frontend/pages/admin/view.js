import {
  Box,
  Button,
  Input,
  Container,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import Table from "../../components/table";
import Dialog from "../../components/Dialog";
import { capitalizeFirstLetter, shortenHex } from "../../util";
import { format } from "date-fns";

function View(props) {
  console.log("admin --->", props);
  const propsData = {
    title: "Add Contributors",
    open: props.contributerModal,
    handleClose: props.onContributorToggle,
    handleSubmit: props.addContributers,
    loader: props.loader,
  };

  function mapAddresses() {
    return props.contributerAddress?.map((el, i) => {
      return (
        <Input
          key={i}
          style={{ width: "400px", marginTop: "10px" }}
          name={el.address}
          value={el.address}
          id={el.address}
          placeholder="Contributor Address"
          onChange={(e) => {
            console.log("itsss --", i);
            props.onChange(e, i);
          }}
        />
      );
    });
  }
  return (
    <>
      {props.isConnected && (
        <Container {...props}>
          <Stack>
            <Heading
              _light={{
                color: "brand.600",
              }}
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wide"
              mb={4}
              mt={10}
              textAlign="center"
            >
              Manage Circle
            </Heading>
            <Text>
              Here you can see details of the circle and manage the contributors
              in the circle. You can add upto 4 contributors in the circle.
            </Text>
          </Stack>
          <Stack>
            <Heading
              _light={{
                color: "brand.600",
              }}
              fontWeight="semibold"
              // textTransform="uppercase"
              letterSpacing="wide"
              // mb={4}
              mt={10}
              textAlign="center"
            >
              Basic Information
            </Heading>
            <Box
              style={{ margin: "20px 0px 20px 0px" }}
              p={5}
              shadow="lg"
              borderWidth="1px"
              borderRadius={5}
            >
              <Stack direction={"row"}>
                <Text fontWeight={"bold"}>Circle Name:</Text>
                <Text>{capitalizeFirstLetter(props.circleData?.name)}</Text>
              </Stack>
              <Stack direction={"row"}>
                <Text fontWeight={"bold"}>Organization Name:</Text>
                <Text>
                  {capitalizeFirstLetter(props.circleData?.organizationName)}
                </Text>
              </Stack>
              <Stack direction={"row"}>
                <Text fontWeight={"bold"}>Token Address:</Text>
                <Text noOfLines={1} >
                  {props.circleData?.erc20Address &&
                    shortenHex(props.circleData.erc20Address)}
                </Text>
              </Stack>
              <Stack direction={"row"}>
                <Text fontWeight={"bold"}>NFT Address:</Text>
                <Text>
                  {props.circleData?.erc721Address &&
                    shortenHex(props.circleData.erc721Address)}
                </Text>
              </Stack>
              <Stack direction={"row"}>
                <Text fontWeight={"bold"}>Token Amount:</Text>
                <Text>{props.circleData.erc20Amount}</Text>
              </Stack>{" "}
              <Stack direction={"row"}>
                <Text fontWeight={"bold"}>Incentive %:</Text>
                <Text>{props.circleData.incentive}</Text>
              </Stack>
            </Box>
          </Stack>
          <Stack>
            <Heading
              _light={{
                color: "brand.600",
              }}
              fontWeight="semibold"
              // textTransform="uppercase"
              letterSpacing="wide"
              // mb={4}
              mt={10}
              textAlign="center"
            >
              Epoch Information
            </Heading>
            <Box
              style={{ margin: "20px 0px 20px 0px" }}
              p={5}
              shadow="lg"
              borderWidth="1px"
              borderRadius={5}
            >
              <Stack direction={"row"} justifyContent={"space-around"} mb={3}>
                <Text fontWeight={"bold"}>Epoch From</Text>
                <Text fontWeight={"bold"}>Epoch To</Text>
              </Stack>
              <Stack direction={"row"} justifyContent={"space-around"}>
                <Text>
                  {props.circleData.epochFrom &&
                    format(new Date(props.circleData.epochFrom), "dd/MM/yyyy")}
                </Text>
                <Text>
                  {props.circleData.epochTo &&
                    format(new Date(props.circleData.epochTo), "dd/MM/yyyy")}
                </Text>
              </Stack>
            </Box>
          </Stack>
          <Stack mb={10}>
            <Heading
              _light={{
                color: "brand.600",
              }}
              fontWeight="semibold"
              // textTransform="uppercase"
              letterSpacing="wide"
              // mb={4}
              mt={10}
              textAlign="center"
            >
              Contributors Information
            </Heading>
            <Box
              style={{ margin: "20px 0px 20px 0px" }}
              p={5}
              shadow="lg"
              borderWidth="1px"
              borderRadius={5}
            >
              <Stack direction={"row"} justifyContent={"space-around"} mb={3}>
                <Text w="80%" textAlign={"center"} fontWeight={"bold"}>
                  Address
                </Text>
                <Text fontWeight={"bold"}>Admin</Text>
              </Stack>
              {props.circleData.contributors?.map((el) => {
                return (
                  <Stack
                    direction={"row"}
                    justifyContent={"space-around"}
                    mb={3}
                  >
                    <Text w="80%" noOfLines={1} textAlign={"center"}>
                      {el}
                    </Text>
                    <Text fontWeight={"bold"}>
                      {props.account.toString().toLowerCase() ===
                      el.toString().toLowerCase()
                        ? "Yes"
                        : "No"}
                    </Text>
                  </Stack>
                );
              })}
            </Box>
            {props.circleData?.contributors?.length === 4 ? (
              ""
            ) : (
              <Button
                size={"lg"}
                fontWeight={"bold"}
                px={6}
                colorScheme={"red"}
                bg={"red.400"}
                _hover={{ bg: "red.500" }}
                onClick={props.onContributorToggle}
              >
                Add Contributors
              </Button>
            )}
          </Stack>
          <Dialog {...propsData}>
            <Text>
              {" "}
              Add the contributors in circle by giving their addresses below.
              Notice that you can not add more than 4 contributors in a circle.
            </Text>
            <div>{mapAddresses()}</div>
            <Button
              mt={4}
              size={"lg"}
              fontWeight={"bold"}
              px={6}
              colorScheme={"red"}
              bg={"red.400"}
              _hover={{ bg: "red.500" }}
              onClick={props.onAddField}
            >
              + More
            </Button>
          </Dialog>
        </Container>
      )}
    </>
  );
}

export default View;

{
  /* <Box
sx={{
  // backgroundColor: "#eef3ed",
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
</Box> */
}
