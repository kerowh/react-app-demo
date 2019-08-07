import * as React from 'react';
import {Input,Icon} from "antd";


interface ITodoInputState {

    description: string;

}

// addtodo是props中的函数，要使用他最好定义一个接口
// interface ITodoInputProps {
//     addTodo: (prams:any) => any;
// }



class TodoInput extends React.Component<any,ITodoInputState> {
    constructor(props){
        super(props)
        this.state = {
            description: ''
        }
    }

    onKeyUp = (e)=>{
        if (e.keyCode === 13 && this.state.description !== ''){
            this.addTodo()
            this.setState({description:''})
        }
    }

    addTodo =()=>{
        this.props.addTodo({description:this.state.description})
    }

    public render() {
        const { description } = this.state;
        const suffix = description ? <Icon type="enter" onClick={this.addTodo}/> : <span/>;
        return (
            <div className="TodoInput" id="TodoInput">
                <Input
                    placeholder="添加新任务"
                    suffix={suffix}
                    value={description}
                    onChange={(e) => this.setState({description: e.target.value})}
                    onKeyUp={this.onKeyUp}
                />
            </div>
        );
    }
}

export default TodoInput;
