// /* eslint-disable react/jsx-props-no-spreading */

// // import { BrowserRouter as Route } from 'react-router-dom';
// import React, { useRef } from 'react';
// import styled from 'styled-components';
// // import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// const SBox = styled.div`
//   display: flex;
//   background-color: white;
//   min-height: 50px;
// `;

// const SDateList = styled.div`
//   width: 500px;
//   height: 50px;
//   display: flex;
//   gap: 10px;
//   align-items: center;
//   background-color: white;
//   overflow-x: hidden;
// `;

// const SDate = styled.button`
//   width: 50px;
//   height: 50px;
//   flex-shrink: 0;
//   border-radius: 50%;
//   background-color: white;
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const SButton = styled.button`
//   width: 10px;
//   heigth: 10px;
//   boredr-radius: 50%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// function DateCarouselHost() {
//   const dateRef = useRef(null);
//   const date = new Date();
//   const year = date.getFullYear();
//   const month = date.getMonth();
//   const lastDay = new Date(year, month + 1, 0).getDate();
//   const dateList = Array(lastDay)
//     .fill()
//     .map((_, i) => i + 1);

//   const dateClickLeft = nextType => {
//     if (nextType === 'prev') {
//       dateRef.current.scrollTo({
//         left: dateRef.current.scrollLeft - dateRef.current.offsetWidth,
//         behavior: 'smooth',
//       });
//     }
//   };

//   const dateClickRight = nextType => {
//     if (nextType === 'next') {
//       dateRef.current.scrollTo({
//         left: dateRef.current.scrollLeft + dateRef.current.offsetWidth,
//         behavior: 'smooth',
//       });
//     }
//   };

//   return (
//     <SBox>
//       <SButton
//         type="button"
//         onClick={() => {
//           dateClickLeft('prev');
//         }}
//       >
//         클릭
//       </SButton>
//       <SDateList ref={dateRef}>
//         {dateList.map(setDate => (
//           <SDate>{setDate}</SDate>
//         ))}
//       </SDateList>
//       <SButton
//         type="button"
//         onClick={() => {
//           dateClickRight('next');
//         }}
//       >
//         클릭
//       </SButton>
//     </SBox>
//   );
// }

// export default DateCarouselHost;

// --------------------------------------------------------------------

/* eslint-disable react/jsx-props-no-spreading */

// import { BrowserRouter as Route } from 'react-router-dom';
import React, { useRef } from 'react';
import styled from 'styled-components';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const SBox = styled.div`
  display: flex;
  background-color: white;
  min-height: 50px;
`;

const SDateList = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: white;
  overflow-x: hidden;
`;

const SDate = styled.button`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SButton = styled.button`
  width: 10px;
  heigth: 10px;
  boredr-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function DateCarouselHost() {
  const dateRef = useRef(null);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const lastDay = new Date(year, month + 1, 0).getDate();
  const dateList = Array(lastDay)
    .fill()
    .map((_, i) => i + 1);
  const dayList = ['일', '월', '화', '수', '목', '금', '토'];
  const dateToDay = dayList[dateList.getDay()];
  const dateClickLeft = nextType => {
    if (nextType === 'prev') {
      dateRef.current.scrollTo({
        left: dateRef.current.scrollLeft - dateRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const dateClickRight = nextType => {
    if (nextType === 'next') {
      dateRef.current.scrollTo({
        left: dateRef.current.scrollLeft + dateRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  return (
    <SBox>
      <SButton
        type="button"
        onClick={() => {
          dateClickLeft('prev');
        }}
      >
        클릭
      </SButton>
      <SDateList ref={dateRef}>
        {dateList.map(setDate => (
          <SDate>{setDate}</SDate>
        ))}
        {dateToDay.map(setday => (
          <SDate>{setday}</SDate>
        ))}
      </SDateList>
      <SButton
        type="button"
        onClick={() => {
          dateClickRight('next');
        }}
      >
        클릭
      </SButton>
    </SBox>
  );
}

export default DateCarouselHost;
