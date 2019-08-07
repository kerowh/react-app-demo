import * as React from 'react';
import {Dropdown, Icon,Menu} from "antd";
import history from 'src/config/history';
import axios from 'src/config/axios'
import Todos from 'src/components/Todos/Todos'
import './index.scss'

interface IRouter {
    history:any
}

interface IIndexState {
    user:any
}

// 登出操作，把x-token置为空就可以使服务器获取不到用户的信息，
// 这样会报一个401错误，我们可以在axios中处理一下
const logout = ()=>{
    localStorage.setItem('x-token','')
    history.push('/login')
}

const menu = (
    <Menu>
        <Menu.Item key="1"><Icon type="user" />个人设置</Menu.Item>
        <Menu.Item key="2" onClick={logout}><Icon type="logout" />注销</Menu.Item>
    </Menu>
)


class Index extends React.Component<IRouter,IIndexState> {

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

    public render() {
        return (
            // tslint:disable-next-line:jsx-self-close
            <div className="Index" id="Index">
                <header>
                   <span className="logo">LOGO</span>
                    <Dropdown overlay={menu}>
                        <span>
                            {this.state.user && this.state.user.account}
                            <Icon type="down" style={{ marginLeft: 8}}/>
                        </span>
                    </Dropdown>
                </header>
                <main>
                    {/* tslint:disable-next-line:jsx-self-close */}
                    <Todos>
                    </Todos>
                </main>
            </div>

        );
    }
}

export default Index;
