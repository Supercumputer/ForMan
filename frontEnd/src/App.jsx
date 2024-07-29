import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRouter } from "./routes";
import { publicClientRouter, privateClientRouter } from "./routes/clientRouter";
import { Fragment, useEffect } from "react";
import { apiGetAccount } from "./apis/axios";
import {
  PrivateRouterAdmin,
  PrivateRouterClient,
} from "./components/privateRouterComponent";
import { useDispatch } from "react-redux";
import { login, setLoading } from "./redux/auth";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const res = await apiGetAccount();
        if (res && res.status) {
          dispatch(login(res.resData));
        }
      } catch (error) {
        toast.error(error);
      } finally {
        dispatch(setLoading());
      }
    })();
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
        
          {/* path private admin */}
          <Route path="/admin" element={<PrivateRouterAdmin />}>
            {adminRouter.map((item, index) => {
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
          </Route>

          {publicClientRouter.map((item, index) => {
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

          {/* path private client */}

          <Route path="/" element={<PrivateRouterClient />}>
            {privateClientRouter.map((item, index) => {
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
          </Route>
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
