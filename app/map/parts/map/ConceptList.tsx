import { KMap } from "../../../app.d.ts";

import Contents from "./Contents.tsx";
import ConceptBlock from "./ConceptBlock.tsx";

export default function ConceptList({map}: {map: KMap}) {

  return (
    <div className="conceptList">
      <div className="conceptList-concepts">
        <ConceptBlock map={map} level={1} />
      </div>
      <div className="conceptList-contents">
        <Contents map={map} />
      </div>      

    </div>    

  )


}