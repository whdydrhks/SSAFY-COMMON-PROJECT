/* eslint-disable no-return-await */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/sort-comp */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-unused-state */
/* eslint-disable prefer-template */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable default-case */
/* eslint-disable no-undef */
/* eslint-disable no-shadow */
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
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import * as S from './VideoChatStyle';
import UserVideoComponent from './UserVideoComponent';
import { userAtom } from '../../recoilState';
// import TextChat from './TextChat';
import API_URL from '../../api/api';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';

// const APPLICATION_SERVER_URL = 'http://localhost:5000';

const APPLICATION_SERVER_URL = API_URL + '/openvidu';
// const APPLICATION_SERVER_URL = 'https://i8b209.p.ssafy.io:9999/api/v1/openvidu';
// const OPENVIDU_SERVER_SECRET = 'ssafy';

function VideoChat() {
  const navigate = useNavigate();
  const chatRef = useRef();

  // 유저 정보, 이메일, role 불러와야함
  const { nickname, email, role } = useRecoilValue(userAtom);
  const [session, setSession] = useState(undefined);
  const [user, setUser] = useState(undefined);
  const [hostSessionName, setHostSessionName] = useState('ssafy1');
  const tmp = 'ssafy1';
  const [mySessionId, setMySessionId] = useState(
    role === 'HOST' ? tmp : hostSessionName,
  );

  const [myUserName, setMyUserName] = useState(nickname);

  const [publisher, setPublisher] = useState(undefined);
  const [host, setHost] = useState(undefined);

  const [OV, setOV] = useState(null);
  const [isFrontCamera, setIsFrontCamera] = useState(false);

  const [sendMsg, setSendMsg] = useState('');
  const [receiveMsg, setReceiveMsg] = useState([]);
  const [oneChat, setOneChat] = useState('');

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
      chatRef.current.scrollIntoView(false);
    }
  }, [oneChat]);

  // useEffect(() => {
  //   if (session) {
  //     session.on('signal:my-chat', event => {
  //       let temp = event.from.data;
  //       let words = event.from.data.split('"');
  //       let name = words[3];
  //       receiveMsg.push({ name: name, data: event.data });
  //       console.log(receiveMsg);
  //       setReceiveMsg(receiveMsg);
  //     });
  //   }
  // }, [session]);

  // useEffect(() => {
  //   session.on('signal', event => {
  //     let name = event.from.data;
  //     receiveMsg.push({ name: name, data: event.data });
  //     setReceiveMsg(receiveMsg);
  //   });
  // }, [receiveMsg]);

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
    const getOV = new OpenVidu();

    setSession(getOV.initSession());
    setOV(getOV);

    // console.log(OV);
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
        navigate('/');
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
        // <S.WaitingDiv>
        // <div id="join-dialog" className="jumbotron vertical-center">
        <S.WaitingDiv>
          <S.Title>
            <h1>화상채팅 참여하기</h1>
          </S.Title>
          <S.JoinForm className="form-group" onSubmit={joinSession}>
            <S.NameDiv>
              <label>참가자 이름</label>
              <input
                className="form-control"
                type="text"
                id="userName"
                value={myUserName}
                onChange={handleChangeUserName}
                required
                disabled
              />
            </S.NameDiv>
            <S.RoomNameDiv>
              <label>방 제목</label>
              <input
                className="form-control"
                type="text"
                id="sessionId"
                value={mySessionId}
                onChange={handleChangeSessionId}
                required
                // disabled
              />
            </S.RoomNameDiv>
            <p className="text-center">
              <S.JoinDiv>
                <S.JoinButton type="button" onClick={joinSession}>
                  방 입장하기
                </S.JoinButton>
              </S.JoinDiv>
            </p>
          </S.JoinForm>
        </S.WaitingDiv>
      ) : // </div>
      // </S.WaitingDiv>
      null}

      {session !== undefined ? (
        <div id="session">
          {/* 메인 화면 제목 */}
          <h1 id="session-title">방 번호 : {mySessionId}</h1>

          {host !== undefined ? (
            <S.div id="main-video" className="col-md-6">
              {(() => {
                switch (role) {
                  case 'HOST':
                    return (
                      <>
                        <S.SmallCamera>
                          <UserVideoComponent streamManager={host} />
                        </S.SmallCamera>
                        {user === undefined ? (
                          <S.WaitingMessageBox>
                            <S.WaitingMessage>
                              상대방의 입장을 기다리는 중입니다.
                            </S.WaitingMessage>
                          </S.WaitingMessageBox>
                        ) : (
                          <div>
                            <UserVideoComponent streamManager={user} />
                          </div>
                        )}
                      </>
                    );
                  case 'USER':
                    return (
                      <>
                        <S.SmallCamera>
                          <UserVideoComponent streamManager={user} />
                        </S.SmallCamera>
                        <div>
                          <UserVideoComponent streamManager={host} />
                        </div>
                      </>
                    );
                }
              })()}

              <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchCamera"
                onClick={switchCamera}
                value="카메라 전환"
              />
            </S.div>
          ) : (
            // 세션 있고 호스트가 없는 경우
            <S.div id="main-video" className="col-md-6">
              {(() => {
                switch (role) {
                  case 'USER':
                    return (
                      <>
                        <S.SmallCamera>
                          <UserVideoComponent streamManager={user} />
                        </S.SmallCamera>
                        <S.WaitingMessageBox>
                          <S.WaitingMessage>
                            상대방의 입장을 기다리는 중입니다.
                          </S.WaitingMessage>
                        </S.WaitingMessageBox>
                      </>
                    );
                }
              })()}

              <input
                className="btn btn-large btn-success"
                type="button"
                id="buttonSwitchCamera"
                onClick={switchCamera}
                value="카메라 전환"
              />
            </S.div>
          )}

          <div id="session-header">
            {/* 메인 화면 제목 */}
            {/* <h1 id="session-title">{mySessionId}</h1> */}
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
          </div>
        </div>
      ) : null}

      {session ? (
        <S.ChatBox>
          <S.ChattingListBox ref={chatRef}>
            {receiveMsg.map((data, index) => (
              <S.Chat key={index}>
                {data.name} : {data.data}
              </S.Chat>
            ))}
          </S.ChattingListBox>

          {/* 채팅창 */}
          <S.ChatForm>
            <form onSubmit={sendMessage}>
              <input type="text" onChange={handleMsg} value={sendMsg} />
              <button type="submit">메시지 보내기</button>
            </form>
          </S.ChatForm>
        </S.ChatBox>
      ) : null}
      <Nav />
    </S.VideoChatRoot>
  );
}

export default VideoChat;
