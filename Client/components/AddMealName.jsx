import React, { Component } from 'react';

class AddMealName extends Component{

    render(){
        let mealName = React.createRef();

        return(
                <div className='addMealNameDetails'>
                <button onClick={()=>this.props.mealNamePopup()} className='closeDetails'>X</button>
                <div className='addMealNameDetailsWrapper'>
                <div className='addMealTextLarge'>What would you like to title this meal?</div>
                <div className='whiteSpace'></div>
                <div className='whiteSpace'></div>
                        <div><input ref={mealName} placeholder='Input your meal title' className='addMealInput'></input>
                        <button type='submit' value='Log In' className='submitMealButton' onClick={(event) => this.props.addMeal(mealName, event)}>Submit Meal</button></div>
                        <div className='whiteSpace'></div>
                </div>
            </div>
        )
    }
}

export default AddMealName;