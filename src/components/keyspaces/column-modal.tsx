import React, {MutableRefObject, useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

import {
  ModalWrapper, ModalContainer,
  ModalTitle,
  ColumnOptionsContainer,
} from './styles';
import {ModalButtons} from '../../pages/keyspace/styles';
import {general, keyspacesTranslations} from '../../utils/translations.utils';
import {NewColumn} from '../../utils/types';
import {generateColumnTypeDefinition} from '../../utils/column.utils';
import {
  dataTypes, 
  // colTypes, 
  booleanOptions, 
  collectionDepth, collectionTypes,
  collections, nonMapCollections
} from '../../utils/dummy-data';

import {useLanguageContext} from '../../contexts/language.context';
import {useConnectionContext} from '../../contexts/connection.context';
import {useDatabaseContext} from '../../contexts/database.context';
import {useKeyspaceContext} from '../../contexts/keyspace.context';

import Input from '../input';
import Select from '../select';
import Button from '../button';

interface ColumnModalProps {
  onClose: () => void;
  types: Array<string>;
  newCol: MutableRefObject<NewColumn>;
  ls: (val: boolean) => void;
  ac: () => void;
  fromNewTbl?: boolean;
  tableName?: string;
}

const ColumnModal: React.FC<ColumnModalProps> = ({
  onClose, types, newCol, ls, ac, fromNewTbl, tableName
}) => {
  const {language} = useLanguageContext();
  const {appToken: tkn} = useConnectionContext();
  const {currDatabase} = useDatabaseContext();
  const {currKeyspace} = useKeyspaceContext();

  const [columnName, setColumnName] = useState<string>('column_name');
  const [type, setType] = useState<string>('ascii');
  // const [keyType, setKeyType] = useState<string>("Partition");
  
  // for collections
  const [frozen, setFrozen] = useState<string>("false");
  // for list
  const [depth, setDepth] = useState<string>("1");
  const [colTyp, setColTyp] = useState<string>('ascii');
  // for map
  const [key, setKey] = useState<string>('ascii');
  const [value, setValue] = useState<string>('ascii');

  const onColumnCreate = () => {
    newCol.current.name = columnName;
    newCol.current.typeDefinition = generateColumnTypeDefinition(
      type, frozen === 'true', +depth, 
      colTyp, key, value
    );
    if (fromNewTbl === true) {
      ac();
      onClose();
    } else {
      ls(true);
      axios
        .post("/.netlify/functions/add-column", {
          tkn,
          dbId: currDatabase.split("/")[0],
          dbRegion: currDatabase.split("/")[1],
          ksName: currKeyspace?.name,
          tableName,
          reqBody: newCol.current,
        })
        .then(({ data }) => {
          ac();
          ls(false);
          toast.success(data);
          onClose();
        })
        .catch((err) => {
          ls(false);
          toast.error(err.response.data);
        });
    }
  };

  return (
    <ModalWrapper>
      <ModalContainer tiny>
        <ModalTitle>{keyspacesTranslations.addNewCol[language]}</ModalTitle>
        <ColumnOptionsContainer>
          <Input
            label="Name"
            name="Name"
            value={columnName}
            setValue={setColumnName}
            tiny
          />
          <Select
            val={type}
            setVal={setType}
            options={[...dataTypes, ...types].sort()}
            notHeader
            label="Data type"
          />
          {collections.includes(type) && (
            <Select
              val={frozen}
              setVal={setFrozen}
              options={booleanOptions}
              notHeader
              label="Frozen"
            />
          )}
          {type === "list" && (
            <Select
              val={depth}
              setVal={setDepth}
              options={collectionDepth}
              notHeader
              label="Depth"
            />
          )}
          {type === "map" && (
            <>
              <Select
                val={key}
                setVal={setKey}
                options={collectionTypes}
                notHeader
                label="Key"
              />
              <Select
                val={value}
                setVal={setValue}
                options={collectionTypes}
                notHeader
                label="Value"
              />
            </>
          )}
          {nonMapCollections.includes(type) && (
            <Select
              val={colTyp}
              setVal={setColTyp}
              options={collectionTypes}
              notHeader
              label="Collection type"
            />
          )}
          {/* <Select 
              val={keyType}
              setVal={setKeyType}
              options={colTypes}
              notHeader
              label="Key type"
            /> */}
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
            onPress={onColumnCreate}
          />
        </ModalButtons>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default ColumnModal;
