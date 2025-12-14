import styled from "styled-components";

export const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const Header = styled.div`
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 24px 0;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const IconWrapper = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 12px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
`;

export const Subtitle = styled.p`
  color: #718096;
  margin: 4px 0 0 0;
  font-size: 14px;
`;

export const MainContent = styled.div`
  max-width: 1200px;
  margin: 32px auto;
  padding: 0 20px;
`;

export const Card = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const TabContainer = styled.div`
  display: flex;
  border-bottom: 2px solid #e2e8f0;
  background: #f7fafc;
`;

export const Tab = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  font-weight: 600;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "transparent"};
  color: ${(props) => (props.active ? "white" : "#4a5568")};

  &:hover {
    background: ${(props) =>
      props.active
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "#edf2f7"};
  }
`;

export const TabContent = styled.div`
  padding: 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 24px 0;
`;

export const RequestCard = styled.div`
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export const RequestHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const UserAvatar = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const UserDetails = styled.div``;

export const UserName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 4px 0;
`;

export const UserEmail = styled.p`
  color: #4a5568;
  margin: 0 0 4px 0;
  font-size: 14px;
`;

export const UserMeta = styled.p`
  color: #718096;
  margin: 0;
  font-size: 13px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${(props) =>
    props.variant === "success"
      ? "#48bb78"
      : props.variant === "danger"
      ? "#f56565"
      : "#667eea"};
  color: white;

  &:hover {
    background: ${(props) =>
      props.variant === "success"
        ? "#38a169"
        : props.variant === "danger"
        ? "#e53e3e"
        : "#5a67d8"};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
`;

export const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 8px;
  font-size: 14px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 14px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.3s ease;
  box-sizing: border-box;
  background: white;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 64px 20px;
  background: #f7fafc;
  border-radius: 12px;
`;

export const EmptyIcon = styled.div`
  margin: 0 auto 16px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cbd5e0;
`;

export const EmptyText = styled.p`
  color: #718096;
  font-size: 18px;
  margin: 0;
`;

export const Loader = styled.div`
  display: flex;
  justify-content: center;
  padding: 64px 0;
`;

export const Spinner = styled.div`
  border: 4px solid #e2e8f0;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const ResultsGrid = styled.div`
  display: grid;
  gap: 16px;
`;

export const ResultCard = styled.div`
  background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #e2e8f0;
`;

export const AssignmentCard = styled.div`
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }
`;

export const AssignmentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const AssignmentTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
`;

export const DeadlineBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${(props) => (props.expired ? "#fed7d7" : "#c6f6d5")};
  color: ${(props) => (props.expired ? "#c53030" : "#276749")};
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
`;

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  background: ${(props) =>
    props.status === "completed" ? "#c6f6d5" : "#feebc8"};
  color: ${(props) => (props.status === "completed" ? "#276749" : "#c05621")};
`;
