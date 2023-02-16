import styled from 'styled-components';
import '../../styles/fonts.css';
import { Button } from '@mui/material';

export const VideoChatRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 16px;
  margin: 10%;
`;

export const JoinForm = styled.form`
  border: 1px solid black;
  border-radius: 10px;
  padding: 10%;
  margin: 5%;
`;

export const WaitingDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const NameDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 10%; */
  margin-left: 10%;
  margin-right: 10%;
`;

export const RoomNameDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10%;
`;

export const JoinDiv = styled.div`
  display: flex;
  justify-content: center;
`;

export const JoinButton = styled(Button)`
  font-size: 1rem;
  font-family: mainFont;
  /* background-color: secondary; */
  margin-left: 30% !important;
  margin-right: 30% !important;
  margin-bottom: 5% !important;
  /* color: white; */
  border: none;
  width: 40% !important;
  height: 5vh !important;
  border-radius: 10px;
  /* border: none; */
  /* width: 40%; */
  /* height: 8vh; */
  font-family: mainFont;
  /* font-size: 32px; */
`;

export const div = styled.div`
  position: relative;
`;

export const WaitingMessageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
`;

export const WaitingMessage = styled.p`
  font-size: 16px;
`;

export const SmallCamera = styled.div`
  position: absolute;
  top: 0em;
  right: 0em;
  width: 30%;
`;

export const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const ChattingListBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #d9d9f3;
  height: 30vh;
  /* border: 20px solid #d9d9f3; */
  border-radius: 10px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  margin: 5%;
`;

export const ChatForm = styled.div`
  display: flex;
  justify-content: space-around;
  height: 10vh;
`;

export const ChatInput = styled.input`
  border-radius: 10px;
  border: none;
  height: 5vh;
  width: 78vw;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  margin: 0;
`;

export const ChatButton = styled.button`
  background-color: #d9d9f3;
  color: black;
  font-weight: bold;
  border: none;
  /* border: 1px solid #9500ae; */
  border-radius: 10px;
  height: 6vh;
  width: 15vw;
`;

export const Controller = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const ChatInline = styled.div`
  max-width: 100%;
  margin: 2%;
`;

export const Chat = styled.p`
  display: inline-block;
  position: relative;
  /* background-color: white; */
  border-radius: 10px;
  font-size: 1rem;
  padding: 1%;
  font-weight: bold;
`;

export const NickName = styled.span``;

export const Data = styled.span`
  background-color: white;
  border-radius: 10px;
  /* padding: 1%; */
`;

export const LeaveBox = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5%;
  /* background-color: #d9d9f3; */
`;

export const ExitSign = styled.img`
  width: 10vw;
`;

export const MicOff = styled.img`
  width: 10vw;
  height: 5vh;
`;

export const MicOn = styled.img`
  width: 10vw;
  height: 5vh;
`;

export const CamOff = styled.img`
  width: 10vw;
  height: 5vh;
`;

export const CamOn = styled.img`
  width: 10vw;
  height: 5vh;
`;

export const VolumeOff = styled.img`
  width: 10vw;
  height: 5vh;
`;

export const VolumeOn = styled.img`
  width: 10vw;
  height: 5vh;
`;

export const LeaveButton = styled.button`
  background-color: #1976d2;
  border: 1px solid #1976d2;
  border-radius: 10px;
  color: white;
  height: 5vh;
  width: 15vw;
`;

export const Header = styled.div`
  font-size: 2rem;
  font-family: mainFont;
  text-align: left;
  margin-top: 2rem;
  margin-left: 5%;
  margin-bottom: 20%;
`;

export const ImgCenter = styled.div`
  display: flex;
  justify-content: center;
`;

export const ThumbnailImage = styled.img`
  width: 30vw;
`;

export const FileUploadButton = styled(Button)`
  font-size: 1rem;
  font-family: mainFont;
  margin-top: 5% !important;
  margin-left: 30% !important;
  margin-right: 30% !important;
  margin-bottom: 5% !important;
  color: white;
  border: none;
  border-radius: 10px;
  height: 5vh;
`;

export const Title2 = styled.div`
  margin-left: 2rem;
`;

export const TitleHeader = styled.div``;

export const TitleInput = styled.input``;

export const Category = styled.div`
  margin-left: 2rem;
`;

export const CategoryHeader = styled.div``;

export const RoomName = styled.input``;
/* 
.stream-container {
	padding: 0;
} */
