import * as React from 'react';
import {Checkbox,Icon} from "antd";
import classNames from 'classnames';

import './TodoItem.scss'

interface ITodoItemProps {
    id: number;
    description: string;
    completed: boolean;
    editing:boolean
    update: (id: number, params: any)=> void;
    toEditing: (id: number)=> void;
}


interface ITodoItemState {
    editText:string
}

class TodoItem extends React.Component<ITodoItemProps,ITodoItemState> {
    constructor(props){
        super(props)
        this.state ={
            editText:this.props.description
        }
    }

    update = (params:any) => {
        this.props.update(this.props.id,params)
    }

    toEditing =()=>{
        this.props.toEditing(this.props.id)
    }

    onKeyUp = (e)=>{
        if (e.keyCode === 13 && this.state.editText !== ''){
            this.update({description: this.state.editText})
        }
    }

    public render() {
        const Editing =(
            <div className="editing">
                {/*这里使用state中的数据是因为，props传过来的是参数，*/}
                {/*state中才是你本身的，*/}
                {/*你只能修改你本身的参数，props中的你只能获取*/}
                <input type="text" value={this.state.editText}
                        onChange={e => this.setState({editText:e.target.value})}
                        onKeyUp={this.onKeyUp}
                />
                <div className="iconWrapper">
                    <Icon type="enter" />
                    <Icon type="delete" theme="filled"
                          onClick={e=> this.update({deleted:true})}
                    />
                </div>
            </div>
        )

        const Text = <span className="text" onDoubleClick={this.toEditing}>{this.props.description}</span>
        // 使用了这个组件就可以定义editing变化状态的scss
        const todoItemClass =classNames({
            TodoItem: true,
            editing: this.props.editing,
            // tslint:disable-next-line:object-literal-sort-keys
            completed: this.props.completed
        })
        return (
            <div className={todoItemClass} id="TodoItem">
                <Checkbox checked={this.props.completed}
                          onChange={e=> this.update({completed: e.target.checked})}
                />
                {this.props.editing?Editing:Text}
            </div>
        );
    }
}

export default TodoItem;
