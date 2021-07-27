import React from 'react'
import {Form,Button,OverlayTrigger,Popover} from 'react-bootstrap'
const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3"></Popover.Title>
      <Popover.Content>
       Added to your wishlist!!
      </Popover.Content>
    </Popover>
  );
const Addwish =(props) =>
{
    return(
        <div >
     
    <input type="submit" value={props.val} onClick={props.handlewish} />
    
    </div>
    )
}
export default Addwish;
