const { validateImdbId } = require('../lib/omdb');

describe('validateImdbId', () => {
  
  test('accepts standard 7-digit IMDb ID', () => {
    expect(validateImdbId('tt0133093')).toBe(true);
  });
  test('accepts 8-digit IMDb ID', () => {
    expect(validateImdbId('tt12345678')).toBe(true);
  });
  test('trims whitespace before validating', () => {
    expect(validateImdbId('  tt0133093  ')).toBe(true);
  });

  
  test('rejects missing tt prefix', () => {
    expect(validateImdbId('0133093')).toBe(false);
  });
  test('rejects fewer than 7 digits', () => {
    expect(validateImdbId('tt012345')).toBe(false);
  });
  test('rejects letters in numeric part', () => {
    expect(validateImdbId('tt01330ab')).toBe(false);
  });
  test('rejects empty string', () => {
    expect(validateImdbId('')).toBe(false);
  });
  test('rejects random movie name string', () => {
    expect(validateImdbId('the-matrix')).toBe(false);
  });
  test('rejects uppercase TT prefix', () => {
    expect(validateImdbId('TT0133093')).toBe(false);
  });
});
