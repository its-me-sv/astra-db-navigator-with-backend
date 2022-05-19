import styled from "styled-components";

export const MainFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #20293a;
  padding-left: 0.5%;
  a {
    text-decoration: none;
    font-family: bahnschrift;
    text-transform: uppercase;
    color: #f0f2f5;
    opacity: 0.84;
    &:hover {
      color: #eb6c34;
      opacity: 1;
    }
  }
`;

export const ButtonWrapper = styled.div`
  align-self: center;
  width: 7.7vw;
`;
