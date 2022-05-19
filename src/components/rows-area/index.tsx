import React, {useState} from "react";

import {
  RowArea as Container, RowsHeader,
  NoRows, Rows, Row, RowHeader,
  RowButton, RowAreaWrapper
} from "../../pages/rows/styles";
import {EmptyContent} from "../../pages/keyspace/styles";
import {rowTranslations, general} from '../../utils/translations.utils';
import {RowType} from "../../utils/types";
import {getFilteredRows} from "../../utils/row.utils";

import {useLanguageContext} from '../../contexts/language.context';
import {useRowsContext} from '../../contexts/rows.context';
import {useDeleteContext} from '../../contexts/delete.context';

import SearchField from '../search-field';
import Button from '../button';

interface RowsAreaInterface {}

const RowsArea: React.FC<RowsAreaInterface> = () => {
  const {language} = useLanguageContext();
  const {rows, fetchRows, deleteRow} = useRowsContext();
  const {setText, deleteCb} = useDeleteContext();

  const [keyword, setKeyword] = useState<string>("");
  
  const applyKeyword = (val: string) => setKeyword(val);

  const removeRow = (idx: number) => {
    deleteCb!.current = () => {
      deleteRow!(idx);
      setText!('');
    };
    setText!(`${rowTranslations.delRow[language]} ?`);
  };

  const filteredRows: Array<RowType> = getFilteredRows(rows, keyword);
  
  return (
    <RowAreaWrapper>
      <RowsHeader>
        <div />
        <SearchField
          cb={applyKeyword}
          placeholder={rowTranslations.keyword[language]}
          live
        />
        <Button
          text={rowTranslations.newRow[language]}
          onPress={() => {}}
          disabled={false}
          variant={2}
        />
      </RowsHeader>
      <Container>
        {rows.length === 0 && (
          <NoRows>
            <EmptyContent>{general.noData[language]}</EmptyContent>
          </NoRows>
        )}
        {rows.length > 0 && (
          <Rows>
            {filteredRows.map((val, idx) => (
              <Row key={idx}>
                <RowHeader>
                  <RowButton title={rowTranslations.editRow[language]}>
                    ✏️
                  </RowButton>
                  <RowButton
                    title={rowTranslations.delRow[language]}
                    onClick={() => removeRow(idx)}
                  >
                    🗑️
                  </RowButton>
                </RowHeader>
                {Object.keys(val).map((prop, pidx) => {
                  const value: string = JSON.stringify(val[prop]);
                  let resultant: string = value;
                  if (value.length > 26)
                    resultant = `${value.slice(0, 18)}...${value.slice(-3)}`;
                  return (
                    <span key={pidx}>
                      {prop}: {resultant}
                    </span>
                  );
                })}
              </Row>
            ))}
            {keyword.length === 0 && (
              <Button
                text={rowTranslations.loadMore[language]}
                variant={4}
                disabled={false}
                onPress={() => fetchRows!(false)}
              />
            )}
          </Rows>
        )}
      </Container>
    </RowAreaWrapper>
  );
};

export default RowsArea;
