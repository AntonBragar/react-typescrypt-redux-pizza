import "./scss/app.scss";
import React, { Suspense } from "react";
import Home from "./pages/Home";
// import NotFound from "./pages/NotFound";
import { Outlet, Route, Routes } from "react-router-dom";
// import Cart from "./pages/Cart";
// import FullPizza from "./pages/FullPizza";
import MainLayout from "./layouts/MainLayout";

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
);
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: "FullPizza" */ "./pages/FullPizza")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: "NotFound" */ "./pages/NotFound")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="pizza/:pizzaId"
          element={
            <Suspense fallback={<div>Download...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Download...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Download...</div>}>
              <NotFound />
            </Suspense>
          }
        />
        <Route />
      </Route>
    </Routes>
  );
}

export default App;
