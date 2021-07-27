import React from 'react'
import {Form,Button,OverlayTrigger,Popover} from 'react-bootstrap'
const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3"></Popover.Title>
      <Popover.Content>
       Followed author done!!
      </Popover.Content>
    </Popover>
  );
const Followauth =(props) =>
{
    return(
        <div >
    
        <input type="submit" value={props.val} onClick={props.handlefollow} />
    
    </div>
    )
}
export default Followauth;
