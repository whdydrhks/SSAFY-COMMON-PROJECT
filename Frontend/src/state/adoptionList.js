import { atom } from 'recoil';

const adoptionListState = atom({
  key: 'adoptionListState',
  default: [],
});

export default adoptionListState;
