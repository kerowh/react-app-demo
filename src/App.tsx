import React from "react";
import { Router as Router, Route } from "react-router-dom";
import history from './config/history'
import Index from "./components/Index/Index";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";

class App extends React.Component{
    public render(){
        return(
            <div>
                {/* tslint:disable-next-line:jsx-self-close */}
                <Router history={history}>
                    {/* tslint:disable-next-line:jsx-self-close */}
                    <Route exact={true} path="/" component={Index}></Route>
                    {/* tslint:disable-next-line:jsx-self-close */}
                    <Route path="/login" component={Login}></Route>
                    {/* tslint:disable-next-line:jsx-self-close */}
                    <Route path="/signUp" component={SignUp}></Route>
                </Router>
            </div>
        )
    }
}


export default App
