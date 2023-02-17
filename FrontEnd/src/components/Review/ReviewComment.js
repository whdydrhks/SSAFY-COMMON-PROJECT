/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */

import React, { useState } from 'react';
import styled from 'styled-components';
import { Divider, Avatar, Grid, Paper, Button, TextField } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../recoilState';

// import styled from 'styled-components';
// import { commentListState } from '../../recoilState';

// const ScommentContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin: 0 1rem;
// `;

// const SCommentBox = styled.span`
//   width: 80%;
//   display: flex;
//   align-items: flex-start;

//   /* flex-direction: column; */
// `;

// const SCommentUserNickname = styled.span`
//   display: flex;
//   align-items: flex-end;
// `;

const SH4 = styled.div`
  font-family: mainFont;
`;

const SCommnetBox = styled.div`
  padding: 1rem;
  border-radius: 2rem;
`;

const STextField = styled(TextField)`
  font-family: mainFont;
  margin-left: 1rem;
  border-radius: 1rem;
  height: 5vh;
  width: 80vw;
`;

const SButton = styled(Button)`
  font-family: mainFont;
  background-color: #9500ae;
  margin-left: 1rem;
  color: white;
  border: 1px solid #1976d2;
  border-radius: 10px;
  height: 5vh;
  width: 10vw;
`;

function ReviewComment() {
  // comment 작성시 댓글 저장

  // Comment 작성시 nickname 불러오기
  const userInfo = useRecoilValue(userAtom);
  const commentNickname = userInfo.nickname;

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
    <SCommnetBox>
      <ul>
        {commentList.map(value => (
          // <li>
          //   <ScommentContainer>
          //     <SCommentBox>{value}</SCommentBox>
          //     <SCommentUserNickname> {commentNickname}</SCommentUserNickname>
          //   </ScommentContainer>
          // </li>
          <Paper style={{ padding: '40px 20px' }}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar alt="Remy Sharp" />
              </Grid>
              <Grid justifyContent="left" item xs zeroMinWidth>
                <SH4 style={{ margin: 0, textAlign: 'left' }}>
                  {commentNickname}
                </SH4>
                <br />
                <p style={{ textAlign: 'left' }}>{value}</p>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </ul>
      <br />
      <form onSubmit={addReviewComment}>
        <STextField
          type="text"
          placeholder="댓글을 입력해주세요."
          value={comment}
          onChange={onChange}
        />
        <SButton
          color="secondary"
          type="button"
          onClick={addReviewComment}
          variant="contained"
          size="medium"
        >
          등록
        </SButton>
      </form>
    </SCommnetBox>
  );
}

export default ReviewComment;
