import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout/Layout';
import { RecoilRoot } from "recoil";
import "./styles/index.css"
import "antd/dist/antd.css";
import { SnackbarProvider } from "notistack";
import RecoilNexus from 'recoil-nexus'


ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
    <RecoilNexus/>
    <SnackbarProvider maxSnack={3}>
      <Layout />
      </SnackbarProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);

