import React, {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  ColumnOptionsContainer,
  ModalContainer, ModalTitle, 
  ModalWrapper
} from "./styles";
import {ModalButtons} from '../../pages/keyspace/styles';
import {newTypeTranslations, general} from '../../utils/translations.utils';

import {useLanguageContext} from '../../contexts/language.context';
import {useConnectionContext} from "../../contexts/connection.context";
import {useDatabaseContext} from "../../contexts/database.context";
import {useKeyspaceContext} from "../../contexts/keyspace.context";

import Button from '../button';
import Select from '../select';
import Input from '../input';

interface RenameModalProps {
  onClose: () => void;
  fields: Array<string>;
  renamer: (oldName:string, newName: string) => void;
  ls: (val: boolean) => void;
  typeName?: string;
}

const RenameModal: React.FC<RenameModalProps> = ({onClose, fields, ls, renamer, typeName}) => {
  const {language} = useLanguageContext();
  const {appToken: tkn} = useConnectionContext();
  const {currDatabase} = useDatabaseContext();
  const {currKeyspace} = useKeyspaceContext();

  const [oldName, setOldName] = useState<string>(fields[0]);
  const [newName, setNewName] = useState<string>('');

  const onRename = () => {
    if (newName.length < 1) return;
    ls(true);
    axios
      .post(`/.netlify/functions/rename-field`, {
        tkn,
        dbId: currDatabase.split("/")[0],
        dbRegion: currDatabase.split("/")[1],
        ksName: currKeyspace?.name,
        tName: typeName,
        renamed: {from: oldName, to: newName},
      })
      .then(({data}) => {
        ls(false);
        toast.success(data);
        renamer(oldName, newName);
        onClose();
      })
      .catch((err) => {
        ls(false);
        toast.error(err.reponse.data);
      });
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
