'use strict';

/**
 * @format
 * @flow
 */

import reducer, {initialState} from '../../../reducers/legal';
import * as actions from './actions';

describe('get terms reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toStrictEqual(initialState);
  });

  it('should handle GET_TERMS_REQUEST', () => {
    const refreshingTerms: boolean = true;

    expect(reducer(initialState, actions.getTermsRequest(!refreshingTerms)))
      .toStrictEqual({...initialState, terms: {...initialState.terms, fetchingTerms: true}});

    expect(reducer(initialState, actions.getTermsRequest(refreshingTerms)))
      .toStrictEqual(
        {
          ...initialState,
          terms: {...initialState.terms, refreshingTerms, fetchingTerms: true},
        },
      );

    expect(
      reducer(
        {...initialState, terms: {...initialState.terms, error: new Error('error')}},
        actions.getTermsRequest(!refreshingTerms),
      ),
    )
      .toStrictEqual({...initialState, terms: {...initialState.terms, fetchingTerms: true}});

    expect(
      reducer(
        {...initialState, terms: {...initialState.terms, error: new Error('error')}},
        actions.getTermsRequest(refreshingTerms),
      ),
    )
      .toStrictEqual(
        {
          ...initialState,
          terms: {...initialState.terms, refreshingTerms, fetchingTerms: true},
        },
      );
  });

  it('should handle GET_TERMS_SUCCESS', () => {
    const text: string = 'foo';

    expect(
      reducer(
        {...initialState, terms: {...initialState.terms, refreshingTerms: true, fetchingTerms: true}},
        actions.getTermsSuccess(text),
      ),
    )
      .toStrictEqual({...initialState, terms: {...initialState.terms, text}});
  });

  it('should handle GET_TERMS_FAILURE', () => {
    const error: Error = new Error('error');

    expect(
      reducer(
        {...initialState, terms: {...initialState.terms, refreshingTerms: true, fetchingTerms: true}},
        actions.getTermsFailure(error),
      ),
    )
      .toStrictEqual({...initialState, terms: {...initialState.terms, error}});
  });
});