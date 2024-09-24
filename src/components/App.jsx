import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MyContextsProvider } from '../contexts'
import Header from './Header'
import CountriesHome from '../pages/CountriesHome'
import CountriesDetails from '../pages/CountriesDetails'
import PageNotFound from '../pages/PageNotFound'

function App() {

  return (
    <BrowserRouter>
      <MyContextsProvider>
        <Header />
        <main id='main-content'>
          <Routes>
            <Route path='/' element={<CountriesHome />} />
            <Route path='/country/:countryName' element={<CountriesDetails />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </main>
      </MyContextsProvider>
    </BrowserRouter>
  )
}

export default App
