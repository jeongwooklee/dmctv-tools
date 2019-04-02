import React, { useState, useEffect } from 'react';
import Title from '../../components/Title';
import Input from '../../components/Input';
import styled from 'styled-components';
import CopyToClipboard from '../../components/CopyToClipboard';

const Container = styled.div`
  padding: 20px;
`;

const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

const Result = styled.div`
  background: #eee;
  border-radius: 4px;
  padding: 10px;
  word-break: break-all;
`;

const removeDash = (id: String) => id.replace(/-/g, '');

function AssetVersionGenerator() {
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
    let result = `asset_version=${assetVersion}&placement=video_unit`;
    result += `&ltv_exp=offer_id.${removeDash(offerId)}`;
    result += `-creative_id.${removeDash(creativeId)}`;
    setResultString(result);
  });

  return (
    <Container>
      <InputWrapper>
        <Title>Asset version</Title>
        <Input onChange={e => setAssetVersion(e.target.value)} />
      </InputWrapper>
      <InputWrapper>
        <Title>Offer Id</Title>
        <Input onChange={e => setOfferId(e.target.value)} />
      </InputWrapper>
      <InputWrapper>
        <Title>Creative Id</Title>
        <Input onChange={e => setCreativeId(e.target.value)} />
      </InputWrapper>

      <CopyToClipboard text={resultString}>
        <Result>{resultString}</Result>
      </CopyToClipboard>
    </Container>
  );
}

export default AssetVersionGenerator;
