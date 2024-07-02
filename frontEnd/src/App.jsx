import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminRouter, clientRouter } from "./routes";
import { Fragment, useEffect } from "react";
import { Login } from "./pages/admin";
import { pathAdmin } from "./utils/path";
import { apiCheckLogin } from "./apis/axios";
import {
  PrivateRouterAdmin,
  PrivateRouterClient,
} from "./components/privateRouterComponent";
import { useDispatch } from "react-redux";
import { login } from "./redux/auth";

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const res = await apiCheckLogin();
  //       if (res) {
  //         console.log(res);
  //         dispatch(login(res.user));
  //       }
  //     } catch (error) {
  //       toast.error(error);
  //     }
  //   })();
  // }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* path public */}
          <Route path={`${pathAdmin.login}`} element={<Login />} />

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

          {/* path private client */}
          <Route path="/" element={<PrivateRouterClient />}>
            {clientRouter.map((item, index) => {
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
