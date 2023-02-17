/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable camelcase */
/* eslint-disable prefer-template */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Button, Box, Typography, TextField } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import ImageCarousel from '../../components/common/ImageCarousel';
import {
  manageCode,
  name,
  breed,
  gender,
  note,
  weight,
  neuter,
} from '../../images/index';
import API_URL from '../../api/api';
import { userAtom } from '../../recoilState';
import { getCookie } from '../Account/cookie';
import '../../styles/fonts.css';
import dog_1 from '../../images/dogDetail/dog_1.png';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SDetailHeader = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const SSButton = styled.div`
  border: 0;
  background-color: transparent;
  padding: 0 1rem;
`;

const SLine = styled.div`
  display: flex;
  margin-bottom: 2rem;
  font-family: mainFont;
`;

const SGrayLineBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 35%;
`;

const SGrayLine = styled.div`
  height: 1px;
  background-color: #000000;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  opacity: 0.4;
`;
const SHr = styled.div`
  font-size: 2rem;
  margin-top: 1rem;
  font-family: mainFont;
  margin-bottom: 1.4rem;
`;
const SDetailInformation = styled.div`
  font-size: 1.5rem;
  width: 30%;
  text-align: center;
`;

const SInformationBox = styled.div`
  height: 2.5rem;
  display: flex;
  justify-content: space-around;
  margin-left: 1rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  /* border-radius: 10px; */
`;

const SInformationImg = styled.img`
  width: 2rem;
  height: 2rem;
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
  font-family: mainFont;
`;

const SInformationText = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border: 1px solid #1f2247;
  border-radius: 40px;
  padding: 10px;
  font-family: mainFont;
`;

const SNoteBox = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-left: 1rem;
  margin-bottom: 2rem;
  margin-right: 1rem;
`;

const SNoteImg = styled.img`
  width: 2rem;
  height: 2rem;
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
  margin-right: 1rem;
`;

const SInformationNote = styled.div`
  /* display: inline-block;
  width: 80%;
  border: 1px solid #1f2247;
  border-radius: 40px;
  padding: 10px;
  margin-left: 1rem; */

  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border: 1px solid #1f2247;
  border-radius: 40px;
  padding: 10px;
  font-family: mainFont;
`;

const SButtonBox = styled.div`
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
`;

const SModifyButton = styled(Button)`
  border-radius: 10px;
  margin-right: 1rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  font-family: mainFont;
`;

const SLikeButton = styled(Button)`
  background-color: #9c27b0 !important;
  border-radius: 10px;
  margin-right: 1rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  font-family: mainFont;
`;

const SDeleteButton = styled(Button)`
  background-color: red !important;
  border-radius: 10px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  font-family: mainFont;
`;

const SModalDiv = styled.div`
  display: flex;
  /* justify-content: space-around; */
  font-family: mainFont;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const SNicknameDiv = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-family: mainFont;
`;

const SNickname = styled.button`
  border: solid 1px black;
  background-color: white;
  border-radius: 10px 10px 10px 10px;
  padding: 0.8rem;
  margin: 1rem;
  font-size: 1.7rem;
  font-family: mainFont;
  &:hover {
    color: white;
    background-color: #1976d2;
  }
`;

const SLikeRegistButton = styled.button`
  border: none;
  border-radius: 10px;
  font-family: mainFont;
  width: 100%;
  font-size: 1.3rem;
  margin-top: 5%;
  height: 4vh;
  background-color: #d9d9f3;
`;

const SSearchButton = styled.button`
  border: none;
  border-radius: 10px;
  width: 25%;
  background-color: #d9d9f3;
  font-family: mainFont;
  font-size: 1.1rem;
  height: 4vh;
`;

const SI = styled.div`
  width: 100%;
`;

const SIG = styled.img`
  width: 100%;
`;

const SAdoptionButton = styled.button`
  border-radius: 10px;
