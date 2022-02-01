import React, { Component } from 'react';
import AddMealName from './AddMealName.jsx'

class AddMealDetails extends Component{

    constructor(){
        super()
    }

    createMealArray(){

    }

    render(){
        let foodName = React.createRef();
        let ingredientsDisplay = [];
        for (let i = 0; i < this.props.ingredientList.length; i++){
            ingredientsDisplay.push(<div className='ingredientListText' key={i}>{this.props.ingredientList[i]}</div>)

        }

/*
{
    this.props.displayMealNamePopup ? <AddMealName /> : null
}
*/
        return(
            
            <div className='addMealWrapper'>
                {
                    this.props.displayMealNamePopup ? <AddMealName mealNamePopup={this.props.mealNamePopup} addMeal={this.props.addMeal}/> : null
                }
                <div className='transparentBg'></div>
                <div className='addMealDetails'>
                <button onClick={()=>this.props.addMealDetails()} className='closeDetails'>X</button>
                <div className='addMealDetailsWrapper'>
                    <div className='addMealTextLarge'>Create a meal below:</div>
                    <div className='addMealTextList'>Add ingredients one at a time. After adding all your ingredients, click submit.</div>
                    <div className='ingredientList'>{ingredientsDisplay}</div>
                    <form onSubmit={(event) => this.props.addIngredient(foodName, event)} autoComplete='off' className='addMealForm'>
                        <div><input ref={foodName} placeholder='Add your meal ingredient here' className='addMealInput'></input><button type='submit' value='Log In' className='submitMealButton'>Add Ingredient</button></div>
                        <div className='whiteSpace'></div>
                    </form>
                    <div className='addMealText'>When you are done: <button value='Log In' className='submitMealButton' onClick={()=>this.props.mealNamePopup()}>Submit Meal</button></div>
                </div>
            </div>
    </div>
        )
    }
}

export default AddMealDetails;