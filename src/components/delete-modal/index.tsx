import React from "react";
import toast from "react-hot-toast";

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
  const {text, setText, deleteCb, secure} = useDeleteContext();

  const onDeleteClick = () => {
    const secureText = secure?.current || '';
    if (deleteCb?.current) {
      if (secureText.length < 1) {
        deleteCb.current();
        return;
      } else {
        const userInput: string | null = window.prompt(
          `Please type ${secureText} to confirm`
        );
        if (!userInput || userInput !== secureText) {
          toast.error("Confirmation failed");
          return;
        } else {
          deleteCb.current();
          secure!.current = "";
          return;
        }
      }
    } else {
      return;
    }
  };

  return (
    <ModalWrapper>
      <ModalContainer>
        <ModalTitle>{text}</ModalTitle>
        <ModalButtons>
          <Button
            variant={4}
            text={general.cancel[language]}
            onPress={() => {
              setText!("");
              secure!.current = "";
            }}
            disabled={false}
          />
          <Button
            variant={3}
            text={general.yes[language]}
            onPress={onDeleteClick}
            disabled={false}
          />
        </ModalButtons>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default DeleteModal;
