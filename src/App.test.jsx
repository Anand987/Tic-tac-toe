import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { afterEach, test, expect } from 'vitest';
import App from './App';

afterEach(cleanup);

const clickSquares = (container, squares) => {
  const cards = container.querySelectorAll('.grid .card');
  squares.forEach((i) => fireEvent.click(cards[i]));
};

// The board lives in a module-level array in App, so each test must
// finish by reloading the game to leave an empty board for the next one.

test('circle starts and turns alternate', () => {
  const { getByText, container } = render(<App />);
  expect(getByText(/circle turns/i)).toBeInTheDocument();
  clickSquares(container, [0]);
  expect(getByText(/cross turns/i)).toBeInTheDocument();
  // finish with a win so the reload button appears
  clickSquares(container, [3, 1, 4, 2]);
  fireEvent.click(getByText(/reload the game/i));
});

test('detects a winning row and can reload', () => {
  const { getByText, container } = render(<App />);
  // circle: 0, 1, 2 — cross: 3, 4
  clickSquares(container, [0, 3, 1, 4, 2]);
  expect(getByText(/circle won/i)).toBeInTheDocument();
  fireEvent.click(getByText(/reload the game/i));
  expect(getByText(/circle turns/i)).toBeInTheDocument();
});
