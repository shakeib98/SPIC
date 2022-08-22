import {
  Button,
  Container,
  Heading,
  Stack,
  Text,
  Box,
  Input,
} from "@chakra-ui/react";
import DatePicker from "../../components/date-picker";
import Loader from "../../components/progress";

function View(props) {
  return (
    <>
      {props.isConnected && (
        <Container {...props}>
          <Heading
            as="h2"
            _light={{
              color: "brand.600",
            }}
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wide"
            textAlign={"center"}
            mb={4}
          >
            Create a Circle
          </Heading>
          <Text mb={5}>
            SPIC circles allow you to collectively reward circle members through
            equitable and transparent payments. To start a circle, we just need
            a bit of information.
          </Text>
          <Heading
            size={"md"}
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wide"
            mb={5}
          >
            Basic Information
          </Heading>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // padding: "20px 0px",
            }}
            mb={5}
          >
            <Input
              value={props.account}
              style={{
                width: "48%",
                border: "1px solid",
                borderColor: "inherit",
                backgroundColor: "inherit",
              }}
              name="address"
              id="ETH Address"
              placeholder="ETH Address"
              variant="outlined"
              disabled
              onChange={props?.onChange}
            />
            <Input
              style={{
                width: "48%",
                border: "1px solid",
                borderColor: "inherit",
                backgroundColor: "inherit",
              }}
              value={props?.userData?.circleName}
              id="Circle Name"
              placeholder="Circle Name"
              name="circleName"
              variant="outlined"
              onChange={props?.onChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // padding: "20px 0px",
            }}
            mb={5}
          >
            <Input
              style={{
                width: "48%",
                border: "1px solid",
                borderColor: "inherit",
                backgroundColor: "inherit",
              }}
              id="Organization Name"
              value={props?.userData?.organizationName}
              placeholder="Organization Name"
              name="organizationName"
              variant="outlined"
              onChange={props?.onChange}
            />
            <Input
              style={{
                width: "48%",
                border: "1px solid",
                borderColor: "inherit",
                backgroundColor: "inherit",
              }}
              value={props?.userData?.nft}
              id="nft"
              placeholder="NFT Address"
              name="nft"
              variant="outlined"
              onChange={props?.onChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // padding: "20px 0px",
            }}
            mb={5}
          >
            <Input
              style={{
                width: "48%",
                border: "1px solid",
                borderColor: "inherit",
                backgroundColor: "inherit",
              }}
              value={props?.userData?.erc20}
              id="erc20"
              placeholder="ERC20 Address"
              name="erc20"
              variant="outlined"
              onChange={props?.onChange}
            />
            <Input
              style={{
                width: "48%",
                border: "1px solid",
                borderColor: "inherit",
                backgroundColor: "inherit",
              }}
              value={props?.userData?.erc20Amount}
              id="erc20Amount"
              placeholder="ERC20 Amount"
              name="erc20Amount"
              variant="outlined"
              onChange={props?.onChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              // justifyContent: "space-around",
              // padding: "20px 40px",
            }}
            mb={5}
          >
            <Input
              style={{
                width: "48%",
                border: "1px solid",
                borderColor: "inherit",
                backgroundColor: "inherit",
              }}
              value={props?.userData?.incentive}
              id="incentive"
              placeholder="Voter Incentive %"
              name="incentive"
              variant="outlined"
              type="number"
              onChange={props?.onChange}
            />
          </Box>
          <Heading
            size={"md"}
            fontWeight="semibold"
            textTransform="uppercase"
            letterSpacing="wide"
            mb={5}
          >
            Epoch Information
          </Heading>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // padding: "20px 0px",
            }}
          >
            <DatePicker
              style={{ width: "97%" }}
              name="from"
              value={props?.epoch.from}
              id="from"
              placeholder="Epoch from"
              onChange={props?.onDateChange}
              disabled={true}
            />
            <DatePicker
              style={{ width: "100%" }}
              name="to"
              value={props?.epoch.to}
              id="to"
              placeholder="Epoch to"
              onChange={props?.onDateChange}
            />
          </Box>
          <Stack
          >
            {/* {props.loader ? (
              <Loader />
            ) : ( */}
              <Button
              isLoading={props.loader}
              loadingText={"waiting for confirmation"}
              mt={10}
                size={"lg"}
                fontWeight={"bold"}
                px={6}
                colorScheme={"red"}
                bg={"red.400"}
                _hover={{ bg: "red.500" }}
                onClick={props?.onLaunchCircleClick}
              >
                Launch Circle
              </Button>
            
          </Stack>
        </Container>
      )}
    </>
  );
}

export default View;