`;

function AnimalDetail() {
  const accessToken = getCookie('accessToken');
  const [searchNicknameKeyword, setSearchNicknameKeyword] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useRecoilValue(userAtom);
  const shelterId = userInfo.shelterId;
  const [users, setUsers] = useState([]);
  const [clickNickname, setClickNickname] = useState('');
  const key = [manageCode, name, breed, gender, weight, neuter];
  const korKey = ['관리 번호', '이름', '품종', '성별', '체중', '중성화 여부'];

  const animal = location.state.animal;
  console.log(animal);

  const animalInformation = [
    { manageCode: animal.manageCode },
    { name: animal.name },
    { breed: animal.breed },
    { gender: animal.gender },
    { weight: animal.weight },
    { neuter: animal.neuter },
  ];
  const [animalImages, setAnimalImages] = useState([]);

  const handleAdoptButton = () => {
    setOpen(false);
    let userId;
    users.forEach(user => {
      if (user.nickname === clickNickname) {
        userId = user.userId;
      }
    });
    const today = new Date();
    const nxtToday = new Date(today.setDate(today.getDate() + 7));
    const year = nxtToday.getFullYear().toString();
    const month = (nxtToday.getMonth() + 1).toString().padStart(2, '0');
    const hour = nxtToday.getHours().toString().padStart(2, '0');
    const min = nxtToday.getMinutes().toString().padStart(2, '0');
    const sec = nxtToday.getSeconds().toString().padStart(2, '0');
    const day = nxtToday.getDate().toString().padStart(2, '0');
    const expiredDate =
      year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;

    const animalId = animal.animalId;
    // console.log(animalId);
    // console.log(userId);
    // console.log(expiredDate);
    // console.log(location);
    // console.log(accessToken);

    axios
      .post(
        `${API_URL}/user/${userId}/like/animal/${animalId}`,
        { expiredDate },
        { headers: { Authorization: accessToken } },
      )
      .then(res => console.log(res));
    // navigate(`/animal/${animalId}`);
  };

  const handleHistory = () => {
    navigate(-1);
  };

  const handleSearchNickname = async () => {
    await axios
      .get(`${API_URL}/user`, { params: { keyword: searchNicknameKeyword } })
      .then(res => {
        setUsers(res.data.data);
      });
  };

  const getAnimalImage = async () => {
    await axios
      .get(`${API_URL}/shelter/${shelterId}/animal/${animal.animalId}/image`)
      .then(res => {
        setAnimalImages(res.data.data);
      });
  };

  const handleKeyword = e => {
    setSearchNicknameKeyword(e.target.value);
  };

  useEffect(() => {
    getAnimalImage();
  }, []);

  const onStayClick = e => {
    setClickNickname(e.target.value);
  };

  const handleDeleteAnimal = () => {
    // navigate 핸들러 함수 최하단으로 내려야함
    if (window.confirm('등록된 동물을 삭제하시겠습니까?')) {
      axios.delete(
        `${API_URL}/shelter/${shelterId}/animal/${animal.animalId}`,
        {
          data: {
            shelterId: {},
            animalId: animal.animalId,
          },
        },
      );
    }
  };

  return (
    <>
      <Header />
      <SDetailHeader>
        <SSButton onClick={handleHistory}>
          <ChevronLeftIcon fontSize="large" />
        </SSButton>
        <SHr>동물상세</SHr>
      </SDetailHeader>
      <SI>
        <SIG src={dog_1} />
      </SI>
      <SLine>
        <SGrayLineBox>
          <SGrayLine />
        </SGrayLineBox>
        <SDetailInformation>상세 정보</SDetailInformation>
        <SGrayLineBox>
          <SGrayLine />
        </SGrayLineBox>
      </SLine>
      {animalInformation.map((Item, index) => (
        <SInformationBox key={key[index]}>
          <SInformationImg src={key[index]} alt={`${Object.keys(Item)}`} />
          <SInformationText>
            <div>{korKey[index]}</div>
            <div>{Object.values(Item)}</div>
          </SInformationText>
        </SInformationBox>
      ))}

      <SNoteBox>
        <SNoteImg src={note} alt="note.png" />
        <SInformationNote>{animal.note}</SInformationNote>
      </SNoteBox>

      <SButtonBox>
        {userInfo.role === 'HOST' ? (
          <Link
            to={`/animal/update/${animal.animalId}`}
            style={{ textDecoration: 'none' }}
            state={{ animalInformation: animal }}
          >
            <SModifyButton variant="contained" size="medium">
              수정하기
            </SModifyButton>
          </Link>
        ) : null}
        {/* 수정하기 */}

        {userInfo.role === 'HOST' ? (
          <div>
            <SLikeButton variant="contained" size="medium" onClick={handleOpen}>
              관심동물 등록
            </SLikeButton>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <SModalDiv>
                    <TextField
                      id="standard-basic"
                      label="닉네임 입력"
                      variant="standard"
                      onChange={handleKeyword}
                    />
                    <SSearchButton onClick={handleSearchNickname}>
                      검색
                    </SSearchButton>
                  </SModalDiv>
                </Typography>
                <SNicknameDiv>
                  {users.map((user, i) => (
                    <SNickname
                      key={i}
                      onClick={onStayClick}
                      value={user.nickname}
                    >
                      {user.nickname}
                    </SNickname>
                  ))}
                </SNicknameDiv>
                <SModalDiv>
                  <SLikeRegistButton onClick={handleAdoptButton}>
                    등록
                  </SLikeRegistButton>
                </SModalDiv>
              </Box>
            </Modal>
          </div>
        ) : null}

        {/* 삭제하기 */}

        {userInfo.role === 'HOST' ? (
          <SDeleteButton
            onClick={handleDeleteAnimal}
            variant="contained"
            size="medium"
          >
            삭제하기
          </SDeleteButton>
        ) : (
          <div>
            <SLikeButton variant="contained" size="medium" onClick={handleOpen}>
              입양하기
            </SLikeButton>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {/* <SModalDiv> */}
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h2"
                  >
                    천사의 집
                  </Typography>
                  <br />
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    대전광역시 갈마동 [35227]
                  </Typography>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    입양문의 : 042-488-0246
                  </Typography>
                  {/* </SModalDiv> */}
                </Typography>
                <SNicknameDiv>
                  {users.map((user, i) => (
                    <SNickname
                      key={i}
                      onClick={onStayClick}
                      value={user.nickname}
                    >
                      {user.nickname}
                    </SNickname>
                  ))}
                </SNicknameDiv>
                <SModalDiv>
                  <SLikeRegistButton onClick={handleClose}>
                    닫기
                  </SLikeRegistButton>
                </SModalDiv>
              </Box>
            </Modal>
          </div>
        )}
      </SButtonBox>

      <Nav />
    </>
  );
}

export default AnimalDetail;
