import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Spinner = styled.div`
  height: 48px;
  width: 48px;
  border-radius: 50%;
  border-top: 2px solid var(--primary);
  border-bottom: 2px solid var(--primary);
  animation: ${spin} 1s linear infinite;
  background-color: red;
`;

const LoadingSpinner = () => {
  return (
    <SpinnerWrapper>
      <Spinner />
    </SpinnerWrapper>
  );
};

export default LoadingSpinner;