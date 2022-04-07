import * as React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { Logo } from "./Logo"
import { Header } from "./components/header"
import { DaoSelect } from "./components/daoSelect"
import { UserContextProvider } from './contexts/UserContext';
export const App = () => (
  <ChakraProvider theme={theme}>
    <UserContextProvider>

      <Header />
      <DaoSelect />
    </UserContextProvider>
  </ChakraProvider>
)
