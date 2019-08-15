import * as React from 'react';
import {format} from 'date-fns'

import './TomatoList.scss'

interface ITomatoListProps {
    finishedTomatoes: any
}

// 用于描述具体的番茄事件
// 几点-几点  名称

const TomatoItem = (props)=>{
    return (
        <div className="TomatoItem">
            <span className="timeRange">{format(props.started_at,'H:mm')} - {format(props.ended_at,'H:mm')}</span>
            <span className="description">{props.description}</span>
        </div>
    )
}

class TomatoList extends React.Component<ITomatoListProps> {
    constructor(props){
        super(props)
    }

    get dates(){

        // 对获取到的已完成番茄进行排序
        // 按照时间戳的大小从大到小进行排序，并且限定只显示最近3次的番茄splice（0，3）
        const dates = Object.keys(this.props.finishedTomatoes)
        return dates.sort((a,b)=>Date.parse(b) - Date.parse(a)).splice(0,3)
    }

    public render() {
        // 获取已完成番茄的键名
        // ["2019-8-11","2019-8-12"]等
        // const dates = Object.keys(this.props.finishedTomatoes)
        // console.log(dates);
        // d=0,1,2  d就是dates中的每一个值
        const list = this.dates.map(d=>{
            const tomatoes = this.props.finishedTomatoes[d]
            return (
                <div key={d} className="dailyTomatoes">
                    <div className="title">
                        <span className="dataTime">{format(d,'M月DD日')}</span>
                        <span className="finishedCount">完成了{tomatoes.length}个番茄</span>
                    </div>
                    {
                        // 遍历每日完成的番茄
                        // 这个是一个循环列表，把t中所有的东西当作props传过去
                        // 这样就能拿到开始和结束的时间了
                        tomatoes.map(t =><TomatoItem key={t.id}{...t}/>)
                    }
                </div>
            )
        })
        return (
            <div className="TomatoList" id="TomatoList">
                {list}
            </div>
        );
    }
}

export default TomatoList;
