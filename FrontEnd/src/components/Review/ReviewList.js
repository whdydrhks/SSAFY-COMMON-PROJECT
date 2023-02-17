import React from 'react';
import styled from 'styled-components';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { reviewListState } from '../../recoilState';
import ReviewItem from './ReviewItem';

const SLink = styled(Link)`
  margin: 0 auto;
  color: black;
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`;

function ReviewList(props) {
  const reviewList = useRecoilValue(reviewListState);
  console.log(props);
  // console.log('reviewList.reviewId : ', reviewList.reviewId);

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
      {reviewList.map(reviewItem => (
        <SLink
          to={`/review/${reviewItem.reviewId}`}
          key={reviewItem.reviewId}
          state={{ review: reviewItem }}
        >
          <ReviewItem item={reviewItem} />
        </SLink>
      ))}
    </div>
  );
}

export default ReviewList;
