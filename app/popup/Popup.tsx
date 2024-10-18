interface Options {
  show: boolean;
  cssClass: text;
  onClose: () => void;
  data: any;
}

export default function Popup(props: Options) {
  if (props.show != true) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-overlay"></div>
      <div className={"popup-window " + (props.cssClass ? props.cssClass : "")}>
        <button className="button mSmall mPopupClose" onClick={props.onClose}>Close</button>
        <props.contents data={props.data} isRecap={props.isRecap} onClose={props.onClose} />
      </div>
    </div>    
  )  
}