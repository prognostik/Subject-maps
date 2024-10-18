import { useState } from "react";
import { useDispatch } from "react-redux";

import { addTopicAsync } from './topicsSlice.tsx';

export default function AddTopic(props) {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  function onChangeName(event) {
    setName(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();

    dispatch(addTopicAsync(name));

    setName("");
  }

  return (
    <form className="form mAdd" onSubmit={onSubmit}>
      <div className="form-block">
        <input type="text" className="form-text" placeholder="New topic" value={name} onChange={onChangeName} />
      </div>
      <div className="form-block">
        <input type="submit" className="button form-button" value="Add" />
      </div>
    </form>
  )
}