import React from 'react';
import { useRecoilValue } from 'recoil';
import { adoptionListState } from '../../state/adoptionList';
import 

function AdoptionList() {
  const adoptionList = useRecoilValue(adoptionListState);

  return (
    <div>
      <TodoListStats />
      <TodoListFilters />
      <TodoItemCreator />

      {adoptionList.map(adoptionItem => (
        <AdoptionItem item={adoptionItem} key={adoptionItem.id} />
      ))}
    </div>
  );
}

export default AdoptionList;
