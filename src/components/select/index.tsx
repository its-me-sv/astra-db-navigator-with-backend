import React, {ChangeEvent} from "react";

import {SelectStyles, OptionStyles, Container} from './styles';
import {InputLabel} from '../input/styles';

interface SelectProps {
  options: Array<string>;
  val: string;
  setVal: (val:string) => void;
  notHeader?: boolean;
  label?: string;
}

const Select: React.FC<SelectProps> = ({options, val, setVal, notHeader, label=''}) => {
  const handleDbChange = (event: ChangeEvent<HTMLSelectElement>) => setVal(event.target.value);

  return (
    <Container>
      {label.length > 0 && <InputLabel tiny>{label}</InputLabel>}
      <SelectStyles value={val} onChange={handleDbChange} notHdr={notHeader}>
        {options.map((v) => (
          <OptionStyles key={v} value={v}>{v}</OptionStyles>
        ))}
      </SelectStyles>
    </Container>
  );
};

export default Select;
