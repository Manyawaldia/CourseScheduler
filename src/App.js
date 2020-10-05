import React from 'react';
import './App.css';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Card from 'react-bootstrap/Card'
import Sidebar from './Sidebar';
import CourseArea from './CourseArea';
// import Course from './Course';
import Cart from './Cart';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: {},
      filteredCourses: {},
      subjects: [],
      cart:[],
      cartSub:[],
    };
    this.addSection = this.addSection.bind(this);
  }

  componentDidMount() {
    fetch('http://mysqlcs639.cs.wisc.edu:53706/api/react/classes').then(
      res => res.json()
    ).then(data => this.setState({allCourses: data, filteredCourses: data, subjects: this.getSubjects(data)}));
  }

  getSubjects(data) {
    let subjects = [];
    subjects.push("All");

    for(const course of Object.values(data)) {
      if(subjects.indexOf(course.subject) === -1)
        subjects.push(course.subject);
    }

    return subjects;
  }

  setCourses(courses) {
    this.setState({filteredCourses: courses})
  }

  removeSection = (section) =>{
    const index = this.cart.indexOf(section);
    if (index > -1) {
      this.cart.splice(index, 1);
    }
    this.setState({cart:this.state.cart});
    console.log("here");
    return this.cart;
  }

  addSection = (dataFromChild) =>{

    // this.setState({cart:dataFromChild});
    this.state.cart.push(dataFromChild);
    this.setState({cart:this.state.cart});
    // console.log("hello");
    // this.cart.push(dataFromChild);
    console.log(this.state.cart);
    // this.setState
  }
  addAllSections = (dataFromChild) =>{

    // this.setState({cart:dataFromChild});
    let i = 0;
    for ( i =0; i < dataFromChild.length; i++){
      this.state.cart.push(dataFromChild);
    }
    
    this.setState({cart:this.state.cart});
    
    console.log(this.state.cart);
    // this.setState
  }
  addAllSubSections = (dataFromChild) =>{
    let i = 0;
    for ( i =0; i < dataFromChild.length; i++){
      this.state.cartSub.push(dataFromChild);
    }
    
    this.setState({cartSub:this.state.cartSub});
    
    console.log(this.state.cartSub);
  }

  addSubSection = (dataFromChild) =>{
    let i = 0;
    for ( i =0; i < dataFromChild.length; i++){
      this.state.cartSub.push(dataFromChild);
    }
    
    this.setState({cartSub:this.state.cartSub});
    
    console.log(this.state.cartSub);
  }
 
  render() {
    return (
      <>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />

        <Tabs defaultActiveKey="search" style={{position: 'fixed', zIndex: 1, width: '100%', backgroundColor: 'white'}}>
          <Tab eventKey="search" title="Search" style={{paddingTop: '5vh'}}>
            <Sidebar setCourses={(courses) => this.setCourses(courses)} courses={this.state.allCourses} subjects={this.state.subjects}/>
            <div style={{marginLeft: '20vw'}}>
              <CourseArea data={this.state.filteredCourses} allData={this.state.allCourses} addSection={this.addSection.bind(this)} 
               removeSection={this.removeSection.bind(this)} addAllSections={this.addAllSections.bind(this)} addAllSubSections={this.addAllSubSections.bind(this)} addSubSection={this.addSubSection.bind(this)} cartMode={false}/>
          </div>
          </Tab>

          <Tab eventKey="cart" title="Cart" style={{paddingTop: '5vh'}}>
            <div style={{marginLeft: '5vw'}}>
              <Card style={{ width: '100%', backgroundColor: 'white', padding: '30px'}}> 
                {/* <Course callBackFromParent={this.myCallback}/> */}
                {/* <CourseArea data={this.state.cart} allData={this.state.allCourses} cartMode={false} addSection={this.addSection.bind(this)}/> */}
                <Cart cart={this.state.cart} cartSub={this.state.cartSub} data={this.state.allCourses} cartMode={true}></Cart>
              </Card>
            </div>
          </Tab>
        </Tabs> 
      </>
    )
  }
}

export default App;