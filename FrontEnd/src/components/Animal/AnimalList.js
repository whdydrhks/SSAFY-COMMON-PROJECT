/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// import axios from 'axios';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { animalListState, userAtom } from '../../recoilState';
import AnimalItem from './AnimalItem';
import API_URL from '../../api/api';

const SLink = styled(Link)`
  margin: 0 auto;
  color: black;
  text-decoration: none;
`;

const SSearchBar = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  /* background-color: rgba(180, 230, 230); */
`;

const SSearchCategory = styled.select`
  text-align: center;
  height: 2rem;
`;

const SInput = styled.input`
  text-align: left;

  width: 49%;
`;

function AnimalList(props) {
  // const animalList = useRecoilValue(animalListState);
  // console.log(animalList);
  // console.log(props, 'here');
  // console.log(props);
  const expired = props.expired;

  const [animalList, setAnimalList] = useState([]);
  const userInfo = useRecoilValue(userAtom);
  const shelterId = userInfo.shelterId;
  const [searchCategory, setSearchCategory] = useState('searchManageNumber');
  const [searchValue, setSearchValue] = useState('');

  const handleSearchCategory = e => {
    setSearchCategory(e.target.value);
  };

  const handleSearchValue = e => {
    setSearchValue(e.target.value);
  };

  const search = e => {
    e.preventDefault();
    if (searchCategory === 'searchManageNumber') {
      axios
        .get(`${API_URL}/shelter/${shelterId}/search/manage-code`, {
          params: { keyword: searchValue },
        })
        .then(res => {
          const searchAnimalList = res.data.data;
          const filteredAnimalList = searchAnimalList.filter(
            item => item.adoption === expired,
          );
          // console.log(filteredAnimalList);
          setAnimalList(filteredAnimalList);
        });
    } else if (searchCategory === 'searchName') {
      axios
        .get(`${API_URL}/shelter/${shelterId}/search/name`, {
          params: { keyword: searchValue },
        })
        .then(res => {
          const searchAnimalList = res.data.data;
          const filteredAnimalList = searchAnimalList.filter(
            item => item.adoption === expired,
          );
          // console.log(filteredAnimalList);
          setAnimalList(filteredAnimalList);
        });
    } else if (searchCategory === 'searchBreed') {
      axios
        .get(`${API_URL}/shelter/${shelterId}/search/breed`, {
          params: { keyword: searchValue },
        })
        .then(res => {
          const searchAnimalList = res.data.data;
          const filteredAnimalList = searchAnimalList.filter(
            item => item.adoption === expired,
          );
          // console.log(filteredAnimalList);
          setAnimalList(filteredAnimalList);
        });
    }
  };

  const getAnimalList = async () => {
    await axios.get(`${API_URL}/shelter/${shelterId}/animal`).then(res => {
      const allList = res.data.data;
      // console.log(allList);
      // console.log(expired);
      const filteredData = allList.filter(item => item.adoption === expired);
      // console.log(filteredData);
      setAnimalList(filteredData);
    });
    // console.log('###################');
    // const filteredAnimalList = await axios.get(
    //   `${API_URL}/shelter/${shelterId}/animal?pageNo=1`,
    // );
    // setTemp(filteredAnimalList.data.data.filter((item.expired = false)));
    // console.log(temp);
    // console.log('@@@@@@@@@@@@@@@@@@@@');
  };
  // console.log(temp);
  useEffect(() => {
    getAnimalList();
  }, []);
  // axios
  //   .get(`${API_URL}/shelter/1/animal?pageNo=1`, {
  //     params: { status: props.status },
  //   })
  //   .then(res => {
  //     console.log(res);
  //   });

  return (
    <div>
      {/* 검색 카테고리 */}
      <SSearchBar>
        <form onSubmit={search}>
          <SSearchCategory onChange={handleSearchCategory}>
            <option value="searchManageNumber">관리 번호</option>
            <option value="searchName">이름</option>
            <option value="searchBreed">품종</option>
          </SSearchCategory>
          {(() => {
            switch (searchCategory) {
              case 'searchManageNumber':
                return (
                  <SInput
                    type="text"
                    onChange={handleSearchValue}
                    placeholder="관리번호를 입력해 주세요."
                  />
                );
              case 'searchName':
                return (
                  <SInput
                    type="text"
                    onChange={handleSearchValue}
                    placeholder="이름을 입력해 주세요."
                  />
                );
              case 'searchbreed':
                return (
                  <SInput
                    type="text"
                    onChange={handleSearchValue}
                    placeholder="품종을 입력해 주세요."
                  />
                );
              default:
                return (
                  <SInput
                    type="text"
                    onChange={handleSearchValue}
                    placeholder="관리번호를 입력해 주세요."
                  />
                );
            }
          })()}

          <button type="submit">검색</button>
        </form>
      </SSearchBar>
      {animalList ? (
        <>
          {animalList.map(animalItem => (
            <SLink
              to={`/animal/${animalItem.animalId}`}
              key={animalItem.animalId}
              state={{ animal: animalItem }}
            >
              <AnimalItem item={animalItem} />
            </SLink>
          ))}
        </>
      ) : null}
      {/* {animalList.map(animalItem => (
        <SLink
          to={`/animal/${animalItem.animalId}`}
          key={animalItem.animalId}
          state={{ animal: animalItem }}
        >
          <AnimalItem item={animalItem} />
        </SLink>
      ))} */}
    </div>
  );
}

export default AnimalList;
