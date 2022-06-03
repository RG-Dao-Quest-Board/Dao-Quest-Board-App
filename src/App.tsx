import * as React from 'react';
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import { Header } from "./components/header"
import { UserContextProvider } from './contexts/UserContext';
import { Explore } from "./components/explore";
import { ExploreContextProvider } from './contexts/ExploreContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
console.log("DEBUG", process.env.NODE_ENV)
export const App = () => (
  <ChakraProvider theme={theme}>
    <UserContextProvider>
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<ExploreContextProvider><Explore /></ExploreContextProvider>}>
          </Route>
        </Routes>
      </Router>
    </UserContextProvider>
  </ChakraProvider>
)
