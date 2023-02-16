/* eslint-disable camelcase */
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
import '../../styles/fonts.css';

const SLink = styled(Link)`
  margin: 0 auto;
  color: black;
  text-decoration: none;
`;

const SForm = styled.form`
  width: 100%;
  margin-left: 0.5rem;
`;

const SSearchBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 1rem;
  /* background-color: rgba(180, 230, 230); */
`;

const SSearchCategory = styled.select`
  text-align: center;
  margin-right: 2%;
  height: 2.2rem;
  border: 1px solid gray;
  border-radius: 5px;
  width: 25%;
  font-family: mainFont;
  font-size: 0.9rem;
`;

const SInput = styled.input`
  text-align: left;
  width: 45%;
  height: 1.9rem;
  border: 1px solid gray;
  border-radius: 5px;
  margin-right: 2%;
  background-color: #ffffff;
  outline: none;
  font-family: mainFont;
  font-size: 0.9rem;
`;

const SButtton = styled.button`
  border-radius: 5px;
  outline: none;
  border: 0px solid;
  background-color: #9500ae;
  color: white;
  width: 20%;
  height: 2.15rem;
  font-family: mainFont;
  font-size: 0.9rem;
`;

function AnimalList(props) {
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
      console.log(allList);
      const filteredData = allList.filter(item => item.adoption === expired);
      console.log(filteredData);
      setAnimalList(filteredData);
    });
  };
  // console.log(temp);
  useEffect(() => {
    getAnimalList();
  }, []);

  return (
    <div>
      {/* 검색 카테고리 */}
      <SSearchBar>
        <SForm onSubmit={search}>
          {/* <form onSubmit={search}> */}
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
          <SButtton type="submit">검색</SButtton>
          {/* </form> */}
        </SForm>
      </SSearchBar>
      {animalList ? (
        <>
          {animalList.map((animalItem, index) => (
            <SLink
              to={`/animal/${animalItem.animalId}`}
              key={animalItem.animalId}
              state={{ animal: animalItem }}
            >
              <AnimalItem item={animalItem} idx={index} />
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
