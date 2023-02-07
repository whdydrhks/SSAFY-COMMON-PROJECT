/* eslint-disable react/jsx-props-no-spreading */

// import React from 'react';
// import styled from 'styled-components';
// import '../../styles/slick.css';
// import '../../styles/slick-theme.css';
// import Slider from 'react-slick';

// const SDay = styled.button`
//   width: 50px;
//   height: 50px;
//   flex-shrink: 0;
//   border-radius: 50%;
//   cursor: pointer;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// function DayCarousel() {
//   const settings = {
//     // arrows: true,
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     focusOnSelect: true,
//   };
//   return (
//     <div>
//       <Slider {...settings}>
//         {/* <Slider> */}
//         <SDay>일</SDay>
//         <SDay>월</SDay>
//         <SDay>화</SDay>
//         <SDay>수</SDay>
//         <SDay>목</SDay>
//         <SDay>금</SDay>
//         <SDay>토</SDay>
//       </Slider>
//     </div>
//   );
// }

// export default DayCarousel;

// ---------------------------------------------------------------------
import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SBox = styled.div`
  display: flex;
  background-color: white;
  min-height: 50px;
`;

const SDayList = styled.div`
  width: 500px;
  height: 50px;
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: white;
  overflow-x: hidden;
`;

const SButton = styled.button`
  width: 10px;
  heigth: 10px;
  boredr-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SDay = styled.button`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function DayCarouselHost(props) {
  const { setDay } = props;
  console.log(setDay);

  const dayRef = useRef(null);
  // const daylist = ['일', '월', '화', '수', '목', '금', '토'];

  const dayList = [
    {
      title: '일',
      value: 'Sun',
    },
    {
      title: '월',
      value: 'Mon',
    },
    {
      title: '화',
      value: 'Tue',
    },
    {
      title: '수',
      value: 'Wed',
    },
    {
      title: '목',
      value: 'Thr',
    },
    {
      title: '금',
      value: 'Fri',
    },
    {
      title: '토',
      value: 'Sat',
    },
  ];

  const dayClickLeft = nextType => {
    if (nextType === 'prev') {
      dayRef.current.scrollTo({
        left: dayRef.current.scrollLeft - dayRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const dayClickRight = nextType => {
    if (nextType === 'next') {
      dayRef.current.scrollTo({
        left: dayRef.current.scrollLeft + dayRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleClick = value => {
    console.log('value : ', value);
    setDay(value);
  };

  return (
    <SBox>
      <SButton
        type="button"
        onClick={() => {
          dayClickLeft('prev');
        }}
      >
        클릭
      </SButton>
      <SDayList ref={dayRef}>
        {dayList.map(day => (
          <SDay type="button" onClick={() => handleClick(day.value)}>
            {day.title}
          </SDay>
        ))}
      </SDayList>
      <SButton
        type="button"
        onClick={() => {
          dayClickRight('next');
        }}
      >
        클릭
      </SButton>
    </SBox>
  );
}

DayCarouselHost.propTypes = {
  // ?
  setDay: PropTypes.func.isRequired,
};

export default DayCarouselHost;
