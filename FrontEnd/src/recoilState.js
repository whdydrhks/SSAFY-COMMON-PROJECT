import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
const authStateAtom = atom({
  key: 'authStateAtom',
  default: false,
});

const userAtom = atom({
  key: 'userAtom',
  default: {
    role: '',
    userId: '',
    shelterId: '',
    email: '',
    name: '',
    nickname: '',
    phoneNumber: '',
    profileImg: '',
  },
  effects_UNSTABLE: [persistAtom],
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
      note: '사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.',
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
  effects_UNSTABLE: [persistAtom],
});

const animalNumber = atom({
  key: 'shelterAnimalNumber',
  default: 1,
});

// const managedSchedule = atom({
//   key : 'managedSchedule',
//   default: {
//     userShelterId = '',
//     userId = '',
//     day =
//   }
// })

const timeAtom = atom({
  key: 'timeAtom',
  default: [
    '0000000001111111111000000',
    '0000000000111111111000001',
    '0000000001100111111000002',
    '0000000001111110011000003',
    '0000000001111111111000004',
    '0000000001011110110000005',
    '0000000000111111101000006',
  ],
  effects_UNSTABLE: [persistAtom],
});

const twoWeeksAtom = atom({
  key: 'twoWeeksAtom',
  default: [
    {
      month: 0,
      day: 0,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

export {
  authStateAtom,
  userAtom,
  animalListState,
  animalNumber,
  timeAtom,
  twoWeeksAtom,
};
