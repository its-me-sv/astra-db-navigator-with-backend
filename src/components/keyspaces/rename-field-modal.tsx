import React, {useState} from "react";

import {
  ColumnOptionsContainer,
  ModalContainer, ModalTitle, 
  ModalWrapper
} from "./styles";
import {ModalButtons} from '../../pages/keyspace/styles';
import {newTypeTranslations, general} from '../../utils/translations.utils';

import {useLanguageContext} from '../../contexts/language.context';

import Button from '../button';
import Select from '../select';
import Input from '../input';

interface RenameModalProps {
  onClose: () => void;
  fields: Array<string>;
  renamer: (oldName:string, newName: string) => void;
  ls: (val: boolean) => void;
}

const RenameModal: React.FC<RenameModalProps> = ({onClose, fields, ls, renamer}) => {
  const {language} = useLanguageContext();

  const [oldName, setOldName] = useState<string>(fields[0]);
  const [newName, setNewName] = useState<string>('');

  const onRename = () => {
    if (newName.length < 1) return;
    ls(true);
    setTimeout(() => {
      renamer(oldName, newName);
      ls(false);
      onClose();
    }, 500);
  };

  return (
    <ModalWrapper>
      <ModalContainer tiny>
        <ModalTitle>{newTypeTranslations.renmField[language]}</ModalTitle>
        <ColumnOptionsContainer>
          <Select
            label="Old name"
            val={oldName}
            setVal={setOldName}
            options={fields}
            notHeader
          />
          <Input
            label="New name"
            name="New name"
            value={newName}
            setValue={setNewName}
            tiny
          />
        </ColumnOptionsContainer>
        <ModalButtons>
          <Button
            text={general.cancel[language]}
            disabled={false}
            variant={3}
            onPress={onClose}
          />
          <Button
            text={general.rename[language]}
            disabled={newName.length === 0}
            variant={4}
            onPress={onRename}
          />
        </ModalButtons>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default RenameModal;
