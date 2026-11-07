import { fichaEnTexto, formatearAltura, generarPersona } from './persona';

const cero = () => 0;
const casiUno = () => 0.999;

describe('generarPersona', () => {
  it('con rnd=0 elige el primer elemento de cada lista', () => {
    const persona = generarPersona('mujer', cero);

    expect(persona.genero).toBe('mujer');
    expect(persona.edad).toBe(18);
    expect(persona.altura).toBe(150);
    expect(persona.foto).toBe('img/woman1.webp');
    expect(persona.nombre.length).toBeGreaterThan(0);
  });

  it('con rnd≈1 toma el último retrato disponible', () => {
    expect(generarPersona('mujer', casiUno).foto).toBe('img/woman20.webp');
    expect(generarPersona('hombre', casiUno).foto).toBe('img/man21.webp');
  });

  it('usa retratos y rangos de altura distintos por género', () => {
    const mujer = generarPersona('mujer', cero);
    const hombre = generarPersona('hombre', cero);

    expect(mujer.foto.startsWith('img/woman')).toBe(true);
    expect(hombre.foto.startsWith('img/man')).toBe(true);
    expect(mujer.altura).toBeGreaterThanOrEqual(150);
    expect(mujer.altura).toBeLessThanOrEqual(180);
    expect(hombre.altura).toBeGreaterThanOrEqual(160);
    expect(hombre.altura).toBeLessThanOrEqual(195);
  });

  it('mantiene la edad entre 18 y 65', () => {
    expect(generarPersona('mujer', cero).edad).toBe(18);
    expect(generarPersona('mujer', casiUno).edad).toBe(65);
  });
});

describe('formateo', () => {
  it('formatea la altura en metros con coma', () => {
    expect(formatearAltura(165)).toBe('1,65 m');
    expect(formatearAltura(180)).toBe('1,80 m');
  });

  it('arma una ficha de texto con los datos principales', () => {
    const persona = generarPersona('hombre', cero);
    const texto = fichaEnTexto(persona);

    expect(texto).toContain(persona.nombre);
    expect(texto).toContain('1,60 m');
    expect(texto).toContain('18 años');
  });
});
