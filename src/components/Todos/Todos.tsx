import * as React from 'react';
import TodoInput from 'src/components/Todos/TodoInput'
import axios from 'src/config/axios'
import './Todo.scss'

class Todos extends React.Component {

    addTodo = async (params:any)=>{
        try {
            const response = await axios.post('todos',params)
            console.log(response.data);
        }catch (e) {
            throw new Error(e)
        }
    }

    public render() {
        return (
            <div className="Todos" id="Todos">
                {/* tslint:disable-next-line:jsx-self-close */}
                <TodoInput addTodo={(params)=>this.addTodo(params)}></TodoInput>
            </div>
        );
    }
}

export default Todos;
