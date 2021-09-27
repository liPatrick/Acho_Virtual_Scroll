import './App.css';
import CSVReader1 from './Components/CSVReader.js';
import VirtualScroll from './Components/VirtualScroll.js'; 
import React, {} from 'react';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.changeChild = React.createRef()
    this.state = {
      data: []
    }
  }

  callback = (valueFromCSVReader) => {
    this.setState({
      data: valueFromCSVReader
    }); 
    this.changeChild.current.csvData = valueFromCSVReader
  }
  render() {
    return (
      <div 
      className="App">
        <CSVReader1 callbackFunc={this.callback} />
        <VirtualScroll ref = {this.changeChild} csvData = {this.state.data}/>
      </div>
    );
  }
  
}

export default App;
