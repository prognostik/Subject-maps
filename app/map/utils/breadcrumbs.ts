import { KMap } from "../../app.d.ts";

export function getBreadcrumbs(rootMap, currentMap: 
                        {rootMap: KMap, currentMap: KMap}) {

  let breadcrumbs: KMap[] = [];

  // console.log("rootMap: ", rootMap);
  // console.log("currentMap: ", currentMap);

  if (!currentMap) {
    breadcrumbs.push(rootMap);
  } else {
    breadcrumbs = buildBreadcrumbs(rootMap, currentMap, breadcrumbs);

    console.log("Built breadcrumbs: ", breadcrumbs);

  }

  return breadcrumbs;
}

function buildBreadcrumbs(current, target, breadcrumbs:
                  {current: KMap, target: KMap, breadcrumbs: KMap[]}) {
  const breadcrumbsString = JSON.stringify(breadcrumbs);
  let breadcrumbsCurrent = JSON.parse(breadcrumbsString);

  breadcrumbsCurrent.push(current);

  if (current.id === target.id) {
    return breadcrumbsCurrent;
  } else if (current.maps && current.maps.length) {
      let result;

      current.maps.forEach(map => {
        const breadcrumbsNew = buildBreadcrumbs(map, target, breadcrumbsCurrent);

        if (breadcrumbsNew) {
          result = breadcrumbsNew;
        }
      });

      if (result) {
        return result;
      } else {
        return null;
      }
  } else {
    return null;
  }      
}