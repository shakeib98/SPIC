import {
  Container,
  Stack,
  Flex,
  Heading,
  Text,
  Button,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import myGif from "../public/earth/world.gif";

function Home() {
  const router = useRouter();
  return (
    <div>
      <Container maxW="1200">
        <Stack
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
            >
              <Text
                as={"span"}
                position={"relative"}
                _after={{
                  content: "''",
                  width: "full",
                  height: "30%",
                  position: "absolute",
                  bottom: 1,
                  left: 0,
                  bg: "red.400",
                  zIndex: -1,
                }}
              >
                Introducing SPIC,
              </Text>
              <br />
              <Text as={"span"} color={"red.400"}>
                Semaphore Protected Incentivized Community
              </Text>
            </Heading>
            <Text color={"gray.500"}>
              This project has extended the idea of Coordinape. Coordinape is a
              DAO tool that is used to reward community incentives, grants, and
              payroll through community derived voting process.
            </Text>
            <Stack
              spacing={{ base: 4, sm: 6 }}
              direction={{ base: "column", sm: "row" }}
            >
              <Button
                rounded={"full"}
                size={"lg"}
                fontWeight={"normal"}
                px={6}
                colorScheme={"red"}
                bg={"red.400"}
                _hover={{ bg: "red.500" }}
                onClick={() => router.push("/dashboard")}
              >
                Get started
              </Button>
            </Stack>
          </Stack>
          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Image src={myGif} alt="my gif" height={10000} width={10000} />
          </Flex>
        </Stack>
      </Container>
    </div>
  );
}

export default Home;
