import React, { Component, useState, useEffect  } from 'react';
//import logo from './logo.svg';
import './App.css';
import * as Survey from "survey-react";
import axios from "axios";
import { nameJsonSurvey } from './SurveyJsons/NameJson';
import { surveyOneJson } from './SurveyJsons/SurveyOne';
import { pieChart, barChart } from './Charts/ChartFuncs';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "",
      pie: ""
    }
  };

  state = {
    data: null,
    myData: []
  };

  componentDidMount() {
      // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));

      this.getData();
  }

  getData = () => {
    axios.get('/express_backend')
    .then((response) => {
      const myGetData = response.data;
      this.setState({myData: myGetData});
      console.log("Data Received");
    })
  };

    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();
    console.log(response);

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {
    var surveyJson = surveyOneJson;
    var nameJson = nameJsonSurvey;
    let pieBool = true;
    

    const sendDataToServer = (survey) => {
        //send Ajax request to your web server
        axios.post('http://localhost:5000/express_backend', {
          data: survey.data,
          name: localStorage.getItem('name')
        })
    };

    const sendNameToStorage = (survey) => {
      localStorage.setItem('name', survey.data.FirstName)
    };


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

    return (
      <div className="App">
      <h1>Farming Data Visualization</h1>
      <div><Survey.Survey json={nameJson} onComplete={sendNameToStorage}/></div>

      <div class='barChart'>
        <div class='bar'>{barChart(data)}</div>
      </div>
      <div class='pieChart'>
        <div class='pie'>{pieBool ? pieChart(data) : null}</div>
      </div>

      <div><Survey.Survey json={surveyJson} onComplete={sendDataToServer} /></div>
    </div>
    );
  }
}

export default App;