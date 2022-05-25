import React, {MutableRefObject, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  ModalContainer, ModalWrapper,
  ModalTitle, ColumnOptionsContainer
} from "./styles";
import {ModalButtons} from '../../pages/keyspace/styles';
import {general, keyspacesTranslations} from '../../utils/translations.utils';
import {NewColumn as NewTyp} from '../../utils/types';
import {collectionTypes} from '../../utils/dummy-data';

import {useLanguageContext} from '../../contexts/language.context';
import {useConnectionContext} from "../../contexts/connection.context";
import {useDatabaseContext} from "../../contexts/database.context";
import {useKeyspaceContext} from "../../contexts/keyspace.context";

import Button from '../button';
import Input from "../input";
import Select from "../select";

interface FieldModalProps {
  onClose: () => void;
  ac: () => void;
  newField: MutableRefObject<NewTyp>;
  fromNewTyp?: boolean;
  ls: (val: boolean) => void;
  typeName?: string;
}

const FieldModal: React.FC<FieldModalProps> = ({onClose, ac, fromNewTyp, newField, ls, typeName}) => {
  const {language} = useLanguageContext();
  const {appToken: tkn} = useConnectionContext();
  const {currDatabase} = useDatabaseContext();
  const {currKeyspace} = useKeyspaceContext();

  const [fieldName, setFieldName] = useState<string>("field_name");
  const [type, setType] = useState<string>("text");

  const onModalCreate = () => {
    newField.current.name = fieldName;
    newField.current.typeDefinition = type;
    if (fromNewTyp === true) {
      ac();
      onClose();
    } else {
      ls(true);
      axios
        .post(`/.netlify/functions/add-field`, {
          tkn,
          dbId: currDatabase.split("/")[0],
          dbRegion: currDatabase.split("/")[1],
          ksName: currKeyspace?.name,
          tName: typeName,
          newField: newField.current,
        })
        .then(({data}) => {
          ac();
          ls(false);
          toast.success(data);
          onClose();
        })
        .catch((err) => {
          ls(false);
          toast.error(err.reponse.data);
        });
    }
  };

  return (
    <ModalWrapper>
      <ModalContainer tiny>
        <ModalTitle>{keyspacesTranslations.addNewTyp[language]}</ModalTitle>
        <ColumnOptionsContainer>
          <Input
            label="Name"
            name="Name"
            value={fieldName}
            setValue={setFieldName}
            tiny
          />
          <Select
            val={type}
            setVal={setType}
            options={collectionTypes}
            notHeader
            label="Data type"
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
            text={general.create[language]}
            disabled={false}
            variant={4}
            onPress={onModalCreate}
          />
        </ModalButtons>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default FieldModal;
