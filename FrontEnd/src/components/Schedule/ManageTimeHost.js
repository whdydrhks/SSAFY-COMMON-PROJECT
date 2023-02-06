// import React from 'react';
// import Switch from '@mui/material/Switch';

// function ManageTimeHost() {

//   const timeList = [
//     '09:00 ~ 10:00',
//     '10:00 ~ 11:00',
//     '11:00 ~ 12:00',
//     '12:00 ~ 13:00',
//     '13:00 ~ 14:00',
//     '14:00 ~ 15:00',
//     '15:00 ~ 16:00',
//     '16:00 ~ 17:00',
//     '17:00 ~ 18:00',
//   ];

//   return (
//     <div>
//       <div>
//         {timeList.map(time => (
//           <div>
//             {time}
//             <Switch/>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ManageTimeHost;

// --------------------------------------------------------------------

import React, { useState } from 'react';
import styled from 'styled-components';

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

const SDesc = styled.div`
  //설명 부분의 CSS를 구현
  text-align: center;
  margin-top: 20px;
`;

const SBox = styled.div`
position : relative,
  text-align: right,
`;

function Toggle() {
  const [toggleOn, setToggleOn] = useState(false);
  const toggleHandler = () => {
    setToggleOn(!toggleOn);
  };
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
      {toggleOn === false ? (
        <SDesc>
          <div className="OFF" />
        </SDesc>
      ) : (
        <SDesc>
          <div className="ON" />
        </SDesc>
      )}
    </div>
  );
}

function ManageTimeHost() {
  const timeList = [
    '09:00 ~ 10:00',
    '10:00 ~ 11:00',
    '11:00 ~ 12:00',
    '12:00 ~ 13:00',
    '13:00 ~ 14:00',
    '14:00 ~ 15:00',
    '15:00 ~ 16:00',
    '16:00 ~ 17:00',
    '17:00 ~ 18:00',
  ];

  return (
    <div>
      <div>
        {timeList.map(time => (
          <SBox>
            {time}
            <Toggle />
          </SBox>
        ))}
      </div>
      <button type="submit">적용</button>
    </div>
  );
}

export default ManageTimeHost;
