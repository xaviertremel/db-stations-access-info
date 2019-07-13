import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import styles from './Stations.module.css'

class Stations extends React.Component {
  state = {
    //TODO use redux to make the stations persist
    stations: [],
    filteredStations: [],
  }

  render = () => {
    return (
      <div className={styles.Stations}>
        <div className={styles.StationsContainer}>
          <SearchField 
            onClickSearch={(searchTerm) => this.setState({ 
              filteredStations: (searchTerm === '')
                ? this.state.stations
                : this.state.stations.filter(station => station.name.toLowerCase().includes(searchTerm.toLowerCase()))
            })}
          />
          <ul className={styles.StationsList}>
            {this.state.stations.length === 0 && <li>Loading...</li>}
            {this.state.filteredStations.map(station => 
              <li key={station.number} className={styles.Station}>
                <Link to={`/station/${station.number}`} className={styles.StationLink}>
                  {station.name}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }

  componentDidMount = () => {
    fetch('https://api.deutschebahn.com/stada/v2/stations', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <YOUR_TOKEN>'
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
    <div className={styles.SearchField}>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={() => onClickSearch(searchTerm)}>Search</button>
    </div>
  )
}

export default Stations

