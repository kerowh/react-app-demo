import * as React from 'react';
import {addTomato} from "../../redux/actions";
import TomatoAction from './TomatoAction'
import {connect}from 'react-redux'
import  './Tomatoes.scss'
class Tomatoes extends React.Component {
    public render() {
        return (
            <div className="Tomatoes" id="Tomatoes">
                <TomatoAction />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    tomatoes: state.tomatoes,
    ...ownProps
})

const mapDispatchToProps = {
   addTomato
}

export default connect(mapStateToProps,mapDispatchToProps)(Tomatoes);
