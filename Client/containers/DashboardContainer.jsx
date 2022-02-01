import React, { Component } from 'react';
import AddMeal from '../components/AddMeal.jsx'
import DailyGoals from '../components/DailyGoals.jsx'
import TodaysMeals from '../components/TodaysMeals.jsx'
import WeeklyGoals from '../components/WeeklyGoals.jsx'

class DashboardContainer extends Component{

    render(){
        console.log(this.props.username)
        return(
            <div className='centerDashboard'>
                <div className='dashboardContainer'>
                    <AddMeal 
                        username={this.props.username}
                        addMealDetails={this.props.addMealDetails}
                        displayAddMealDetails={this.props.displayAddMealDetails}
                        mealNamePopup={this.props.mealNamePopup}
                        displayMealNamePopup={this.props.displayMealNamePopup}
                        addIngredient={this.props.addIngredient}
                        ingredientList={this.props.ingredientList}
                        addMeal={this.props.addMeal}
                    />
                    <DailyGoals />
                    <TodaysMeals 
                        userId={this.props.userId}
                        getMealData={this.props.getMealData}
                        mealArray={this.props.mealArray}
                    />
                    <WeeklyGoals />
                </div>
            </div>
        )
    }
}

export default DashboardContainer;