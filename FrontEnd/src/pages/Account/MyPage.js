import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import Divider from '@mui/material/Divider';
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

function MyPage() {
  const navigate = useNavigate();
  const params = useParams();
  const user = useRecoilValue(userAtom);
  useEffect(() => {
    console.log(params);
    console.log(user);
    if (params.userId !== user.userId) {
      navigate('/notfound');
    }
  }, []);

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
          <ListItemText primary="EMAIL" secondary={user.email} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="이름" secondary={user.name} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SentimentSatisfiedAltIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="닉네임" secondary={user.nickname} />
        </ListItem>
        <Divider variant="inset" component="li" />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <SmartphoneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="핸드폰" secondary={user.phoneNumber} />
        </ListItem>
      </List>
      <SLinkList>
        <Link to="/checkpassword" variant="body2">
          비밀번호변경
        </Link>
        <Link to={`/modifymypage/${user.nickname}`} variant="body2">
          회원정보수정
        </Link>
      </SLinkList>
      <Nav />
    </>
  );
}

export default MyPage;
