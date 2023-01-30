import { atom } from 'recoil';

const animalList = atom({
  key: 'animalList',
  default: [
    {
      animalId: 0,
      shelterId: 0,
      manageNumber: 'dog-abcdef',
      species: '강아지',
      thumbnailImage: '파일경로',
      breed: '믹스',
      age: '7세(추정)',
      gender: 'M',
      weight: '6.2',
      neuter: 'T',
      note: '사람을 많이 좋아합니다.',
      expired: 'F',
      createdDate: '2023-01-30 14:06',
      updatedDate: '2023-01-30 14:06',
    },
    {
      animalId: 1,
      shelterId: 0,
      manageNumber: 'dog-abcd42f',
      species: '고양이',
      thumbnailImage: '파일경로',
      breed: '코리안숏헤어',
      age: '3세(추정)',
      gender: 'F',
      weight: '2.7',
      neuter: 'T',
      note: '사람을 경계하는 고양이 입니다.',
      expired: 'F',
      createdDate: '2023-01-30 14:10',
      updatedDate: '2023-01-30 14:10',
    },
  ],
});

const animalNumber = atom({
  key: 'shelterAnimalNumber',
  default: 1,
});

export { animalList, animalNumber };
