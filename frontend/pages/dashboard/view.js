import { Button, Container, Heading, Stack, Text, Box } from "@chakra-ui/react";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/router";
import Account from "../../components/Account";
import { shortenHex } from "../../util";
function View(props) {
  const router = useRouter();
  return (
    <Container maxW="1200">
      {props.isConnected ? (
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <Stack
            w="auto"
            justifyContent="center"
            spacing={{ base: 8, md: 10 }}
            alignItems="center"
          >
            <Heading
              as="h2"
              _light={{
                color: "brand.600",
              }}
              fontWeight="semibold"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              Welcome
            </Heading>
            <Heading
              as="p"
              mt={2}
              size={"md"}
              lineHeight="8"
              fontWeight="extrabold"
              letterSpacing="tight"
              _light={{
                color: "gray.900",
              }}
            >
              {!props.isUserDataExist
                ? "This wallet isn't associated with a circle."
                : `Hey ${props.account}`}
            </Heading>
            <Text
              as="p"
              mt={4}
              // mx={{
              //   lg: "auto",
              // }}
              color="gray.500"
              _dark={{
                color: "gray.400",
              }}
            >
              {!props.isUserDataExist
                ? `If you are supposed to be part of a circle already,
                contact your circle's admin to make sure they added this
                address : ${shortenHex(props.account)} Or, create a new circle.`
                : "welcome back start managing your circles, or explore other organizations."}
            </Text>
            <Stack
              spacing={{ base: 8, md: 10 }}
              direction={{ base: "column", md: "row" }}
            >
              <Button
                size={"lg"}
                fontWeight={"bold"}
                px={6}
                colorScheme={"red"}
                bg={"red.400"}
                _hover={{ bg: "red.500" }}
                onClick={() => router.push("/explore")}
              >
                Explore Organizations
              </Button>
              <Button
                size={"lg"}
                fontWeight={"bold"}
                px={6}
                colorScheme={"red"}
                bg={"red.400"}
                _hover={{ bg: "red.500" }}
                onClick={() => router.push("/circle")}
              >
                Start a Circle
              </Button>
            </Stack>
          </Stack>
          <Heading>{`Manage your circles:`}</Heading>
          <Stack direction="row" wrap={"wrap"}>
            {!!props.userCircles.length ? (
              props.userCircles.map((el) => {
                return (
                  <Box
                    w={"250px"}
                    style={{ margin: "0px 0px 20px 13px" }}
                    p={5}
                    shadow="2xl"
                    borderWidth="1px"
                    borderRadius={5}
                  >
                    <Heading noOfLines={1} fontSize="xl">
                      Circle: {el.name.toUpperCase()}{" "}
                    </Heading>
                    <Text noOfLines={1} mt={4}>
                      Organization: {el.organizationName.toUpperCase()}{" "}
                    </Text>
                    <Text mt={4}>
                      Epoch: {format(parseISO(el.epochFrom), "dd/MM/yyyy")} to{" "}
                      {format(parseISO(el.epochTo), "dd/MM/yyyy")}{" "}
                    </Text>
                    <Stack>
                      <Button
                        size={"sm"}
                        fontWeight={"bold"}
                        px={6}
                        marginTop={5}
                        colorScheme={"red"}
                        bg={"red.400"}
                        _hover={{ bg: "red.500" }}
                        onClick={() => router.push("/admin/" + el._id)}
                      >
                        Manage
                      </Button>
                    </Stack>
                  </Box>
                );
              })
            ) : (
              <div
                style={{
                  padding: "30px",
                  // backgroundColor: '#efefef',
                  borderRadius: 10,
                  marginBottom: "20px",
                }}
              >
                <p style={{ textAlign: "center" }}>No circles found</p>
              </div>
            )}
          </Stack>
        </Stack>
      ) : (
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          {" "}
          <Heading as="h1">Welcome</Heading>
          <Heading as="h4">Connect Your Wallet</Heading>
          <Account triedToEagerConnect={props.triedToEagerConnect} />
        </Stack>
      )}
    </Container>
  );
}

export default View;
