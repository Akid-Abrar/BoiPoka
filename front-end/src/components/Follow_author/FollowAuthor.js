import React from 'react'
import {Form,Button,Popover} from 'react-bootstrap'
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
    
        <Button type="submit" onClick={props.handlefollow} >{props.val}</Button>
    
    </div>
    )
}
export default Followauth;
