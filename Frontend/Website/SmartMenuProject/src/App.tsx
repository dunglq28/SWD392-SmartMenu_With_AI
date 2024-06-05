import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/RouterApp";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import { ToastContainer } from "react-toastify";
import "../node_modules/react-toastify/dist/ReactToastify.css"

function App(): JSX.Element {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, i) => {
              const Layout = route.layout === null ? Fragment : DefaultLayout;
              const Page = route.component;
              return (
                <Route
                  key={i}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
