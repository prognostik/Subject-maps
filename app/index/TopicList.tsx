import { Topic } from "../app.d.ts";

import "../../../css/topic/topics.css"; 

export default function TopicList(props: {topics: Topic[]}) {
  console.log("TopicList");
  console.log(props.topics);

  return (
    <div className="topics">
      {props.topics && props.topics.map((topic: Topic) =>      
        <div className="topic" key={topic.id}>
          <div className="topic-header">
            <a href={"/topic/" + topic.id} className="topic-header-link">
              {topic.name}
            </a>
          </div>
          <div className="topic-maps">
            {topic.maps && topic.maps.map(map =>
              <div className="topic-map" key={map.id}>
                <a href={"/map/" + map.id} className="topic-map-name">
                  {map.name}
                </a>
                <span className="topic-map-counter">{map.counter}</span>
                {map.isPublic ? <span className="topic-map-public"></span> : ""}
              </div>  
            )}
          </div>
        </div>
                 
      )}
    </div>
  )
  
}