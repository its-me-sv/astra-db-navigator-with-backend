import React, {ChangeEventHandler, useState} from 'react';

import {
  ModalWrapper, ModalContainer,
  ModalTitle, ModalButtons
} from './styles';
import {databasesTranslations, general} from '../../utils/translations.utils';

import {useLanguageContext} from '../../contexts/language.context';
import {useKeyspaceContext} from '../../contexts/keyspace.context';

import {StyledInput} from '../input/styles';
import Button from '../button';

interface KeyspaceModalProps {
  onClose: () => void;
  ls: (val: boolean) => void;
}

const KeyspaceModal: React.FC<KeyspaceModalProps> = ({onClose, ls}) => {
  const {language} = useLanguageContext();
  const {addNewKs} = useKeyspaceContext();

  const [text, setText] = useState<string>('');

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = (event) => 
  setText(event.target.value);
  const onCreate = () => {
    if (text.length < 1) return;
    if (text.search(/^[a-zA-Z0-9_]+$/) === -1) return;
    ls(true);
    setTimeout(() => {
      ls(false);
      addNewKs!(text);
      onClose();
    }, 500);
  };

  return (
    <ModalWrapper>
        <ModalContainer>
            <ModalTitle>{databasesTranslations.new[language]}</ModalTitle>
            <StyledInput 
              placeholder={databasesTranslations.searchPlaceholder[language]} 
              value={text}
              onChange={handleTextChange}
            />
            <ModalButtons forKs>
              <Button 
                variant={3} 
                text={general.cancel[language]} 
                onPress={onClose} 
                disabled={false} 
              />
              <Button 
                variant={4} 
                text={databasesTranslations.newKs[language]} 
                onPress={onCreate} 
                disabled={text.length < 1}
              />
            </ModalButtons>
        </ModalContainer>
    </ModalWrapper>
  );
};

export default KeyspaceModal;
