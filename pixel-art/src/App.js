import React, { Component } from 'react';
import './App.css';
import {array} from './cells.js'
import Grid from 'pixel-grid-react'

class App extends Component {

constructor (props) {
  super(props)
  this.state = {
    colors: [],
    selectedColor: []
  }
}

componentDidMount() {
  fetch('./Colors.json')
  .then(response => response.json())
  .then(data => {
    this.setState({
      colors: data,
      selectedColor: []
    })
  })
}

selectColor = (event) => {
  this.setState({
    selectedColor: event.target.style.backgroundColor
  })
}

selectPixel = (event) => {
  let selectedPixel = document.querySelector('.grid-container').children[event]
  selectedPixel.style.backgroundColor = this.state.selectedColor
}

  render() {
    return (
      <div className="App">
        <h1 className="App-title">Pixel Art</h1>
        <main>
          <Grid class="grid-container"
            cells={array.map(cell => {
              return cell
            })}
            onCellEvent={this.selectPixel}
          />
          <section id="palette" onClick={this.selectColor}>
            {this.state.colors.map(color => {
              return (
                <div key={color} className="palette-div" style={{backgroundColor: color}}>
                </div>
              )
            })}
          </section>
        </main>
      </div>
    )
  }
}

export default App;
