
import React from 'react'
import './App.css';
import ListProductComponent from './components/productComponent/ListProductComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateProductComponent from './components/productComponent/CreateProductComponent';
//import UpdateProductComponent from './components/UpdateProductComponent';
import ViewProductComponent from './components/productComponent/ViewProductComponent';
import CreateProductTypeComponent from './components/productTypeComponent/CreateProductTypeComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Router>
        <div className='container'>
          <HeaderComponent />
              <Routes> 
                <Route path='/' element={<ListProductComponent/>} />
                <Route path='/products' element={<ListProductComponent/>} />
                <Route path='/add-Product/:id' element={<CreateProductComponent/>} />
                <Route path='/view-Product/:id' element={<ViewProductComponent/>} />
                <Route path='/add-productType/:id' element={<CreateProductTypeComponent/>} />
                {/* <Route path = "/update-Product/:id" element = {UpdateProductComponent}/> */}
                </Routes>
          <FooterComponent />
        </div>
      </Router>
    </div>
  );
}

export default App;
