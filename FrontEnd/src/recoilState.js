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

const twoWeeksAtom = atom({
  key: 'twoWeeksAtom',
  default: [],
});

const dayTimeAtom = atom({
  key: 'dayTimeAtom',
  default: [],
});

const todayTimeAtom = atom({
  key: 'todayTimeAtom',
  default: '',
});

const scheduleAtom = atom({
  key: 'scheduleAtom',
  default: [],
});

const todayScheduleAtom = atom({
  key: 'todayScheduleAtom',
  default: [],
});

const dateListAtom = atom({
  key: 'dayListAtom',
  default: [],
});

// const today = new Date();
// const todayDate =
//   (today.getMonth() + 1).toString().padStart(2, '0') +
//   today.getDate().toString().padStart(2, '0');

const todayAtom = atom({
  key: 'todayAtom',
  default: '',
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
      userId: 2,
      content: '정말 귀여워요',
    },
    {
      reviewId: 1,
      userId: 3,
      content: '너무 사랑스러워요 ♥',
    },
  ],
});

const animalState = atom({
  key: 'animal',
  default: [],
});

const alarmAtom = atom({
  key: 'alarmAtom',
  default: [],
});

const liveListAtom = atom({
  key: 'liveListAtom',
  default: [],
});

const timetableShelterIdAtom = atom({
  key: 'timetableShelterIdAtom',
  default: '',
});

export {
  animalState,
  authStateAtom,
  userAtom,
  animalListState,
  animalNumber,
  twoWeeksAtom,
  dayTimeAtom,
  todayTimeAtom,
  scheduleAtom,
  reviewListState,
  commentListState,
  todayScheduleAtom,
  todayAtom,
  dateListAtom,
  alarmAtom,
  liveListAtom,
  timetableShelterIdAtom,
};
