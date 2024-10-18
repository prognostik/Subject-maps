import { createSlice } from '@reduxjs/toolkit';

import { Topic } from "../app.d.ts";

export const topicsSlice = createSlice({
  name: 'topics',
  initialState: {
    value: window.KMaps.topics ? JSON.parse(window.KMaps.topics) : [] as Topic[],
  },
  reducers: {
    addTopic: (state, action) => {
      state.value.push(action.payload)
    }  
  },
});

export const { addTopic } = topicsSlice.actions;

export const addTopicAsync = (name: string) => (dispatch) => {
  console.log("addTopicAsync");

  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: "name=" + name
  };    

  fetch("/topic/add", requestOptions)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)})
      }

      return response.json();
    })
    .then(topicId => {
      let topic: Topic = {
        id: topicId,
        name: name,
        maps: []
      };

      dispatch(addTopic(topic));
    })
    .catch(error => console.log(error));
}

export default topicsSlice.reducer;
