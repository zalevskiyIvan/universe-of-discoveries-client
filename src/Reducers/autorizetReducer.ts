import Password from "antd/lib/input/Password"
import API from "../DAL/API"
import { ActionTypes } from "../store"

const initialState = {
    isAdmin: false,
    displayer: false
}
type stateType = typeof initialState

const autorizetReducer = (state = initialState, action:actionType):stateType => {
    switch(action.type){
        case 'SET_IS_ADMIN':
            return{
                ...state, isAdmin:true, displayer: true
            }
        default: return state
    }
}
type actionType = ActionTypes<typeof actions>
export const actions = {
    setIsAdmin: () => ({type:'SET_IS_ADMIN'} as const)
}

export const getTokenT = () => {
  return (dispatch: any) => {
      API.auth().then((res) => {
        dispatch(actions.setIsAdmin)
        localStorage.auth = res.data.token
    })
    }
}

export default autorizetReducer