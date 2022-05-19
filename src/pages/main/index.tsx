import React from "react";

import {MainWrapper as MainContainer} from './styles';

import MainHeader from "../../components/main-header";
import MainFooter from '../../components/main-footer';
import MainBody from '../../components/main-body';

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
  return (
    <MainContainer>
      <MainHeader />
      <MainBody />
      <MainFooter />
    </MainContainer>
  );
};

export default MainPage;
