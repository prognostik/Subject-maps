import "../../../css/topic/topic.css"; 
import "../../../css/topic/topicBreadcrumbs.css"; 
import "../../../css/topic/topicPage.css"; 
import "../../../css/topic/topicPageMap.css"; 

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';

import store from './store.tsx';
import TopicPage from "./TopicPage.tsx";

// need to add React to the top level, otherwise it will throw the error 
// that React is not defined
// @see https://stackoverflow.com/questions/32070303/uncaught-referenceerror-react-is-not-defined
window.React = React

function Main() {
  console.log("Main - Topic");

  return (
    <Provider store={store}>
      <TopicPage />
    </Provider>
  )
}

let topicEl = document.getElementById("topic");

if (topicEl) {
  const root = ReactDOM.createRoot(topicEl);

  root.render(<Main/>);
}

