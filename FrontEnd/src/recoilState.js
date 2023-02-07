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
    // {
    //   animalId: 0,
    //   shelterId: 0,
    //   name: '이름1',
    //   manageNumber: 'dog-abcdef',
    //   thumbnailImage: '파일경로',
    //   breed: '믹스',
    //   age: '7세(추정)',
    //   gender: 'M',
    //   weight: 6.2,
    //   neuter: 'T',
    //   note: '사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.사람을 많이 좋아합니다.',
    //   expired: 'F',
    // },
    // {
    //   animalId: 1,
    //   shelterId: 0,
    //   name: '이름2',
    //   manageNumber: 'dog-abcd42f',
    //   thumbnailImage: '파일경로',
    //   breed: '코리안숏헤어',
    //   age: '3세(추정)',
    //   gender: 'F',
    //   weight: 2.7,
    //   neuter: 'T',
    //   note: '사람을 경계하는 고양이 입니다.',
    //   expired: 'F',
    // },
    // {
    //   animalId: 2,
    //   shelterId: 0,
    //   name: '이름2',
    //   manageNumber: 'dog-abcd42f',
    //   thumbnailImage: '파일경로',
    //   breed: '코리안숏헤어',
    //   age: '3세(추정)',
    //   gender: 'F',
    //   weight: 2.7,
    //   neuter: 'T',
    //   note: '사람을 경계하는 고양이 입니다.',
    //   expired: 'F',
    // },
    // {
    //   animalId: 3,
    //   shelterId: 0,
    //   name: '이름2',
    //   manageNumber: 'dog-abcd42f',
    //   thumbnailImage: '파일경로',
    //   breed: '코리안숏헤어',
    //   age: '3세(추정)',
    //   gender: 'F',
    //   weight: 2.7,
    //   neuter: 'T',
    //   note: '사람을 경계하는 고양이 입니다.',
    //   expired: 'F',
    // },
    // {
    //   animalId: 4,
    //   shelterId: 0,
    //   name: '이름2',
    //   manageNumber: 'dog-abcd42f',
    //   thumbnailImage: '파일경로',
    //   breed: '코리안숏헤어',
    //   age: '3세(추정)',
    //   gender: 'F',
    //   weight: 2.7,
    //   neuter: 'T',
    //   note: '사람을 경계하는 고양이 입니다.',
    //   expired: 'F',
    // },
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

const setDayTime = atom({
  key: 'setDayTime',
  default: [
    {
      shelterId: 0,
      Default: '0000000000000000000000000',
      Sun: '0000000011111111111000000',
      Mon: '0000000000111111111000000',
      Tue: '0000000011100111111000000',
      Wed: '0000000011111110011000000',
      Thr: '0000000011111111111000000',
      Fri: '0000000001011110110000000',
      Sat: '0000000010111111101000000',
    },
  ],
});

export { authStateAtom, userAtom, animalListState, animalNumber, setDayTime };
