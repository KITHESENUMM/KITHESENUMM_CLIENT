import styled from '@emotion/styled';
import BottomBar from './BottomBar';
import CustomCalendar from './CustomCalendar';
import TimeList from './TimeList';

interface BottomSheetPropType {
  isSheetOpen: boolean;
  handleSheetOpen: () => void;
  handleSheetClose: () => void;
}

const CalendarBottomSheet = ({ isSheetOpen, handleSheetClose }: BottomSheetPropType) => {
  return (
    <>
      <Background isSheetOpen={isSheetOpen} onClick={handleSheetClose} />
      <BottomSheetWrapper isSheetOpen={isSheetOpen}>
        <CustomCalendar />
        <GrayLine />
        <TimeList />
        <BottomBar
          handleSheetOpen={function (): void {
            throw new Error('Function not implemented.');
          }}
          handleSheetClose={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </BottomSheetWrapper>
    </>
  );
};

export default CalendarBottomSheet;

const GrayLine = styled.div`
  width: 100%;
  height: 1rem;

  background-color: ${({ theme }) => theme.colors.grayScaleWG};
`;

const Background = styled.div<{ isSheetOpen: boolean }>`
  display: ${({ isSheetOpen }) => (isSheetOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  z-index: 2;

  width: 100%;
  height: 100dvh;

  background: ${({ theme }) => theme.colors.transparentBlack_65};
`;

const BottomSheetWrapper = styled.div<{ isSheetOpen: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  z-index: 4;

  width: 100%;
  height: auto;
  border-radius: 16px 16px 0 0;

  background: ${({ theme }) => theme.colors.grayScaleWhite};

  opacity: ${({ isSheetOpen }) => (isSheetOpen ? 1 : 0)};
  transform: translateY(${({ isSheetOpen }) => (isSheetOpen ? '0' : '100%')});

  transition:
    transform 250ms ease-out,
    opacity 250ms ease-out;
`;
