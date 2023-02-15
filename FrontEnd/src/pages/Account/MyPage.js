/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { useRecoilValue } from 'recoil';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import { userAtom } from '../../recoilState';
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
import '../../styles/fonts.css';

// const SImage = styled.div`
//   width: 50%;
//   height: 200px;
//   border-radius: 50%;
//   margin: 20px;
//   background-color: grey;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
const SImg = styled.img`
  width: 50%;
  border-radius: 100%;
  margin: 1rem;
`;
const SLinkList = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  a {
    text-decoration: none;
    color: gray;
  }
`;

const SAvatar = styled(Avatar)`
  background-color: rgba(217, 217, 243, 1);
`;
const SIconEmail = styled(EmailIcon)`
  color: black;
`;
const SIconName = styled(PersonIcon)`
  color: black;
`;
const SIconNickname = styled(SentimentSatisfiedAltIcon)`
  color: black;
`;
const SIconPhone = styled(SmartphoneIcon)`
  color: black;
`;

const SButton = styled(Button)`
  align-items: center;
  font-size: 1rem;
  background-color: #f2f4f6;
  color: black;
`;

function MyPage() {
  const navigate = useNavigate();
  const params = useParams();
  const user = useRecoilValue(userAtom);
  useEffect(() => {
    if (params.userId !== user.userId) {
      navigate('/notfound');
    }
  }, []);

  return (
    <>
      <Header />
      {}
      {/* <SImage> */}
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
      {/* </SImage> */}
      <List>
        <ListItem>
          <ListItemAvatar>
            <SAvatar>
              <SIconEmail />
            </SAvatar>
          </ListItemAvatar>
          <ListItemText primary="이메일" secondary={user.email} />
        </ListItem>
        {/* <Divider variant="inset" component="li" /> */}
        <ListItem>
          <ListItemAvatar>
            <SAvatar>
              <SIconName />
            </SAvatar>
          </ListItemAvatar>
          <ListItemText primary="이름" secondary={user.name} />
        </ListItem>
        {/* <Divider variant="inset" component="li" /> */}
        <ListItem>
          <ListItemAvatar>
            <SAvatar>
              <SIconNickname />
            </SAvatar>
          </ListItemAvatar>
          <ListItemText primary="닉네임" secondary={user.nickname} />
        </ListItem>
        {/* <Divider variant="inset" component="li" /> */}
        <ListItem>
          <ListItemAvatar>
            <SAvatar>
              <SIconPhone />
            </SAvatar>
          </ListItemAvatar>
          <ListItemText primary="핸드폰" secondary={user.phoneNumber} />
        </ListItem>
      </List>
      <SLinkList>
        <Link to={`/modifypassword/${user.userId}/password`} variant="body2">
          <SButton>비밀번호변경</SButton>
        </Link>
        <Link to={`/modifymypage/${user.userId}`} variant="body2">
          <SButton>회원정보수정</SButton>
        </Link>
      </SLinkList>
      <Nav />
    </>
  );
}

export default MyPage;
