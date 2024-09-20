import React from 'react'
import '../components-styles/cards.scss'

const Cards = (props) => {
  const {C_flag, C_flagImgAlt, C_name, C_pop, C_region, C_capital} = props;

  return (
    <>
      <div className='card'>
        <div className="flag-holder">
          <img src={C_flag} alt={C_flagImgAlt} className='flag-img'/>
        </div>
        
        <div className="card-info">
          <p className='name'>{C_name}</p>
          <p className='population'>Population: <span>{C_pop}</span></p>
          <p className='region'>Region: <span>{C_region}</span></p>
          <p className='capital'>Capital: <span>{C_capital}</span></p>
        </div>
      </div>
    </>
  )
}

export default Cards