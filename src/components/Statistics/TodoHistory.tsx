import * as React from 'react';
import {connect} from 'react-redux'
import {format} from "date-fns";


import _ from 'lodash'



interface ITodoHistoryProps {
    todos: any[];
}

const TodoItem = (props)=>{
    return(
        <div>
            <span>{props.updated_at}</span>
            <span>{props.description}</span>
        </div>

    )
}

class TodoHistory extends React.Component<ITodoHistoryProps> {

    // 我们需要已完成的任务 和 以删除的任务
    // 样式与tomato的差不多
    // 把它放在一个tabs组件中


    // 获取符条件的所有的todos
    get finishedTodos(){
        return this.props.todos.filter(t => t.completed && !t.deleted)
    }

    get deletedTodos(){
        return this.props.todos.filter(t => t.deleted)
    }

    // 把这些todos按时间分组，并从小到大进行排序
    get dailyFinishedTodos(){
        return _.groupBy(this.finishedTodos,(todo)=>{
            return format(todo.updated_at,'YYYY-MM-D')
        })
    }
    get finishedDates(){
        return Object.keys(this.dailyFinishedTodos).sort((a,b)=>Date.parse(b)-Date.parse(a))
    }

    get dates (){
        // 这是个什么？？？？
        // return 回来的是这个finished的也就是日期！！！！！

        // 这是个数组有复数个对象，对象的key是todo完成的时间，value是对象的名称
        // 例：["2019-08-11","2019-08-14"]
        // 2019-08-11 是{
        //  0：id ：111 descript：asda
        //  1：id ：111 descript：asda
        // }
        return Object.keys(this.finishedDates)
    }


    constructor(props){
        super(props)
    }

    public render() {
        const todoList = // 这里map应该是每个时间“2019-08-11”这种的
            this.dates.map(date=>{
                return(
                    <div key={date}>
                        <div>
                            {date}
                            完成了{this.dailyFinishedTodos[date].length}个任务
                        </div>
                        <div>
                            {
                                this.dailyFinishedTodos[date].map(todo =>
                                    <TodoItem key={todo.id}{...todo} />)
                            }
                        </div>

                    </div>

                )
            })
        return (
            <div className="TodoHistory" id="TodoHistory">
                {todoList}
            </div>
        );
    }
}





const mapStateToProps = (state, ownProps) => ({
    todos: state.todos,
    ...ownProps
})

export default connect(mapStateToProps)(TodoHistory);
