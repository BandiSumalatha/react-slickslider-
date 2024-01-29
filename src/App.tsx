import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import WidgetCards from './components/carousel/WidgetCards';
import Carousel from './components/carousel/Carousel';
import BrandSection from './components/carousel/BrandSection';
import Cards from "./components/carousel/Cards";

function App() {

  return (
    <BrowserRouter>
      <>
        <Header />
        <Carousel/>
     <WidgetCards/>
      <BrandSection/>
      <Cards /> 
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App
