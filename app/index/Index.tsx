import { useSelector } from 'react-redux';

import AddTopic from "./AddTopic.tsx";
import TopicList from "./TopicList.tsx";
import store from './store.tsx';
import { Topic } from "../app.d.ts";


export default function Index() {
  const topics: Topic[] = useSelector((state) => state.topics.value);

  console.log("Index");

  return (
    <>
      <TopicList topics={topics} />
      <AddTopic />
    </>
  )
}
