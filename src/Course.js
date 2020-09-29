import React from 'react';
import './App.css';
import Section from './Section';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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

  //TODO
  //get the sec - lecture
  getSec(section){
    let sec = [];
    let i = 0;
    let j = 0;
    let none = "None";
    if( section.length===0){
      return none;
    }
    while(i < section.length){
      if(i>=1){
        //call subsection method 
      }
      j = 0;
      while(j < section[i].length){
        if(j === 0 ){
          sec = sec.concat("(");
        }
        if(j>=1){
          sec = sec.concat(" OR ");
        }
        sec = sec.concat(section[i][j]);
        if( (j+1) === section[i].length){
          sec = sec.concat(")");
        }
        j++;
      }
      i++;
    }
  return sec;
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
    let sectionNum = this.getSec(this.props.data.sections);
    // CSS
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
                <div style={mystyle.text}>Description: {description}</div>
                <div style={mystyle.requisites}>Requisites: {requisites}</div>
                <div style={mystyle.text}>Keywords: {keywords}</div>
                <div style={mystyle.sec}>Sections: </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    )
  }
}

export default Course;
