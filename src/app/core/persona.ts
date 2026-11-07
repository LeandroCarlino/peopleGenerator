import {
  APELLIDO,
  COLORES,
  NACIONALIDAD,
  NOMBRE_HOMBRE,
  NOMBRE_MUJER,
  OCUPACION,
  SIGNOS,
} from './datos';
import { FOTOS_HOMBRE, FOTOS_MUJER } from './fotos';

export type Genero = 'mujer' | 'hombre';

export interface Persona {
  id: number;
  nombre: string;
  apellido: string;
  genero: Genero;
  nacionalidad: string;
  edad: number;
  altura: number; // centímetros
  signo: string;
  ocupacion: string;
  color: string;
  foto: string;
}

/** Retratos disponibles, generados desde `public/img`. */
const FOTOS: Record<Genero, readonly string[]> = {
  mujer: FOTOS_MUJER,
  hombre: FOTOS_HOMBRE,
};

function elegir<T>(lista: readonly T[], rnd: () => number): T {
  return lista[Math.floor(rnd() * lista.length)];
}

/**
 * Genera una persona aleatoria. `rnd` se puede inyectar para testear
 * resultados deterministas.
 */
export function generarPersona(
  genero: Genero,
  rnd: () => number = Math.random,
): Persona {
  const retratos = FOTOS[genero];
  const edad = 18 + Math.floor(rnd() * 48); // 18 a 65
  const altura =
    genero === 'mujer'
      ? 150 + Math.floor(rnd() * 31) // 150 a 180 cm
      : 160 + Math.floor(rnd() * 36); // 160 a 195 cm

  return {
    id: Date.now() + Math.floor(rnd() * 100_000),
    nombre: elegir(genero === 'mujer' ? NOMBRE_MUJER : NOMBRE_HOMBRE, rnd),
    apellido: elegir(APELLIDO, rnd),
    genero,
    nacionalidad: elegir(NACIONALIDAD, rnd),
    edad,
    altura,
    signo: elegir(SIGNOS, rnd),
    ocupacion: elegir(OCUPACION, rnd),
    color: elegir(COLORES, rnd),
    foto: elegir(retratos, rnd),
  };
}

export function formatearAltura(centimetros: number): string {
  return `${(centimetros / 100).toFixed(2).replace('.', ',')} m`;
}

/** Texto plano para el botón «copiar ficha». */
export function fichaEnTexto(persona: Persona): string {
  return [
    `${persona.nombre} ${persona.apellido}`,
    `${persona.genero === 'mujer' ? 'Mujer' : 'Hombre'} · ${persona.edad} años · ${formatearAltura(persona.altura)}`,
    `Nacionalidad: ${persona.nacionalidad}`,
    `Signo: ${persona.signo}`,
    `Ocupación: ${persona.ocupacion}`,
    `Color favorito: ${persona.color}`,
  ].join('\n');
}
