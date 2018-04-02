import { fromJS, Map, Record } from 'immutable'
import { ActionType } from 'types'

interface InitialState {
  process: Map<any, any>
}

const initialState: InitialState = fromJS({
  process: {}
})

const MAIN_ACTION = 'MAIN_ACTION'

export const mainAction = (params: string): object => {
  return {
    params,
    type: MAIN_ACTION
  }
}

const main = (state = initialState, action = ActionType): any => {
  const { param, type } = action
  switch (type) {
    case MAIN_ACTION:
      return state
    default:
      return state
  }
}

export default main
