import { useSelector } from 'react-redux';

import TopicHeader from "./TopicHeader.tsx";
import TopicMap from "./TopicMap.tsx";
import AddMap from "./AddMap.tsx";
import { Topic, KMap } from "../app.d.ts";


export default function TopicPage() {
  const topic: Topic = useSelector((state) => state.topic.value);

  console.log("TopicPage");

  if (topic == null) {
    return (
      <div>This topic doesn't exist</div>
    )
  }

  return (
    <div className="topicPage">
      <TopicHeader topic={topic} />
      {topic && topic.maps.map((map: KMap) =>
        <TopicMap map={map} key={map.id} />
      )}
      <AddMap topicId={topic && topic.id} />
    </div>
  )
}