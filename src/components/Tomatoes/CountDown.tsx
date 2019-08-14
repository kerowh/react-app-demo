import * as React from 'react';

import './CountDown.scss'

interface ICountDown {
    timer:number;
    duration:number;
    onFinish:()=>void
}

interface ICountDownState {
    countDown: number;
}


let timerId :NodeJS.Timeout

class CountDown extends React.Component<ICountDown,ICountDownState>{
    constructor(props){
        super(props)
        this.state={
            countDown:this.props.timer
        }
    }

    get countDown(){
        const min = Math.floor(this.state.countDown/1000/60)
        const second = Math.floor(this.state.countDown/1000%60)
        return`${min<10 ? `0${min}`:min}:${second<10?`0${second}`:second}`
    }

    componentDidMount(): void {
        timerId = setInterval(()=>{
            document.title = `${this.countDown}-番茄APP`
            const time = this.state.countDown
            this.setState({countDown:time-1000})
            if (time< 1000){
                // 告诉父组件完成倒计时
                document.title = "番茄APP"
                this.props.onFinish()
                clearInterval(timerId)
            }
        },1000)
    }

    componentWillUnmount(): void {
        clearInterval(timerId)
    }

    public render() {
        const percent = 1-this.state.countDown/this.props.duration
        // 制作进度条的百分比
        return (
            <div className="CountDown" id="CountDown">
                <span className="restTime">{this.countDown}</span>
                <div className="progress" style={{width:`${percent*100}%`}} />
            </div>
        );
    }
}

export default CountDown;
