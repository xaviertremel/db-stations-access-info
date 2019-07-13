import React, { useState } from 'react'
import { Link } from 'react-router-dom'

class Stations extends React.Component {
  state = {
    //TODO use redux to make the stations persist
    stations: [],
    filteredStations: [],
  }

  render = () => {
    return (
      <div className="Stations">
        <SearchField 
          onClickSearch={(searchTerm) => this.setState({ 
            filteredStations: (searchTerm === '')
              ? this.state.stations
              : this.state.stations.filter(station => station.name.toLowerCase().includes(searchTerm.toLowerCase()))
          })}
        />
        <ul className="StationsList">
          {this.state.stations.length === 0 && <li>Loading...</li>}
          {this.state.filteredStations.map(station => 
            <li key={station.number}>
              <Link to={`/station/${station.number}`}>
                {station.name}
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }

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
}

const SearchField = ({ onClickSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="SearchField">
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={() => onClickSearch(searchTerm)}>Search</button>
    </div>
  )
}

export default Stations

