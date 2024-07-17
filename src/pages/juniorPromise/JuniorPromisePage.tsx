import { TempLogoIc, AlarmIc, HbHomeMainIc } from '@assets/svgs';
import { Header } from '@components/commons/Header';
import Nav from '@components/commons/Nav';
import SeniorCard from '@components/commons/seniorCard/SeniorCard';
import { SENIOR_LIST } from '@components/commons/seniorCard/seniorCardConstants';
import styled from '@emotion/styled';
import { BottomSheet } from '@pages/juniorPromise/components/BottomSheetBg';
import { useState } from 'react';
import { SeniorListBackground } from './components/SeniorListBackground';
const JuniorPromisePage = () => {
  const { seniorList } = SENIOR_LIST;
  // 필터 버튼
  const [filterActiveBtn, setFilterActiveBtn] = useState('계열');
  // 바텀 시트 여는 동작
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // 필터 버튼에 정보 넣기, 바텀시트 열기
  const handleFilterActiveBtn = (btnText: string) => {
    setFilterActiveBtn(btnText);
    setIsBottomSheetOpen(true);
  };
  // 바텀시트 닫기
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  // 바텀시트 내 직무 칩
  const [selectedPosition, setSelectedPosition] = useState(Array(21).fill(false));

  // 선택직무 리스트
  const arrPosition = [...selectedPosition];

  const handleChipPosition = (positionId: number) => {
    arrPosition[positionId] = !arrPosition[positionId];

    setSelectedPosition(arrPosition);
  };

  // 바텀시트 내 계열 칩
  const [selectedField, setSelectedField] = useState(Array(7).fill(false));

  // 선택 계열 리스트 T/F
  const arrField = [...selectedField];

  const handleChipField = (fieldId: number) => {
    arrField[fieldId] = !arrField[fieldId];

    setSelectedField(arrField);
  };

  // 초기화 함수
  const handleReset = () => {
    setSelectedPosition(Array(21).fill(false));
    setSelectedField(Array(7).fill(false));
    setChipFieldName([]);
    setChipPositionName([]);
  };

  // 선택된 직무 칩 수
  const getPositionTrueNum = (arrPosition: boolean[]) => {
    return arrPosition.filter((n) => n).length;
  };
  const positionChipNum = getPositionTrueNum(arrPosition);
  // 칩으로 나갈 선택된 계열 이름 리스트
  const [chipFieldName, setChipFieldName] = useState<string[]>([]);

  // 계열리스트에 이름넣는 함수
  const pushFieldList = (chipName: string) => {
    setChipFieldName((prev) => {
      if (prev.indexOf(chipName) === -1) {
        return [...prev, chipName];
      } else {
        return prev.filter((name) => name !== chipName);
      }
    });
  };

  // 계열리스트에 이름빼는 함수
  const deleteFieldList = (chipName: string) => {
    setChipFieldName((prev) => prev.filter((name) => name !== chipName));
  };
  // 칩으로 나갈 선택된 직무 리스트
  const [chipPositionName, setChipPositionName] = useState<string[]>([]);

  // 직무리스트에 이름 넣는 함수
  const pushPositionList = (chipName: string) => {
    setChipPositionName((prev) => {
      if (prev.indexOf(chipName) === -1) {
        return [...prev, chipName];
      } else {
        return prev.filter((name) => name !== chipName);
      }
    });
  };
  // 직무리스트에 이름빼는 함수
  const deletePositionList = (chipName: string) => {
    setChipPositionName((prev) => prev.filter((name) => name !== chipName));
  };

  return (
    <Wrapper>
      <Header LeftSvg={TempLogoIc} RightSvg={AlarmIc} bgColor="transparent" />
      <HbHomeMainIcon />
      <Title>반가워요 도리님,고민을 해결해볼까요?</Title>
      <SeniorListBackground
        handleFilterActiveBtn={handleFilterActiveBtn}
        handleReset={handleReset}
        positionChipNum={positionChipNum}
        chipFieldName={chipFieldName}
        deleteFieldList={deleteFieldList}
        handleChipField={handleChipField}
        chipPositionName={chipPositionName}
        deletePositionList={deletePositionList}
        handleChipPosition={handleChipPosition}
        $chipFieldName={chipFieldName}
        $chipPositionName={chipPositionName}>
        <SeniorListWrapper>
          {seniorList.map((list) => (
            <SeniorCard
              key={list.seniorId}
              nickname={list.nickname}
              company={list.company}
              field={list.field}
              position={list.position}
              detailPosition={list.detailPosition}
              level={list.level}
            />
          ))}
        </SeniorListWrapper>
        <Nav />
      </SeniorListBackground>
      <BottomSheet
        filterActiveBtn={filterActiveBtn}
        handleFilterActiveBtn={handleFilterActiveBtn}
        handleCloseBottomSheet={handleCloseBottomSheet}
        isBottomSheetOpen={isBottomSheetOpen}
        handleChipField={handleChipField}
        handleChipPosition={handleChipPosition}
        selectedPosition={selectedPosition}
        selectedField={selectedField}
        handleReset={handleReset}
        chipFieldName={chipFieldName}
        pushFieldList={pushFieldList}
        chipPositionName={chipPositionName}
        pushPositionList={pushPositionList}
      />
    </Wrapper>
  );
};

export default JuniorPromisePage;
const Wrapper = styled.div`
  min-height: calc(var(--vh, 1vh) * 100 - 44px);

  background-color: ${({ theme }) => theme.colors.grayScaleWG};
`;

const HbHomeMainIcon = styled(HbHomeMainIc)`
  position: relative;
`;

const Title = styled.p`
  position: absolute;
  top: 6rem;
  left: 2rem;

  width: 16.8rem;
  height: 5.6rem;

  color: ${({ theme }) => theme.colors.grayScaleBG};
  ${({ theme }) => theme.fonts.Head1_SB_20}
  word-break: keep-all;
`;
const SeniorListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  width: 100vw;
  height: 100%;
  margin-bottom: 9.8rem;
  padding: 0.8rem 2rem;
`;
