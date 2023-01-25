import { atom } from 'recoil';

const adoptionListState = atom({
  key: 'adoptionListState',
  default: [
    {
      id: 0,
      image: '',
      species: '강아지',
      breed: '개(믹스견)',
      weight: 10,
      age: 3,
      ageType: '세',
      sex: '남',
      text: '특징1 입니다.',
    },
    {
      id: 1,
      image: '',
      species: '강아지',
      breed: '개(믹스견)',
      weight: 10,
      age: 3,
      ageType: '세',
      sex: '남',
      text: '특징1 입니다.',
    },
    {
      id: 2,
      image: '',
      species: '강아지',
      breed: '개(믹스견)',
      weight: 10,
      age: 3,
      ageType: '세',
      sex: '남',
      text: '특징1 입니다.',
    },
  ],
});

const temp = atom({
  key: 'temp',
  default: '',
});

export { adoptionListState, temp };
