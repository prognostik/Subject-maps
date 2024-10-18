// REST API for the map - add, edit, delete, change 
// these methods are shared between map slice and recap slice
// "reducer" param is a a reducer function specific to the slice

export const addMapAsync = (map: KMap, reducer: Function) => (dispatch) => {
  console.log("addMapAsync");

  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(map)
  };

  fetch("/api/map/add", requestOptions)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)})
      }

      return response.json();
    })  
    .then((map: KMap) => {
      dispatch(reducer(map));
    })
    .catch(error => console.log(error));      
}

export const editMapAsync = (map: KMap, reducer: Function) => (dispatch) => {
  console.log("editMapAsync");

  const requestOptions = {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(map)
  };   
  
  fetch("/api/map/update", requestOptions)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)})
      }

      return response.json();
    })
    .then((map: KMap) => {
      dispatch(reducer(map));
    })
    .catch(error => console.log(error));      
}

export const deleteMapAsync = (mapId: number, reducer: Function) => (dispatch) => {
  console.log("deleteMapAsync");

  const requestOptions = {
    method: "DELETE",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: "id=" + mapId
  };    
  
  fetch("/api/map/delete", requestOptions)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)})
      }

      // a hack to be able to process an empty response
      // empty response comes when the map was deleted
      // (json comes when one of the map's children was deleted, so there is still a map)
      // theoretically, JSON can't be null, so the correct way would be to send an empty JSON
      return response.text();
    })
    .then(text => {
      let map: KMap;

      if (!text) {
        map = null;
      } else {
        map = JSON.parse(text);
      }

      dispatch(reducer(map));
    })    
    .catch(error => console.log(error));       
}

export const updateMapParentAsync = (mapId: number, 
                  newParentMapId: number, reducer: Function) => (dispatch) => {
  console.log("updateMapParentAsync");

  const requestOptions = {
    method: "PUT",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: "mapId=" + mapId + "&newParentMapId=" + newParentMapId
  };

  //dispatch(updateMap(testmap));
  
  fetch("/api/map/update_parent_id", requestOptions)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {throw new Error(text)})
      }

      return response.json();
    })
    .then((map: KMap) => {
      dispatch(reducer(map));
    })
    .catch(error => console.log(error));
}