/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Container,
  Typography,
  Grid,
  Select,
  Button,
  MenuItem,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../recoilState';
import Nav from '../../components/common/Nav';
import Header from '../../components/common/Header';
import API_URL from '../../api/api';
import '../../styles/cafe24.css';

const SH1 = styled.h1`
  font-size: 2rem;
  font-family: 'cafe24';
  margin-top: 1rem;
  margin-left: 1rem;
  /* margin-bottom: 1rem; */
`;

const STemp = styled.div`
  display: flex;
  /* justify-content: center; */
  justify-content: left;
`;

const SFileUploadButton = styled(Button)`
  font-family: 'cafe24';
  text-align: left;
  margin-top: 1rem;
`;

const SPreviewCard = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const SSubmit = styled.div`
  margin-top: 2rem;
  text-align: right;
`;

const STypography = styled(Typography)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const SButton = styled(Button)`
  font-family: 'cafe24';
  font-size: 1.5rem;
`;

function AnimalCreateHost() {
  const navigate = useNavigate();
  const userInfo = useRecoilValue(userAtom);
  const shelterId = userInfo.shelterId;

  //   확인용
  // const temp = useRecoilValue(animalList);
  // useEffect(() => {
  //   console.log(temp);
  // }, [id]);

  // const setAnimalList = useSetRecoilState(animalListState);

  const [manageCode, setManageCode] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const genderList = ['M', 'F'];
  const [gender, setGender] = useState('M');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState(0);
  const neuterList = ['Y', 'N'];
  const [neuter, setNeuter] = useState('T');
  const [note, setNote] = useState('');
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  // const [imgPreview, setImgPreview] = useState('');

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
    if (e.target.value === 'Y') {
      setNeuter('True');
    } else {
      setNeuter('False');
    }
  };

  const handleNote = e => {
    setNote(e.target.value);
  };

  const handleImages = e => {
    setImages(e.target.files);
    const imageLists = e.target.files;
    let imageUrlLists = [...previews];

    for (let i = 0; i < imageLists.length; i += 1) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setPreviews(imageUrlLists);
  };

  const handlePreviewList = e => {
    // console.log(e.target.name);
    const temp = [...images];
    const temp2 = [...previews];
    temp.splice(e.target.name, 1);
    // console.log(temp);
    temp2.splice(e.target.name, 1);
    // console.log(temp2);
    setImages(temp);
    setPreviews(temp2);
  };

  const addAnimal = e => {
    e.preventDefault();
    // console.log(e);
    const formData = new FormData();

    formData.append('image', images);
    const variables = [
      {
        age,
        breed,
        gender,
        manageCode,
        name,
        neuter,
        note,
        weight,
      },
    ];

    formData.append(
      'data',
      new Blob([JSON.stringify(variables)], { type: 'application/json' }),
    );
    axios.post(`${API_URL}/shelter/${shelterId}/animal`, formData);
    // console.log(variables[0].animalId);
    navigate(`/animal/${variables[0].animalId}`);
  };

  return (
    <>
      <Header />
      <SH1>동물 등록</SH1>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <form onSubmit={addAnimal}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* 관리 번호 */}
                <STypography component="h6" variant="body2">
                  관리번호
                </STypography>
                <TextField
                  type="text"
                  onChange={handleManageCode}
                  placeholder="관리번호를 입력해 주세요."
                  fullWidth
                  required
                  style={{ marginBottom: 20 }}
                />
              </Grid>
            </Grid>

            {/* 이름 */}
            <Grid item xs={12}>
              <STypography component="h6" variant="body2">
                이름
              </STypography>
              <TextField
                type="text"
                onChange={handleName}
                placeholder="이름을 입력해 주세요."
                fullWidth
                required
                style={{ marginBottom: 20 }}
              />
            </Grid>
            <Grid item xs={12}>
              <STypography component="h6" variant="body2">
                나이
              </STypography>
              <TextField
                type="text"
                onChange={handleAge}
                placeholder="나이를 입력해 주세요."
                fullWidth
                required
                style={{ marginBottom: 20 }}
              />
            </Grid>
            <Grid item xs={12}>
              <STypography component="h6" variant="body2">
                성별
              </STypography>
              <Select
                onChange={handleGender}
                defaultValue="M"
                style={{ marginBottom: 20 }}
              >
                {genderList.map(item => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <STypography component="h6" variant="body2">
                품종
              </STypography>
              <TextField
                type="text"
                onChange={handleBreed}
                placeholder="품종을 입력해 주세요."
                fullWidth
                required
                style={{ marginBottom: 20 }}
              />
            </Grid>
            <Grid>
              <STypography item xs={12}>
                체중
              </STypography>
              <TextField
                type="number"
                onChange={handleWeight}
                placeholder="체중을 입력해 주세요."
                fullWidth
                required
                style={{ marginBottom: 20 }}
              />
            </Grid>
            <Grid item xs={12}>
              <STypography component="h6" variant="body2">
                중성화 여부
              </STypography>
              <Select
                onChange={handleNeuter}
                defaultValue="Y"
                style={{ marginBottom: 20 }}
              >
                {neuterList.map(item => (
                  <MenuItem value={item} key={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
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
              />
            </Grid>
            <Grid item xs={12}>
              <STypography component="h6" variant="body2">
                사진
              </STypography>
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
            </Grid>
            <Grid item xs={12}>
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
            </Grid>

            <SSubmit>
              <SButton type="submit" variant="contained" component="label">
                동물 등록하기
              </SButton>
            </SSubmit>
          </form>
        </Box>
      </Container>

      <Nav />
    </>
  );
}

export default AnimalCreateHost;
