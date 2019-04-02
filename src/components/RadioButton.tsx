import React, { FunctionComponent, useState } from 'react';
import styled, { css } from 'styled-components';

export interface ButtonProps {
  isActive: boolean;
}

export interface RadioButtonItem {
  label: string;
  value: string;
}

export interface Props {
  items: Array<RadioButtonItem>;
  onChange: Function;
}

const Container = styled.div`
  display: flex;
`;

const RADIOUS = 4;

const activeCss = css`
  background: rgba(0, 0, 0, 0.25);
  color: rgba(255, 255, 255, 0.8);
`;
const defaultCss = css`
  background: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.2);
`;

const borderColor = 'rgba(255, 255, 255, 0.2)';

const Button = styled.button`
  padding: 0.5em 0.8em;
  ${(props: ButtonProps) => (props.isActive ? activeCss : defaultCss)};
  border: 1px solid ${borderColor};
  border-right: 0;
  &:first-child {
    border-top-left-radius: ${RADIOUS}px;
    border-bottom-left-radius: ${RADIOUS}px;
  }
  &:last-child {
    border-right: 1px solid ${borderColor};
    border-top-right-radius: ${RADIOUS}px;
    border-bottom-right-radius: ${RADIOUS}px;
  }
`;

const RadioButton: FunctionComponent<Props> = ({ items, onChange }) => {
  const [activeValue, setActiveValue] = useState(items[0].value);
  const onButtonClick = (item: RadioButtonItem) => {
    onChange(item);
    setActiveValue(item.value);
  };

  return (
    <Container>
      {items.map(item => (
        <Button
          key={item.value}
          onClick={() => onButtonClick(item)}
          isActive={activeValue === item.value}
        >
          {item.label}
        </Button>
      ))}
    </Container>
  );
};

export default RadioButton;
