import * as React from 'react';
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Header } from "./components/header"
import { DaoSelect } from "./components/daoSelect"
import { UserContextProvider } from './contexts/UserContext';
import {Notice} from "./components/notice";
export const App = () => (
  <ChakraProvider theme={theme}>
    <UserContextProvider>

      <Header />
      <DaoSelect />
        <Notice />
    </UserContextProvider>
  </ChakraProvider>
)
