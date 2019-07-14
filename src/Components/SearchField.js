import React, { useState } from 'react'

import styles from './SearchField.module.css'

const SearchField = ({ onClickSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className={styles.SearchField}>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <button onClick={() => onClickSearch(searchTerm)}>Search</button>
    </div>
  )
}

export default SearchField