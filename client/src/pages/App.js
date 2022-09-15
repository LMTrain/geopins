import React from "react";

import Header from "../components/Header";
import Map from '../components/Map'
import withRoot from "../withRoot";

const App = () => {
  <>
    <Header />
    <Map />
  </>
    
};

export default withRoot(App);
