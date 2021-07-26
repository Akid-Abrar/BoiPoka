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
    
    <Button label="Add to wishlist" style = {{backgroundColor:"#925024"}} type="submit">Add to wishlist</Button>
    
    </Form>
    </div>
    )
}
export default Addwish;
