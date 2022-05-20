import React, {useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  ModalContainer, ModalWrapper, 
  ModalCloseButton, ModalTitle,
} from '../keyspaces/styles';
import {ModalButtons} from "../../pages/keyspace/styles";
import {rowTranslations, general} from '../../utils/translations.utils';
import {StyledTextArea} from '../input/styles';

import {useLanguageContext} from '../../contexts/language.context';
import {useConnectionContext} from '../../contexts/connection.context';
import {useDatabaseContext} from "../../contexts/database.context";
import {useKeyspaceContext} from "../../contexts/keyspace.context";
import {useTableContext} from "../../contexts/table.context";

import Button from '../button';

interface NewRowProps {
  onClose: () => void;
}

const NewRow: React.FC<NewRowProps> = ({onClose}) => {
  const {language} = useLanguageContext();
  const {appToken: tkn, setLoading} = useConnectionContext();
  const {currDatabase} = useDatabaseContext();
  const {currKeyspace} = useKeyspaceContext();
  const {currTable} = useTableContext();

  const [content, setContent] = useState<string>('');

  const onCreate = () => {
    if (!content.includes("{") || !content.includes("}")) return;
    setLoading!(true);
    let reqBody;
    try {
      reqBody = JSON.parse(content);
    } catch (err) {
      toast.error("Not a valid JSON format");
      setLoading!(false);
      return;
    }
    axios
      .post("/.netlify/functions/add-row", {
        tkn,
        dbId: currDatabase.split("/")[0],
        dbRegion: currDatabase.split("/")[1],
        ksName: currKeyspace?.name,
        tName: currTable?.name,
        row: reqBody,
      })
      .then(({data}) => {
        toast.success(data);
        onClose();
        setLoading!(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading!(false);
      });
  };

  return (
    <ModalWrapper>
      <ModalContainer tiny>
        <ModalCloseButton onClick={onClose}>x</ModalCloseButton>
        <ModalTitle>{rowTranslations.newRow[language]}</ModalTitle>
        <StyledTextArea
          placeholder={rowTranslations.useJson[language]}
          rows={12}
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <ModalButtons>
          <Button
            variant={3}
            onPress={onClose}
            disabled={false}
            text={general.cancel[language]}
          />
          <Button
            variant={2}
            onPress={onCreate}
            disabled={!content.includes("{") || !content.includes("}")}
            text={general.create[language]}
          />
        </ModalButtons>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default NewRow;
