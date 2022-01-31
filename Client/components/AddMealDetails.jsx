import React, { Component } from 'react';

class AddMealDetails extends Component{

    constructor(){
        super()
    }

    createMealArray(){

    }

    render(){
        let foodName = React.createRef();

        let ingredientList = [<div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>,
        <div className='ingredientListText'>Test</div>
    ]

        return(
            <div className='addMealWrapper'>
                <div className='transparentBg'></div>
                <div className='addMealDetails'>
                <button onClick={()=>this.props.addMealDetails()} className='closeDetails'>X</button>
                <div className='addMealDetailsWrapper'>
                    <div className='addMealTextLarge'>Create a meal below:</div>
                    <div className='addMealTextList'>Add ingredients one at a time. After adding all your ingredients, click submit.</div>
                    <div className='ingredientList'>{ingredientList}</div>
                    <form onSubmit={console.log('submit the form')} autoComplete='off' className='addMealForm'>
                        <div><input ref={foodName} placeholder='Add your meal ingredient here' className='addMealInput'></input><button type='submit' value='Log In' className='submitMealButton'>Add Ingredient</button></div>
                        <div className='whiteSpace'></div>
                    </form>
                    <div className='addMealText'>When you are done: <button type='submit' value='Log In' className='submitMealButton'>Submit Meal</button></div>
                </div>
            </div>
    </div>
        )
    }
}

export default AddMealDetails;