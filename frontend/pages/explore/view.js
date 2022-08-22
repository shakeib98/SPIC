import { Button, Container, Heading, Stack, Text, Box } from "@chakra-ui/react";

function View(props) {
  return (
    <>
      <Container minW={"1220px"}>
        <Heading
          as="h2"
          _light={{
            color: "brand.600",
          }}
          fontWeight="semibold"
          textTransform="uppercase"
          letterSpacing="wide"
          mb={4}
          textAlign={"center"}
        >
          Explore Organizations
        </Heading>
        <Stack direction="row" wrap={"wrap"} pl={40}>
          {!!props?.circles?.length &&
            props.circles.map((el) => (
              // eslint-disable-next-line react/jsx-key
              <Box
                w={"250px"}
                style={{ margin: "0px 0px 20px 13px" }}
                p={5}
                shadow="2xl"
                borderWidth="1px"
                borderRadius={5}
              >
                <Heading textAlign={"center"} fontSize="xl">
                  {el.organizationName} Organization
                </Heading>
                <Text mt={2} mb={2} textAlign={"center"}>
                  {el.name} Circle
                </Text>
                <Stack>
                  <Button
                    size={"sm"}
                    fontWeight={"bold"}
                    px={6}
                    colorScheme={"red"}
                    bg={"red.400"}
                    _hover={{ bg: "red.500" }}
                    onClick={() => props.navigateToVotePage(el._id)}
                  >
                    Join
                  </Button>
                </Stack>
              </Box>
            ))}
        </Stack>
      </Container>
    </>
  );
}

export default View;
