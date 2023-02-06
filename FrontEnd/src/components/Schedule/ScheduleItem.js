import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import '../../styles/cafe24.css';

const SScheduleDetail = styled.div`
  font-family: 'cafe24';
`;

function ScheduleItem({ item }) {
  return (
    <SScheduleDetail>
      <div>{item.time}</div>
      <div>{item.nickname}</div>
      <div>{item.currentStatus}</div>
      <div>{item.Status}</div>
    </SScheduleDetail>
  );
}

ScheduleItem.PropTypes = {
  item: PropTypes.shape({
    time: PropTypes.string,
    nickname: PropTypes.string,
    currentStatus: PropTypes.string,
    Status: PropTypes.string,
  }),
};
ScheduleItem.defaultProps = {
  item: null,
};

export default ScheduleItem;
