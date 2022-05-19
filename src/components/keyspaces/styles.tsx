import styled from "styled-components";
import infoIcon from '../../assets/icons/info.png';

export const KeyspaceContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1%;
  margin-bottom: 0.5%;
`;

export const Seperator = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

export const SeperatorTitle = styled.span`
  font-family: Roboto;
  font-weight: 450;
  font-size: 1.4rem;
  margin-bottom: 1%;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.18rem;
  align-self: flex-start;
`;

export const ContentContainer = styled.div`
  padding: 1%;
  margin-top: 1.4%;
  display: flex;
  width: 42vw;
  max-height: 61vh;
  overflow: auto;
  flex-wrap: wrap;
  gap: 2.1rem;
`;

export const ItemHolder = styled.div`
  border-radius: 0.3rem;
  padding: 0% 0.7% 0.35% 0.7%;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  cursor: pointer;
  background-color: #f5f4f9;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.7);
  &:hover {
    box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.7) inset;
    -webkit-box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.7) inset;
    -moz-box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.7) inset;
  }
`;

export const Info = styled.img.attrs({
  alt: "",
  src: infoIcon
})`
  width: 1rem;
  height: auto;
  align-self: flex-start;
  padding-top: 2%;
  z-index: 200;
`;

export const ItemName = styled.span`
  font-family: calibri;
  font-size: 1.6rem;
  opacity: 0.91;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const HrLine = styled.div<{tg?: boolean; il?: boolean}>`
  border-bottom: 1px solid black;
  ${props => props.tg && `
    margin-top: 1.2%;
    border-width: 2px;
    opacity: 0.5;
  `}
  ${props => props.il && `
    margin-top: 0.1%;
    border-width: 1.4px;
    opacity: 0.42;
  `}
`;

export const ItemSubfield = styled.span`
  font-family: bahnschrift;
  font-size: 1rem;
  opacity: 0.84;
`;

export const ModalCloseButton = styled.span`
  font-family: calibri;
  font-size: 1.4rem;
  align-self: flex-end;
  text-transform: lowercase;
  cursor: pointer;
  position: fixed;
  &:hover {
    color: #fd2728;
  }
`;

export const ModalWrapper = styled.div`
  top: 0;
  display: flex;
  position: fixed;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.42);
  width: 100vw;
  height: 100vh;
  z-index: 200;
`;

export const ModalContainer = styled.div<{tiny?: boolean; clear?: boolean; fromNew?: boolean}>`
  display: flex;
  flex-direction: column;
  background-color: #f5f4f9;
  border-radius: 0.42rem;
  padding: 0% 0.7%;
  padding-top: 0.14%;
  width: 60vw;
  max-height: 84vh;
  overflow: auto;
  height: auto;
  ${props => props.tiny && `
    width: 50vw;
    padding-bottom: 0.42%;
  `}
  ${props => props.fromNew && `
    padding-top: 0.42%;
  `}
`;

export const ModalTitle = styled.span`
  font-family: Roboto;
  font-size: 1.6rem;
  opacity: 0.84;
  align-self: center;
`;

export const ModalSubFields = styled.div<{withGap?: boolean}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0.42%;
  ${props => props.withGap && `gap: 0.5rem;`}
`;

export const ModalSubtitle = styled.span`
  font-family: calibri;
  font-size: 1.4rem;
`;

export const ModalDeleteButton = styled.div`
  align-self: flex-end;
  width: 8rem;
  margin-top: 2.1%;
  margin-bottom: 0.5%;
`;

export const ModalSubTextsContainer = styled.div`
  font-family: bahnschrift;
  font-size: 1rem;
  opacity: 0.77;
  display: flex;
  flex-direction: column;
  padding-left: 0.42%;
  padding-top: 0.42%;
`;

export const ModalSubItemsContainer = styled.div<{large?: boolean}>`
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  max-height: 16vh;
  gap: 1rem;
  padding: 0.5%;
  margin-top: 0.21%;
  ${props => props.large && `max-height: 42vh;`}
`;

export const ModalItem = styled.div`
  border-radius: 0.3rem;
  display: flex;
  padding: 0% 1%;
  flex-direction: column;
  background-color: #f5f4f9;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.7);
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  span {
    font-family: bahnschrift;
    opacity: 0.8;
    font-size: 1rem;
  }
  span:first-child {
    font-family: Roboto;
    font-size: 1.2rem;
  }
`;

export const ModalItemCloseButton = styled.span`
  font-family: calibri;
  cursor: pointer;
  transform: scale(0.6);
  margin-left: 1rem;
  opacity: 0.5 !important;
  color: black;
  &:hover {
    color: #fd2728;
    opacity: 1 !important;
  }
`;

export const ModalFlexWrap = styled.div<{lessMargin?: boolean}>`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.4% 0%;
  ${props => props.lessMargin && `
    margin: 0.42% 0%;
  `}
  margin-bottom: 2.4%;
`;

export const ColumnOptionsContainer = styled.div`
  margin: 1% 0% 1% 0%;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
`;

export const SubFieldsSep = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`;

export const SubFieldItems = styled.div`
  display: flex;
  overflow: auto;
  flex-wrap: wrap;
  width: 50vw;
  padding: 0.42%;
  max-height: 16vh;
  gap: 0.4rem;
`;
