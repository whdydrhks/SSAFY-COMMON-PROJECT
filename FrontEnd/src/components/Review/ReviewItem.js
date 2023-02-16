import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SDetail = styled.div`
  /* overflow: hidden; */
  /* display: center; */
  flex-direction: row;
  flex-grow: 1;
  margin-left: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  flex-basis: 270px;
  font-size: 1.2rem;
  width: 100%;
  font-family: mainFont;
`;

function ReviewItem({ item }) {
  return (
    <SDetail>
      <div>제목 : {item.title}</div>
      <div>내용 : {item.content}</div>
      <hr />
    </SDetail>
  );
}

ReviewItem.propTypes = {
  item: PropTypes.shape({
    reviewId: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    userId: PropTypes.number,
    content_id: PropTypes.number,
    viewCount: PropTypes.number,
    likeCount: PropTypes.number,
    commentCount: PropTypes.number,
    thumbnailImgage: PropTypes.string,
  }),
};
ReviewItem.defaultProps = {
  item: null,
};

export default ReviewItem;
