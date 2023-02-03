import React from 'react';
import styled from 'styled-components';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { animalListState } from '../../recoilState';
import AnimalItem from './AnimalItem';

const SLink = styled(Link)`
  margin: 0 auto;
  color: black;
  text-decoration: none;
`;

function AnimalList(props) {
  const animalList = useRecoilValue(animalListState);
  console.log(props);

  // const [temp, setTemp] = useState([])

  // const getAnimalList = async () => {
  //   const filteredAnimalList = await.axios.get(
  //     url
  //   );
  //   setTemp(filteredAnimalList.data)

  // }
  // console.log(temp)
  // useEffect(() => {
  //   getAnimalList()
  // }, [])
  // axios.get(url, { params: { expired: props.expired } }).then(res => {
  //   console.log(res);
  // });

  return (
    <div>
      {animalList.map(animalItem => (
        <SLink
          to={`/animal/${animalItem.animalId}`}
          key={animalItem.animalId}
          state={{ animal: animalItem }}
        >
          <AnimalItem item={animalItem} />
        </SLink>
      ))}
    </div>
  );
}

export default AnimalList;
