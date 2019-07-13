import React from 'react'

class Station extends React.Component {
  state = { station: null }

  render = () => (
    <div className="Station">
      {this.state.station
        ? <React.Fragment>
            <div className="StationName">
              {this.state.station.name}
            </div>
            <ul className="Facilities">
              {this.state.station.facilities.map(facility =>
                <li className="Facility" key={facility.equipmentnumber}>
                  <div className="Type">
                    {facility.type}
                  </div>
                  <div className="Description">
                    {facility.description}
                  </div>
                  <div className="Status">
                    {facility.state}
                  </div>
                </li>
              )}
            </ul>
          </React.Fragment>
        : <p>Loading...</p>
      }
    </div>
  )

  componentDidMount = () => {
    fetch(`https://api.deutschebahn.com/fasta/v2/stations/${this.props.match.params.stationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 584de6f81a61906e18ed0d2602742f09'
      }
    })
      .then(res => res.json())
      .then((result) => this.setState({ station: result }))
      .catch(error => console.error('Error:', error));
  }

}

export default Station