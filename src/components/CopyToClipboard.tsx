import React, { FunctionComponent, ReactNode, useRef, useState } from 'react';
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

const CopySuccess = styled.div`
  padding-top: 0.4em;
  font-size: 60%;
  text-align: right;
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
      <CopySuccess>{copySuccess}</CopySuccess>
    </Container>
  );
};

export default CopyToClipboard;
