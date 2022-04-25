// eslint-disable-next-line spaced-comment
/// <reference types="Jest" />

import mostrarPokemon from './ui/pokemon.js';
import pokemonFixture from '../../cypress/fixtures/bulbasaur.json';


describe('pokemon', () => {
  it('deberia obtener los parametros de la url', () => {
    global.fetch = jest.fn()
      .mockImplementation(() => new Promise((resolve) => {
        const jsonPromise = new Promise((r) => {
          r(pokemonFixture);
        });
        resolve({ json: () => jsonPromise });
      }));
    mostrarPokemon(pokemonFixture);
  });
});
