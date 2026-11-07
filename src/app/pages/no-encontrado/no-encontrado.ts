import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-no-encontrado',
  imports: [RouterLink],
  template: `
    <p class="kicker">Error 404</p>
    <h1>Esa página no existe</h1>
    <p class="texto">Volvé al generador y creá un personaje nuevo.</p>
    <a class="boton" routerLink="/">Ir al generador</a>
  `,
  styles: `
    :host { display: block; max-width: 38rem; margin: 0 auto; padding-block: 3rem; text-align: center; }
    .kicker { margin: 0 0 0.5rem; font-family: var(--mono); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--acento); }
    h1 { margin-bottom: 0.75rem; font-size: clamp(1.8rem, 4.5vw, 2.6rem); font-weight: 800; }
    .texto { margin-bottom: 1.5rem; color: var(--mudo); }
  `,
})
export class NoEncontrado {}
