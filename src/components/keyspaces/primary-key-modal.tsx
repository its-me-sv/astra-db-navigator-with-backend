import React, {useState} from "react";

import {
  ModalWrapper, ModalContainer, 
  ModalTitle, ColumnOptionsContainer
} from './styles';
import {ModalButtons} from "../../pages/keyspace/styles";
import {PrimaryKeyType, ClusterSchema, OrdersType} from '../../utils/types';
import {newTableTranslations, general} from '../../utils/translations.utils';
import {orderTypes} from "../../utils/dummy-data";

import {useLanguageContext} from '../../contexts/language.context';

import Button from '../button';
import Select from '../select';

interface PrimaryKeyModalProps {
  type: PrimaryKeyType;
  columns: Array<string>;
  onClose: () => void;
  parCb: (val: string) => void;
  cluCb: (val: ClusterSchema) => void;
}

const titleType = {
  "PARTITION": newTableTranslations.addParKey,
  "CLUSTERING": newTableTranslations.addClsKey,
  "NONE": ""
};

const PrimaryKeyModal: React.FC<PrimaryKeyModalProps> = ({
  type, onClose, parCb, cluCb, columns
}) => {
  const {language} = useLanguageContext();

  const [currCol, setCurrCol] = useState<string>(columns[0]);
  const [currOrd, setCurrOrd] = useState<OrdersType|string>("ASC");

  const onCreate = () => {
    if (type === "PARTITION") parCb(currCol);
    else cluCb({column: currCol, order: currOrd as OrdersType});
    onClose();
  };

  return (
    <ModalWrapper>
      <ModalContainer tiny>
        <ModalTitle>{titleType[type][language]}</ModalTitle>
        <ColumnOptionsContainer>
          <Select 
            options={columns}
            val={currCol}
            setVal={setCurrCol}
            notHeader
            label="Column"
          />
          {type === "CLUSTERING" && (
            <Select
              options={orderTypes}
              val={currOrd}
              setVal={setCurrOrd}
              notHeader
              label="Order"
            />
          )}
        </ColumnOptionsContainer>
        <ModalButtons>
          <Button
            text={general.cancel[language]}
            disabled={false}
            variant={3}
            onPress={onClose}
          />
          <Button
            text={newTableTranslations.addCol[language]}
            disabled={false}
            variant={4}
            onPress={onCreate}
          />
        </ModalButtons>
      </ModalContainer>
    </ModalWrapper>
  );
}; 

export default PrimaryKeyModal;
