import React, { useContext, useEffect, useState } from 'react';
import { FormControl, FormLabel, Select, Flex } from '@chakra-ui/react';
import { DaoBoard } from './daoBoard';
import { ExploreContext } from '../contexts/ExploreContext';
import { getAllQuests } from "../services/noticeService";

const ExploreList = ({ handleDaoCalculate }) => {
  const [daos, setDaos] = useState([]);
  const [selectedDao, setSelectedDao] = useState('');
  const [allQuests, setAllQuests] = useState([]);
  const { state, exploreDaos } = useContext(ExploreContext);

  useEffect(() => {
    const filteredAndSortedDaos = exploreDaos.data
      .filter((dao) => {
        if (!dao.meta) {
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

  const sortedDaos = daos.sort((a, b) => {
    const nameA = a.meta.name.toUpperCase();
    const nameB = b.meta.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  const daoList = sortedDaos.map((dao) => {
    return (
      <option value={dao.meta.name} key={dao.id}>
        {dao.meta.name}
      </option>
    );
  });

  useEffect(() => {
    getAllQuests().then(quests => {
      setAllQuests(quests);
    })},
    []);

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
      {selectedDao ? <DaoBoard dao={selectedDao} quests={allQuests} /> : ''}
    </>
  );
};

export default ExploreList;
