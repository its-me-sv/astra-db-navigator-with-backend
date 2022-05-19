import React from "react";

import {
  FilterArea as Container, ColumnTitle, 
  FilterHeader, SubFieldItems, FilterFooter,
  PagesHolder
} from '../../pages/rows/styles';
import {ModalItem, ModalItemCloseButton} from "../keyspaces/styles";
import {HrLine} from "../keyspaces/styles";
import {pageSizes} from "../../utils/dummy-data";
import {
  rowTranslations, newTableTranslations, 
  tableModalTranslations
} from '../../utils/translations.utils';

import {useLanguageContext} from '../../contexts/language.context';
import {useRowsContext} from '../../contexts/rows.context';

import Button from '../button';
import Select from '../select';

interface FilterAreaProps {}

const FilterArea: React.FC<FilterAreaProps> = () => {
  const {language} = useLanguageContext();
  const {
    columns, resColumns, currColumn, pageSize, fetchRows,
    setCurrColumn, addColumn, removeColumn, setPageSize
  } = useRowsContext();

  return (
    <Container>
      <ColumnTitle>{rowTranslations.filter[language]}</ColumnTitle>
      <PagesHolder>
        <Select
          options={pageSizes}
          val={pageSize}
          setVal={setPageSize!}
          notHeader
          label="Page size"
        />
      </PagesHolder>
      <HrLine il />
      {columns.length > 0 && (
        <FilterHeader>
          <Select
            options={columns}
            val={currColumn}
            setVal={setCurrColumn!}
            notHeader
            label="Columns"
          />
          <Button
            variant={4}
            text={newTableTranslations.addCol[language]}
            onPress={addColumn!}
            disabled={columns.length < 1}
            tiny
          />
        </FilterHeader>
      )}
      <SubFieldItems>
        {resColumns.map((val) => (
          <ModalItem key={val}>
            <div>
              <span>{val}</span>
              <ModalItemCloseButton
                title={tableModalTranslations.delCol[language]}
                onClick={() => removeColumn!(val)}
              >
                🗑️
              </ModalItemCloseButton>
            </div>
          </ModalItem>
        ))}
      </SubFieldItems>
      <HrLine il />
      <FilterFooter>
        <Button
          text={rowTranslations.applyFilter[language]}
          variant={5}
          onPress={() => fetchRows!(true)}
          disabled={resColumns.length === 0}
          medium
        />
      </FilterFooter>
    </Container>
  );
};

export default FilterArea;
