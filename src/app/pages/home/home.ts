import { Component, signal } from '@angular/core';
import {
  Genero,
  Persona,
  fichaEnTexto,
  formatearAltura,
  generarPersona,
} from '../../core/persona';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  protected readonly persona = signal<Persona | null>(null);
  protected readonly historial = signal<Persona[]>([]);
  protected readonly estadoCopia = signal<'inicial' | 'copiado' | 'error'>('inicial');

  protected readonly formatearAltura = formatearAltura;

  protected generar(genero: Genero | 'sorpresa'): void {
    const elegido: Genero =
      genero === 'sorpresa' ? (Math.random() < 0.5 ? 'mujer' : 'hombre') : genero;

    const nueva = generarPersona(elegido);
    this.persona.set(nueva);
    this.historial.update((previas) => [nueva, ...previas].slice(0, 6));
    this.estadoCopia.set('inicial');
  }

  protected recuperar(persona: Persona): void {
    this.persona.set(persona);
    this.estadoCopia.set('inicial');
  }

  protected async copiar(): Promise<void> {
    const persona = this.persona();
    if (!persona) return;

    const texto = fichaEnTexto(persona);

    try {
      await navigator.clipboard.writeText(texto);
      this.estadoCopia.set('copiado');
      return;
    } catch {
      /* sigue el fallback */
    }

    this.estadoCopia.set(this.copiarSinApi(texto) ? 'copiado' : 'error');
  }

  /** Respaldo para navegadores sin permiso de portapapeles. */
  private copiarSinApi(texto: string): boolean {
    const area = document.createElement('textarea');
    area.value = texto;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();

    let copiado = false;
    try {
      copiado = document.execCommand('copy');
    } catch {
      copiado = false;
    }

    area.remove();
    return copiado;
  }
}
