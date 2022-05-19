import styled from "styled-components";
import Search from "../../assets/icons/search.png";

export const SearchContainer = styled.div`
  margin-bottom: 1px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0.3rem;
  padding: 0.21% 0.49%;
  gap: 0.42rem;
  span {
    font-family: bahnschrift;
    font-size: 1.4rem;
    opacity: 0.9;
    cursor: pointer;
  }
  background-color: #f5f4f9;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.7);
  -webkit-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.7);
  -moz-box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.7);
  z-index: 100;
`;

export const SearchIcon = styled.img.attrs({
  src: Search,
  alt: ""
})`
  width: 1.2rem;
  height: auto;
  cursor: pointer;
  opacity: 0.9;
`;

export const SearchInput = styled.input`
  outline: none;
  border: none;
  font-family: Roboto;
  font-size: 1.4rem;
  text-align: center;
  background-color: #f5f4f9;
  border-radius: 0.42rem;
  width: 100%;
  &:focus {
    box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.7) inset;
    -webkit-box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.7) inset;
    -moz-box-shadow: 1px 0px 3px 0px rgba(0, 0, 0, 0.7) inset;
  }
`;
