import React from 'react';
import { Link } from 'react-router-dom';
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
import { useRecoilValue } from 'recoil';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import { userAtom } from '../../recoilState';

const SImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: 20px;
  background-color: grey;
`;

const SLinkList = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  a {
    text-decoration: none;
    color: grey;
  }
`;

function ModifyMyPage() {
  const user = useRecoilValue(userAtom);

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
          <Input placeholder={user.name} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SentimentSatisfiedAltIcon />
            </Avatar>
          </ListItemAvatar>
          <Input placeholder={user.nickname} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SmartphoneIcon />
            </Avatar>
          </ListItemAvatar>
          <Input placeholder="핸드폰 번호 입력" />
        </ListItem>
      </List>
      <SLinkList>
        <Link to="/checkpassword" variant="body2">
          비밀번호변경
        </Link>
        <Link to="/mypage" variant="body2">
          회원정보수정
        </Link>
      </SLinkList>
      <Nav />
    </>
  );
}

export default ModifyMyPage;
