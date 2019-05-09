'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from './actions';

describe('change theme color reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle CHANGE_THEME_COLOR_REQUEST', () => {
    expect(reducer(initialState, actions.changeThemeColorRequest()))
      .toStrictEqual({...initialState, saving: ['theme']});

    expect(
      reducer(
        {...initialState, failed: ['theme']},
        actions.changeThemeColorRequest(),
      ),
    )
      .toStrictEqual({...initialState, saving: ['theme']});
  });

  it('should handle CHANGE_THEME_COLOR_SUCCESS', () => {
    const theme: string = 'foo';

    expect(
      reducer(
        {...initialState, saving: ['theme']},
        actions.changeThemeColorSuccess(theme),
      ),
    )
      .toStrictEqual({...initialState, theme});
  });

  it('should handle CHANGE_THEME_COLOR_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, saving: ['theme']},
        actions.changeThemeColorFailure(error),
      ),
    )
      .toStrictEqual({...initialState, error, failed: ['theme']});
  });
});