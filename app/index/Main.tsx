import "../../../css/libs/prism.css"; 
import "../../../css/libs/fix.css"; 

import "../../../css/basic/body.css";
import "../../../css/basic/main.css";
import "../../../css/basic/header.css";
import "../../../css/basic/footer.css";
import "../../../css/basic/bold.css";

import "../../../css/common/vars.css";
import "../../../css/common/form.css";
import "../../../css/common/button.css";
import "../../../css/common/styles.css";

import "../../../css/index/index-page.css";

// user CSS
import "../../../css/index/index.css";
import "../../../css/index/intro/idea.css";
import "../../../css/index/intro/details.css";
import "../../../css/index/intro/example.css";
import "../../../css/index/intro/understand.css";
import "../../../css/service/about.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';

import store from './store.tsx';
import Index from "./Index.tsx";

// need to add React to the top level, otherwise it will throw the error 
// that React is not defined
// @see https://stackoverflow.com/questions/32070303/uncaught-referenceerror-react-is-not-defined
window.React = React

function Main() {
  console.log("Main");

  return (
    <Provider store={store}>
      <Index />
    </Provider>
  )
}

let indexEl = document.getElementById("index");

if (indexEl) {
  const root = ReactDOM.createRoot(indexEl);

  root.render(<Main/>);
}

