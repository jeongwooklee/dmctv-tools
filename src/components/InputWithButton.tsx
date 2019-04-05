import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  KeyboardEvent,
  useRef
} from 'react';
import Input from './Input';
import { Button } from './Button';
import styled from 'styled-components';

interface Props {
  onClick: Function;
  buttonText: string;
  inputPlaceholder: string;
}

const Container = styled.div`
  display: flex;
`;

const SaveButton = styled(Button)`
  padding-left: 2em;
  padding-right: 2em;
  margin-left: 0.5em;
`;

const InputWithButton: FunctionComponent<Props> = ({
  buttonText,
  inputPlaceholder,
  onClick
}) => {
  const [inputText, setInputText] = useState('');

  const clearInput: Function = () => {
    setInputText('');
  };

  const onButtonClick = () => {
    clearInput();
    onClick(inputText);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onButtonClick();
    }
  };

  return (
    <Container>
      <Input
        placeholder={inputPlaceholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setInputText(e.target.value);
        }}
        onKeyDown={onKeyDown}
        value={inputText}
      />
      <SaveButton onClick={onButtonClick}>{buttonText}</SaveButton>
    </Container>
  );
};

export default InputWithButton;
