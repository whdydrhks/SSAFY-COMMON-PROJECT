import styled from 'styled-components';

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

export const WaitingDiv = styled.div``;

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

export const JoinButton = styled.button`
  /* background-color: #3f51b5;
  border-radius: 5px;
  border: 1px solid #3f51b5;
  text-decoration: none;
  color: white;
  width: 40%;
  height: 8vh; */
  /* font-size: 32px; */
  // 위 주석이었음
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

export const ChattingListBox = styled.ul`
  height: 43vh;
  border: 1px solid black;
  border-radius: 10px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ChatForm = styled.div`
  display: flex;
  justify-content: space-around;
  height: 10vh;
`;

export const ChatInput = styled.input`
  border-radius: 10px;
  height: 5vh;
  width: 19rem;
`;

export const ChatButton = styled.button`
  background-color: #9500ae;
  color: white;
  border: 1px solid #9500ae;
  border-radius: 10px;
  height: 5vh;
  width: 15vw;
`;

export const Chat = styled.li`
  font-size: 1.5rem;
  margin: 3%;
`;

export const LeaveButton = styled.button`
  background-color: #1976d2;
  border: 1px solid #1976d2;
  border-radius: 10px;
  color: white;
  height: 5vh;
  width: 15vw;
`;

export const LeaveBox = styled.div`
  display: flex;
  justify-content: space-around;
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

/* 
.stream-container {
	padding: 0;
} */
