import React, {ChangeEventHandler, useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import {
  ModalWrapper, ModalContainer,
  ModalTitle, ModalButtons
} from './styles';
import {databasesTranslations, general} from '../../utils/translations.utils';

import {useLanguageContext} from '../../contexts/language.context';
import {useKeyspaceContext} from '../../contexts/keyspace.context';
import {useConnectionContext} from '../../contexts/connection.context';
import {useDatabaseContext} from '../../contexts/database.context';

import {StyledInput} from '../input/styles';
import Button from '../button';

interface KeyspaceModalProps {
  onClose: () => void;
  ls: (val: boolean) => void;
}

const KeyspaceModal: React.FC<KeyspaceModalProps> = ({onClose, ls}) => {
  const {language} = useLanguageContext();
  const {appToken: tkn} = useConnectionContext();
  const {addNewKs} = useKeyspaceContext();
  const {currDatabase} = useDatabaseContext();

  const [text, setText] = useState<string>('');

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = (event) => 
  setText(event.target.value);
  const onCreate = () => {
    if (text.length < 1) return;
    if (text.search(/^[a-zA-Z0-9_]+$/) === -1) return;
    ls(true);
    axios.post(`/.netlify/functions/create-keyspace`, {
      dbId: currDatabase.split('/')[0],
      tkn,
      ksName: text,
    }).then(({data}) => {
      ls(false);
      toast.success(data);
      addNewKs!(text);
      onClose();
    }).catch(err => {
      ls(false);
      toast.error(err.response.data);
    });
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
