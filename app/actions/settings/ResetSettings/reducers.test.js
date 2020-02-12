'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/settings';
import * as actions from '../ResetSettings';

describe('reset settings reducer', () => {
  it('should handle RESET_SETTINGS', () => {
    expect(
      reducer(
        {
          ...initialState,
          theme: 'light',
          isFetching: true,
        },
        actions.resetSettings()
      )
    )
      .toStrictEqual(initialState);
  });
});