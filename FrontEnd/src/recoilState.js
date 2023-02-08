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
  default: [],
  effects_UNSTABLE: [persistAtom],
});

const scheduleHostAtom = atom({
  key: 'scheduleHostAtom',
  default: [
    {
      scheduleId: '1',
      userId: '1',
      day: '0209',
      time: '0',
      room: '대전보호소-1312',
    },
    {
      scheduleId: '1',
      userId: '1',
      day: '0209',
      time: '1',
      room: '대전보호소-1312',
    },
    {
      scheduleId: '2',
      userId: '2',
      day: '0209',
      time: '2',
      room: '대전보호소-1312',
    },
    {
      scheduleId: '3',
      userId: '3',
      day: '0209',
      time: '13',
      room: '대전보호소-1312',
    },
    {
      scheduleId: '4',
      userId: '4',
      day: '0209',
      time: '15',
      room: '대전보호소-1312',
    },
    {
      scheduleId: '5',
      userId: '6',
      day: '0209',
      time: '9',
      room: '대전보호소-1312',
    },
    {
      scheduleId: '6',
      userId: '7',
      day: '0209',
      time: '11',
      room: '대전보호소-1312',
    },
    {
      scheduleId: '7',
      userId: '3',
      day: '0209',
      time: '13',
      room: '대전보호소-1312',
    },
    {
      scheduleId: '8',
      userId: '4',
      day: '0209',
      time: '15',
      room: '대전보호소-1312',
    },
    {
      scheduleId: '9',
      userId: '1',
      day: '0210',
      time: '9',
      room: '대전보호소-1312',
    },
    {
      scheduleId: '10',
      userId: '2',
      day: '0210',
      time: '11',
      room: '대전보호소-1312',
    },
    {
      scheduleId: '11',
      userId: '6',
      day: '0210',
      time: '13',
      room: '대전보호소-1312',
    },
    {
      scheduleId: '12',
      userId: '5',
      day: '0210',
      time: '15',
      room: '대전보호소-1312',
    },
  ],
});

const scheduleUserAtom = atom({
  key: 'scheduleUserAtom',
  default: [
    {
      scheduleId: '1',
      shelterId: '1',
      day: '0208',
      time: '9',
      room: '대전보호소-112',
    },
    {
      scheduleId: '1',
      shelterId: '1',
      day: '0208',
      time: '9',
      room: '대전보호소-13142',
    },
    {
      scheduleId: '1',
      shelterId: '1',
      day: '0208',
      time: '9',
      room: '대전보호소-13212',
    },
    {
      scheduleId: '1',
      shelterId: '1',
      day: '0208',
      time: '9',
      room: '대전보호소-11212',
    },
    {
      scheduleId: '1',
      shelterId: '1',
      day: '0208',
      time: '9',
      room: '대전보호소-142112',
    },
    {
      scheduleId: '12',
      userId: '5',
      day: '0210',
      time: '15',
      room: '대전보호소-1312412',
    },
    {
      scheduleId: '12',
      userId: '5',
      day: '0210',
      time: '15',
      room: '대전보호소-135112',
    },
    {
      scheduleId: '12',
      userId: '5',
      day: '0210',
      time: '15',
      room: '대전보호소-63412',
    },
    {
      scheduleId: '12',
      userId: '5',
      day: '0210',
      time: '15',
      room: '대전보호소-6346312',
    },
    {
      scheduleId: '12',
      userId: '5',
      day: '0210',
      time: '15',
      room: '대전보호소-3464312',
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
  scheduleHostAtom,
  scheduleUserAtom,
};
