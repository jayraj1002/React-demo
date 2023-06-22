import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Admin from "./pages/Admin";
import { Redirect, Route } from "react-router";
import CountryData from "./components/CountryData";
import CityData from "./components/CityData";
import CountryForm from "./components/CountryForm";

function App() {
  return (
    <div className="App">
      <Route path="/" exact>
        <Redirect to="/admin/Country" />
      </Route>
      
      <Route path="/admin">
        <Admin />
      </Route>

      <Route path="/admin/Country" exact>
        <CountryData />
      </Route>

      <Route path="/admin/City" exact>
        <CityData />
      </Route>

      <Route path='/admin/country/view/:id'>
        <CountryForm />
      </Route>

      <Route path='/admin/country/edit/:id'>
        <CountryForm />
      </Route>

      <Route path='/admin/country/add'>
        <CountryForm />
      </Route>
    </div>
  );
}

export default App;
