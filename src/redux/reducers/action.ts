import {ADD_TODO} from "../actionTypes";

export const addtodo = (payload:any)=>{
    return {
        type :ADD_TODO,
        // tslint:disable-next-line:object-literal-sort-keys
        payload
    }
}
