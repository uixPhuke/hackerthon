
import Header from './components/headers/Header'
import Pages from './components/mainpages/Pages'
 //import { Router } from 'react-router-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './GlobalState'
import Footer from './components/footer/Footer'

const App = () => {
  return (
    <DataProvider>
      <Router>
        <div className="bg-gradient-to-b from-gray-900 to-gray-600 min-h-screen space-x-2 ">
          <Header />
          <Pages />
          <Footer/>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App