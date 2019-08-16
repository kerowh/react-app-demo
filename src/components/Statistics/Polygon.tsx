import * as React from 'react';
interface IPolygonProps {
    data: any;
    totalFinishCount:any
}


class Polygon extends React.Component<IPolygonProps>{
    constructor(props) {
        super(props)
    }

    point =()=>{
        // props是个数组，key是日期，value是todo的数组
        // console.log(this.props);
        const dates = Object.keys(this.props.data).sort((a,b)=>{
            return Date.parse(a) - Date.parse(b)
        })

        const firstDay = dates[0]
        if (firstDay){
            // 这里有一个bug，lastday应该现在当天
            // const lastDay = dates[dates.length-1]
            // const range = Date.parse(lastDay) - Date.parse(firstDay)
            const range = new Date().getTime() - Date.parse(firstDay)
            let finishedCount = 0
            let finishedY
            const pointArr = dates.map(date =>{
               const x = ( Date.parse(date) - Date.parse(firstDay))/range * 240
               finishedCount += this.props.data[date].length
               const y = (1 - (finishedCount/this.props.totalFinishCount))* 60
                // 这里的y是倒过来的，越往下其实越大，最大的就是（0，0）
                finishedY = y
               return `${x},${y}`
            })
            return ['0,60',...pointArr,`240,${finishedY}`,'240,60'].join(' ')
        }else {
            return "0,60 240,60"
        }
    }

    public render() {
        return (
            <div className="Polygon" id="Polygon">
                <svg>
                    <polygon fill="rgba(215,78,78,0.1)" stroke="rgba(215,78,78,0.5)"
                             strokeWidth="1" points={this.point()}/>
                </svg>
            </div>
        );
    }
}

export default Polygon;
