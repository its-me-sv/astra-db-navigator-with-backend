import React, {useState, useRef, useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
import {EmptyContent} from "../../pages/keyspace/styles";
import {FieldSchema, NewColumn as NewField} from '../../utils/types';
import {extractFields} from "../../utils/extractors.utils";

import {useLanguageContext} from '../../contexts/language.context';
import {useDeleteContext} from "../../contexts/delete.context";
import {useTypeContext} from "../../contexts/type.context";
import {useConnectionContext} from '../../contexts/connection.context';
import {useDatabaseContext} from "../../contexts/database.context";
import {useKeyspaceContext} from "../../contexts/keyspace.context";

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
  const {appToken: tkn} = useConnectionContext();
  const {currDatabase} = useDatabaseContext();
  const {currKeyspace} = useKeyspaceContext();

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
    axios
      .post(`/.netlify/functions/fetch-fields`, {
        tkn,
        dbId: currDatabase.split("/")[0],
        dbRegion: currDatabase.split("/")[1],
        ksName: currKeyspace?.name,
        tName: typeName,
      })
      .then(({data}) => {
        setFields(extractFields(data.data.fields));
        ls!(false);
      })
      .catch((err) => {
        ls!(false);
        toast.error(err.response.data);
      });
  }, [typeName]);

  return (
    <ModalWrapper>
      {showField && (
        <FieldModal
          ls={setLoading!}
          onClose={hideField}
          ac={applyField}
          newField={newFieldRef}
          typeName={typeName}
        />
      )}
      {showRename && (
        <RenameModal
          ls={setLoading!}
          onClose={hideRename}
          fields={fields.map(({name}) => name)}
          renamer={renameField}
          typeName={typeName}
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
