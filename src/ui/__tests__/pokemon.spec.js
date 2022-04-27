
import fixture from '../../__tests__/pokedex.fixture.js';
import pokemonFixture from '../../../cypress/fixtures/bulbasaur.json';
import mostrarPokemon from '../pokemon.js';
import { cargarPokemon } from '../../servicios/pokemon.js';


test('muestra pokemon', async () => {
  document.body.innerHTML = fixture;
  global.fetch = jest.fn()
    .mockImplementation(() => new Promise((resolve) => {
      const jsonPromise = new Promise((r) => {
        r(pokemonFixture);
      });
      resolve({ json: () => jsonPromise });
    }));
  mostrarPokemon(await cargarPokemon('1'));
  expect(document.querySelector('#pokemon-imagen')).toHaveProperty('src');
  expect(document.querySelector('#pokemon-id').textContent).toBe('1');
  expect(document.querySelector('#tipos').textContent).toContain('grass');
  expect(document.querySelector('#pokemon-nombre').textContent).toBe('bulbasaur');
  expect(document.querySelector('#pokemon-nombre').textContent).toBe('bulbasaur');
});
