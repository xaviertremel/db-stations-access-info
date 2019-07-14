import React from 'react'
import { Link } from 'react-router-dom'

import SearchField from '../Components/SearchField'
import { DB_API_TOKEN } from '../API'

import styles from './Stations.module.css'

class Stations extends React.Component {
  state = {
    //TODO use redux or sessionStorage/indexedDB to make the stations persist
    stations: [],
    filteredStations: [],
  }

  //TODO virtualize list rendering to improve performance
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
        'Authorization': `Bearer ${DB_API_TOKEN}`
      }
    })
      .then(res => res.json())
      .then(({ result }) => this.setState({ stations: result, filteredStations: result }))
      .catch(error => console.error('Error:', error));
  }
}

export default Stations

