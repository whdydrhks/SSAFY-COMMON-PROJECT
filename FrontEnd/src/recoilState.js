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
    shelterId: '',
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

// 현재 사용 안하고 중, 더미데이터는 백에서 저장
const dayTimeAtom = atom({
  key: 'dayTimeAtom',
  default: [
    '0000000000000000000000000',
    '0000000000000000000000001',
    '0000000000000000000000002',
    '0000000000000000000000003',
    '0000000000000000000000004',
    '0000000000000000000000005',
    '0000000000000000000000006',
  ],
});

const todayTimeAtom = atom({
  key: 'todayTimeAtom',
  default: '',
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
      time: '16',
      room: '대전보호소-1312',
    },
    {
      scheduleId: '6',
      userId: '7',
      day: '0209',
      time: '16',
      room: '대전보호소-1312',
    },
    {
      scheduleId: '7',
      userId: '3',
      day: '0209',
      time: '17',
      room: '대전보호소-1312',
    },
    {
      scheduleId: '8',
      userId: '4',
      day: '0209',
      time: '18',
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

const reviewListState = atom({
  key: 'ReveiwListState',
  default: [
    // {
    //   reviewId: '',
    //   title: '',
    //   content: '',
    //   userId: '', // 삭제 예정
    //   contentId: '',
    //   viewCount: '', // 삭제 예정
    //   likeCount: '', // 삭제 예정
    //   commentCount: '', // 삭제 예정
    //   thumbnailImgage: '', // 삭제 예정
    //   createdDate: '',
    //   updatedDate: '',
    // },
    {
      reviewId: 0,
      title: '우리집 상추 자랑1',
      content:
        '입양한 지 벌써 1주일이 됐네요..! 우리 상추 너무너무 귀엽죠 근데 진짜 말썽쟁이...입양한 지 벌써 1주일이 됐네요..! 우리 상추 너무너무 귀엽죠 근데 진짜 말썽쟁이...입양한 지 벌써 1주일이 됐네요..! 우리 상추 너무너무 귀엽죠 근데 진짜 말썽쟁이...입양한 지 벌써 1주일이 됐네요..! 우리 상추 너무너무 귀엽죠 근데 진짜 말썽쟁이...입양한 지 벌써 1주일이 됐네요..! 우리 상추 너무너무 귀엽죠 근데 진짜 말썽쟁이...입양한 지 벌써 1주일이 됐네요..! 우리 상추 너무너무 귀엽죠 근데 진짜 말썽쟁이...입양한 지 벌써 1주일이 됐네요..! 우리 상추 너무너무 귀엽죠 근데 진짜 말썽쟁이...입양한 지 벌써 1주일이 됐네요..! 우리 상추 너무너무 귀엽죠 근데 진짜 말썽쟁이...입양한 지 벌써 1주일이 됐네요..! 우리 상추 너무너무 귀엽죠 근데 진짜 말썽쟁이...입양한 지 벌써 1주일이 됐네요..! 우리 상추 너무너무 귀엽죠 근데 진짜 말썽쟁이...입양한 지 벌써 1주일이 됐네요..! 우리 상추 너무너무 귀엽죠 근데 진짜 말썽쟁이...입양한 지 벌써 1주일이 됐네요..! 우리 상추 너무너무 귀엽죠 근데 진짜 말썽쟁이...입양한 지 벌써 1주일이 됐네요..! 우리 상추 너무너무 귀엽죠 근데 진짜 말썽쟁이...입양한 지 벌써 1주일이 됐네요..! 우리 상추 너무너무 귀엽죠 근데 진짜 말썽쟁이...',
      userId: 1,
      contentId: 1,
      viewCount: 10,
      likeCount: 10,
      commentCount: 5,
      thumbnailImgage: '파일경로',
    },
    {
      reviewId: 1,
      title: '우리집 상추 자랑2',
      content:
        '입양한 지 벌써 1주일이 됐네요..! 우리 상추 너무너무 귀엽죠 근데 진짜 말썽쟁이...',
      userId: 2,
      contentId: 2,
      viewCount: 7,
      likeCount: 2,
      commentCount: 9,
      thumbnailImgage: '파일경로',
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

const commentListState = atom({
  key: 'commentListState',
  default: [
    // {

    //   reviewId:'',
    //   userId:'',
    //   content:'',
    //   createdDate:'',
    //   updatedDate:'',
    // },
    {
      reviewId: 1,
      userId: 1,
      content: '정말 귀여워요',
    },
  ],
});

const animalState = atom({
  key: 'animal',
  default: [],
});

export {
  animalState,
  authStateAtom,
  userAtom,
  animalListState,
  animalNumber,
  dayTimeAtom,
  todayTimeAtom,
  twoWeeksAtom,
  scheduleHostAtom,
  scheduleUserAtom,
  reviewListState,
  commentListState,
};
