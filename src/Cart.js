import React from 'react';
import './App.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import './Course.css';

// This class is the component which makes up the cart page
class Cart extends React.Component {
  
  removeSection(section){
    this.props.removeSection(section);
     
   }

  
  addSubSection(sec){
    this.props.addSubSection(sec);
   }
 
  display(){
    let sectionList = [];
    let sec = this.props.cart;

   if(sec.length===1){
    sectionList = sec.map((section) => ( 
      <ListGroup>
        <ListGroup.Item>Section: {section.number} 
          <Button variant="primary" style={{float:"right"}} onClick={()=>{this.removeSection(section)}}>Remove Section</Button>
        </ListGroup.Item>
        <ListGroup.Item>Location: {section.location}</ListGroup.Item>
        <ListGroup.Item>Instructor: {section.instructor}</ListGroup.Item>
        <ListGroup.Item>Meeting Times
          <ListGroup>
            {this.getTimes(section)}
          </ListGroup>
        </ListGroup.Item>
        <div><Button variant="primary" style={{float:"right"}} onClick={()=>this.addAllSubSections(section)}>Add All Subsections</Button></div>
        <ListGroup.Item>Subsections:  
          <ListGroup>
            {this.getSub(section)}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    ));
   }

    if(sec.length>1){
      let i = 0;
      for ( i =0; i < sec.length; i++){
        sectionList = sec[i].map((section) => ( 
          <ListGroup>
            <ListGroup.Item>Section: {section.number} 
              <Button variant="primary" style={{float:"right"}} onClick={()=>{this.removeSection(section)}}>Remove Section</Button>
            </ListGroup.Item>
            <ListGroup.Item>Location: {section.location}</ListGroup.Item>
            <ListGroup.Item>Instructor: {section.instructor}</ListGroup.Item>
            
            
          </ListGroup>
        ));
      }
      
    }
   

    return sectionList;
  }

  render() {
    return ( 
      <Card>
        {this.display()}
      </Card>
    )
  }
}

export default Cart;
