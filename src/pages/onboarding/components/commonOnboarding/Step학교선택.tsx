import styled from '@emotion/styled';
import { excludeCommonPart } from '@pages/onboarding/utils/excludeCommonPart';
import { useContext, useState } from 'react';
import SearchBox from '../SearchBox';
import { StepContext } from '@pages/onboarding/OnboardingPage';
import { FullBtn } from '@components/commons/FullButton';
import FullBottomSheet from '@pages/onboarding/components/FullBottomSheet';
import useSearchUnivQuery from '@pages/onboarding/hooks/useSearchUnivQuery';

const Step학교선택 = () => {
  const { onNext } = useContext(StepContext);
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [selectedUniv, setSelectedUniv] = useState('');
  const handleOpenSheet = () => setIsOpenSheet(true);
  const handleCloseSheet = () => setIsOpenSheet(false);
  const handleSelectUniv = (selectValue: string) => {
    setSelectedUniv(selectValue);
  };
  return (
    <Wrapper>
      <SearchBox placeholder="학교명을 입력해 주세요" handleInputClick={handleOpenSheet} searchValue={selectedUniv} />
      {isOpenSheet && (
        <FullBottomSheet handleClose={handleCloseSheet} isSheetOpen={isOpenSheet}>
          <Sheet학교선택 handleSelectUniv={handleSelectUniv} handleClose={handleCloseSheet} />
        </FullBottomSheet>
      )}
      <FullBtn isActive={selectedUniv !== ''} onClick={onNext} />
    </Wrapper>
  );
};

export default Step학교선택;

const Wrapper = styled.div`
  width: 100%;
  margin: 2rem 2rem 0 0;
`;

interface Sheet학교선택PropType {
  handleSelectUniv: (selectValue: string) => void;
  handleClose: () => void;
}

const Sheet학교선택 = ({ handleSelectUniv, handleClose }: Sheet학교선택PropType) => {
  const [searchValue, setSearchValue] = useState('');
  const list: string[] = useSearchUnivQuery(searchValue);

  const handleListClick = (data: string) => {
    handleSelectUniv(data);
    handleClose();
  };
  return (
    <SheetWrapper>
      <SearchBox
        placeholder="학교명을 입력해 주세요"
        searchValue={searchValue}
        handleSearchValue={(selectedValue: string) => setSearchValue(selectedValue)}
        autoFocus
      />
      <Content>
        {list &&
          list.map((d) => (
            <ListWrapper key={d} onClick={() => handleListClick(d)}>
              <ListBold key={d + 'idx'}>{searchValue}</ListBold>
              <List key={d}>{excludeCommonPart({ common: searchValue, str: d })}</List>
            </ListWrapper>
          ))}
      </Content>
    </SheetWrapper>
  );
};

const SheetWrapper = styled.div`
  width: 100%;
  padding: 2.3rem 2rem 0;
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin: 1.5rem 0 0 1rem;
`;

const ListWrapper = styled.section`
  display: flex;
`;

const ListBold = styled.span`
  ${({ theme }) => theme.fonts.Body3_SB_14};
`;

const List = styled.span`
  ${({ theme }) => theme.fonts.Body2_R_14};
`;
