'use strict';

/**
 * @format
 * @flow
 */

import * as actions from '../ResetSessions';
import * as types from '../types';
import {type Action} from '../../../reducers/sessions';

describe('reset sessions action creator', () => {
  it('creates action to reset the redux sessions state object', () => {
    const expectedAction: Action = {type: types.RESET_SESSIONS};
    expect(actions.resetSessions()).toStrictEqual(expectedAction);
  });
});