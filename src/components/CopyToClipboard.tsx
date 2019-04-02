import React, {
  FunctionComponent,
  ReactNode,
  useRef,
  SyntheticEvent,
  useState
} from 'react';
import styled from 'styled-components';

export interface Props {
  text: string;
  children: ReactNode;
}

const Container = styled.div`
  cursor: pointer;
`;

const HiddenTextArea = styled.textarea`
  position: absolute;
  top: -9999px;
  left: -9999px;
`;

const CopyToClipboard: FunctionComponent<Props> = ({ text, children }) => {
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaEl = useRef<HTMLTextAreaElement>(null);
  const onClick = () => {
    if (textAreaEl && textAreaEl.current) {
      textAreaEl.current.select();
      document.execCommand('copy');
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2 * 1000);
    }
  };

  return (
    <Container onClick={onClick}>
      <HiddenTextArea ref={textAreaEl} value={text} readOnly />
      {children}
      {copySuccess}
    </Container>
  );
};

export default CopyToClipboard;
