import { Button } from "@chakra-ui/button";
import { SearchIcon } from "@chakra-ui/icons";

// import { InputGroup, InputLeftElement } from "@chakra-ui/input";
import { Container, Flex, Text } from "@chakra-ui/layout";

const NavBar = ({ logout }) => {
  return (
    <Container
      as="nav"
      maxW="1300px"
      display="flex"
      justifyContent="space-between"
      padding="4"
      boxShadow="lg"
      borderRadius="lg"
      pos="sticky"
      top="0"
      zIndex="50"
      bg="white"
    >
      <Flex align="center">
      
        <Text>Home</Text>
      </Flex>
      <Flex align="center">
        <Text mr="2">Streams</Text> <Text mr="2">Trending</Text>
        <Button onClick={logout}> Logout</Button>
      </Flex>
    </Container>
  );
};

export default NavBar;
