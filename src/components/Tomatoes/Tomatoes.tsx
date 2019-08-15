import * as React from 'react';
import axios from "../../config/axios";
import {addTomato,initTomatoes,updateTomato} from "../../redux/actions/tomatoes";
import TomatoAction from './TomatoAction'
import TomatoList from './TomatoList'
import _ from 'lodash'
import {format}from 'date-fns'
import {connect}from 'react-redux'
import  './Tomatoes.scss'

interface ITomatoerProps {
    addTomato:(payload:any)=> any;
    initTomatoes:(payload:any[])=>any;
    updateTomato:(payload:any)=> any;
    tomatoes:any[];

}

class Tomatoes extends React.Component<ITomatoerProps>{
    constructor(props){
        super(props)
        console.log(props);
    }

    componentDidMount(): void {
        this.getTomatoes()
        console.log('tomato');
        console.log(this.props.tomatoes);
    }

    getTomatoes = async ()=>{
        try {
            const response = await axios.get('tomatoes')
            this.props.initTomatoes(response.data.resources)
        }catch (e) {
            throw new Error(e)
        }
    }

    startTomato = async ()=>{
        try {
            const response = await axios.post('tomatoes',{duration:1500000})
            this.props.addTomato(response.data.resource)
        }catch (e) {
            throw new Error(e)
        }
    }



    get unfinishedTomato(){
        return this.props.tomatoes.filter(t => !t.description && !t.ended_at &&!t.aborted)[0]
    }

    // 计算属性
    get finishedTomatoes(){
        // 获取所有完成的番茄
       const finishTomatoes = this.props.tomatoes.filter(t => t.description && t.ended_at &&!t.aborted)
        // 按照时间分组
        const obj = _.groupBy(finishTomatoes,(tomato)=>{
            return format(tomato.started_at,'YYYY-MM-D')
        })
        return obj
    }

    public render() {
        return (
            <div className="Tomatoes" id="Tomatoes">
                <TomatoAction startTomato={this.startTomato} unfinishedTomato={this.unfinishedTomato}
                updateTomato={this.props.updateTomato}/>
                <TomatoList finishedTomatoes={this.finishedTomatoes}/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    tomatoes: state.tomatoes,
    ...ownProps
})

const mapDispatchToProps = {
   addTomato,
   initTomatoes,
   updateTomato
}

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes);
