import styled from 'styled-components';

import {ReactComponent as DataStaxLogo} from '../../assets/logos/datastax-white-logo.svg';
import {ReactComponent as AstraDBLogo} from '../../assets/logos/astra_db.svg';

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  background-color: #053a5f;
`;

export const HomePageHeader = styled.div`
  margin-top: 1.5%;
  margin-left: 3%;
`;

export const DSLogo = styled(DataStaxLogo)``;

export const HomePageBody = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const BodyTop = styled.div`
  display: flex;
  flex-direction: column;
  span {
    margin-top: 1%;
    align-self: flex-end;
    font-family: Roboto;
    font-weight: 900;
    font-size: 1.2rem;
    color: #eb6c34;
  }
`;

export const CaptionText = styled.span`
  font-family: Roboto;
  font-size: 1.2rem;
  color: #f5f4f9;
`;

export const AstraLogo = styled(AstraDBLogo)``;

export const BodyForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  border-radius: 0.49rem;
  background-color: #f5f4f9;
  padding: 4% 6%;
  span {
    font-family: Roboto;
    font-size: 1.6rem;
  }
`;

export const BodyInput = styled.div`
  width: 21rem;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  a {
    text-decoration: none;
    font-family: Roboto;
    font-weight: 700;
    font-size: 0.9rem;
    align-self: flex-end;
    color: #1e71d4;
  }
`;

export const BodyFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.21rem;
  font-size: 1rem;
  span {
    font-family: Roboto;
    color: #f5f4f9;
  }
  a {
    font-family: Roboto;
    text-decoration: none;
    color: #eb6c34;
  }
`;

export const BtnContainer = styled.div`
  width: 10vw;
`;
