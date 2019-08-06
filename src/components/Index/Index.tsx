import * as React from 'react';
import {Button} from "antd";
import axios from 'src/config/axios'

interface IRouter {
    history:any
}

interface IIndexState {
    user:any
}

class Component extends React.Component<IRouter,IIndexState> {

    constructor(props){
        super(props)
        this.state={
            user:{}
        }
    }

    // 因为axios是一个异步函数，所以要用async
    async componentWillMount(){
        await this.getMe()
    }


    // 使用axios去调用服务器的'me'方法去获取用户信息
    // 信息是放在data中的
    getMe = async ()=>{
        const response = await axios.get('me');
        // 更新user的信息
        this.setState({user:response.data})
    }


    // 登出操作，把x-token置为空就可以使服务器获取不到用户的信息，
    // 这样会报一个401错误，我们可以在axios中处理一下
    public logout = ()=>{
        localStorage.setItem('x-token','')
        this.props.history.push('/login')
    }

    public render() {
        return (
            // tslint:disable-next-line:jsx-self-close
            <div className="Component">
                <p>欢迎，{this.state.user && this.state.user.account}</p>
                <Button onClick={this.logout}>登出</Button>
            </div>

        );
    }
}

export default Component;
