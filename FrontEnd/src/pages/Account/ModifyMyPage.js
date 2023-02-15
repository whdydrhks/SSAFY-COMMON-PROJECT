/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import Input from '@mui/material/Input';
import { Box, Button, Typography, Modal } from '@mui/material';
import { useRecoilState } from 'recoil';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import { userAtom } from '../../recoilState';
import API_URL from '../../api/api';
import { getCookie } from './cookie';
import profileImgDefault from '../../images/profile/profileImgDefault.png';
import profileImg1 from '../../images/profile/profileImg1.png';
import profileImg2 from '../../images/profile/profileImg2.png';
import profileImg3 from '../../images/profile/profileImg3.png';
import profileImg4 from '../../images/profile/profileImg4.png';
import profileImg5 from '../../images/profile/profileImg5.png';
import profileImg6 from '../../images/profile/profileImg6.png';
import profileImg7 from '../../images/profile/profileImg7.png';
import profileImg8 from '../../images/profile/profileImg8.png';
import profileImg9 from '../../images/profile/profileImg9.png';
import profileImg10 from '../../images/profile/profileImg10.png';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SImageHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 0.5rem;
`;

const SImg = styled.img`
  width: 50%;
  border-radius: 100%;
  margin: 1rem;
`;

const SImageContainer = styled.div`
  display: flex;
  /* justify-content: space-between; */
  flex-wrap: wrap;
`;
const SImageDiv = styled.button`
  border: 0;
  background-color: white;
`;

const SButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const SButton = styled(Button)`
  align-items: center;
  font-size: 1rem;
  background-color: #f2f4f6;
`;

// const SLinkList = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin: 20px;
//   a {
//     text-decoration: none;
//     color: grey;
//   }
// `;

function ModifyMyPage() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const accessToken = getCookie('accessToken');
  const [user, setUser] = useRecoilState(userAtom);
  const [profileImgArr, setProfileImgArr] = useState([]);

  const clickProfileImg = i => {
    setUser({
      ...user,
      profileImage: i + 1,
    });
    setOpen(false);
  };

  const handleName = event => {
    setUser({
      ...user,
      name: event.target.value,
    });
  };
  const handleNickname = event => {
    setUser({
      ...user,
      nickname: event.target.value,
    });
  };
  const handlePhoneNumber = event => {
    setUser({
      ...user,
      phoneNumber: event.target.value,
    });
  };

  const handleModifyUserInfo = () => {
    axios
      .put(
        `${API_URL}/user/${user.userId}`,
        {
          name: user.name,
          nickname: user.nickname,
          phoneNumber: user.phoneNumber,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      .then(() => navigate(`/mypage/${user.userId}`));
  };

  useEffect(() => {
    const arr = [
      profileImg1,
      profileImg2,
      profileImg3,
      profileImg4,
      profileImg5,
      profileImg6,
      profileImg7,
      profileImg8,
      profileImg9,
      profileImg10,
    ];
    setProfileImgArr(arr);
  }, []);

  return (
    <>
      <Header />
      <SImageHeader>
        {user.profileImage === 0 ? <SImg src={profileImgDefault} /> : null}
        {user.profileImage === 1 ? <SImg src={profileImg1} /> : null}
        {user.profileImage === 2 ? <SImg src={profileImg2} /> : null}
        {user.profileImage === 3 ? <SImg src={profileImg3} /> : null}
        {user.profileImage === 4 ? <SImg src={profileImg4} /> : null}
        {user.profileImage === 5 ? <SImg src={profileImg5} /> : null}
        {user.profileImage === 6 ? <SImg src={profileImg6} /> : null}
        {user.profileImage === 7 ? <SImg src={profileImg7} /> : null}
        {user.profileImage === 8 ? <SImg src={profileImg8} /> : null}
        {user.profileImage === 9 ? <SImg src={profileImg9} /> : null}
        {user.profileImage === 10 ? <SImg src={profileImg10} /> : null}

        <Button onClick={handleOpen}>아바타 선택하기</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              아바타 선택하기
              <SImageContainer>
                {profileImgArr.map((img, index) => (
                  <SImageDiv
                    key={index}
                    onClick={() => clickProfileImg(index)}
                    value={index}
                  >
                    <SImage src={img} />
                  </SImageDiv>
                ))}
              </SImageContainer>
            </Typography>
          </Box>
        </Modal>
      </SImageHeader>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <Input placeholder={user.email} disabled />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <Input
            placeholder={user.name}
            defaultValue={user.name}
            onChange={handleName}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SentimentSatisfiedAltIcon />
            </Avatar>
          </ListItemAvatar>
          <Input
            placeholder={user.nickname}
            defaultValue={user.nickname}
            onChange={handleNickname}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SmartphoneIcon />
            </Avatar>
          </ListItemAvatar>
          <Input
            placeholder="핸드폰 번호 입력"
            defaultValue={user.phoneNumber}
            onChange={handlePhoneNumber}
          />
        </ListItem>
      </List>

      <SButtonDiv>
        <SButton onClick={handleModifyUserInfo} variant="body2">
          수정
        </SButton>
      </SButtonDiv>

      <Nav />
    </>
  );
}

export default ModifyMyPage;
