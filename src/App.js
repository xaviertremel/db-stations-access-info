import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Stations from './Screens/Stations'
import Station from './Screens/Station'
import './App.css'

class App extends React.Component {
  render = () => 
    <Router>
      <Route path="/" exact component={Stations} />
      <Route path="/stations/" component={Stations} />
      <Route path="/station/:stationId" component={Station} />
    </Router>
}

export default App;
