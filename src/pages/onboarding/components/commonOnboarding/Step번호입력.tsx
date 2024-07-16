import { FullBtn } from '@components/commons/FullButton';
import { useState, useEffect } from 'react';
import { formatTime } from '../../utils/formatTime';
import { InnerButton, InputBox, TextBox } from '../TextBox';
import { useContext } from 'react';
import { StepContext } from '@pages/onboarding/OnboardingPage';
import styled from '@emotion/styled';

const Step번호입력 = () => {
  const { onNext } = useContext(StepContext);
  // 임시 변수
  const VERIFICATION_CODE = '0000';
  const USER_INPUT = '0000';

  // 3분 타이머
  const [timeLeft, setTimeLeft] = useState(180 * 1000);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { minutes, seconds } = formatTime(timeLeft);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      return;
    }

    const id = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1000) {
          clearInterval(id);
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isActive, timeLeft]);

  // 버튼 클릭시 타이머 시작
  const handleStart = () => {
    setIsActive(true);
  };

  return (
    <Wrapper>
      <TextBox label="">
        <InputBox label="폰번호" placeholder="전화번호를 입력해 주세요">
          <InnerButton onClick={handleStart} text="인증번호 전송" />
        </InputBox>
        <InputBox label="인증번호" placeholder="전송된 4자리 코드를 입력해 주세요">
          <Timer>
            {minutes} : {seconds}
          </Timer>
        </InputBox>
      </TextBox>
      <FullBtn text="인증 확인" isActive={USER_INPUT === VERIFICATION_CODE} onClick={onNext} />
    </Wrapper>
  );
};

export default Step번호입력;

const Wrapper = styled.div`
  padding-top: 2rem;
`;

const Timer = styled.div`
  position: absolute;
  right: 1.5rem;
  bottom: 1.45rem;

  ${({ theme }) => theme.fonts.Body1_M_14};
  color: ${({ theme }) => theme.colors.grayScaleMG2};
`;
