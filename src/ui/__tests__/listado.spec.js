import { mostrarListadoPokemones } from '../listado.js';
// eslint-disable-next-line spaced-comment
/// <reference types="jest" />

const $ = require('jquery');

const pokemon1 = { name: 'pikachu' };
const pokemon2 = { name: 'otro pikachu' };

test('Maneja el click handler por defecto en los anchor', () => {
  document.body.innerHTML = '<div id="indice"></div>';
  mostrarListadoPokemones([pokemon1, pokemon2]);
  const bodyPrevio = document.body.innerHTML;
  $('.list-group-item').click();
  const bodyPosterior = document.body.innerHTML;
  expect(bodyPrevio).toBe(bodyPosterior);
});


test('Maneja el click handler en los anchor', () => {
  document.body.innerHTML = '<div id="indice"></div>';
  const callback = jest.fn();
  mostrarListadoPokemones([pokemon1, pokemon2], callback);
  $('a').each((i, e) => e.click());
  expect(callback).toHaveBeenCalledTimes(2);
});
