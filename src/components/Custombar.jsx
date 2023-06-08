import { Badge, HStack, Progress, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Custombar = ({ high, low, current_percentage }) => {
  return (
    <VStack w={"full"}>
      <Progress value={current_percentage} colorScheme={"teal"} w={"full"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme={"red"} />
        <Text fontSize={"sm"}>24H Range</Text>
        <Badge children={high} colorScheme={"green"} />
      </HStack>
    </VStack>
  );
};

export default Custombar;
