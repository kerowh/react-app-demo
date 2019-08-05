import * as React from 'react';
import {Button} from "antd";

interface IRouter {
    history:any
}

class Component extends React.Component<IRouter> {

    constructor(props){
        super(props)
    }


    public login = ()=>{
        // tslint:disable-next-line:no-console
        console.log(this.props);
        this.props.history.push("/login")
    }

    public render() {
        return (
            // tslint:disable-next-line:jsx-self-close
            <div className="Component">
                <Button onClick={this.login}>登陆</Button>
            </div>

        );
    }
}

export default Component;
