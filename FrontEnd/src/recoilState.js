import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
const authStateAtom = atom({
  key: 'authStateAtom',
  default: false,
});

const roomNumberAtom = atom({
  key: ' roomNumberAtom',
  default: '',
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

const shelterAtom = atom({
  key: 'shelterAtom',
  default: {},
});

const animalListState = atom({
  key: 'animalListState',
  default: [],
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
      title: '우리집 깻잎(강아지 이름) 자랑',
      content:
        '입양한 지 벌써 1주일이 됐네요..! 우리 깻잎 너무너무 귀엽죠 근데 진짜 말썽쟁이예요. 아, 참 깻잎향을 유독 따라다녀서 깻잎이라고 이름을 지었답니다 ㅎㅎ. 처음에는 조금 어색해 하는 것 같더니 지금은 많이 적응해서 집 안 곳곳을 누비고 다니네요 ㅎㅎ.',
      userId: 1,
      contentId: 1,
      viewCount: 10,
      likeCount: 10,
      commentCount: 5,
      thumbnailImgage: '파일경로',
    },
    {
      reviewId: 1,
      title: '귀요미 두두둥장',
      content:
        '강아지 이름을 요미로 지었어요. 귀요미에서 발음하기 편하게 귀 빼고 발음하기로 했네요. 진짜 하는 짓마다 얼마나 귀여운지 집안 분위기가 너무 밝아졌어요!! 처음에는 많이 망설였었는데, 제 눈으로 직접 확인하고 보호센터 직원분한테 직접 설명을 들으니 입양에 대한 확신이 섰어요. 행복하게 잘 살겠습니다~~',
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
  effects_UNSTABLE: [persistAtom],
});

const likeAnimalAtom = atom({
  key: 'likeAnimalAtom',
  default: [],
});

export {
  animalState,
  authStateAtom,
  userAtom,
  shelterAtom,
  animalListState,
  animalNumber,
  twoWeeksAtom,
  dayTimeAtom,
  todayTimeAtom,
  scheduleAtom,
  reviewListState,
  roomNumberAtom,
  commentListState,
  todayScheduleAtom,
  todayAtom,
  dateListAtom,
  alarmAtom,
  liveListAtom,
  timetableShelterIdAtom,
  likeAnimalAtom,
};
