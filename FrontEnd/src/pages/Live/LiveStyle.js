import styled from 'styled-components';

export const LiveListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LiveItemContainer = styled.button`
  display: flex;
  margin-bottom: 0.5rem;
  background-color: white;
  /* margin-left: 0.1%; */
  /* margin-right: 0.1%; */
  /* margin-bottom: 5%; */
  /* padding: 5%; */
  border-radius: 5%;
  border: none;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

export const LiveImage = styled.img`
  min-height: 10%;
  width: 35%;
  max-height: 10%;
  display: flex;
  object-fit: cover;
  position: flex;
  margin-left: 5%;
  margin-top: 3%;
  margin-bottom: 3%;
  margin-right: 3%;
  border-radius: 100%;
  /* border: 1px solid black; */
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.6);
  margin-top: 1.5rem;
`;

export const LiveInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: mainFont;
  text-decoration-line: none;
  justify-content: space-between;
  width: 100%;
`;

export const LiveTitle = styled.div`
  margin-top: 15%;
  font-size: 2rem;
  margin-left: 5%;
  text-align: left;
  margin-bottom: 20%;
`;

export const JoinContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 5%;
`;

export const ShelterName = styled.div`
  text-align: right;
  margin-right: 5%;
  font-size: 1rem;
`;

export const JoinButton = styled.div`
  border: none;
  background-color: #9c27b0;
  color: white;
  padding: 5%;
  border-radius: 10%;
`;
