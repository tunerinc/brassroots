'use strict';

/**
 * @format
 * @flow
 */

import moment from 'moment';
import updateObject from '../utils/updateObject';
import * as types from '../actions/search/types';

const currentDate: string = moment().format('ddd, MMM D, YYYY, h:mm:ss a');