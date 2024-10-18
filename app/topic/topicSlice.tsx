import { createSlice } from '@reduxjs/toolkit';

import { Topic, KMap } from "../app.d.ts";

export const topicSlice = createSlice({
  name: 'topic',
  initialState: {
    value: window.KMaps.topic ? JSON.parse(window.KMaps.topic) : {} as Topic,
  },
  reducers: {
    editTopic: (state, action) => {
      state.value.name = action.payload as string;
    },
    deleteTopic: (state, action) => {
      state.value = null;
    },
    addRootMap: (state, action) => {
      state.value.maps.push(action.payload as KMap)
    },    
    editMap: (state, action) => {
      const map: KMap = action.payload;

      for (let i = 0; i < state.value.maps.length; i++) {
        if (state.value.maps[i].id == map.id) {
          state.value.maps[i].name = map.name;
          state.value.maps[i].isPublic = map.isPublic;
        }
      }
    },
    deleteMap: (state, action) => {
      const mapId: number = action.payload;

      for (let i = 0; i < state.value.maps.length; i++) {
        if (state.value.maps[i].id == mapId) {
          state.value.maps.splice(i, 1);
        }
      }
    }  
  },
});

export const { addRootMap, editMap, deleteMap, editTopic, deleteTopic } = topicSlice.actions;

export const addRootMapAsync = (name: string, topicId: number) => (dispatch) => {
  console.log("addRootMapAsync");

  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    // no need to invoke encodeURI - characters get automatically processed
    // correctly, even non-ASCII and the & sign 
    body: "topicId=" + topicId + "&name=" + name
  };
  
  fetch("/map/add_root", requestOptions)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)})
      }

      return response.json();
    })
    .then((mapId: number) => {
      let map: KMap = {
        id: mapId,
        name: name,
        isPublic: false
      };

      console.log("Map added", map);

      dispatch(addRootMap(map));
    })
    .catch(error => console.log(error));
}

export const editMapAsync = (name: string, isPublic: boolean, mapId: number) => (dispatch) => {
  console.log("editMapAsync");

  const requestOptions = {
    method: "PUT",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: "id=" + mapId + "&name=" + name + "&isPublic=" + isPublic
  };

  fetch("/map/edit_root", requestOptions)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)})
      }
    })
    .then(() => {
      console.log("Updated topic");

      let map: KMap = {
        id: mapId,
        isPublic: isPublic,
        name: name
      };

      dispatch(editMap(map));
    })
    .catch(error => console.log(error));

}

export const deleteMapAsync = (mapId: number) => (dispatch) => {
  console.log("deleteMapAsync");

  const requestOptions = {
    method: "DELETE",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: "id=" + mapId
  };       

  fetch("/map/delete_root", requestOptions)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)})
      }
    })
    .then(() => {
      dispatch(deleteMap(mapId));
    })
    .catch(error => console.log(error));
}


export const editTopicAsync = (name: string, topicId: number) => (dispatch) => {
  console.log("editTopicAsync");

  const requestOptions = {
    method: "PUT",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: "topicId=" + topicId + "&name=" + name
  };

  fetch("/topic/edit", requestOptions)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)})
      }
    })
    .then(() => {
      console.log("Updated topic");

      dispatch(editTopic(name));
      
    })
    .catch(error => console.log(error));
}

export const deleteTopicAsync = (topicId: number) => (dispatch) => {
  console.log("deleteTopicAsync");

  const requestOptions = {
    method: "DELETE",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: "topicId=" + topicId
  };       

  fetch("/topic/delete", requestOptions)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)})
      }
    })
    .then(() => {
      dispatch(deleteTopic());
    })
    .catch(error => console.log(error));
}




export default topicSlice.reducer;
