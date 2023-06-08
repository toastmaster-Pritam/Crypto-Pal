import { VStack, Box, Spinner } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <VStack h={"90vh"} justifyContent={"center"}>
      <Box transform={"scale(3)"}>
        <Spinner
          size={"xl"}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
        />
      </Box>
    </VStack>
  );
};

export default Loader;
