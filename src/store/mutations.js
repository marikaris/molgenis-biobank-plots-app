// @flow
import type { State } from '../flow.types'

export const SET_BIOBANKS = '__SET_BIOBANKS__'
export const SET_FILTER_DATA = '__SET_FILTER_DATA__'
export const SET_REF_OPTIONS = '__SET_REF_OPTIONS__'

export default {
  [SET_BIOBANKS] (state: State, items: Array<Object>) {
    state.biobanks = items
  },
  [SET_FILTER_DATA] (state: State, filters: Array<Object>) {
    state.filters = filters
  },
  [SET_REF_OPTIONS] (state: State, info: Array<mixed>) {
    const options = info[0]
    const id = info[1]
    state.refOptions[id] = options
  }
}
