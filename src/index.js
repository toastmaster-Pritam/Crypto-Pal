import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ChakraProvider, theme } from "@chakra-ui/react";
import ColorSwitcherMode from "./components/ColorSwitcherMode";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <ColorSwitcherMode />

    <App />
  </ChakraProvider>
);
export const server=`https://api.coingecko.com/api/v3`