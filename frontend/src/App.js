import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <Router>
    <>
      <Header />
      <main className="m-10">
        
      <Route path="/product/:id" component={ProductScreen} />
          <Route exact path="/" component={HomeScreen} />
         
      </main>

      <Footer />
    </>
    </Router>
  );
};

export default App;
