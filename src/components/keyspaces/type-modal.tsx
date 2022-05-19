import React, {useState, useRef, useEffect} from "react";

import {
  ModalContainer, ModalWrapper,
  ModalCloseButton, ModalTitle,
  ModalSubFields, ModalSubtitle,
  HrLine, ModalDeleteButton,
  ModalSubItemsContainer, ModalItem,
} from "./styles";
import {
  keyspacesTranslations, newTypeTranslations,
  general
} from '../../utils/translations.utils';
import {dummyFields} from '../../utils/dummy-data';
import {EmptyContent} from "../../pages/keyspace/styles";
import {FieldSchema, NewColumn as NewField} from '../../utils/types';

import {useLanguageContext} from '../../contexts/language.context';
import {useDeleteContext} from "../../contexts/delete.context";
import {useTypeContext} from "../../contexts/type.context";

import Button from '../button';
import FieldModal from './field-modal';
import RenameModal from "./rename-field-modal";

interface TypeModalProps {
  typeName: string;
  ls: (val: boolean) => void;
  onClose: () => void;
}

const TypeModal: React.FC<TypeModalProps> = ({typeName, onClose, ls}) => {
  const {language} = useLanguageContext();
  const {deleteCb, setText} = useDeleteContext();
  const {setLoading, removeType} = useTypeContext();

  const [fields, setFields] = useState<Array<FieldSchema>>([]);
  const [showField, setShowField] = useState<boolean>(false);
  const [showRename, setShowRename] = useState<boolean>(false);
  const newFieldRef = useRef<NewField>({ name: "", typeDefinition: "ascii" });

  const deleteType = () => {
    deleteCb!.current = () => {
      setLoading!(true);
      setTimeout(() => {
        removeType!(typeName);
        setText!("");
        onClose();
        setLoading!(false);
      }, 500);
    };
    setText!(`${general.delete[language]} ${general.type[language].toLowerCase()} ${typeName}?`);
  };

  const hideField = () => setShowField(false);
  const hideRename = () => setShowRename(false);

  const applyField = () => {
    const newField: FieldSchema = {
      name: newFieldRef.current.name,
      type: newFieldRef.current.typeDefinition,
    };
    addField(newField);
  };

  const addField = (val: FieldSchema) => setFields([...fields, val]);

  const renameField = (oldName:string, newName: string) => {
    if (newName.length < 1) return;
    if (newName.search(/^[a-zA-Z0-9_]+$/) === -1) return;
    let updatedFields: Array<FieldSchema> = [];
    for (let field of fields) {
      if (field.name !== oldName) updatedFields.push(field);
      else updatedFields.push({name: newName, type: field.type});
    }
    setFields(updatedFields);
  };

  useEffect(() => {
    if (typeName.length < 0) return;
    ls!(true);
    setTimeout(() => {
      setFields(dummyFields);
      ls!(false);
    }, 500);
  }, [typeName]);

  return (
    <ModalWrapper>
      {showField && (
        <FieldModal
          ls={setLoading!}
          onClose={hideField}
          ac={applyField}
          newField={newFieldRef}
        />
      )}
      {showRename && (
        <RenameModal
          ls={setLoading!}
          onClose={hideRename}
          fields={fields.map(({name}) => name)}
          renamer={renameField}
        />
      )}
      <ModalContainer>
        <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
        <ModalTitle>{typeName}</ModalTitle>
        <ModalSubFields>
          <ModalSubtitle>{keyspacesTranslations.field[language]}</ModalSubtitle>
          <ModalSubFields withGap>
            <Button
              variant={5}
              text={newTypeTranslations.renmField[language]}
              disabled={false}
              onPress={() => setShowRename(true)}
              medium
            />
            <Button
              variant={2}
              text={newTypeTranslations.addField[language]}
              disabled={false}
              onPress={() => setShowField(true)}
              medium
            />
          </ModalSubFields>
        </ModalSubFields>
        <HrLine />
        {fields.length === 0 && (
          <EmptyContent>{general.noData[language]}</EmptyContent>
        )}
        <ModalSubItemsContainer large>
          {fields.map((val) => (
            <ModalItem key={val.name}>
              <div>
                <span>{val.name}</span>
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
            variant={3}
            text={newTypeTranslations.delTyp[language]}
            disabled={false}
            onPress={deleteType}
            tiny
          />
        </ModalDeleteButton>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default TypeModal;
