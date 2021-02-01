import React, { useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";

import Layout from "./components/Layout";
import LoadingState from "./ui/LoadingState";
import CookieConsentBanner from "./containers/Layout/CookieConsentBanner";

import * as compositeActions from "./store/actions/composite/index";

const App = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(compositeActions.service());
  }, [dispatch]);

  return (
    <Fragment>
      <Layout />
      <CookieConsentBanner />
      <LoadingState />
    </Fragment>
  );
};

export default App;
