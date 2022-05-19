import React from "react";

import {useLanguageContext} from '../../contexts/language.context';
import {Container, Language} from './styles';

interface LanguageProps {
  dark?: boolean;
}

const Languages: React.FC<LanguageProps> = ({dark}) => {
  const {language, setLanguage} = useLanguageContext();
  return (
    <Container>
      {['EN', 'IT', 'ES', 'FR'].map((val, idx) => (
        <span key={val}>
          <Language
            onClick={() => setLanguage!(idx)}
            selected={idx===language}
            dark={dark}
          >{val}</Language>
          <Language dark={dark}>{idx !== 3 ? ' | ': ''}</Language>
        </span>
      ))}
    </Container>
  );
};

export default Languages;
