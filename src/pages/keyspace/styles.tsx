import styled from "styled-components";

export const DatabaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const EmptyContent = styled.span`
  margin-top: 1rem;
  font-family: calibri;
  font-size: 1.8rem;
  color: black;
  opacity: 0.5;
`;

export const KeyspacesContainer = styled.div`
  padding: 1%;
  display: flex;
  max-width: 97vw;
  max-height: 71vh;
  overflow: auto;
  flex-wrap: wrap;
  gap: 2.1rem;
`;

export const KeyspaceHolder = styled.div`
  /* border: 1px solid black; */
  border-radius: 0.3rem;
  padding: 0% 0.7% 0.35% 0.7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

export const KeyspaceName = styled.span`
  font-family: calibri;
  font-size: 1.6rem;
  opacity: 0.91;
`;

export const HrLine = styled.div`
  border-bottom: 1px solid black;
`;

export const KeyspaceDc = styled.span`
  font-family: bahnschrift;
  font-size: 1rem;
  opacity: 0.84;
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

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f4f9;
  border-radius: 0.42rem;
  padding: 2% 4%;
  gap: 1.4rem;
`;

export const ModalTitle = styled.span`
  font-family: Roboto;
  font-size: 1.6rem;
  opacity: 0.84;
  align-self: center;
`;

export const ModalButtons = styled.div<{forKs?: boolean}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${props => props.forKs && `
    width: 28vw;
  `}
`;
