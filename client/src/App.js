import React, { Component, useState, useEffect  } from 'react';
//import logo from './logo.svg';
import './App.css';
import {PieChart, Pie, Tooltip, BarChart, CartesianGrid, XAxis, YAxis, Legend, Bar, RadialBarChart, RadialBar} from "recharts";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      pie: ""
    }
    this.sayHello = this.sayHello.bind(this);
  }

  sayHello(){
    alert("Answers Submitted");
    var x = document.nameForm;
    var y = document.pieForm;
    y.submit();
  }

  state = {
    data: null
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    const data = [
      {
        name: "Soil Level", 
        Expected: 2000, 
        Measured: 1000
      },
      {
        name: "Nitrogen Level", 
        Expected: 1000, 
        Measured: 500
      },
      {
        name: "Hydration Level", 
        Expected: 500, 
        Measured: 250
      },
    ];
  
    const singleData = [
      {
      name: "Nitrogen", 
      Measured: 250
    },
    ];

    function pieChart(testData)
    {
      return(
        <PieChart width = {700} height = {350}>
        <Pie
          dataKey = "Expected"
          isAnimationActive = {false}
          data = {testData}
          cx = {200}
          cy = {200}
          outerRadius = {80}
          fill = "#57c0e8"
          label
        />
        <text
          x='28%'
          y='10%'
          style={{ fontSize: 24, fontWeight: 'bold', fill: '#000000' }}
          width={200}
          scaleToFit={true}
          textAnchor='middle'
          verticalAnchor='middle'
        >
          PieChart
        </text>
        <Tooltip />
      </PieChart>
      );
    }

    function barChart(testData)
    {
      return(
        <BarChart width={730} height={250} data={testData} margin={{ top: 50, right: 5, bottom: 5, left: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <text
          x='28%'
          y='10%'
          style={{ fontSize: 24, fontWeight: 'bold', fill: '#000000' }}
          width={200}
          scaleToFit={true}
          textAnchor='middle'
          verticalAnchor='middle'
        >
          BarChart
        </text>
        <Tooltip />
        <Legend />
        <Bar dataKey="Expected" fill="#8884d8" />
        <Bar dataKey="Measured" fill="#82ca9d" />
      </BarChart>
      );
    }

    return (
      <div className="App">
      <h1>Farming Data Visualization</h1>
      <form name = "nameForm" action = 'http://localhost:5000/express_backend' method='POST'>
        <input type='text' name='Enter' maxLength = "256" placeholder="Enter Your Name"/>
        
      </form>

      <div class='barChart'>
        <div class='bar'>{barChart(data)}</div>
        <div class='bar'>
          <form action = 'http://localhost:5000/express_backend' method='POST'>
          <input type='text' name='Enter' maxLength = "256" placeholder="Rate this chart from 1-10"/>
          <input type='submit' value='Enter'/>
          </form>
        </div>
      </div>

      <div class='pieChart'>
        <div class='pie'>{pieChart(data)}</div>
        <div class='pie'>
          <form name = "pieForm" action = 'http://localhost:5000/express_backend' method='POST'>
          <input type='text' name='Enter' maxLength = "256" placeholder="Rate this chart from 1-10"/>
          </form>
        </div>
      </div>

      <div class='barChart'>
        <div class='bar'>{barChart(data)}</div>
        <div class='bar'>
          <form action = 'http://localhost:5000/express_backend' method='POST'>
          <input type='text' name='Enter' maxLength = "256" placeholder="Rate this chart from 1-10"/>
          <input type='submit' value='Enter'/>
          </form>
        </div>
      </div>
      <button onClick={this.sayHello}>click here</button>
    </div>
    );
  }
}

export default App;