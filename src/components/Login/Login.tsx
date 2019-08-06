import * as React from 'react';
import { Input, Icon, Button } from 'antd';
import {Link} from 'react-router-dom';
import axios from 'src/config/axios'

import './Login.scss'

interface ILoginState {
    account: string,
    password: string,

}

class SignUp extends React.Component<any,ILoginState> {
    constructor(props){
        super(props)
        this.state = {
            account: '',
            password: '',
        }
    }

    onChangeAccount = (e) => {
        this.setState({ account: e.target.value });
    }

    onChangePassword = (e) => {
        this.setState({ password: e.target.value });
    }


    submit = async () => {
        const { account,password } = this.state;
        try{
            await axios.post('sign_in/user',{
                account, // account: account
                password,
            })
            // this.props.history.push('/')
            console.log('成功');
        }catch(e){
            throw new Error(e)
        }
    }

    public render() {
        const { account,password} = this.state;
        return (
            <div className="Login" id="Login">
                <h1>番茄闹钟登陆</h1>
                <Input
                    placeholder="请输入你的用户名"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    value={account}
                    onChange={this.onChangeAccount}
                />
                <Input.Password value={password} placeholder="请输入密码" onChange={this.onChangePassword}/>
                <Button type="primary" className="loginButton" onClick={this.submit}>登陆</Button>
                <p>如果你没有账号，请立即<Link to="/signUp">注册</Link></p>
            </div>
        );
    }
}

export default SignUp;
