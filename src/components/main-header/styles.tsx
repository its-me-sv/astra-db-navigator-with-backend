import styled from "styled-components";
import {ReactComponent as DataStax} from "../../assets/logos/datastax-white-logo.svg";
import {ReactComponent as AstraDB} from "../../assets/logos/astra_db.svg";

export const Container = styled.div`
  background-color: #20293a;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    padding-left: 1%;
    display: flex;
    flex-direction: column;
    gap: 0.24rem;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-right: 1%;
`;

export const DataStaxLogo = styled(DataStax)`
  width: 8vw;
  height: auto;
`;

export const AstraDBLogo = styled(AstraDB)`
  width: 9vw;
  height: auto;
`;
