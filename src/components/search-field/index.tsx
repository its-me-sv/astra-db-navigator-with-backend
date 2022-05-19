import React, {
  useState, useRef, 
  KeyboardEventHandler, MutableRefObject, ChangeEventHandler
} from "react";

import {
  SearchContainer, SearchIcon,
  SearchInput,
} from './styles';

interface SearchFieldProps {
  cb: (val: string) => void;
  placeholder: string;
  live?: boolean;
}

const SearchField: React.FC<SearchFieldProps> = ({cb, placeholder, live}) => {
  const [text, setText] = useState<string>('');
  const textRef = useRef() as MutableRefObject<HTMLInputElement>;

  const callCallBack = () => cb(text);
  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key !== "Enter") return;
    callCallBack();
  };
  const handleTextChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value);
    if (live) cb(event.target.value);
  };
  const onClear = () => {
    setText('');
    cb('');
    textRef.current.value = '';
    textRef.current.blur();
  };

  return (
    <SearchContainer>
      <SearchIcon onClick={callCallBack} />
      <SearchInput
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onChange={handleTextChange}
        ref={textRef}
      />
      {text.length > 0 && <span onClick={onClear}>x</span>}
    </SearchContainer>
  );
};

export default SearchField;
