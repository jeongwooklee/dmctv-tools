import React, { FunctionComponent } from 'react';
import { Favorite } from '../../hooks/usefavorites';
import styled from 'styled-components';
import { SIDEBAR_WIDTH } from '../../styles/variables';
import { NavLink } from 'react-router-dom';
import { ASSET_GENERATOR_URL } from '../../lib/urls';

interface Props {
  list: Array<Favorite>;
}

const borderColor = 'rgba(255, 255, 255, 0.1)';

const Container = styled.section`
  height: 100%;
  width: ${SIDEBAR_WIDTH};
  border-right: 1px solid ${borderColor};
`;

const Item = styled(NavLink)`
  position: relative;
  width: 100%;
  padding: 1em;
  border-bottom: 1px solid ${borderColor};
  text-align: left;
  display: block;
  &:hover,
  &.active {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Title = styled.h1`
  color: rgba(255, 255, 255, 0.9);
  font-size: 80%;
  font-weight: 500;
  margin-bottom: 0.3em;
`;

const Description = styled.h4`
  color: rgba(255, 255, 255, 0.6);
  font-size: 60%;
  font-weight: normal;
`;

const NewIcon = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 140%;
  color: rgba(255, 255, 255, 0.7);
`;

const NewItemButton = (
  <Item
    to={ASSET_GENERATOR_URL}
    isActive={(match, location) => {
      return location.pathname === ASSET_GENERATOR_URL;
    }}
  >
    <NewIcon>+</NewIcon>
  </Item>
);

const Sidebar: FunctionComponent<Props> = ({ list }) => {
  return (
    <Container>
      {NewItemButton}
      {list.map((listItem: Favorite, index: number) => {
        return (
          <Item
            key={index}
            to={`${ASSET_GENERATOR_URL}/${listItem.id}`}
            activeClassName="active"
          >
            <Title>{listItem.title}</Title>
            <Description>{listItem.item.assetType}</Description>
          </Item>
        );
      })}
    </Container>
  );
};

export default Sidebar;
