import React from 'react';
import './App.css';
import Section from './Section';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
rrimport Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import './Course.css';

class Course extends React.Component {
  
  getReqs(requisite){
    let req = [];
    let i = 0;
    let j = 0;
    let none = "None";
    if( requisite.length===0){
      return none;
    }
    while(i < requisite.length){
      if(i>=1){
        req = req.concat(" AND ");
      }
      j = 0;
      while(j < requisite[i].length){
        if(j === 0 ){
          req = req.concat("(");
        }
        if(j>=1){
          req = req.concat(" OR ");
        }
        req = req.concat(requisite[i][j]);
        if( (j+1) === requisite[i].length){
          req = req.concat(")");
        }
        j++;
      }
      i++;
    }
    return req;
  }
  
  getTimes(section){
    let days = Object.keys(section.time);

    console.log(days);

    let daysList = days.map((day) => (
      <ListGroup.Item>{day}: {section.time[day]}</ListGroup.Item>
    ));
    return daysList;
  }

  getSub(section){
    let subs = section.subsections;
    
    if(subs === null){
      return {};
    }
    
    let subList = subs.map((sub) => ( 
      <ListGroup>
        <ListGroup.Item>Section: {sub.number} <Button variant="light">Add Discussion</Button> </ListGroup.Item>
        <ListGroup.Item>Location: {sub.location}</ListGroup.Item>
        <ListGroup.Item>Time: {this.getTimes(sub)}</ListGroup.Item>
        <br></br>
      </ListGroup>
  
    ));
    
    
    return subList; 
  }

  //TODO
  // get the sec - lecture
  getSec(){
    let sec = this.props.data.sections;
    let i = 0;
    let j = 0;
    let none = "None";
    
    let sectionList = sec.map((section) => ( 
      <ListGroup>
        <ListGroup.Item>Section: {section.number} <Button variant="light">Add Section</Button> </ListGroup.Item>
        <ListGroup.Item>Location: {section.location}</ListGroup.Item>
        <ListGroup.Item>Instructor: {section.instructor}</ListGroup.Item>
        <ListGroup.Item>Meeting Times
          <ListGroup>
            {this.getTimes(section)}
          </ListGroup>
        </ListGroup.Item>
        <ListGroup.Item>Subsections: 
          <ListGroup>
            {this.getSub(section)}
          </ListGroup>
        </ListGroup.Item>
        <br></br>
        
      </ListGroup>
  
    ));
    // console.log(sec);
    return sectionList;
  }

  render() {
    let number = this.props.data.number;
    let name = this.props.data.name;
    let description = this.props.data.description;
    let credits = this.props.data.credits;
    let subject = this.props.data.subject;
    // let requisites = this.props.data.requisites.join(",");
    let requisites = [];
    requisites = this.getReqs(this.props.data.requisites);
    let keywords = this.props.data.keywords.join(", ");

  
    const mystyle = ({

      titleStyle : {
        color: " #C5050C",
        fontWeight:"Bold",
        fontSize:"20px",
      },
      subject:{
        color: "dark grey",
        fontWeight:"normal",
        fontSize:"16px",
        paddingLeft:'2.5rem',
        textAlign:'justify'
      },
      text : {
        color: "dark grey",
        fontWeight:"normal",
        fontSize:"14px",
        paddingLeft:'2.5rem',
        paddingRight:'2.5rem',
        paddingTop:'1rem',
        textAlign:'justify'
      },
      requisites: {
        color: "dark grey",
        fontWeight:"normal",
        fontSize:"14px",
        paddingLeft:'2.5rem',
        paddingRight:'2.5rem',
        paddingTop:'1rem',
        textAlign:'justify'
      },
      sec : {
        fontSize:"16px",
        fontWeight:"bold",
        paddingLeft:'2.5rem',
        paddingRight:'2.5rem',
      }
    })

    return (
      <div>
        <Accordion defaultActiveKey="0">
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                <h1 style={mystyle.titleStyle}>({number}) {name} | ({credits} Credits) </h1>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <div style={mystyle.subject}>Subject: {subject}</div>
                <div style={mystyle.text}>Credits: {credits}</div>
                <div style={mystyle.text}>Description: {description}</div>
                <div style={mystyle.requisites}>Requisites: {requisites}</div>
                <div style={mystyle.text}>Keywords: {keywords}</div>
                <br></br>
                <div style={mystyle.sec}>{this.getSec()}</div>
               
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    )
  }
}

export default Course;
