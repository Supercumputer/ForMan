import React from "react";
import { Header, Footer } from "../../components/clientComponent";

function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
