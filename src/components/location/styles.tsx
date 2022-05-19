import styled from "styled-components";

export const LocationContainer = styled.div`
  margin: 0.5% 0% 0% 0.42%;
  font-family: Roboto;
  font-size: 1.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.42rem;
`;

export const LocationItem = styled.span<{ selected?: boolean }>`
  padding: 0.042% 0.24%;
  border-radius: 0.36rem;
  cursor: pointer;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.7);
  &:hover {
    box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.7) inset;
    -webkit-box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.7) inset;
    -moz-box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.7) inset;
  }
  ${(props) =>
    props.selected &&
    `
    box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.7) inset;
    -webkit-box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.7) inset;
    -moz-box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.7) inset;
  `}
`;
