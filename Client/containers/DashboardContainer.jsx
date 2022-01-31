import React, { Component } from 'react';
import AddMeal from '../components/AddMeal.jsx'
import DailyGoals from '../components/DailyGoals.jsx'
import TodaysMeals from '../components/TodaysMeals.jsx'
import WeeklyGoals from '../components/WeeklyGoals.jsx'

class DashboardContainer extends Component{

    render(){
        return(
            <div className='centerDashboard'>
                <div className='dashboardContainer'>
                    <AddMeal />
                    <DailyGoals />
                    <TodaysMeals />
                    <WeeklyGoals />
                </div>
            </div>
        )
    }
}

export default DashboardContainer;