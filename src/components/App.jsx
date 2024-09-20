import { useState } from 'react'
import Header from './Header'
import SearchAndFilter from './Search-and-filter'
import CountriesHome from './CountriesHome'
import { MyContextsProvider } from '../contexts'
// import CountriesDetails from './CountriesDetails'

function App() {

  return (
    <>
      <MyContextsProvider>
        <Header />
        <main id='main-content'>
          <SearchAndFilter />
          <CountriesHome />
          {/* <CountriesDetails /> */}
        </main>
      </MyContextsProvider>
    </>
  )
}

export default App
