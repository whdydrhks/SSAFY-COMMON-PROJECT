/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable block-scoped-var */
/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable arrow-body-style */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable prefer-object-spread */
/* eslint-disable no-use-before-define */
/* eslint-disable object-shorthand */
/* eslint-disable array-callback-return */

import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { TextField } from '@mui/material';
import * as S from './LiveChatStyle';
import UserVideoComponent from './UserVideoComponent';
import CreateSchedule from '../../components/Schedule/CreateSchedule';
import { userAtom, roomNumberAtom } from '../../recoilState';
// import TextChat from './TextChat';
import API_URL from '../../api/api';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';
import ExitSign from '../../images/Video/ExitSign.png';
import MicOff from '../../images/Video/MicOff.png';
import MicOn from '../../images/Video/MicOn.png';
import CamOff from '../../images/Video/CamOff.png';
import CamOn from '../../images/Video/CamOn.png';
import VolumeOff from '../../images/Video/VolumeOff.png';
import VolumeOn from '../../images/Video/VolumeOn.png';
import { getCookie } from '../Account/cookie';

// const APPLICATION_SERVER_URL = 'http://localhost:5000';

const APPLICATION_SERVER_URL = API_URL + '/openvidu';
// const APPLICATION_SERVER_URL = 'https://i8b209.p.ssafy.io:9999/api/v1/openvidu';
// const OPENVIDU_SERVER_SECRET = 'ssafy';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'secondary',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'secondary',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'secondary',
    },
    '&:hover fieldset': {
      borderColor: 'secondary',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'secondary',
    },
  },
});

