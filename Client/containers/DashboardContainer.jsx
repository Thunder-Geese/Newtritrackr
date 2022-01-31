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
                    />
                    <DailyGoals />
                    <TodaysMeals />
                    <WeeklyGoals />
                </div>
            </div>
        )
    }
}

export default DashboardContainer;