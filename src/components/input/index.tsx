import React, {Dispatch, SetStateAction, ChangeEvent} from "react";

import {
  InputField, InputLabel,
  StyledInput, StyledTextArea
} from './styles';

interface InputProps {
  label: string;
  name: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  isPass?: boolean;
  isDesc?: boolean;
  tiny?: boolean;
  little?: boolean;
  pc?: string;
}

const Input: React.FC<InputProps> = ({little, label, name, value, setValue, isPass, isDesc, tiny, pc = ''}) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value);
    const handleChange1 = (event: ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value);
    return (
      <InputField tiny={tiny}>
        <InputLabel tiny={tiny} little={little}>{label}</InputLabel>
        {!isDesc 
         ? (<StyledInput 
              type={isPass ? "password": "text"} 
              name={name} 
              value={value} 
              onChange={handleChange} 
              tiny={tiny}
              little={little}
              placeholder={pc}
            />)
         : (<StyledTextArea isDesc name={name} value={value} onChange={handleChange1} />)
        }
      </InputField>
    );
};

export default Input;
