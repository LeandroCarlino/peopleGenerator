import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'Generador de personas',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: '**',
    title: 'Página no encontrada — People Generator',
    loadComponent: () =>
      import('./pages/no-encontrado/no-encontrado').then((m) => m.NoEncontrado),
  },
];
