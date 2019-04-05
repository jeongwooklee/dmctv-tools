import React, { useState, useEffect, FunctionComponent } from 'react';
import Input from '../../components/Input';
import styled from 'styled-components';
import CopyToClipboard from '../../components/CopyToClipboard';
import PageTitle from '../../components/PageTitle';
import PageSubtitle from '../../components/PageSubtitle';
import { removeDash } from '../../lib/removeDash';
import RadioButton, { RadioButtonItem } from '../../components/RadioButton';
import useFavorites, { Favorite } from '../../hooks/usefavorites';
import InputWithButton from '../../components/InputWithButton';
import Sidebar from './Sidebar';
import { Button } from '../../components/Button';
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom';
import { ASSET_GENERATOR_URL } from '../../lib/urls';
import { APP_VERSION } from '../App';

export interface AssetVersionItem {
  assetType: string;
  assetVersion: string;
  offerId: string;
  creativeId: string;
}

interface MatchParams {
  id?: string;
}

export interface Props extends RouteComponentProps<MatchParams> {}

const Container = styled.div`
  height: 100%;
  display: flex;
`;

const Content = styled.div`
  padding: 2em 1em;
  max-width: 400px;
`;

const InputWrapper = styled.div`
  margin-bottom: 0.8em;
`;

const CopyToClipboardWrapper = styled.div`
  margin-bottom: 1em;
`;

const Result = styled.div`
  margin-top: 1.8em;
  margin-bottom: 0.2em;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 1.4em 1em;
  line-height: 1.4;
  word-break: break-all;
  font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, Courier,
    monospace;
  font-size: 85%;
  color: rgba(255, 255, 255, 0.9);
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ASSET_TYPE = {
  ASSET_VERSION: 'asset_version',
  NG: 'ng'
};

const AssetVersionGenerator: FunctionComponent<Props> = ({
  match,
  history
}) => {
  const { id: itemId } = match.params;
  const [
    favorites,
    addFavorite,
    removeFavorite,
    updateFavoriteById
  ] = useFavorites();

  const [assetType, setAssetType] = useState(ASSET_TYPE.ASSET_VERSION);
  const [favoriteTitle, setFavoriteTitle] = useState('');
  const [assetVersion, setAssetVersion] = useState('');
  const [offerId, setOfferId] = useState('');
  const [creativeId, setCreativeId] = useState('');
  const [resultString, setResultString] = useState('');

  const updateFormById = () => {
    const selectedFavorite: Favorite = favorites.find(
      (x: Favorite) => x.id === itemId
    );

    let newFavoriteTitle = '';
    let newAssetType = ASSET_TYPE.ASSET_VERSION;
    let newAssetVersion = '';
    let newOfferId = '';
    let newCreativeId = '';

    if (itemId && !selectedFavorite) {
      return history.push(ASSET_GENERATOR_URL);
    }

    if (selectedFavorite) {
      newFavoriteTitle = selectedFavorite.title;
      newAssetType = selectedFavorite.item.assetType;
      newAssetVersion = selectedFavorite.item.assetVersion;
      newOfferId = selectedFavorite.item.offerId;
      newCreativeId = selectedFavorite.item.creativeId;
    }
    setFavoriteTitle(newFavoriteTitle);
    setAssetType(newAssetType);
    setAssetVersion(newAssetVersion);
    setOfferId(newOfferId);
    setCreativeId(newCreativeId);
  };

  const updateResultString = () => {
    /*
     * asset_version=wook/230-f7131c24&placement=video_unit
     * &ltv_exp=offer_id.b1a3ac1026c74cc883a1db25e588f8e7
     * -creative_id.418e8a1dfe134978878be5c533c150ca
     */
    const assetTypeString =
      assetType === ASSET_TYPE.ASSET_VERSION
        ? ASSET_TYPE.ASSET_VERSION
        : ASSET_TYPE.NG;

    let result = `${assetTypeString}=${assetVersion}&placement=video_unit`;
    result += `&ltv_exp=offer_id.${removeDash(offerId)}`;
    result += `-creative_id.${removeDash(creativeId)}`;
    setResultString(result);
  };

  useEffect(() => {});
  useEffect(updateFormById, [itemId]);
  useEffect(updateResultString);

  return (
    <Container>
      <Sidebar list={favorites} />
      <Content>
        <PageTitle>Asset version Generator</PageTitle>
        <PageSubtitle>{APP_VERSION}</PageSubtitle>
        <InputWrapper>
          <h1>{favoriteTitle}</h1>
        </InputWrapper>
        <InputWrapper>
          <RadioButton
            items={[
              {
                label: 'asset_ersion=',
                value: ASSET_TYPE.ASSET_VERSION
              },
              {
                label: 'ng=',
                value: ASSET_TYPE.NG
              }
            ]}
            onChange={(item: RadioButtonItem) => {
              setAssetType(item.value);
            }}
            activeValue={assetType}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            onChange={e => setAssetVersion(e.target.value)}
            value={assetVersion}
            placeholder={
              assetType === ASSET_TYPE.ASSET_VERSION ? 'asset version' : 'ng'
            }
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            onChange={e => setOfferId(e.target.value)}
            value={offerId}
            placeholder="Offer Id"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            onChange={e => setCreativeId(e.target.value)}
            value={creativeId}
            placeholder="Creative Id"
          />
        </InputWrapper>

        <CopyToClipboardWrapper>
          <CopyToClipboard text={resultString}>
            <Result>{resultString}</Result>
          </CopyToClipboard>
        </CopyToClipboardWrapper>

        {!itemId && (
          <InputWrapper>
            <InputWithButton
              buttonText="Save"
              inputPlaceholder="Title"
              onClick={(inputText: string) => {
                const newId = String(Date.now());
                addFavorite({
                  id: newId,
                  title: inputText,
                  date: new Date(),
                  item: {
                    assetType,
                    assetVersion,
                    offerId,
                    creativeId
                  }
                });
                history.push(`${ASSET_GENERATOR_URL}/${newId}`);
              }}
            />
          </InputWrapper>
        )}

        {itemId && (
          <>
            <Button
              onClick={() => {
                updateFavoriteById(
                  {
                    item: {
                      assetType,
                      assetVersion,
                      offerId,
                      creativeId
                    }
                  },
                  itemId
                );
              }}
            >
              Update
            </Button>{' '}
            <Button
              onClick={() => {
                if (itemId) {
                  removeFavorite(itemId);
                  history.push(ASSET_GENERATOR_URL);
                }
              }}
            >
              Delete
            </Button>
          </>
        )}
      </Content>
    </Container>
  );
};

export default withRouter(AssetVersionGenerator);
