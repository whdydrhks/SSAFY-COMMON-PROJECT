import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SToggle = styled.div`
  position: relative;
  left: 47%;
  cursor: pointer;
  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    background-color: rgb(233, 233, 234);
  }
  //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  > .toggle--checked {
    background-color: rgb(0, 200, 102);
    transition: 0.5s;
  }

  > .toggle-circle {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: rgb(255, 254, 255);
    transition: 0.5s;
    //.toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현
  }
  > .toggle--checked {
    left: 27px;
    transition: 0.5s;
  }
`;

// const SDesc = styled.div`
//   //설명 부분의 CSS를 구현
//   text-align: center;
//   margin-top: 20px;
// `;

const SBox = styled.div`
  padding: 20px;
  display: flex;
`;

function Toggle(props) {
  const { on } = props;

  console.log('on : ', on, typeof on);

  const [toggleOn, setToggleOn] = useState(on === '1');
  const toggleHandler = () => {
    setToggleOn(!toggleOn);
  };

  useEffect(() => {
    // console.log('토글온 : ', toggleOn);
    setToggleOn(on === '1');
  }, [on]);

  // const [saveSchedule, setSaveSchedule] = useState([]);
  // const onSubmit = event => {
  //   event.preventDefault();
  //   if (toggleOn === false) {
  //     return;
  //   }
  //   setToggleOn(false);
  //   setSaveSchedule(current => [toggleOn, ...current]);
  // };
  // console.log(saveSchedule);
  return (
    <div>
      <SToggle onClick={toggleHandler}>
        <div
          className={`toggle-container ${toggleOn ? 'toggle--checked' : null}`}
        />
        <div
          className={`toggle-circle ${toggleOn ? 'toggle--checked' : null}`}
        />
      </SToggle>
      {/* {toggleOn === '0' ? (
        <SDesc>
          <div className="OFF" />
        </SDesc>
      ) : (
        <SDesc>
          <div className="ON" />
        </SDesc>
      )} */}
      {toggleOn ? <div>켜짐</div> : <div>꺼짐</div>}
    </div>
  );
}

function ManageTimeHost(props) {
  const { start, end, times } = props;

  // console.log('times : ', times);
  // console.log(times[8]);
  // console.log(times);

  // console.log('렌더링');

  const testList = times
    .substring(start, end + 1)
    .split('')
    .map((v, i) => ({
      on: v,
      index: i,
    }));

  console.log('testList : ', testList);

  // const timeList = [
  //   '09:00 ~ 10:00',
  //   '10:00 ~ 11:00',
  //   '11:00 ~ 12:00',
  //   '12:00 ~ 13:00',
  //   '13:00 ~ 14:00',
  //   '14:00 ~ 15:00',
  //   '15:00 ~ 16:00',
  //   '16:00 ~ 17:00',
  //   '17:00 ~ 18:00',
  // ];

  return (
    <div>
      <div>
        <h1>{times}</h1>
        {/* {timeList.map(time => (
          <SBox>
            {time}
            <Toggle />
          </SBox>
        ))} */}
        {testList.map(time => {
          console.log('timeeeeeeeeee : ', time);
          return (
            <SBox>
              {`${start + time.index}:00 ~ ${start + time.index + 1}:00`}
              <Toggle on={time.on} />
            </SBox>
          );
        })}
      </div>
      <form>
        <button type="submit">적용</button>
      </form>
    </div>
  );
}

ManageTimeHost.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  times: PropTypes.string.isRequired,
};

Toggle.propTypes = {
  on: PropTypes.string.isRequired,
};

export default ManageTimeHost;
