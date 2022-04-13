import React, { useState, useContext } from 'react';

import { ExploreContext } from '../contexts/ExploreContext';
// import ExploreFilters from '../components/exploreFilters';
import ExploreList from './exploreList';
import { Loading } from './loading';
import { Box } from '@chakra-ui/react';

export const Explore = () => {
  const { hasLoadedExploreData } = useContext(ExploreContext);
  const [daoCount, setDaoCount] = useState(0);

  return (
    <Box>
      {hasLoadedExploreData ? (
        <>
          <ExploreList handleDaoCalculate={setDaoCount} />
        </>
      ) : (
        <Loading message='Fetching DAOs...' />
      )}
    </Box>
  );
};
