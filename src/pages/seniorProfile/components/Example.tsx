import { ArrowLeftIc } from '@assets/svgs';
import LogoIc from '@assets/svgs/ic_main_logo.svg?react';
import { FullBtn } from '@components/commons/FullButton';
import { Header } from '@components/commons/Header';
import SeniorCard from '@components/commons/seniorCard/SeniorCard';
import styled from '@emotion/styled';
import PreView from '@pages/seniorProfile/components/preView';
import { SENIOR_PROFILE_STEPS } from '@pages/seniorProfile/constants';
import { useSeniorCardQuery } from '@pages/seniorProfile/hooks/useSeniorCardQuery';
import { Meta } from '@pages/seniorProfile/SeniorProfilePage';
import { useState } from 'react';

const Example = ({ setStep }: { setStep: React.Dispatch<React.SetStateAction<number>> }) => {
  const [seniorId, setSeniorId] = useState(0);
  const { data: data1, error: error1, isLoading: isLoading1 } = useSeniorCardQuery('24');
  const { data: data2, error: error2, isLoading: isLoading2 } = useSeniorCardQuery('25');
  const { data: data3, error: error3, isLoading: isLoading3 } = useSeniorCardQuery('26');

  const dummayData = [data1, data2, data3];

  const handleCardClick = (seniorId: number) => {
    setSeniorId(seniorId);
  };

  return (
    <>
      {seniorId ? (
        <>
          <Header LeftSvg={ArrowLeftIc} onClickLeft={() => setSeniorId(0)} />
          <PreView seniorId={seniorId + ''} variant="secondary" />
        </>
      ) : (
        <>
          <Wrapper>
            <LogoIcon />
            <Meta>{SENIOR_PROFILE_STEPS[1].meta}</Meta>
            <CardContainer>
              {dummayData.map((d, idx) => (
                <div onClick={() => handleCardClick(idx + 24)}>
                  <SeniorCard
                    nickname={d?.nickname + ''}
                    company={d?.company + ''}
                    field={d?.field + ''}
                    position={d?.position + ''}
                    detailPosition={d?.detailPosition + ''}
                    level={d?.level + ''}
                    variant="secondary"
                  />
                </div>
              ))}
            </CardContainer>
          </Wrapper>
          <FullBtn
            text="다음으로"
            onClick={() => setStep && setStep((prev) => prev + 1)}
            isActive={true}
            isTransparent={true}
          />
        </>
      )}
    </>
  );
};

export default Example;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 1.5rem 2rem 0;

  background-color: ${({ theme }) => theme.colors.grayScaleLG1};
`;

const LogoIcon = styled(LogoIc)`
  width: 6.4rem;
  margin-bottom: 2.2rem;
`;

const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 3rem 0 0;
`;
