import React, {useState, useEffect} from "react";

import {
  ModalContainer, ModalWrapper, 
  ModalTitle, ColumnOptionsContainer
} from "../keyspaces/styles";
import {ModalButtons} from '../../pages/keyspace/styles';
import {general, mainHeaderTranslations} from '../../utils/translations.utils';
import {cps, dummyZones} from '../../utils/dummy-data';
import {CloudProviders, RegionSchema} from "../../utils/types";

import {useConnectionContext} from '../../contexts/connection.context';
import {useLanguageContext} from '../../contexts/language.context';

import Button from '../button';
import Input from '../input';
import Select from '../select';

interface DatabaseModalProps {}

const DatabaseModal: React.FC<DatabaseModalProps> = () => {
  const {setDbToken, setLoading} = useConnectionContext();
  const {language} = useLanguageContext();

  const [dbName, setDbName] = useState<string>('');
  const [ksName, setKsName] = useState<string>('');
  const [cloudProvider, setCloudProvider] = useState<CloudProviders>(cps[0]);
  const [regions, setRegions] = useState<RegionSchema>();
  const [region, setRegion] = useState<string>('');

  const onClose = () => setDbToken!('');
  const onCreate = () => {
    setLoading!(true);
    const requestBody = {
      name: dbName,
      keyspace: ksName,
      cloudProvider,
      tier: "serverless",
      capacityUnits: 1,
      region: region.split(' ').slice(-1)[0]
    };
    setTimeout(() => {
      console.log(requestBody);
      setLoading!(false);
      onClose();
    }, 500);
  };

  useEffect(() => {
    setLoading!(true);
    setTimeout(() => {
      setRegions(dummyZones);
      setRegion(dummyZones.AWS[0].name);
      setLoading!(false);
    }, 500);
  }, []);

  return (
    <ModalWrapper>
      <ModalContainer tiny>
        <ModalTitle>{mainHeaderTranslations.createDB[language]}</ModalTitle>
        <ColumnOptionsContainer>
          <Input
            label="Name"
            name="Name"
            value={dbName}
            setValue={setDbName}
            tiny
          />
          <Input
            label="Keyspace"
            name="Keyspace"
            value={ksName}
            setValue={setKsName}
            tiny
          />
          <Select 
            label="Cloud provider"
            options={cps}
            val={cloudProvider}
            setVal={setCloudProvider as (val:string) => void}
            notHeader
          />
          {regions && (
            <Select 
              label="Region"
              options={
                regions[cloudProvider]
                .map(({displayName, name}) => `${displayName} ${name}`) as Array<string>
              }
              val={cloudProvider}
              setVal={setCloudProvider as (val:string) => void}
              notHeader
            />
          )}
        </ColumnOptionsContainer>
        <ModalButtons>
          <Button
            variant={3}
            text={general.cancel[language]}
            onPress={onClose}
            disabled={false}
          />
          <Button
            variant={4}
            text={general.create[language]}
            onPress={onCreate}
            disabled={dbName.length < 1 || ksName.length < 1}
          />
        </ModalButtons>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default DatabaseModal;
