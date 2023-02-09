/* eslint-disable consistent-return */

import React, { useState } from 'react';
// import { useRecoilValue } from 'recoil';
// import styled from 'styled-components';
// import { commentListState } from '../../recoilState';

function ReviewComment() {
  // Comment 입력 State 저장
  const [comment, setComment] = useState('');
  const onChange = e => {
    setComment(e.target.value);
  };

  // Comment가 저장되는 List 생성
  const [commentList, setCommentList] = useState([]);
  // 확인용
  // console.log(commentList);
  const addReviewComment = e => {
    e.preventDefault();
    if (comment === '') {
      return null;
    }
    setCommentList(commentValueList => [comment, ...commentValueList]);
    setComment('');
  };

  return (
    <div>
      <ul>
        {commentList.map(value => (
          <li>
            <div>
              <span>{value}</span>
              <span> nickaname</span>
            </div>
          </li>
        ))}
      </ul>
      <hr />
      <form onSubmit={addReviewComment}>
        <input
          type="text"
          placeholder="댓글을 입력해주세요."
          value={comment}
          onChange={onChange}
        />
        <button type="button" onClick={addReviewComment}>
          등록
        </button>
      </form>
    </div>
  );
}

export default ReviewComment;
