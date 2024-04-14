import { Outlet } from "react-router-dom";
import HeaderNavigation from "../components/HeaderNavigation";
import Footer from '../components/Footer';

function RootLayout() {
  return (
    <>
      <HeaderNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
