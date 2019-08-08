import * as React from 'react';
import TodoInput from 'src/components/Todos/TodoInput'
import axios from 'src/config/axios'
import './Todo.scss'

interface ITodosState {
    todos:any[]
}

class Todos extends React.Component<any,ITodosState> {
    constructor(props){
        super(props)
        this.state={
            todos:[]
        }
    }
    addTodo = async (params:any)=>{
        const {todos} = this.state
        try {
            const response = await axios.post('todos',params)
            console.log(response.data);
            this.setState({todos:[response.data.resource,...todos]})
        }catch (e) {
            throw new Error(e)
        }
    }

    componentDidMount(){
        this.getTodos()
    }

    getTodos =async ()=>{
        try {
            const response = await axios.get('todos')
            console.log(response);
            this.setState({todos:response.data.resources})
        }catch (e) {
            throw new Error(e)
        }
    }

    public render() {
        return (
            <div className="Todos" id="Todos">
                {/* tslint:disable-next-line:jsx-self-close */}
                <TodoInput addTodo={(params)=>this.addTodo(params)}></TodoInput>
                <main>
                    {
                        this.state.todos.map(t =>{
                            return <div key={t.id}>{t.description}</div>
                        })
                    }
                </main>
            </div>
        );
    }
}

export default Todos;
