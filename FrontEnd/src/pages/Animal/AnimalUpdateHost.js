/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */

import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Container,
  Typography,
  Grid,
  Button,
  MenuItem,
  ButtonGroup,
} from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import Nav from '../../components/common/Nav';
import Header from '../../components/common/Header';
import API_URL from '../../api/api';
import { userAtom, animalState } from '../../recoilState';
import '../../styles/fonts.css';

const SBasicButton = styled(Button)`
  font-family: mainFont;
  height: 4vh;
  margin-top: 5%;
  text-align: center;
  font-size: 1rem;
`;

const SDeleteButton = styled(Button)`
  font-family: mainFont;
  height: 4vh;
  margin-top: 5%;
  text-align: center;
  font-size: 1rem;
`;

const SButtonDiv = styled.div`
  display: flex;
  justify-content: space-around;
  font-family: mainFont;
`;

const SH1 = styled.h1`
  font-size: 2rem;
  font-family: mainFont;
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

const STemp = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  font-family: mainFont;
`;

const STypography = styled(Typography)`
  /* margin-top: 1rem; */
  /* margin-bottom: 0.5rem; */
  font-family: mainFont;
`;

const SFileUploadButton = styled(Button)`
  margin-top: 5%;
  font-family: mainFont;
  text-align: center;
  width: 50%;
  font-size: 1rem;
  height: 4vh;
  /* margin-top: 1rem; */
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const SPreviewCard = styled(Grid)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  font-family: mainFont;
`;

const SPreviewImg = styled.img`
  width: 10rem;
  font-family: mainFont;
  /* margin-bottom: 1rem; */
`;

const SSubmit = styled.button`
  margin-top: 5%;
  font-family: mainFont;
  text-align: center;
  width: 50%;
  color: white;
  background-color: #9c27b0;
  border: none;
  font-size: 1rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 5px;
  height: 4vh;
`;

const SButton = styled(Button)`
  font-family: mainFont;
  font-size: 1.5rem;
`;

