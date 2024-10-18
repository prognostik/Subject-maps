import { KMap } from "../../app.d.ts";

export function getMapLink(map: KMap, rootMapId: number, isFlashcard) {
  let mapLink: string;

  if (!isFlashcard) {
    mapLink = map.isRoot === true ? `/map/${map.id}` : 
                                    `/map/${rootMapId}/child/${map.id}`;    
  } else {
    mapLink = map.isRoot === true ? `/map/${rootMapId}/service/flashcard` : 
                                    `/map/${rootMapId}/service/flashcard/${map.id}`;     
  }

  return mapLink;  
}

export function getCSSClass(map, level, isBreadcrumbs, cssClass) {
  let classes: string;

  if (isBreadcrumbs) {
    classes = "mTop mBreadcrumbs";
  } else if (level === 1 && map.maps != null) {
    classes = "mTop";
  }

  if (cssClass) {
    classes = classes + " " + cssClass;
  }
  
  return classes; 
}




