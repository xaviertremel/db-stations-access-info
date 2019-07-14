import React from 'react'

import styles from './Facility.module.css'

const Facility = ({ facility }) =>
  <li className={styles.Facility} key={facility.equipmentnumber}>
    <div className={styles.Type}>
      {facility.type}
    </div>
    <div className={styles.Description}>
      {facility.description}
    </div>
    <div className={styles.Status}>
      {facility.state}
    </div>
  </li>

export default Facility