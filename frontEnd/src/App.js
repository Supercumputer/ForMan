import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import arrRoutes from "./routes";
import { Fragment } from "react";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {arrRoutes.map((item, index) => {
            let Layout = item.layout || Fragment;
            let Component = item.component;

            return (
              <Route
                path={item.path}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
                key={index}
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