function Live() {
  const accessToken = getCookie('accessToken');
  const navigate = useNavigate();

  const location = useLocation();
  // console.log(location);\

  // const tempRoomNumber = location.state.roomNumber;
  // const temp2 = tempRoomNumber.toString();
  // const roomNumber = temp2.substring(10, 14);

  var roomNumber = useRecoilValue(roomNumberAtom);

  if (!roomNumber) {
    var tempRoomNumber = location.state.roomNumber;
    var temp2 = tempRoomNumber.toString();
    var roomNumber = temp2.substring(10, 14);
  }

  if (roomNumber) {
    console.log(roomNumber);
  }
  // console.log(roomNumber);
  const chatRef = useRef();
  // 유저 정보, 이메일, role 불러와야함

  if (accessToken) {
    var { nickname, email, role } = useRecoilValue(userAtom);
  } else {
    var nickname = 'anonymous';
    var role = 'USER';
  }

  // console.log(nickname);
  // console.log(role);

  const [session, setSession] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [hostSessionName, setHostSessionName] = useState(roomNumber);
  const tmp = roomNumber;
  console.log(roomNumber);
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  console.log(tmp);
  console.log('##############################');

  // const [mySessionId, setMySessionId] = useState(
  //   role === 'HOST' ? tmp : hostSessionName,
  // );
  const [mySessionId, setMySessionId] = useState(roomNumber);

  const [myUserName, setMyUserName] = useState(nickname);

  const [liveId, setLiveId] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [host, setHost] = useState(undefined);
  const [isMic, setIsMic] = useState(true);
  const [isCam, setIsCam] = useState(true);
  const [isVolume, setIsVolume] = useState(true);

  const [OV, setOV] = useState(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);

  const [sendMsg, setSendMsg] = useState('');
  const [receiveMsg, setReceiveMsg] = useState([]);
  const [oneChat, setOneChat] = useState('');

  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload);
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload);
    };
  }, []);

  // 메세지 수신
  useEffect(() => {
    if (session) {
      session.on('signal:my-chat', event => {
        let words = event.from.data.split('"');
        let name = words[3];
        setOneChat({ name: name, data: event.data });
      });
    }
  }, [session]);

  // 채팅 리스트에 추가
  useEffect(() => {
    oneChat && setReceiveMsg(prev => [...prev, oneChat]);

    // session 정보가 없을 경우 useRef에서 chatRef를 찾지못함
    if (session) {
      // chatRef.current.scrollIntoView(false);
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [oneChat]);

  useEffect(() => {
    if (role === 'user') {
      if (!hostSessionName) {
        alert('요청된 세션이 없습니다. 종료 후 정상접근 해주세요.');
      } else {
        console.log(hostSessionName);
      }
    }
  }, [hostSessionName]);

  useEffect(() => {
    if (session) {
      session.on('streamCreated', streamCreated);
      session.on('streamDestroyed', streamDestroyed);
      session.on('exception', exception);
      getToken().then(sessionConnect);
    }
  }, [session]);

  const sessionConnect = token => {
    session
      .connect(token, { clientData: myUserName, clientRole: role })
      .then(() => {
        let publisher = OV.initPublisher(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: '1280x960',
          frameRate: 30,
          insertMode: 'APPEND',
          mirror: false,
        });
        publisher.subscribeToRemote();
        session.publish(publisher);
        setPublisher(publisher);
        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        console.log(publisher);
        if (role === 'USER') {
          setUser(publisher);
        }
        if (role === 'HOST') {
          setHost(publisher);
        }
        setSession(session);
      })
      .catch(error => {});
  };

  // const handleTitle = e => {
  //   setTitle(e.target.value);
  // };

  const handleCategory = e => {
    setCategory(e.target.id);
  };

  const handleRoomName = e => {
    setRoomName(e.target.value);
  };

  const handleImages = e => {
    // console.log(e.target.files, '1');

    setImage(e.target.files);
    console.log('########################');
    console.log(image);
    const tempPreview = URL.createObjectURL(e.target.files[0]);
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@');
    // console.log(tempPreview, '2');
    setPreview(tempPreview);
    // console.log(preview);
  };
  const switchCamera = () => {
    let OV = new OpenVidu();

    OV.getDevices().then(devices => {
      var videoDevices = devices.filter(device => device.kind === 'videoinput');

      console.log('기존', publisher);
      if (videoDevices && videoDevices.length > 1) {
        let newPublisher = OV.initPublisher(undefined, {
          videoSource: videoDevices[1].deviceId,
          // isFrontCamera
          //   ? videoDevices[1].deviceId
          //   : videoDevices[0].deviceId,
          publishAudio: true,
          publishVideo: true,
          mirror: isFrontCamera,
        });
        console.log('####################');
        console.log(videoDevices);
        console.log(videoDevices[1].deviceId);
        console.log(videoDevices[0].deviceId);
        console.log(
          isFrontCamera ? videoDevices[1].deviceId : videoDevices[0].deviceId,
        );
        console.log('신규', newPublisher);

        setIsFrontCamera(!isFrontCamera);

        session.unpublish(publisher).then(() => {
          console.log('Old publisher unpublished!');
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
          setPublisher(newPublisher);
          session.publish(publisher).then(() => {
            console.log('New publisher published!');
          });
        });
      }
    });
  };

  const onbeforeunload = () => {
    leaveSession();
  };

  const deleteSubscriber = streamManager => {};

  const joinSession = () => {
    if (!preview && role === 'HOST') {
      alert('파일을 입력해 주세요.');
      return false;
    }
    const liveData = {
      category: 'none',
      room: roomNumber.toString(),
      title: roomName,
    };
    console.log(liveData.room);
    console.log('@@@@@@@@@@@@@');
    const thumbnailData = new FormData();
    Object.values(image).forEach(image => {
      thumbnailData.append('file', image);
    });
    if (role === 'HOST') {
      axios
        .post(`${API_URL}/live`, liveData, {
          headers: { Authorization: accessToken },
        })
        .then(res => {
          setLiveId(res.data.data);
          axios
            .post(`${API_URL}/live/${res.data.data}/image`, thumbnailData, {
              headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then(() => console.log('성공'));
        });
    }
    const getOV = new OpenVidu();

    setSession(getOV.initSession());
    setOV(getOV);
  };

  const sendMessage = e => {
    e.preventDefault();
    if (sendMsg !== '' && sendMsg !== ' ') {
      session
        .signal({
          data: sendMsg,
          to: [],
          type: 'my-chat',
        })
        .then(() => {
          setSendMsg('');
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleMsg = e => {
    setSendMsg(e.target.value);
  };

  const streamCreated = event => {
    const subscriber = session.subscribe(event.stream, undefined);
    const subRole = JSON.parse(event.stream.connection.data).clientRole;
    if (role === 'HOST' && subRole === 'USER') {
      setUser(subscriber);
    } else if (role === 'USER' && subRole === 'HOST') {
      setHost(subscriber);
    }
  };

  const streamDestroyed = event => {
    deleteSubscriber(event.stream.streamManager);
  };

  const exception = exception => {
    console.warn(exception);
  };

  const handleChangeUserName = e => {
    setMyUserName(e.target.value);
  };

  const handleChangeSessionId = e => {
    setMySessionId(e.target.value);
  };

  const leaveSession = () => {
    if (role === 'HOST') {
      if (session) {
        session.disconnect();
      }
    }
    if (role === 'USER' && session) {
      session.disconnect();
    }
    setOV(null);
    setMySessionId(role === 'HOST' ? tmp : hostSessionName);
    setSession(undefined);
    setUser(undefined);
    setMyUserName(nickname);
    setHost(undefined);
    axios.delete(`${API_URL}/live`, {
      data: {
        liveId: liveId,
      },
      headers: {
        Authorization: accessToken,
      },
    });
    navigate('/');
  };

  const getToken = () => {
    return createSession(mySessionId).then(sessionId => createToken(sessionId));
  };

  const createSession = sessionId => {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(APPLICATION_SERVER_URL + '/sessions', data, {
          headers: {
            // Authorization:
            // 'Basic ' + btoa('OPENVIDUAPP:' + APPLICATION_SERVER_URL),
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            // 'Access-Control-Allow-Methods': 'GET,POST',
          },
        })
        .then(response => {
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');

          resolve(response.data);
        })
        .catch(response => {
          var error = Object.assign({}, response);
          if (error?.response?.status === 409) {
            resolve(sessionId);
          } else {
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                APPLICATION_SERVER_URL,
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  APPLICATION_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  APPLICATION_SERVER_URL +
                  '"',
              )
            ) {
              window.location.assign(
                APPLICATION_SERVER_URL + '/accept-certificate',
              );
            }
          }
        });
    });
  };

  const createToken = sessionId => {
    return new Promise((resolve, reject) => {
      const data = {
        type: 'WEBRTC',
        role: 'PUBLISHER',
        kurentoOptions: {
          videoMaxRecvBandwidth: 1000,
          videoMinRecvBandwidth: 300,
          videoMaxSendBandwidth: 1000,
          videoMinSendBandwidth: 300,
          allowedFilters: [
            'GStreamerFilter',
            'FaceOverlayFilter',
            'ChromaFilter',
          ],
        },
      };
      axios
        .post(
          APPLICATION_SERVER_URL + '/sessions/' + sessionId + '/connections',
          data,
          {
            headers: { 'Content-Type': 'application/json' },
          },
        )
        .then(response => {
          console.log(response.data);
          resolve(response.data);
        })
        .catch(error => reject(error));
    });
  };

  return (
    <S.VideoChatRoot>
      <Header />

      {session === undefined ? (
        <div>
          {(() => {
            switch (role) {
              case 'HOST':
                return (
                  <>
                    <S.WaitingDiv>
                      <S.Header>Live 생성</S.Header>
                      <CssTextField
                        label="방 제목"
                        id="custom-css-outlined-input"
                        onChange={handleRoomName}
                        style={{
                          width: '80%',
                          marginLeft: '10%',
                          marginBottom: '20%',
                        }}
                      />
                      {preview ? (
                        <S.ImgCenter>
                          <S.ThumbnailImage
                            src={preview}
                            alt="Thumbnail"
                            style={{ width: '30%' }}
                          />
                        </S.ImgCenter>
                      ) : null}
                      <S.FileUploadButton
                        variant="contained"
                        component="label"
                        color="secondary"
                        style={{ width: '40%' }}
                      >
                        썸네일 업로드
                        <input
                          type="file"
                          hidden
                          onChange={handleImages}
                          multiple="multiple"
                          accept="image/*"
                        />
                      </S.FileUploadButton>
                      <S.JoinButton
                        type="button"
                        variant="contained"
                        component="label"
                        onClick={joinSession}
                        color="secondary"
                        style={{ marginTop: '10%' }}
                      >
                        방 입장하기
                      </S.JoinButton>
                    </S.WaitingDiv>
                  </>
                );
              case 'USER':
                return (
                  <>
                    <S.JoinButton
                      type="button"
                      variant="contained"
                      component="label"
                      onClick={joinSession}
                      color="secondary"
                      style={{ marginTop: '10%' }}
                    >
                      방 입장하기
                    </S.JoinButton>
                  </>
                );
              default:
                return (
                  <>
                    <S.JoinForm className="form-group" onSubmit={joinSession}>
                      <p className="text-center">
                        <S.JoinDiv>
                          <S.JoinButton type="button" onClick={joinSession}>
                            방 입장하기
                          </S.JoinButton>
                        </S.JoinDiv>
                      </p>
                    </S.JoinForm>
                  </>
                );
            }
          })()}
        </div>
      ) : null}

      {session !== undefined ? (
        <div id="session">
          {host !== undefined ? (
            <UserVideoComponent
              streamManager={host}
              style={{ height: '80vh' }}
            />
          ) : (
            // 세션 있고 호스트가 없는 경우
            <S.div id="main-video" className="col-md-6">
              {(() => {
                switch (role) {
                  case 'USER':
                    return (
                      <>
                        {/* <S.SmallCamera>
                          <UserVideoComponent
                            streamManager={user}
                            style={{ height: '25vh' }}
                          />
                        </S.SmallCamera> */}
                        <S.WaitingMessageBox>
                          <S.WaitingMessage>
                            상대방의 입장을 기다리는 중입니다.
                          </S.WaitingMessage>
                        </S.WaitingMessageBox>
                      </>
                    );
                }
              })()}
            </S.div>
          )}
        </div>
      ) : null}

      {session ? (
        <S.ChatBox>
          <S.LeaveBox>
            <div onClick={leaveSession}>
              <S.ExitSign src={ExitSign} alt="ExitSign" />
            </div>
            <div
              onClick={() => {
                publisher.publishAudio(!isMic);
                setIsMic(!isMic);
              }}
            >
              {isMic ? (
                <S.MicOff src={MicOff} alt="MicOff" />
              ) : (
                <S.MicOn src={MicOn} alt="MicOn" />
              )}
            </div>
            <div
              onClick={() => {
                publisher.publishVideo(!isCam);
                setIsCam(!isCam);
              }}
            >
              {isCam ? (
                <S.CamOff src={CamOff} alt="CamOff" />
              ) : (
                <S.CamOn src={CamOn} alt="CamOn" />
              )}
            </div>
            <div
              onClick={() => {
                publisher.publishAudio(!isVolume);
                setIsVolume(!isVolume);
              }}
            >
              {isVolume ? (
                <S.VolumeOff src={VolumeOff} alt="VolumeOff" />
              ) : (
                <S.VolumeOn src={VolumeOn} alt="VolumeOn" />
              )}
            </div>
          </S.LeaveBox>

          <S.ChattingListBox ref={chatRef}>
            {receiveMsg.map((data, index) => (
              <S.ChatInline>
                <S.Chat key={index}>
                  <S.NickName>{data.name}</S.NickName> :
                  <S.Data> {data.data}</S.Data>
                  {/* {data.name} : {data.data} */}
                </S.Chat>
              </S.ChatInline>
            ))}
          </S.ChattingListBox>

          {/* 채팅창 */}
          {(() => {
            switch (role) {
              case 'HOST':
                return (
                  <S.ChatForm>
                    <form onSubmit={sendMessage}>
                      <S.ChatInput
                        type="text"
                        onChange={handleMsg}
                        value={sendMsg}
                      />
                      <S.ChatButton type="submit">전송</S.ChatButton>
                    </form>
                  </S.ChatForm>
                );
              case 'USER':
                return (
                  <S.ChatForm>
                    <form onSubmit={sendMessage}>
                      <S.ChatInput
                        type="text"
                        onChange={handleMsg}
                        value={sendMsg}
                      />
                      <S.ChatButton type="submit">전송</S.ChatButton>
                    </form>
                  </S.ChatForm>
                );
              default:
                return (
                  <S.ChatForm>
                    <form onSubmit={sendMessage}>
                      <S.ChatInput
                        type="text"
                        onChange={handleMsg}
                        placeholder="채팅을 하시려면 로그인을 해주세요."
                        value={sendMsg}
                        disabled
                      />
                      <S.ChatButton type="submit">전송</S.ChatButton>
                    </form>
                  </S.ChatForm>
                );
            }
          })()}
          {/* <S.ChatForm>
            <form onSubmit={sendMessage}>
              <S.ChatInput type="text" onChange={handleMsg} value={sendMsg} />
              <S.ChatButton type="submit">전송</S.ChatButton>
            </form>
          </S.ChatForm> */}
        </S.ChatBox>
      ) : null}
      {nickname !== 'anonymous' && role === 'USER' ? <CreateSchedule /> : null}
      <Nav />
    </S.VideoChatRoot>
  );
}

export default Live;
