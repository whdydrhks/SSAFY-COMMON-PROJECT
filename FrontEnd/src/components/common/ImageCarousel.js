/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../../styles/slick-theme.css';
import '../../styles/slick.css';
import '../../styles/cafe24.css';
import Slider from 'react-slick';

// const STitleBox = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1rem;
//   margin-left: 1rem;
//   margin-right: 1rem;
// `;

// const STitle = styled.h1`
//   font-family: 'cafe24';
//   font-size: 2rem;
// `;

// const SMoreLink = styled(Link)`
//   font-size: 1.5rem;
//   font-family: 'cafe24';
//   text-decoration: none;
// `;
const SImage = styled.div`
  width: 240px;
  height: 120px;
  border: 1px solid black;
`;

const SSlider = styled(Slider)`
  margin-bottom: 5rem;
`;

function ImageCarousel(props) {
  const settings = {
    arrows: false,
    autoplay: true,
    centerPadding: '0px',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log(props);
  // const [images, setImages] = useState([]);
  // const type = props.type;

  // useEffect(() => {
  //   const getImages = async () => {
  //     try {
  //       setImages(
  //         await axios.get(url, {
  //           params: { type },
  //         }),
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   getImages();
  // }, []);

  return (
    <div>
      {/* <STitleBox>
        <STitle>Live</STitle>
        <SMoreLink to="/live">더 보기 &gt;</SMoreLink>
      </STitleBox> */}
      <SSlider {...settings}>
        <SImage>1</SImage>
        <SImage>2</SImage>
        <SImage>3</SImage>
        <SImage>4</SImage>
        <SImage>5</SImage>
        <SImage>6</SImage>
        {/* {
          images.map(imageItem =>(
            <img src={} />
          ))
        } */}
      </SSlider>
    </div>
  );
}

export default ImageCarousel;
