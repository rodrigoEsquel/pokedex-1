// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

import mostrarPokemon from '../pokemon.js';
import fixture from '../../__tests__/pokedex.fixture.js';
import pokemonFixture from '../../../cypress/fixtures/bulbasaur.json';
import mapearPokemon from '../../mapeadores/pokemon.js';
import cargarPokemon from '../../servicios/pokemon.js';

describe('pokemon', () => {
  it('deberia actualizar un pokemon cargado', async () => {
    document.body.innerHTML = fixture;
    global.fetch = jest.fn()
      .mockImplementation(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r(pokemonFixture);
        });
        resolve({ json: () => jsonPromise });
      }));
    mostrarPokemon({
      id: 1,
      nombre: 'hola',
      foto: 'foto',
      tipos: ['roca'],
      habilidades: ['hola', 'chau'],
      movimientos: ['hola', 'chau'],
    });

    expect(document.querySelector(('#ayuda')).textContent).toBe('Seleccioná un pokemon para ver su información');
  });
});
