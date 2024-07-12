import styled from '@emotion/styled';
import React from 'react';
import { ButtonCheckIc } from '../../../assets/svgs';
import { TIME_SELECTION_BUTTON } from '../constants/constants';

interface TimeSelectionButtonProps {
  onSelect: () => void;
}

const TimeSelectionButton: React.FC<TimeSelectionButtonProps> = ({ onSelect }) => {
  const buttonValue = null;
  // const buttonValue = 'string';

  return (
    <Wrapper>
      {TIME_SELECTION_BUTTON.map((item) => (
        <Layout key={item.id} $isActive={buttonValue !== null} onClick={onSelect}>
          <Title2>{buttonValue || item.title}</Title2>
          {buttonValue && <StyledButtonCheckIc />}
        </Layout>
      ))}
    </Wrapper>
  );
};

export default TimeSelectionButton;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const Title2 = styled.span`
  position: relative;
  left: 2rem;

  ${({ theme }) => theme.fonts.Title2_M_16}
  color: ${({ theme }) => theme.colors.grayScaleDG};
`;

const Layout = styled.div<{ $isActive: boolean }>`
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 4.8rem;
  border: 1px solid
    ${({ theme, $isActive }) => ($isActive ? theme.colors.transparentBlue_50 : theme.colors.grayScaleLG2)};
  border-radius: 8px;

  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.transparentBlue_5 : theme.colors.grayScaleWG};
`;

const StyledButtonCheckIc = styled(ButtonCheckIc)`
  position: relative;
  right: 1rem;

  width: 2rem;
  height: 2rem;
`;
