import styled from "styled-components";

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
