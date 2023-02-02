import { atom } from 'recoil';

const authStateAtom = atom({
  key: 'authStateAtom',
  default: false,
});

const userAtom = atom({
  key: 'userAtom',
  default: {
    role: '',
    email: '',
    name: '',
    nickname: '',
    phoneNumber: '',
    profileImg: '',
  },
});

const animalListState = atom({
  key: 'animalListState',
  default: [
    {
      animalId: 0,
      shelterId: 0,
      name: '이름1',
      manageNumber: 'dog-abcdef',
      thumbnailImage: '파일경로',
      breed: '믹스',
      age: '7세(추정)',
      gender: 'M',
      weight: 6.2,
      neuter: 'T',
      note: '사람을 많이 좋아합니다.',
      expired: 'F',
    },
    {
      animalId: 1,
      shelterId: 0,
      name: '이름2',
      manageNumber: 'dog-abcd42f',
      thumbnailImage: '파일경로',
      breed: '코리안숏헤어',
      age: '3세(추정)',
      gender: 'F',
      weight: 2.7,
      neuter: 'T',
      note: '사람을 경계하는 고양이 입니다.',
      expired: 'F',
    },
    {
      animalId: 2,
      shelterId: 0,
      name: '이름2',
      manageNumber: 'dog-abcd42f',
      thumbnailImage: '파일경로',
      breed: '코리안숏헤어',
      age: '3세(추정)',
      gender: 'F',
      weight: 2.7,
      neuter: 'T',
      note: '사람을 경계하는 고양이 입니다.',
      expired: 'F',
    },
    {
      animalId: 3,
      shelterId: 0,
      name: '이름2',
      manageNumber: 'dog-abcd42f',
      thumbnailImage: '파일경로',
      breed: '코리안숏헤어',
      age: '3세(추정)',
      gender: 'F',
      weight: 2.7,
      neuter: 'T',
      note: '사람을 경계하는 고양이 입니다.',
      expired: 'F',
    },
    {
      animalId: 4,
      shelterId: 0,
      name: '이름2',
      manageNumber: 'dog-abcd42f',
      thumbnailImage: '파일경로',
      breed: '코리안숏헤어',
      age: '3세(추정)',
      gender: 'F',
      weight: 2.7,
      neuter: 'T',
      note: '사람을 경계하는 고양이 입니다.',
      expired: 'F',
    },
  ],
});

const animalNumber = atom({
  key: 'shelterAnimalNumber',
  default: 1,
});

export { authStateAtom, userAtom, animalListState, animalNumber };
