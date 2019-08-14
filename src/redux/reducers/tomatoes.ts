import {ADD_TOMATO, INIT_TOMATO, UPDATE_TOMATO} from '../actionTypes'

export default (state:any[] = [], action) => {
    switch(action.type){
        case ADD_TOMATO:
            return [action.payload,...state];
        case UPDATE_TOMATO:
            return state.map(t=>{
                if(t.id === action.payload.id){
                    return action.payload
                }else{
                    return t
                }
            })
        case INIT_TOMATO:
            return [...action.payload]
        default:
            return state
    }
}


