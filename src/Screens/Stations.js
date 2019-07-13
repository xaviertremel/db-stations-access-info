import React from 'react'

class Stations extends React.Component {
  state = {
    stations: [],
    filteredStations: [],
    searchTerm: '',
  }

  render = () => 
    <div className="Stations">
      <input type="text" value={this.state.searchTerm} onChange={(e) => this.handleChange(e.target.value)} />
      <div className="StationsList">
        {this.state.filteredStations.map(station => <p>{station.name}</p>)}
      </div>
    </div>

  componentDidMount = () => {
    fetch('https://api.deutschebahn.com/stada/v2/stations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 584de6f81a61906e18ed0d2602742f09'
      }
    })
      .then(res => res.json())
      .then(({ result }) => this.setState({ stations: result, filteredStations: result }))
      .catch(error => console.error('Error:', error));
  }

  handleSearch = (searchTerm) => {
    this.setState({ searchTerm })
  }
}

export default Stations