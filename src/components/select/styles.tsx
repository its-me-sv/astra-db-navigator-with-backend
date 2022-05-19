import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  gap: 0.15rem;
`;

export const SelectStyles = styled.select<{ notHdr?: boolean }>`
  border-radius: 0.21rem;
  font-size: 1.2rem;
  border: none;
  outline: none;
  background-color: #20293a;
  color: #f5f4f9;
  text-align: center;
  cursor: pointer;
  ${(props) =>
    props.notHdr &&
    `
    background-color: #f5f4f9;
    color: black;
    border-radius: 0.21rem;
    font-size: 1.2rem;
    outline: none;
    border: none;
    background-color: #f5f4f9;
    box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.7);
    -webkit-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.7);
    -moz-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.7);
    &:focus {
      box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.7) inset;
      -webkit-box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.7) inset;
      -moz-box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.7) inset;
    }
  `}
`;

export const OptionStyles = styled.option``;
