import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import '../../styles/cafe24.css';

const SDetail = styled.div`
  font-family: 'cafe24';
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
