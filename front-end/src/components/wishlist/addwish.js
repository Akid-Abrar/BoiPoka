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
    <Form inline onSubmit={props.handlewish} action="">
    <OverlayTrigger rootClose placement="right" trigger="click" placement="right" overlay={popover}>
    <Button label="Add to wishlist" variant="outline-info" type="submit">Add to wishlist</Button>
    </OverlayTrigger>
    </Form>
    </div>
    )
}
export default Addwish;