function AnimalUpdateHost() {
  const navigate = useNavigate();
  const animalId = useParams();
  const location = useLocation();
  const animal = location.state.animalInformation;

  const userInfo = useRecoilValue(userAtom);
  const shelterId = userInfo.shelterId;
  // const [animal, setAnimal] = useRecoilState(animalState);

  const [adoption, setAdoption] = useState(animal.adoption);
  const [manageCode, setManageCode] = useState(animal.manageCode);
  const [name, setName] = useState(animal.name);
  const [age, setAge] = useState(animal.age);
  const [gender, setGender] = useState(animal.gender);
  const [breed, setBreed] = useState(animal.breed);
  const [weight, setWeight] = useState(animal.weight);
  const [neuter, setNeuter] = useState(animal.neuter);
  const [note, setNote] = useState(animal.note);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const [imgPreview, setImgPreview] = useState('');
  const [addImgPreview, setAddImgPreview] = useState('');

  const [animalImages, setAnimalImages] = useState([]);

  const [addImages, setAddImages] = useState([]);

  const getImages = () => {
    axios
      .get(`${API_URL}/shelter/${shelterId}/animal/${animal.animalId}/image`)
      .then(res => {
        setImgPreview(res.data.data);
        // console.log('#########################');
        // console.log(res.data.data);
      });
  };
  useEffect(() => {
    getImages();
  }, []);

  const handleAdoption = e => {
    setAdoption(e.target.value);
  };

  const handleManageCode = e => {
    setManageCode(e.target.value);
  };

  const handleName = e => {
    setName(e.target.value);
  };

  const handleAge = e => {
    setAge(e.target.value);
  };

  const handleGender = e => {
    setGender(e.target.value);
  };

  const handleBreed = e => {
    setBreed(e.target.value);
  };

  const handleWeight = e => {
    setWeight(e.target.value);
  };

  const handleNeuter = e => {
    setNeuter(e.target.value);
  };

  const handleNote = e => {
    setNote(e.target.value);
  };

  const handleAddImages = e => {
    setAddImages(e.target.files);
    const imageLists = e.target.files;
    let imageUrlLists = [...addImgPreview];

    for (let i = 0; i < imageLists.length; i += 1) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setAddImgPreview(imageUrlLists);
  };

  const handleDeletePreview = e => {
    // console.log(e.target.id);
    axios.delete(e.target.id).then(res => console.log(res));
    const temp = [...imgPreview];
    temp.splice(e.target.name, 1);
    setImgPreview(temp);
  };

  const handleDeleteAddPreview = e => {
    const temp = [...addImgPreview];
    console.log(temp);
    temp.splice(e.target.name, 1);
    setAddImgPreview(temp);
  };

  const updateAnimal = e => {
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    e.preventDefault();
    // console.log('##########################################');
    const fileData = new FormData();

    const variables = {
      adoption,
      age,
      breed,
      gender,
      name,
      neuter,
      note,
      weight,
    };

    Object.values(addImages).forEach(addimage => {
      fileData.append('files', addimage);
    });

    // console.log(fileData);

    axios
      .put(
        `${API_URL}/shelter/${shelterId}/animal/${animalId.animalId}`,
        variables,
      )
      .then(() => console.log('데이터 수정완료'));

    axios
      .post(
        `${API_URL}/shelter/${shelterId}/animal/${animalId.animalId}/image`,
        fileData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      )
      .then(() => {
        // navigate('/');
        console.log('파일 수정완료');
      });
    // console.log(variables[0].animalId);
    // navigate(`/animal/${variables[0].animalId}`);
    navigate('/animal');
  };

  return (
    <>
      <Header />
      <SH1>동물 수정</SH1>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <form onSubmit={updateAnimal}>
            <Grid container spacing={2}>
              {/* 입양 상태 */}
              <Grid item xs={12}>
                <STypography component="h6" variant="body2">
                  입양 상태
                </STypography>
                <TextField
                  select
                  value={adoption}
                  onChange={handleAdoption}
                  style={{ marginBottom: 20 }}
                  defaultValue={adoption}
                >
                  <MenuItem value="F">입양 중</MenuItem>
                  <MenuItem value="T">입양 완료</MenuItem>
                </TextField>
              </Grid>

              {/* 관리 번호 */}
              <Grid item xs={12}>
                <STypography component="h6" variant="body2">
                  관리번호
                </STypography>
                <TextField
                  type="text"
                  onChange={handleManageCode}
                  fullWidth
                  required
                  style={{ marginBottom: 20 }}
                  value={manageCode}
                  defaultValue={manageCode}
                  disabled
                />
              </Grid>

              {/* 이름 */}
              <Grid item xs={12}>
                <STypography component="h6" variant="body2">
                  이름
                </STypography>
                <TextField
                  type="text"
                  onChange={handleName}
                  fullWidth
                  required
                  style={{ marginBottom: 20 }}
                  value={name}
                />
              </Grid>

              {/* 나이 */}
              <Grid item xs={12}>
                <STypography component="h6" variant="body2">
                  나이
                </STypography>
                <TextField
                  type="text"
                  onChange={handleAge}
                  fullWidth
                  required
                  style={{ marginBottom: 20 }}
                  value={age}
                />
              </Grid>

              {/* 성별 */}
              <Grid item xs={12}>
                <STypography component="h6" variant="body2">
                  성별
                </STypography>
                <TextField
                  select
                  value={gender}
                  onChange={handleGender}
                  style={{ marginBottom: 20 }}
                >
                  <MenuItem value="M">수컷</MenuItem>
                  <MenuItem value="F">암컷</MenuItem>
                </TextField>
              </Grid>

              {/* 품종 */}
              <Grid item xs={12}>
                <STypography component="h6" variant="body2">
                  품종
                </STypography>
                <TextField
                  type="text"
                  onChange={handleBreed}
                  fullWidth
                  required
                  style={{ marginBottom: 20 }}
                  value={breed}
                />
              </Grid>

              {/* 체중 */}
              <Grid item xs={12}>
                <STypography item xs={12}>
                  체중
                </STypography>
                <TextField
                  type="number"
                  value={weight}
                  onChange={handleWeight}
                  placeholder="체중을 입력해 주세요."
                  fullWidth
                  required
                  style={{ marginBottom: 20 }}
                />
              </Grid>

              {/* 중성화 여부 */}
              <Grid item xs={12}>
                <STypography component="h6" variant="body2">
                  중성화 여부
                </STypography>
                <TextField
                  select
                  value={neuter}
                  onChange={handleNeuter}
                  style={{ marginBottom: 20 }}
                >
                  <MenuItem value="T">Y</MenuItem>
                  <MenuItem value="F">N</MenuItem>
                </TextField>
              </Grid>

              {/* 특징 */}
              <Grid item xs={12}>
                <STypography component="h6" variant="body2">
                  특징
                </STypography>
                <TextField
                  onChange={handleNote}
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="특징을 입력해 주세요."
                  style={{ marginBottom: 20 }}
                  value={note}
                />
              </Grid>

              {/* 사진 */}
              <Grid item xs={12}>
                <STypography component="h6" variant="body2">
                  기존 사진
                </STypography>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={1}>
                    {/* <SPreviewContainer> */}
                    {Object.values(imgPreview).map((image, imageId) => (
                      <SPreviewCard item xs={6}>
                        <SPreviewImg
                          src={image}
                          alt={`${image}-${imageId}`}
                          // style={{ width: '10rem' }}
                        />
                        <SBasicButton
                          type="button"
                          onClick={handleDeletePreview}
                          name={`${imageId}`}
                          variant="contained"
                          color="error"
                          id={image}
                        >
                          삭제
                        </SBasicButton>
                      </SPreviewCard>
                    ))}
                    {/* </SPreviewContainer> */}
                    {/* {imgPreview.map((image, imageId) => (
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
                    ))} */}
                  </Grid>
                </Box>
              </Grid>
            </Grid>

            {/* 사진 업로드 */}
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

            {/* 추가되는 파일 미리보기 */}
            <Grid item xs={12}>
              <STypography component="h6" variant="body2">
                추가될 사진
              </STypography>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  {Object.values(addImgPreview).map((image, imageId) => (
                    <SPreviewCard item xs={6}>
                      <SPreviewImg
                        src={image}
                        alt={`${image}-${imageId}`}
                        style={{ width: '10rem' }}
                      />
                      <SDeleteButton
                        type="button"
                        onClick={handleDeleteAddPreview}
                        name={`${imageId}`}
                        variant="contained"
                        color="error"
                      >
                        삭제
                      </SDeleteButton>
                    </SPreviewCard>
                  ))}
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <STemp>
                <SFileUploadButton variant="contained" component="label">
                  파일추가
                  <input
                    type="file"
                    hidden
                    onChange={handleAddImages}
                    multiple="multiple"
                    accept="image/*"
                  />
                </SFileUploadButton>
                <SSubmit type="submit">수정하기</SSubmit>
              </STemp>
            </Grid>
          </form>
        </Box>
      </Container>

      <Nav />
    </>
  );
}

export default AnimalUpdateHost;
