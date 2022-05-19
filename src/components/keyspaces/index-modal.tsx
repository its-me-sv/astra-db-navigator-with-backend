import React, { useState } from 'react';

import {
  ModalWrapper,
  ModalContainer,
  ModalTitle,
  ModalFlexWrap,
  ModalSubtitle,
  HrLine
} from './styles';
import {ModalButtons} from '../../pages/keyspace/styles';
import {
  general, 
  tableModalTranslations, 
  indexModalTranslations
} from '../../utils/translations.utils';
import {ColumnSchema, IndexSchema} from '../../utils/types';
import {booleanOptions, indexTypes, kinds} from '../../utils/dummy-data';

import Button from '../button';
import Input from '../input';
import Select from '../select';
import {useLanguageContext} from '../../contexts/language.context';

interface IndexModalProps {
  onClose: () => void;
  columns: Array<ColumnSchema>;
  indices: Array<IndexSchema>;
  table: string;
  addIdx: (idxName: string, colName: string) => void;
  ls: (val: boolean) => void;
}

const IndexModal: React.FC<IndexModalProps> = ({onClose, table, columns, addIdx, ls}) => {
  const {language} = useLanguageContext();
  
  // general
  const [column, setColumn] = useState<string>(columns[0].name);
  const [name, setName] = useState<string>(`${table}_idx`);
  const [type, setType] = useState<string>("SAI");
  const [kind, setKind] = useState<string>("NONE");
  const [cs, setCs] = useState<string>("false");
  const [normal, setNormal] = useState<string>("false");
  const [ascii, setAscii] = useState<string>("false");

  const onCreate = () => {
    ls(true);
    const requestBody: any = {
      name, column, type: "StorageAttachedIndex",
      options: {
        case_sensitive: cs === 'true',
        normalize: normal === 'true',
        ascii: ascii === 'true'
      }
    };
    if (kind !== 'NONE')
      requestBody.kind = kind;
    setTimeout(() => {
      addIdx(name, column);
      ls(false);
      onClose();
    }, 500);
  };

  return (
    <ModalWrapper>
      <ModalContainer tiny>
        <ModalTitle>{indexModalTranslations.title[language]}</ModalTitle>
        <ModalSubtitle>{indexModalTranslations.bscOps[language]}</ModalSubtitle>
        <HrLine il />
        <ModalFlexWrap lessMargin>
          <Input
            label="Name"
            value={name}
            name="Name"
            setValue={setName}
            tiny
          />
          <Select
            label="Column"
            val={column}
            setVal={setColumn}
            options={columns.map(({ name }) => name)}
            notHeader
          />
          <Select
            label="Type"
            val={type}
            setVal={setType}
            options={indexTypes}
            notHeader
          />
          <Select
            label="Kind"
            val={kind}
            setVal={setKind}
            options={kinds}
            notHeader
          />
          <Select
            label="Ascii"
            val={ascii}
            setVal={setAscii}
            options={booleanOptions.reverse()}
            notHeader
          />
          <Select
            label="Normalize"
            val={normal}
            setVal={setNormal}
            options={booleanOptions.reverse()}
            notHeader
          />
          <Select
            label="Case sensitive"
            val={cs}
            setVal={setCs}
            options={booleanOptions.reverse()}
            notHeader
          />
        </ModalFlexWrap>
        <ModalButtons>
          <Button
            variant={3}
            text={general.cancel[language]}
            onPress={onClose}
            disabled={false}
          />
          <Button
            variant={4}
            text={tableModalTranslations.crtIdx[language]}
            onPress={onCreate}
            disabled={false}
          />
        </ModalButtons>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default IndexModal;
