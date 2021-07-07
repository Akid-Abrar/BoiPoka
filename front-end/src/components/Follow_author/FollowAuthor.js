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
    <Form inline onSubmit={props.handlefollow} action="">
    <OverlayTrigger rootClose placement="right" trigger="click" placement="right" overlay={popover}>
    <Button label="Follow" style = {{backgroundColor:"#925024"}} className="mx-auto my-2" type="submit" >Follow Author</Button>
    </OverlayTrigger>
    </Form>
    </div>
    )
}
export default Followauth;
