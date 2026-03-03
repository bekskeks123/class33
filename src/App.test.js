import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ products: [] }),
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test('renders catalog heading', async () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { level: 1 });
  expect(headingElement).toBeInTheDocument();

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});