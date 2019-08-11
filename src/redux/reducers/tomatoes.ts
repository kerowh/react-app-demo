import {ADD_TOMATO} from '../actionTypes'

export default (state:any[]=[],action:any)=>{
   switch (action.type) {
       case ADD_TOMATO:
           return  [...state,action.payload];
       default:
           return state
   }
}
