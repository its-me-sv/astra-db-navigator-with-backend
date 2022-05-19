import React, {MutableRefObject, useState} from "react";
import {
  ModalContainer, ModalWrapper,
  ModalTitle, ColumnOptionsContainer
} from "./styles";
import {ModalButtons} from '../../pages/keyspace/styles';
import {general, keyspacesTranslations} from '../../utils/translations.utils';
import {NewColumn as NewTyp} from '../../utils/types';
import {collectionTypes} from '../../utils/dummy-data';

import {useLanguageContext} from '../../contexts/language.context';

import Button from '../button';
import Input from "../input";
import Select from "../select";

interface FieldModalProps {
  onClose: () => void;
  ac: () => void;
  newField: MutableRefObject<NewTyp>;
  fromNewTyp?: boolean;
  ls: (val: boolean) => void;
}

const FieldModal: React.FC<FieldModalProps> = ({onClose, ac, fromNewTyp, newField, ls}) => {
  const {language} = useLanguageContext();

  const [fieldName, setFieldName] = useState<string>("field_name");
  const [type, setType] = useState<string>("ascii");

  const onModalCreate = () => {
    newField.current.name = fieldName;
    newField.current.typeDefinition = type;
    if (fromNewTyp === true) {
      ac();
      onClose();
    } else {
      ls(true);
      setTimeout(() => {
        ac();
        ls(false);
        onClose();
      }, 500);
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
