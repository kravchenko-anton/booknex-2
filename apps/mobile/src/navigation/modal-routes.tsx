import LogoutAlert from '@/screens/settings/settings-logout';
import type { IRouteType } from './navigation-types';

export const modalRoutes: IRouteType[] = [
  {
    name: 'Logout',
    component: LogoutAlert,
    options: {
      headerShown: false
    }
  }
];
