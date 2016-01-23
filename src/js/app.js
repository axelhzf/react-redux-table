import style from "../css/main.css"

import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";

import store from "./model/store"
import Issues from "./screens/Issues";
import DevTools from "./DevTools";


ReactDom.render((
    <Provider store={store}>
      <div>
        <Issues/>
        <DevTools/>
      </div>
    </Provider>)
  , document.getElementById("container"));

