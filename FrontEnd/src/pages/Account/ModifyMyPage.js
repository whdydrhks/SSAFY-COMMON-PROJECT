/* eslint-disable no-unused-vars */
import React from 'react';
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
import { Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import { userAtom } from '../../recoilState';
import API_URL from '../../api/api';
import { getCookie } from './cookie';

const SImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 20px;
  background-color: grey;
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
  const navigate = useNavigate();
  const accessToken = getCookie('accessToken');
  const [user, setUser] = useRecoilState(userAtom);
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
          password: '000',
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

  return (
    <>
      <Header />
      <SImage />
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

      <Button onClick={handleModifyUserInfo} variant="body2">
        수정
      </Button>

      <Nav />
    </>
  );
}

export default ModifyMyPage;
