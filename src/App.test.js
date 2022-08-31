import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders My Notes', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Sedang menginisiasi.../i);
  expect(linkElement).toBeInTheDocument();
});

/*


TODO: update test

test('renders New Note Pages', () => {
  render(
    <MemoryRouter initialEntries={['/notes/new']}>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Add New Note/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Archived Pages', () => {
  render(
    <MemoryRouter initialEntries={['/notes/archived']}>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Arsip kosong/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders Home Page with keyword', () => {
  render(
    <MemoryRouter initialEntries={['/?keyword=babel']}>
      <App />
    </MemoryRouter>
  );
  const linkElements = screen.getAllByText(/Babel/i);
  expect(linkElements.length).not.toEqual(0);
  for (let linkElement of linkElements) {
    expect(linkElement).toBeInTheDocument();
  }
});

test('renders Archived Pages with keyword', () => {
  render(
    <MemoryRouter initialEntries={['/notes/archived?keyword=babel']}>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/Arsip kosong/i);
  expect(linkElement).toBeInTheDocument();
});
*/
