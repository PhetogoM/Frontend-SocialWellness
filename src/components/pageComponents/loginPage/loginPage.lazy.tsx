import React, { lazy, Suspense } from 'react';

const LoginPage = lazy(() => import('./loginPage.tsx'));

const LoginPageLazy = (props: React.ComponentProps<typeof LoginPage>) => (
  <Suspense fallback={null}>
    <LoginPage {...props} />
  </Suspense>
);

export default LoginPageLazy;