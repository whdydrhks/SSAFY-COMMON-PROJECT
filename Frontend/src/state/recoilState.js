import { atom } from 'recoil';

const adoptionListState = atom({
  key: 'adoptionListState',
  default: [],
});

const temp = atom({
  key: 'temp',
  default: '',
});

export { adoptionListState, temp };
