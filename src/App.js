import React from "react";
import Header from "./components/Header";
import Grid from "./components/Grid";
import Footer from "./components/Footer";
import ContextProvider from "./context";
import Rules from "./components/Rules";

function App() {
  return (
    <div className="container">
      <div className="content">
        <ContextProvider>
          <Header />
          <Grid />
          <Rules />
        </ContextProvider>
      </div>
      <Footer />
    </div>
  );
}

export default App;
