import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import './App.css';

const App= () => {
  return (
    <>
      <Header />
      <main className="m-10"><h1 className="text-xl text-blue-500 m-4">Latest Products:</h1>
      <HomeScreen />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
