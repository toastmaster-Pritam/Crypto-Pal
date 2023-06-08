import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import img from "../Assets/btc.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"87vh"}>
      <motion.div
        style={{
          height: "85vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          w={"full"}
          h={"full"}
          objectFit={"contain"}
          src={img}
          filter={"grayscale(1)"}
          mb={"5"}
        />
      </motion.div>
      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
        mt={["-100", "-20", "-5"]}
      >
        Crypto Pal
      </Text>
    </Box>
  );
};

export default Home;
