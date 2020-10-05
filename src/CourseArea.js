import React from 'react';
import './App.css';
import Course from './Course';

class CourseArea extends React.Component {
  getCourses() {
    let courses = [];

    for(const course of Object.values(this.props.data)) {
      courses.push (
        <Course key={course.name} data={course} 
        addSection={this.addSection.bind(this)} addAllSections={this.addAllSections.bind(this)} 
        addSubSection={this.addSubSection.bind(this)} addAllSubSections={this.addAllSubSections.bind(this)}/>
      )
    }

    return courses;
  }
  addAllSections = (number) =>{
    console.log(number);
    return this.props.addAllSections(number);
  }
  addAllSubSections = (number) =>{
    console.log(number);
    return this.props.addAllSubSections(number);
  }
  addSubSection = (number) =>{
    console.log(number);
    return this.props.addSubSection(number);
  }
  addSection = (section) =>{
   return this.props.addSection(section);
  }
  removeSection = (section) =>{
    return this.props.removeSection(section);
  }
  render() {
    return (
      <div style={{margin: '5px'}}>
        {this.getCourses()}
       
      </div>

   
    )
  }
}

export default CourseArea;