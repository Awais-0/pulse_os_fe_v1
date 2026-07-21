import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

interface LoaderProps {
  tip?: string; // Optional custom text under the spinner
}

const LoaderX: React.FC<LoaderProps> = ({ tip = 'Loading...' }) => {
  return (
    <Overlay>
      <Spin size="large" tip={tip} />
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  z-index: 9999;
  cursor: wait;

  /* Custom styling for Antd Spin components inside the overlay */
  .ant-spin .ant-spin-dot i {
    background-color: #ffffff; /* White dots to pop over dark backdrop */
  }

  .ant-spin .ant-spin-text {
    color: #ffffff;
    margin-top: 12px;
    font-size: 0.95rem;
    letter-spacing: 0.5px;
  }
`;

export default LoaderX;