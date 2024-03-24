'use client';

import { useAction, useAuth } from '@/hooks';
import { getRefreshToken } from '@/redux/auth/auth-helper';
import { publicRoutes, secureRoutes } from '@/utils/route';
import { redirect } from 'next/navigation';
import { useLayoutEffect, type FC } from 'react';

export const loginRoute = (Component: FC) =>
  function (properties: NonNullable<unknown>) {
    const { user, isLoading } = useAuth();

    useLayoutEffect(() => {
      if (user) redirect(secureRoutes.dashboard);
    }, [user, isLoading]);

    return <Component {...properties} />;
  };

export const adminRoute = (Component: FC) =>
  function (properties: NonNullable<unknown>) {
    const { user, isLoading } = useAuth();
    const { logout } = useAction();
    useLayoutEffect(() => {
      const checkRefreshToken = async () => {
        const refreshToken = getRefreshToken();
        if (!refreshToken && user) {
          logout();
        }
      };

      checkRefreshToken();
      if (!user && !isLoading) redirect(publicRoutes.login);
    }, [user, isLoading]);

    return <Component {...properties} />;
  };
