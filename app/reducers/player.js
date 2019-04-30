'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/player/types';

const lastUpdated: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');