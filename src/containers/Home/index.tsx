import React, { FunctionComponent } from 'react';
import { ASSET_GENERATOR_URL } from '../../lib/urls';
import { Redirect } from 'react-router';

const Home: FunctionComponent = () => <Redirect to={ASSET_GENERATOR_URL} />;

export default Home;
