import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import styled from 'styled-components';
import CopyToClipboard from '../../components/CopyToClipboard';
import PageTitle from '../../components/PageTitle';
import PageSubtitle from '../../components/PageSubtitle';
import { removeDash } from '../../utils/removeDash';
import RadioButton, { RadioButtonItem } from '../../components/RadioButton';

const Container = styled.div`
  padding: 2em 1em;
  margin: 0 auto;
  max-width: 400px;
`;

const InputWrapper = styled.div`
  margin-bottom: 0.8em;
`;

const Result = styled.div`
  margin-top: 1.8em;
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

function AssetVersionGenerator() {
  const [assetType, setAssetType] = useState(ASSET_TYPE.ASSET_VERSION);
  const [assetVersion, setAssetVersion] = useState('');
  const [offerId, setOfferId] = useState('');
  const [creativeId, setCreativeId] = useState('');
  const [resultString, setResultString] = useState('');

  useEffect(() => {
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
  });

  return (
    <Container>
      <PageTitle>Asset version Generator</PageTitle>
      <PageSubtitle>v0.0.1</PageSubtitle>
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
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          onChange={e => setAssetVersion(e.target.value)}
          placeholder={
            assetType === ASSET_TYPE.ASSET_VERSION ? 'Asset version' : 'ng'
          }
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          onChange={e => setOfferId(e.target.value)}
          placeholder="Offer Id"
        />
      </InputWrapper>
      <InputWrapper>
        <Input
          onChange={e => setCreativeId(e.target.value)}
          placeholder="Creative Id"
        />
      </InputWrapper>

      <CopyToClipboard text={resultString}>
        <Result>{resultString}</Result>
      </CopyToClipboard>
    </Container>
  );
}

export default AssetVersionGenerator;
