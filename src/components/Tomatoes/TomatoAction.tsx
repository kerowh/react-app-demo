import * as React from 'react';
import {Button,Input} from "antd";
import axios from 'src/config/axios'
// import CountDown from './CountDown'
import CountDown from './CountDownHook'

interface ITomatoActionProps {
    startTomato:()=>void
    unfinishedTomato:any;
    updateTomato:(payload:any)=> void;
}

interface ITomatoActionState {
    description: string;
}

class TomatoAction extends React.Component<ITomatoActionProps,ITomatoActionState> {
    constructor(props){
        super(props)
        this.state={
            description:''
        }
    }

     onKeyUp = (e) => {
         if(e.keyCode === 13 && this.state.description !== ''){
             this.addDescription()
         }
     }

     onFinish = ()=>{
        this.render()
         // 倒计时完成时，会提示用户添加描述信息
         // 此时timenow-startAt >dur ，所以会进入input界面
         // 这里重新运行render就会进入判断
         // 所以重新render
     }

     addDescription = async ()=>{
         try {
             const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,{
                 description: this.state.description,
                 ended_at: new Date()
             })
             this.props.updateTomato(response.data.resource)
             this.setState({description: ''})
         }catch (e) {
             throw new Error(e)
         }
     }

    public render() {
         let html = <div/>
         if(this.props.unfinishedTomato === undefined){
            html = <Button className="startTomatoButton" onClick={()=>{this.props.startTomato()}}>开始番茄</Button>
         } else{
             const startedAt = Date.parse(this.props.unfinishedTomato.started_at)
             const duration = this.props.unfinishedTomato.duration
             const timeNow = new Date().getTime()
             if(timeNow - startedAt > duration){
                 html = <div>
                     <Input value={this.state.description}
                            placeholder="请输入你刚刚完成的任务"
                            onChange={e=> this.setState({description: e.target.value})}
                            onKeyUp={e => this.onKeyUp(e)}
                     />
                 </div>
             }else if(timeNow - startedAt < duration){
                 const timer = duration - timeNow + startedAt
                   html = <CountDown timer={timer}
                   onFinish={this.onFinish}/> // 倒计时
                   // timer={timer} onFinish={this.onFinish}
             }
         }
        return (
            <div className="TomatoAction" id="TomatoAction">
                {html}
            </div>
        );
    }
}

export default TomatoAction;
