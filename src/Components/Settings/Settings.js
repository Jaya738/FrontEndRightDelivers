import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Store/actions/index";
import {useHistory} from "react-router-dom";
import MblNavbar from "../Common/MblNavbar";
import ProductQuantity from "../DropDown/ProductQuantity";
import {baseUrl} from "../../config";

function Settings(props) {
  const history = useHistory();
   // const apiUrl =
  //   baseUrl + "restaurants/mySettings";

  // const loadSettings = async () => {
  //   const options = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //       rKey: props.config.authData.rKey,
  //       dKey: props.config.authData.dKey,
  //     },
  //   };

  //   const res = await (await fetch(apiUrl, options)).json();
  //   if (res && res.status === 1) {
  //     //props.updateSettings(res);
  //     setLoading(false);
  //     setSettings(res.Settings);
  //   }
  // };
  // useEffect(() => {
  //   loadSettings();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return(
  <div>
      <MblNavbar heading="Settings" back={() => history.goBack()} />
      <div className="w-100 p-3" style={{marginTop:"16vh"}}>
        Account Settings
        <ProductQuantity />
  </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    config: state.config
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
   //setLoadedSettings: () => dispatch(actionCreators.setLoadedSettings()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
