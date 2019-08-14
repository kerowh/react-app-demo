import * as React from 'react';
import {Button,Input,Icon,Modal} from "antd";
import axios from 'src/config/axios'
import CountDown from './CountDown'

import './TomatoAction.scss'

interface ITomatoActionProps {
    startTomato:()=>void
    unfinishedTomato:any;
    updateTomato:(payload:any)=> void;
}

interface ITomatoActionState {
    description: string;
}

const confirm = Modal.confirm;

class TomatoAction extends React.Component<ITomatoActionProps,ITomatoActionState> {
    constructor(props){
        super(props)
        this.state={
            description:''
        }
    }

     onKeyUp = (e) => {
         if(e.keyCode === 13 && this.state.description !== ''){
             this.updateTomato({description: this.state.description,
                 ended_at: new Date()})
             this.setState({description: ''})
         }
     }

     onFinish = ()=>{
        // this.render()
         // 倒计时完成时，会提示用户添加描述信息
         // 此时timenow-startAt >dur ，所以会进入input界面
         // 这里重新运行render就会进入判断
         // 所以重新render
         // 但是这是个bug,
         // 应该用下面这个
         this.forceUpdate()
     }

    showConfirm = () =>{
        confirm({
            title: '您目前正在一个番茄工作时间中，要放弃这个番茄吗？',
            onOk: ()=>{
                this.abortTomato()
            },
            onCancel() {
                console.log('取消');
            },
            cancelText: '取消',
            okText: '确定',
        });
    }

     abortTomato=()=>{

         this.updateTomato({aborted: true})
         document.title = '饥人谷番茄APP';
         // this.updateTomato({aborted: true})
         // // 上一句就表示把aborted设为true，表示被删除了，只要在过滤器中配置，那么就拿不到了
         // document.title = '饥人谷番茄APP';
     }

     updateTomato =async (params:any)=>{
         try {
             const response = await axios.put(`tomatoes/${this.props.unfinishedTomato.id}`,params)
             this.props.updateTomato(response.data.resource)
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
                 html = <div className="inputWrapper">
                     <Input value={this.state.description}
                            placeholder="请输入你刚刚完成的任务"
                            onChange={e=> this.setState({description: e.target.value})}
                            onKeyUp={e => this.onKeyUp(e)}
                     />
                     <Icon type="close-circle" className="abort"
                           onClick={this.showConfirm}/>
                 </div>
             }else if(timeNow - startedAt < duration){
                 const timer = duration - timeNow + startedAt
                   html = (
                       <div className="countDownWrapper">
                           <CountDown timer={timer} onFinish={this.onFinish} duration={duration}/>
                           <Icon type="close-circle" className="abort"
                                 onClick={this.showConfirm}/>
                       </div>
                   )


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
