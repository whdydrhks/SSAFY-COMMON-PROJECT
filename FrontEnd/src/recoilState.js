import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
const authStateAtom = atom({
  key: 'authStateAtom',
  default: false,
});

// const userAtom = atom({
//   key: 'userAtom',
//   default: {
//     role: '',
//     userId: '',
//     email: '',
//     name: '',
//     nickname: '',
//     phoneNumber: '',
//     profileImg: '',
//   },
//   effects_UNSTABLE: [persistAtom],
// });

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
  dafault: [
    { scheduleId: '1', userNickname: '권오영', day: '0208', time: '9' },
    { scheduleId: '2', userNickname: '이진혁', day: '0208', time: '11' },
    { scheduleId: '3', userNickname: '한인환', day: '0208', time: '13' },
    { scheduleId: '4', userNickname: '조용관', day: '0208', time: '15' },
    { scheduleId: '5', userNickname: '권동규', day: '0209', time: '9' },
    { scheduleId: '6', userNickname: '장준호', day: '0209', time: '11' },
    { scheduleId: '7', userNickname: '권오영', day: '0209', time: '13' },
    { scheduleId: '8', userNickname: '한인환', day: '0209', time: '15' },
    { scheduleId: '9', userNickname: '이진혁', day: '0210', time: '9' },
    { scheduleId: '10', userNickname: '조용관', day: '0210', time: '11' },
    { scheduleId: '11', userNickname: '권동규', day: '0210', time: '13' },
    { scheduleId: '12', userNickname: '장준호', day: '0210', time: '15' },
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

export {
  authStateAtom,
  userAtom,
  animalListState,
  animalNumber,
  timeAtom,
  twoWeeksAtom,
  scheduleHostAtom,
  reviewListState,
  commentListState,
};
