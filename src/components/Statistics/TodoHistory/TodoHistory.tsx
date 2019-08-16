import * as React from 'react';
import {connect} from 'react-redux'
import TodoHistoryTodoItem from 'src/components/Statistics/TodoHistory/TodoHistoryTodoItem'
import {format} from "date-fns";
import {Tabs} from "antd";
import _ from 'lodash'
import './TodoHistory.scss'


const { TabPane } = Tabs;

interface ITodoHistoryProps {
    todos: any[];
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
    // 2019-08-11: Array(5)
    // 0: {id: 5230, user_id: 4459, completed: true, completed_at: null, deleted: false, …}
    // 1: {id: 5229, user_id: 4459, completed: true, completed_at: null, deleted: false, …}
    // 2: {id: 5224, user_id: 4459, completed: true, completed_at: null, deleted: false, …}
    // 3: {id: 5216, user_id: 4459, completed: true, completed_at: null, deleted: false, …}
    // 4: {id: 5148, user_id: 4459, completed: true, completed_at: null, deleted: false, …}
    // length: 5
    // __proto__: Array(0)
    // 2019-08-15: Array(1)
    // 0: {id: 5253, user_id: 4459, completed: true, completed_at: null, deleted: false, …}
    get dailyFinishedTodos(){
        return _.groupBy(this.finishedTodos,(todo)=>{
            return format(todo.updated_at,'YYYY-MM-D')
        })
    }

    get dailyDeletedTodos(){
        return _.groupBy(this.deletedTodos,(todo)=>{
            return format(todo.updated_at,'YYYY-MM-D')
        })
    }

    get finishedDates(){
        // 对时间进行了排序
        // ["2019-08-15", "2019-08-11"]
        // 0: "2019-08-15"
        // 1: "2019-08-11"
        // length: 2
        return Object.keys(this.dailyFinishedTodos).sort((a,b)=>Date.parse(b)-Date.parse(a))
    }

    get deletedDates(){
        return Object.keys(this.dailyDeletedTodos).sort((a,b)=>Date.parse(b)-Date.parse(a))
    }

    get FinishedDates (){
        // 拿到他的value值，dates
        //  ["2019-08-15", "2019-08-11"]
        // 0: "2019-08-15"
        // 1: "2019-08-11"
        // 那不如直接return this.finishedDates
        // return Object.values(this.finishedDates)
        return this.finishedDates
    }

    get DeletedDates (){
        return this.deletedDates
    }


    constructor(props){
        super(props)
    }

    public render() {
        // console.log(1);
        // console.log(this.dailyFinishedTodos);
        // console.log(2);
        // console.log(this.finishedDates);
        // console.log(3);
        // console.log(this.dates);
        const FinishedtodoList = // 这里map应该是每个时间“2019-08-11”这种的
            this.FinishedDates.map(date=>{
                return(
                    <div key={date} className="dailyTodos">
                        <div className="summary">
                            <p className="date">
                                <span>{date}</span>
                                <span>周五</span>
                            </p>
                            <p className="finishedCount">
                                完成了{this.dailyFinishedTodos[date].length}个任务
                            </p>
                        </div>
                        <div className="todoList">
                            {
                                this.dailyFinishedTodos[date].map(todo =>
                                    <TodoHistoryTodoItem key={todo.id} todo={todo} itemType="finished"/>)
                            }
                        </div>
                    </div>
                )
            })


        const DeletedtodoList = this.deletedTodos.map(todo=>{
            return (
                <TodoHistoryTodoItem key={todo.id} todo={todo} itemType="deleted"/>
            )
        })



        return (
            <Tabs defaultActiveKey="1">
                <TabPane tab="已完成任务" key="1">
                    <div className="TodoHistory" id="TodoHistory">
                        {FinishedtodoList}
                    </div>
                </TabPane>
                <TabPane tab="已删除的任务" key="2">
                    <div className="TodoHistory" id="TodoHistory">
                        {DeletedtodoList}
                    </div>
                </TabPane>
            </Tabs>
        );
    }
}



const mapStateToProps = (state, ownProps) => ({
    todos: state.todos,
    ...ownProps
})

export default connect(mapStateToProps)(TodoHistory);
