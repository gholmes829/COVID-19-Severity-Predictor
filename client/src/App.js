
import React from 'react'

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      output: '',
      death: '',
      icu: '',
      hosp: '',
    }

    // user inputs
    this.inputs = {
      age: '',
      sex: '',
      race: '',
      medCond: ''
    }

    // drop down options
    this.races = [
      'Black', 'Asian', 'White', 'Pacific Islander', 'Native American', 'Hispanic', 'Other'
    ];
    this.age = [
      '0-9', '10-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80+'
    ];

    this.sex = [
      'Male', 'Female'
    ];
    this.medCond = [
      'Yes', 'No'
    ];

    // callback functions
    this._handleSubmit = this._handleSubmit.bind(this);
  
  }
  
  _handleSubmit() {
    let valid = !Object.values(this.inputs).some( (value) => {return value === ''} );

    if (valid) {
      this.setState({output: 'Calculating...'});

      let ageConvert = {
        '0-9': 0, '10-19': 1, '20-29': 2, '30-39': 3, '40-49': 4, '50-59': 5, '60-69': 6, '70-79': 7, '80+': 8
      };

      let data = {
        sex: this.inputs.sex === 'Female' ? 0 : 1,
        age_group: ageConvert[this.inputs.age],
        medcond_yn: this.inputs.medCond === 'No' ? 0 : 1,
        AmIn_NH: this.inputs.race === 'Native American' ? 1 : 0,
        As_NH: this.inputs.race === 'Asian' ? 1 : 0,
        Bl_NH: this.inputs.race === 'Black' ? 1 : 0,
        HS: this.inputs.race === 'Hispanic' ? 1 : 0,
        Ot_NH: this.inputs.race === 'Other' ? 1 : 0,
        PI_NH: this.inputs.race === 'Pacific Islander' ? 1 : 0,
        Wh_NH: this.inputs.race === 'White' ? 1 : 0,
      }

      // send request to API
      fetch('http://localhost:5000/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      .then(output => {
        return output.json();
        
      })
      .then(output => {
        let death = output.death;
        let icu = output.icu;
        let hosp = output.hosp;
        this.setState({output: "Results:", death: "Death: " + (parseFloat(death)*100).toFixed(2) + "%", icu: "ICU: " + (parseFloat(icu)*100).toFixed(2) + "%", hosp: "Hospital: " + (parseFloat(hosp)*100).toFixed(2) + "%"});
      })
      .catch(err => {
        this.setState({output: 'Error occurred in backend!!!'});
      });
    }
    else {
      this.setState({output: 'Please complete all fields!!!'});
    }
  }

  render() {
    // MAKE FANCIER OUTPUT FIELDS
    return (
      <div className="App">
        <h1>COVID-19 Severity Predictor</h1>
        <h3>This is a tool that uses neural networks trained on CDC public data to predict severity of COVID-19 infection on non-vaccinated indiviudals.<br></br><br></br>This is not medical advice and is not affiliated with any medical organization.<br></br><br></br>Please follow all CDC guidelines even if your predicted severity is low!<br></br><br></br></h3>
        <div className="DropDown">
          <Dropdown options={this.age} onChange={(e) => {this.inputs.age = e.value}} placeholder="Select age group"/>
          <Dropdown options={this.sex} onChange={(e) => {this.inputs.sex = e.value}} placeholder="Select sex"/>
          <Dropdown options={this.races} onChange={(e) => {this.inputs.race = e.value}} placeholder="Select race"/>
          <Dropdown options={this.medCond} onChange={(e) => {this.inputs.medCond = e.value}} placeholder="Do you have an underlying health condition?"/>
          <br></br>
          <button className="Button" onClick={this._handleSubmit}>Predict</button>
        </div>
        <br></br>
        <h2>{this.state.output}</h2>
        
        <h3>{this.state.hosp}</h3>
        
        <h3>{this.state.icu}</h3>
        
        <h3>{this.state.death}</h3>
      </div>
    );
  }
}

export default App;
