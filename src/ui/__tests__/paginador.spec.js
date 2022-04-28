import mostrarPaginador, { manejarCambioPagina } from '../paginador.js';
// eslint-disable-next-line spaced-comment
/// <reference types="jest" />

const $ = require('jquery');

test('Maneja cambios de pagina sin href', () => {
  let estado = 'valorInicial';
  const numeroPagina = 10;
  const callback = function modificarEstado(x) { estado = x; };
  const evento = {
    target: {
      getAttribute: () => '#',
      dataset: { pagina: numeroPagina },
    },
    preventDefault: jest.fn(),
  };
  manejarCambioPagina(evento, callback);
  expect(estado).toBe(numeroPagina);
});

test('Maneja cambios de pagina con href', () => {
  let estado = 'valorInicial';
  const callback = function modificarEstado(x) { estado = x; };
  const evento = {
    target: {
      getAttribute: () => 'algunHref',
      dataset: { pagina: 1 },
    },
    preventDefault: jest.fn(),
  };
  manejarCambioPagina(evento, callback);
  expect(estado).toBe('algunHref');
});

test('Muestra paginador primera pagina', () => {
  document.body.innerHTML = '<div id="paginador"></div>';
  const callback = jest.fn();
  mostrarPaginador(600, 2, '#', '', callback);
  expect(document.querySelector('li:first-child').classList).toContainEqual('disabled');
  expect(callback).toHaveBeenCalledTimes(0);
});

test('Muestra paginador ultima pagina', () => {
  document.body.innerHTML = '<div id="paginador"></div>';
  const callback = jest.fn();
  mostrarPaginador(600, 2, '', '#', callback);
  expect(document.querySelector('li:last-child').classList).toContainEqual('disabled');
  expect(callback).toHaveBeenCalledTimes(0);
});

test('Maneja click', () => {
  document.body.innerHTML = '<div id="paginador"></div>';
  const callback = jest.fn();
  mostrarPaginador(600, 2, '', '#', callback);
  $('#paginador').click();
  expect(callback).toHaveBeenCalledTimes(1);
});

test('Evento click por defecto', () => {
  document.body.innerHTML = '<div id="paginador"></div>';
  mostrarPaginador(600, 2, '', '#');
  const bodyPrevio = document.body.innerHTML;
  $('#paginador').click();
  const bodyPosterior = document.body.innerHTML;
  expect(bodyPrevio).toBe(bodyPosterior);
});
