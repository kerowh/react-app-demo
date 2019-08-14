import * as React from 'react';

interface ICountDown {
    timer:number;
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


    componentDidMount(): void {
        timerId = setInterval(()=>{
            const time = this.state.countDown
            this.setState({countDown:time-1000})
            if (time<0){
                // 告诉父组件完成倒计时
                this.props.onFinish()
                clearInterval(timerId)
            }
        },1000)
    }

    componentWillUnmount(): void {
        clearInterval(timerId)
    }

    public render() {
        const min = Math.floor(this.state.countDown/1000/60)
        const second = Math.floor(this.state.countDown/1000%60)
        const time = `${min}:${second<10?`0${second}`:second}`
        return (
            <div className="Component">
                {time}
            </div>
        );
    }
}

export default CountDown;
