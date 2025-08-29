import React, { lazy, Suspense } from "react";

const LazyLoginPage = lazy(() => import("./loginPage"));

const LoginPageLazy = (props) => (
  <Suspense fallback={null}>
    <LazyLoginPage {...props} />
  </Suspense>
);

export default LoginPageLazy;
