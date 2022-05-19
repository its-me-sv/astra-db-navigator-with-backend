import React, {useState, useRef, MutableRefObject} from "react";

import {
  ModalWrapper, ModalContainer, 
  ModalCloseButton, ModalTitle,
  ModalDeleteButton, ModalSubFields,
  ModalSubtitle, HrLine, ModalSubItemsContainer,
  ModalItem, ModalItemCloseButton
} from './styles';
import {FieldSchema, NewColumn as NewField} from '../../utils/types';
import {
  keyspacesTranslations, newTypeTranslations,
  general
} from '../../utils/translations.utils';
import {EmptyContent} from "../../pages/keyspace/styles";

import {useLanguageContext} from '../../contexts/language.context';
import {useDeleteContext} from '../../contexts/delete.context';
import {useTypeContext} from '../../contexts/type.context';

import Button from '../button';
import FieldModal from './field-modal';
import {StyledInput} from '../input/styles';

interface NewTypeModalProps {
  onClose: () => void;
}

const NewTypeModal: React.FC<NewTypeModalProps> = ({onClose}) => {
  const {language} = useLanguageContext();
  const {deleteCb, setText} = useDeleteContext();
  const {setLoading, addType} = useTypeContext();
  
  const [fields, setFields] = useState<Array<FieldSchema>>([]);
  const [showField, setShowField] = useState<boolean>(false);
  const typNameRef = useRef() as MutableRefObject<HTMLInputElement>;
  const newFieldRef = useRef<NewField>({ name: "", typeDefinition: "ascii" });

  const hideField = () => setShowField(false);

  const applyField = () => {
    const newField: FieldSchema = {
      name: newFieldRef.current.name,
      type: newFieldRef.current.typeDefinition,
    };
    addField(newField);
  };

  const addField = (val: FieldSchema) => setFields([...fields, val]);

  const removeField = (fieldName: string) => {
    deleteCb!.current = () => {
      setFields(fields.filter(({name}) => name !== fieldName));
      setText!("");
    };
    setText!(`${general.delete[language]} field ${fieldName}?`);
  };

  const createType = () => {
    if (typNameRef.current?.value.length < 1 || fields.length < 1) return;
    if (typNameRef.current?.value.search(/^[a-zA-Z0-9_]+$/) === -1) return;
    setLoading!(true);
    const requestBody = {
      name: typNameRef.current.value,
      fields: fields.map(({name, type:typeDefinition}) => ({name, typeDefinition}))
    };
    setTimeout(() => {
      console.log(requestBody);
      addType!(typNameRef.current.value, fields.length);
      setLoading!(false);
      onClose();
    }, 500);
  };

  return (
    <ModalWrapper>
      {showField && (
        <FieldModal
          ls={setLoading!}
          onClose={hideField}
          ac={applyField}
          newField={newFieldRef}
          fromNewTyp={true}
        />
      )}
      <ModalContainer fromNew>
        <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        <ModalTitle>
          <StyledInput
            placeholder={keyspacesTranslations.typeSearchPlaceholder[language]}
            ref={typNameRef}
          />
        </ModalTitle>
        <ModalSubFields>
          <ModalSubtitle>{keyspacesTranslations.field[language]}</ModalSubtitle>
          <Button
            variant={2}
            text={newTypeTranslations.addField[language]}
            disabled={false}
            onPress={() => setShowField(true)}
            medium
          />
        </ModalSubFields>
        <HrLine />
        {fields.length === 0 && (
          <EmptyContent>{newTypeTranslations.noField[language]}</EmptyContent>
        )}
        <ModalSubItemsContainer>
          {fields.map((val) => (
            <ModalItem key={val.name}>
              <div>
                <span>{val.name}</span>
                <ModalItemCloseButton
                  title={newTypeTranslations.delTyp[language]}
                  onClick={() => removeField(val.name)}
                >
                  🗑️
                </ModalItemCloseButton>
              </div>
              <HrLine />
              <span>
                {general.type[language]}: {val.type}
              </span>
            </ModalItem>
          ))}
        </ModalSubItemsContainer>
        <ModalDeleteButton>
          <Button
            variant={2}
            text={newTypeTranslations.crtTyp[language]}
            disabled={fields.length === 0}
            onPress={createType}
            medium
          />
        </ModalDeleteButton>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default NewTypeModal;
