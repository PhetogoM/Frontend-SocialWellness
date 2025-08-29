import React, { lazy, Suspense } from "react";

//const LazyRegisterPage = lazy(() => import("./RegisterPage"));

const RegisterPage = (props) => (
  <Suspense fallback={null}>
    <LazyRegisterPage {...props} />
  </Suspense>
);

export default RegisterPage;

