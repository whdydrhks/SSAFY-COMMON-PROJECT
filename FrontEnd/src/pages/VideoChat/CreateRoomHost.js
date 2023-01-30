/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */

import React, { useRef } from 'react';
import styled from 'styled-components';
import Header from '../../components/common/Header';
import Nav from '../../components/common/Nav';

const SVideo = styled.video`
  width: 400px;
  height: 400px;
`;

function CreateRoomHost() {
  let myStream;
  let muted = false;
  let cameraOff = false;
  const myVideoRef = useRef();
  const mutedRef = useRef('');
  const cameraOffRef = useRef('');

  async function getCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter(device => device.kind === 'videoinput');
      console.log(cameras);
    } catch (e) {
      console.log(e);
    }
  }

  async function getMedia() {
    try {
      myStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
    } catch (e) {
      console.log(e);
    }
    myVideoRef.current.srcObject = myStream;
    await getCameras();
  }

  getMedia();

  function handleMute() {
    myStream
      .getAudioTracks()
      .forEach(track => (track.enabled = !track.enabled));
    if (!muted) {
      mutedRef.current.innerText = 'unmute';
    } else {
      mutedRef.current.innerText = 'mute';
    }
    muted = !muted;
  }

  function handleCamera() {
    myStream
      .getVideoTracks()
      .forEach(track => (track.enabled = !track.enabled));
    if (!cameraOff) {
      cameraOffRef.current.innerText = 'camera On';
    } else {
      cameraOffRef.current.innerText = 'camera Off';
    }
    cameraOff = !cameraOff;
  }
  return (
    <>
      <Header />
      <SVideo autoPlay playsInline ref={myVideoRef} />
      <button type="button" onClick={handleMute} ref={mutedRef}>
        mute
      </button>
      <button type="button" onClick={handleCamera} ref={cameraOffRef}>
        camera
      </button>
      화상채팅방만들기
      <Nav />
    </>
  );
}

export default CreateRoomHost;
