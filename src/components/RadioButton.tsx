import React, { FunctionComponent, useState } from 'react';
import styled, { css } from 'styled-components';
import { RADIOUS, Button } from './Button';

export interface ButtonProps {
  isActive: boolean;
}

export interface RadioButtonItem {
  label: string;
  value: string;
}

export interface Props {
  items: Array<RadioButtonItem>;
  activeValue: string;
  onChange: Function;
}

const Container = styled.div`
  display: flex;
`;

const activeCss = css`
  background: rgba(0, 0, 0, 0.25);
  color: rgba(255, 255, 255, 0.8);
`;
const defaultCss = css`
  background: rgba(0, 0, 0, 0.1);
  color: rgba(255, 255, 255, 0.2);
`;

const TabButton = styled(Button)`
  ${(props: ButtonProps) => (props.isActive ? activeCss : defaultCss)};
  border-radius: 0;
  &:first-child {
    border-top-left-radius: ${RADIOUS}px;
    border-bottom-left-radius: ${RADIOUS}px;
  }
  &:last-child {
    border-top-right-radius: ${RADIOUS}px;
    border-bottom-right-radius: ${RADIOUS}px;
  }
`;

const RadioButton: FunctionComponent<Props> = ({
  items,
  activeValue,
  onChange
}) => {
  const onButtonClick = (item: RadioButtonItem) => {
    onChange(item);
  };

  return (
    <Container>
      {items.map(item => (
        <TabButton
          key={item.value}
          onClick={() => onButtonClick(item)}
          isActive={activeValue === item.value}
        >
          {item.label}
        </TabButton>
      ))}
    </Container>
  );
};

export default RadioButton;
