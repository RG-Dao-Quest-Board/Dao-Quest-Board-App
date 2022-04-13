import React, { useContext, useEffect, useState } from 'react';
import { FormControl, FormLabel, Select, Flex } from '@chakra-ui/react';
import { DaoBoard } from './daoBoard';
import { ExploreContext } from '../contexts/ExploreContext';

const ExploreList = ({ handleDaoCalculate }) => {
  const [daos, setDaos] = useState([]);
  const [selectedDao, setSelectedDao] = useState('');
  const { state, exploreDaos } = useContext(ExploreContext);

  useEffect(() => {
    const filteredAndSortedDaos = exploreDaos.data
      .filter((dao) => {
        if (!dao.meta) {
          console.log('unregistered dao', dao);
          return false;
        }

        let searchMatch = true;
        if (state.searchTerm) {
          searchMatch =
            dao.meta.name.toLowerCase().indexOf(state.searchTerm) > -1;
        }

        let tagMatch = true;
        if (state.tags.length) {
          tagMatch =
            dao.meta?.tags.length &&
            state.tags.some((tag) => dao.meta.tags.indexOf(tag) >= 0);
        }

        const memberCount =
          dao.members.length > (state.filters.members[0] || 0);
        const versionMatch = state.filters.version.includes(dao.version);
        const purposeMatch = state.filters.purpose.includes(dao.meta.purpose);
        const networkMatch = state.filters.network.includes(dao.networkId);

        return (
          searchMatch &&
          tagMatch &&
          memberCount &&
          versionMatch &&
          purposeMatch &&
          networkMatch
        );
      })
      .sort((a, b) => {
        if (state.sort.count) {
          return b[state.sort.value].length - a[state.sort.value].length;
        }
        return b[state.sort.value] - a[state.sort.value];
      });

    setDaos(filteredAndSortedDaos);
    handleDaoCalculate(filteredAndSortedDaos.length);
  }, [
    state.sort,
    state.filters,
    state.searchTerm,
    state.tags,
    exploreDaos.data,
    handleDaoCalculate,
  ]);

  const daoList = daos.map((dao, i) => {
    return (
      <option value={dao.meta.name} key={dao.id}>
        {dao.meta.name}
      </option>
    );
  });

  return (
    <>
      {daos.length ? (
        <Flex wrap='wrap' align='start' justify='space-around' w='100%'>
          <FormControl>
            <FormLabel htmlFor='dao-select'>
              Which DAO board would you like to view?
            </FormLabel>
            <Select
              id='dao-select'
              placeholder='Select DAO'
              isRequired
              onChange={(e) => setSelectedDao(e.target.value)}
            >
              {daoList}
            </Select>
          </FormControl>
        </Flex>
      ) : null}
      {selectedDao ? <DaoBoard dao={selectedDao} /> : ''}
    </>
  );
};

export default ExploreList;
