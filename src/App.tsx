import { BrowserRouter } from "react-router-dom";
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import WidgetCards from './components/widges/WidgetCards';
import Carousel from './components/carousel/Carousel';
import BrandSection from './components/brands/BrandSection';
import Cards from "./components/cards-images/Cards";

function App() {

  return (
    <BrowserRouter>
      <>
        <Header />
        <Carousel />
        <WidgetCards />
        <BrandSection />
        <Cards />
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App
