import { Header, Footer } from "../../components/client";

function DefaultLayout({ children } ) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
