/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Container,
  Typography,
  Grid,
  Button,
  // MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { reviewListState } from '../../recoilState';
import Nav from '../../components/common/Nav';
import Header from '../../components/common/Header';
import '../../styles/cafe24.css';
import API_URL from '../../api/api';

const SH1 = styled.h1`
  font-size: 2rem;
  font-family: 'cafe24';
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
function ReviewUpdate() {
  const navigate = useNavigate;
  const reviewIdForUpdate = useParams();
  const tempReviewList = useRecoilValue(reviewListState);
  const review = tempReviewList[reviewIdForUpdate.reviewId];

  console.log('review : ', review);

  // 확인용
  console.log('reviewIdForUpdate.reviewId : ', reviewIdForUpdate);
  // console.log('review : ', review);
  console.log('tempReviewList', tempReviewList[reviewIdForUpdate.reviewId]);

  const [title, setTitle] = useState(review.title);
  // 확인용
  // console.log('review.title : ', review.title);
  const [content, setContent] = useState(review.content);
  // console.log('review.content : ', review.content);
  // console.log(typeof review.content);
  // const [images, setImages] = useState([]);
  // const [previews, setPreviews] = useState([]);

  // const [imgPreview, setImgPreview] = useState('');

  const handleTitle = e => {
    setTitle(e.target.value);
  };

  const handleContent = e => {
    setContent(e.target.value);
  };

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
    // console.log('e : ', e);
    const formData = new FormData();

    // formData.append('image', images);
    const variables = [
      {
        reviewId: reviewIdForUpdate,
        shelterId: 0,
        title,
        content,
        thumbnailImage: '파일경로',
      },
    ];

    formData.append(
      'data',
      new Blob([JSON.stringify(variables)], { type: 'application/json' }),
    );
    axios.put(`${API_URL}/review`, formData);
    // axios.put('http://192.168.31.226:3000/review/create', formData);
    // console.log(variables[0].reviewId);
    navigate('/review');
    // navigate(`/review/${variables[0].reviewId}`);
  };

  return (
    <>
      <Header />
      <SH1>후기 수정</SH1>
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
                  disabled
                  type="text"
                  onChange={handleTitle}
                  placeholder="제목을 입력해 주세요."
                  fullWidth
                  required
                  style={{ marginBottom: 20 }}
                  value={title}
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
                  value={content}
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

              {/* 파일업로드 */}
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

            <Button type="submit">후기 수정하기</Button>
          </form>
        </Box>
      </Container>

      <Nav />
    </>
  );
}

export default ReviewUpdate;
