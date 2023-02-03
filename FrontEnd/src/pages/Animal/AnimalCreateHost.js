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
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { animalNumber } from '../../recoilState';
import Nav from '../../components/common/Nav';
import Header from '../../components/common/Header';
import '../../styles/cafe24.css';

const SH1 = styled.h1`
  font-size: 2rem;
  font-family: 'cafe24';
  margin-left: 1rem;
  margin-bottom: 2rem;
`;

const STemp = styled.div`
  display: flex;
  justify-content: center;
`;
const SFileUploadButton = styled(Button)`
  font-family: 'cafe24';
`;

const SPreviewCard = styled(Grid)`
  display: flex
  justify-content: center;
`;
function AnimalCreateHost() {
  const navigate = useNavigate();
  let id = useRecoilValue(animalNumber);
  const getId = () => {
    id += 1;
    return id;
  };

  //   확인용
  // const temp = useRecoilValue(animalList);
  // useEffect(() => {
  //   console.log(temp);
  // }, [id]);

  // const setAnimalList = useSetRecoilState(animalListState);

  const [manageNumber, setManageNumber] = useState('');
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

  const handleManageNumber = e => {
    setManageNumber(e.target.value);
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
        expired: 'F',
        animalId: getId(),
        shelterId: 0,
        name,
        manageNumber,
        thumbnailImage: '파일경로',
        breed,
        age,
        gender,
        weight,
        neuter,
        note,
      },
    ];

    formData.append(
      'data',
      new Blob([JSON.stringify(variables)], { type: 'application/json' }),
    );
    axios.post('http://192.168.31.226:3000/animal/create', formData);
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
                <Typography component="h6" variant="body2">
                  관리번호
                </Typography>
                <TextField
                  type="text"
                  onChange={handleManageNumber}
                  placeholder="관리번호를 입력해 주세요."
                  fullWidth
                  required
                  style={{ marginBottom: 20 }}
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h6" variant="body2">
                이름
              </Typography>
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
              <Typography component="h6" variant="body2">
                나이
              </Typography>
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
              <Typography component="h6" variant="body2">
                성별
              </Typography>
              <Select
                onChange={handleGender}
                defaultValue="M"
                style={{ marginBottom: 20 }}
              >
                {genderList.map(item => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h6" variant="body2">
                품종
              </Typography>
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
              <Typography item xs={12}>
                체중
              </Typography>
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
              <Typography component="h6" variant="body2">
                중성화 여부
              </Typography>
              <Select
                onChange={handleNeuter}
                defaultValue="Y"
                style={{ marginBottom: 20 }}
              >
                {neuterList.map(item => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Typography component="h6" variant="body2">
                특징
              </Typography>
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

            <Button type="submit">동물 등록하기</Button>
          </form>
        </Box>
      </Container>

      <Nav />
    </>
  );
}

export default AnimalCreateHost;
