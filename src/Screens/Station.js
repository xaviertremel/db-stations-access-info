import React from 'react'

import Facility from '../Components/Facility'

import styles from './Station.module.css'

class Station extends React.Component {
  state = { station: null }

  render = () => (
    <div className={styles.Station}>
      {this.state.station
        ? <div className={styles.StationContainer}>
            <div className={styles.StationName}>
              {this.state.station.name}
            </div>
            <ul className={styles.Facilities}>
              {this.state.station.facilities.map(facility =>
                <Facility facility={facility} />
              )}
            </ul>
          </div>
        : <p>Loading...</p>
      }
    </div>
  )

  componentDidMount = () => {
    fetch(`https://api.deutschebahn.com/fasta/v2/stations/${this.props.match.params.stationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer <YOUR_TOKEN>'
      }
    })
      .then(res => res.json())
      .then((result) => this.setState({ station: result }))
      .catch(error => console.error('Error:', error));
  }
}

export default Station