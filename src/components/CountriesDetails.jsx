import React, { useContext, useEffect, useState } from 'react'
import '../components-styles/Countries-details.scss'
import { CountriesDataContext } from '../contexts'

function CountriesDetails() {
  const { countriesData } = useContext(CountriesDataContext);
  const [index, setIndex] = useState(0);
  const firstCountry = countriesData[0];

  useEffect(() => {
    console.log(countriesData)
  }, [countriesData])


  return (
    <>
    <div id="country-details-page">
      <div id='back-btn'><ion-icon name="arrow-back-outline"></ion-icon> Back</div>

      <div id="details-container">
        <div className="flag-container">
          <img src="" alt="" className='country-flag' />
        </div>

        <div className="country-details">
          <p className='name'>{'Belgium'}</p>
          <div id='all-details'>
            <div className='details-1'>
              <p>Native Name: <span>{}</span></p>
              <p>Population: <span>{}</span></p>
              <p>Region: <span>{}</span></p>
              <p>Sub Region: <span>{}</span></p>
              <p>Capital: <span>{}</span></p>
            </div>
            <div className='details-2'>
              <p>Top Level Domain: <span>{'majoomajomajojo'}</span></p>
              <p>Currencies: <span>{}</span></p>
              <p>Languages: <span>{}</span></p>
            </div>
          </div>
          <div className='border-countries'>
            <p>Border Countries: </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CountriesDetails