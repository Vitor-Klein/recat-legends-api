import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import SelectLanguage from './view/SelectLanguage';
import ListChampions from './view/ListChampions';
import Champion from './view/Champion';

export default function Routes () {
  return (
    <BrowserRouter>
      <Route path='/' exact component={SelectLanguage}/>
      <Route path='/ListChampions' exact component={ListChampions}/>
      <Route path='/Champion' exact component={Champion}/>
    </BrowserRouter>
  );
}