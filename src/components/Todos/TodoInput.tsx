import * as React from 'react';
import {Input,Tooltip,Icon} from "antd";




class TodoInput extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            description: ''
        }
    }
    public render() {
        return (
            <div className="TodoInput" id="TodoInput">
                <Input
                    placeholder="Enter your username"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    suffix={
                        <Tooltip title="Extra information">
                            <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                        </Tooltip>
                    }
                />,

                />
            </div>
        );
    }
}

export default TodoInput;
