import loadingReducer, { setLoading } from '../../store/loadingSlice';

describe('loadingSlice', () => {
  it('should return the initial state', () => {
    expect(loadingReducer(undefined, { type: 'unknown' })).toEqual({
      isLoading: false,
    });
  });

  it('should handle setLoading', () => {
    const actual = loadingReducer({ isLoading: false }, setLoading(true));
    expect(actual.isLoading).toEqual(true);
  });

  it('should handle setLoading to false', () => {
    const actual = loadingReducer({ isLoading: true }, setLoading(false));
    expect(actual.isLoading).toEqual(false);
  });
});