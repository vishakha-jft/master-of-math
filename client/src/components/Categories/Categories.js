import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Subcat from "./Subcat";


class Categories extends Component{
    
    constructor(props){
        super(props);
        var level;
        //console.log(this.props.level);
        if(this.props.level === 'level1') level = ["Piece of cake 🍰", "Addition", "Subtraction","Multiplication", "Division", "Modulos","Surprise"]
        else if(this.props.level === 'level2') level = ["Grapes 🍇", "AddSub", "AddMul","AddDiv", "AddMod", "GameOfKids", "Surprise"]
        else if(this.props.level === 'level3') level = ["Banana 🍌", "MulSub", "DivSub","SubDivMul", "Brackets", "IAmImpossible", "Surprise"]
        else if(this.props.level === 'level4') level = ["Apple 🍎", "AddDivSub", "MulDivSub","SubDivMul", "Dare you", "You don't know maths", "Surprise"]
        else if(this.props.level === 'level5') level = ["Watermelon 🍉", "BODMAS", "Linear Eqns","Quadratic Eqn", "Find the root", "Solving Bad", "Surprise"]
        else if(this.props.level === 'level6') level = ["Coconuts 🥥", "Percentage", "Profit and loss","Geometry", "Simple Interest", "Solve me if you can", "Surprise"]
        this.getArr = {
            level : level
        }
    }

    render(){
        const {level} = this.getArr;
        if(this.props.level==null) return <Redirect to='/dashboard'/>
        return(
            <div className="container">
                <h2 className="yourScore">{level[0]}</h2>
                <div className="row">
                    <Subcat name={level[1]} />
                    <Subcat name={level[2]} />
                    <Subcat name={level[3]} />
                </div>
                <div className="row">
                    <Subcat name={level[4]} />
                    <Subcat name={level[5]} />
                    <Subcat name={level[6]} />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    const {level} = state;
    return {level}
}

export default connect(
    mapStateToProps
)(Categories)