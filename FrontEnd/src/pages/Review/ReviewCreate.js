/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Container,
  Typography,
  Grid,
  // Select,
  Button,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { reviewListState } from '../../recoilState';
import Nav from '../../components/common/Nav';
import Header from '../../components/common/Header';
import API_URL from '../../api/api';

const SH1 = styled.h1`
  font-size: 2rem;
  margin-left: 1rem;
  margin-bottom: 2rem;
`;

// const STemp = styled.div`
//   display: flex;
//   justify-content: center;
// `;
// const SFileUploadButton = styled(Button)`
//   font-family: 'cafe24';
// `;

// const SPreviewCard = styled(Grid)`
//   display: flex;
//   justify-content: center;
// `;
function ReviewCreate() {
  const navigate = useNavigate();
  const reviewList = useRecoilValue(reviewListState);
  let id = reviewList[0].reviewId;
  console.log('id1 :', id);
  console.log('reviewListState : ', reviewListState[0]);
  const getId = () => {
    id += 1;
    return id;
  };
  // console.log('id2 :', id);

  //   확인용
  // const temp = useRecoilValue(reviewList);
  // useEffect(() => {
  //   console.log(temp);
  // }, [id]);

  // const setreviewList = useSetRecoilState(reviewListState);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [images, setImages] = useState([]);
  // const [previews, setPreviews] = useState([]);

  // const [imgPreview, setImgPreview] = useState('');

  const handleTitle = e => {
    setTitle(e.target.value);
  };

  const handleContent = e => {
    setContent(e.target.value);
  };

  // Image 사용
  // const handleImages = e => {
  //   setImages(e.target.files);
  //   const imageLists = e.target.files;
  //   let imageUrlLists = [...previews];

  //   for (let i = 0; i < imageLists.length; i += 1) {
  //     const currentImageUrl = URL.createObjectURL(imageLists[i]);
  //     imageUrlLists.push(currentImageUrl);
  //   }

  //   if (imageUrlLists.length > 10) {
  //     imageUrlLists = imageUrlLists.slice(0, 10);
  //   }

  //   setPreviews(imageUrlLists);
  // };

  // Preview 코드
  // const handlePreviewList = e => {
  //   // console.log(e.target.name);
  //   const temp = [...images];
  //   const temp2 = [...previews];
  //   temp.splice(e.target.name, 1);
  //   // console.log(temp);
  //   temp2.splice(e.target.name, 1);
  //   // console.log(temp2);
  //   setImages(temp);
  //   setPreviews(temp2);
  // };

  const addReview = e => {
    e.preventDefault();
    // console.log(e);
    const formData = new FormData();

    // formData.append('image', images);
    const variables = [
      {
        reviewId: getId(),
        shelterId: 0,
        title,
        content,
      },
    ];
    console.log('variables : ', variables);
    formData.append(
      'data',
      new Blob([JSON.stringify(variables)], { type: 'application/json' }),
    );
    axios.post(`${API_URL}/review`, formData);
    // axios.post('http://192.168.31.226:3000/animal/create', formData);

    // 확인용
    // console.log('formData : ', formData);
    navigate(`/review/${variables[0].reviewId}`);
    console.log('variables[0].reviewId : ', variables[0].reviewId);
    // navigate('/review');
  };

  return (
    <>
      <Header />
      <SH1>후기 등록</SH1>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <form onSubmit={addReview}>
            <Grid container spacing={2}>
              {/* 제목 */}
              <Grid item xs={12}>
                <Typography component="h6" variant="body2">
                  제목
                </Typography>
                <TextField
                  type="text"
                  onChange={handleTitle}
                  placeholder="제목을 입력해 주세요."
                  fullWidth
                  required
                  style={{ marginBottom: 20 }}
                />
              </Grid>

              {/* 내용 */}
              <Grid item xs={12}>
                <Typography component="h6" variant="body2">
                  내용
                </Typography>
                <TextField
                  onChange={handleContent}
                  multiline
                  rows={20}
                  placeholder="내용을 입력해 주세요."
                  fullWidth
                  required
                  style={{ marginBottom: 20 }}
                />
              </Grid>

              {/* 이미지 */}
              {/* <Grid item xs={12}>
                <Typography component="h6" variant="body2">
                  사진
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    {previews.map((image, imageId) => (
                      <SPreviewCard item xs={6}>
                        <img
                          src={image}
                          alt={`${image}-${imageId}`}
                          style={{ width: '10rem' }}
                        />
                        <Button
                          type="button"
                          onClick={handlePreviewList}
                          name={`${imageId}`}
                          variant="contained"
                          color="error"
                        >
                          삭제
                        </Button>
                      </SPreviewCard>
                    ))}
                  </Grid>
                </Box>
              </Grid> */}

              {/* 파일 업로드 */}
              {/* <Grid item xs={12}>
                <STemp>
                  <SFileUploadButton variant="contained" component="label">
                    파일 업로드
                    <input
                      type="file"
                      hidden
                      onChange={handleImages}
                      multiple="multiple"
                      accept="image/*"
                    />
                  </SFileUploadButton>
                </STemp>
              </Grid> */}
            </Grid>

            <Button type="submit">후기 등록하기</Button>
          </form>
        </Box>
      </Container>

      <Nav />
    </>
  );
}

export default ReviewCreate;
