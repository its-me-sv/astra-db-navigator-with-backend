import React, {createContext, ReactNode, useContext, useState, useRef, MutableRefObject} from "react";

interface DeleteContextInterface {
  text: string;
  secure?: MutableRefObject<string>;
  setText?: (val: string) => void;
  deleteCb?: MutableRefObject<(() => void) | undefined>;
}

const defaultState: DeleteContextInterface = {
  text: "",
};

export const DeleteContext = createContext<DeleteContextInterface>(defaultState);

export const useDeleteContext = () => useContext(DeleteContext);

export const DeleteContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [text, setText] = useState<string>(defaultState.text);
  const secure = useRef<string>('');
  const deleteCb = useRef<() => void>();

  return (
    <DeleteContext.Provider
      value={{
        text, deleteCb, secure,
        setText,
      }}
    >
      {children}
    </DeleteContext.Provider>
  );
};
