import React, { lazy, Suspense } from 'react';

const LazyLoginPage = lazy(() => import('./loginPage'));

const LoginPageLazy = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }) => (
  <Suspense fallback={null}>
    <LazyLoginPage {...props} />
  </Suspense>
);

export default LoginPageLazy;