export function onDragMap(e, id) {    
  e.dataTransfer.setData("mapId", id);

  console.log("Dragging map block with id: ", id);    
}

export function allowDrop(e) {
  e.preventDefault();
}

export function onDropMap(e, type, newParentMapId, sendData) {
  e.preventDefault();

  console.log("Dropping map", e);

  // seems like DataTransfer: setData() transfers data 
  // in text/plain format
  let mapId = Number(e.dataTransfer.getData("mapId"));
  //let newParentMapId = map.id;

  console.log("Got map id: ", mapId);
  console.log("Got new parent map id: ", newParentMapId);

  // without this check may drop the map on itself
  // this results in "loosing" this map (the page with this map will give a 500 error)
  if (newParentMapId !== mapId) {
    if (type === "learn") {
      sendData(mapId, newParentMapId);
    } else if (type === "recap") {
      console.log("Sending data");
    }
  }
}