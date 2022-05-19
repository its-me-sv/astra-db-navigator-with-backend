import React from "react";

import {
    ModalWrapper, ModalContainer, 
    ModalTitle, ModalButtons
} from './styles';
import {general} from '../../utils/translations.utils';

import {useLanguageContext} from '../../contexts/language.context';
import {useDeleteContext} from '../../contexts/delete.context';

import Button from '../button';

interface DeleteModalProps {} 

const DeleteModal: React.FC<DeleteModalProps> = () => {
  const {language} = useLanguageContext();
  const {text, setText, deleteCb} = useDeleteContext();

  return (
    <ModalWrapper>
      <ModalContainer>
        <ModalTitle>{text}</ModalTitle>
        <ModalButtons>
          <Button
            variant={4}
            text={general.cancel[language]}
            onPress={() => setText!('')}
            disabled={false}
          />
          <Button
            variant={3}
            text={general.yes[language]}
            onPress={() => deleteCb?.current && deleteCb.current()}
            disabled={false}
          />
        </ModalButtons>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default DeleteModal;
