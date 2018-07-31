import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_GET_ABOUT_BEGIN,
  HOME_GET_ABOUT_SUCCESS,
  HOME_GET_ABOUT_FAILURE,
  HOME_GET_ABOUT_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  getAbout,
  dismissGetAboutError,
  reducer,
} from '../../../../src/features/home/redux/getAbout';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/getAbout', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getAbout succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getAbout())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_ABOUT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_ABOUT_SUCCESS);
      });
  });

  it('dispatches failure action when getAbout fails', () => {
    const store = mockStore({});

    return store.dispatch(getAbout({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_GET_ABOUT_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_GET_ABOUT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetAboutError', () => {
    const expectedAction = {
      type: HOME_GET_ABOUT_DISMISS_ERROR,
    };
    expect(dismissGetAboutError()).toEqual(expectedAction);
  });

  it('handles action type HOME_GET_ABOUT_BEGIN correctly', () => {
    const prevState = { getAboutPending: false };
    const state = reducer(
      prevState,
      { type: HOME_GET_ABOUT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAboutPending).toBe(true);
  });

  it('handles action type HOME_GET_ABOUT_SUCCESS correctly', () => {
    const prevState = { getAboutPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_ABOUT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAboutPending).toBe(false);
  });

  it('handles action type HOME_GET_ABOUT_FAILURE correctly', () => {
    const prevState = { getAboutPending: true };
    const state = reducer(
      prevState,
      { type: HOME_GET_ABOUT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAboutPending).toBe(false);
    expect(state.getAboutError).toEqual(expect.anything());
  });

  it('handles action type HOME_GET_ABOUT_DISMISS_ERROR correctly', () => {
    const prevState = { getAboutError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_GET_ABOUT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getAboutError).toBe(null);
  });
});

