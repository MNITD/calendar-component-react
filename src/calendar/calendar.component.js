/**
 * Created by bogdan on 15.02.18.
 */
import React from 'react';

// sass
import './calendar.component.scss';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun', 'Sut'];
const months  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

class Calendar extends React.Component {

    constructor() {
        super();

        let now = new Date();

        this.state = {
            firstDay:this.getFirstDay(now.getMonth(), now.getFullYear()), month:now.getMonth(), year:now.getFullYear()
        };

    }

    getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    };

    getFirstDay(month, year) {
        let day =  new Date(year, month, 1).getDay();
        return day === 0? 7: day;
    };

    updateChosen (month, year){
        let state = this.state, firstDay = this.getFirstDay(month, year);
        state = {month, year, firstDay};
        this.setState(state);
    }

    showNextMonth() {
        let month = (this.state.month + 1 > 11 ? 0 : this.state.month + 1);
        let year = this.state.month === 0? this.state.year + 1: this.state.year;
        this.updateChosen(month, year);
    };

    showPrevMonth() {
        let month =  (this.state.month - 1 < 0 ? 11 : this.state.month - 1);
        let year = this.state.month === 11? this.state.year - 1: this.state.year;
        this.updateChosen(month, year);
    };

    renderHeader() {
        return (
            <header className="calendar__header">
                <div className="calendar__switcher">
                    <button className="calendar__switcher-toggle"
                            onClick={() => this.showPrevMonth()}>Prev</button>
                    <span className="calendar__switcher-title">{months[this.state.month]}</span>
                    <button className="calendar__switcher-toggle"
                            onClick={() => this.showNextMonth()}>Next</button>
                </div>
            </header>);
    };

    renderWeekDays() {
        return (
            <header className="calendar__table-header">
                {weekdays.map(item => <div className="calendar__weekday">{item}</div>)}
            </header>
        );
    };

    getDays(){
        let prevMonth = this.state.month - 1 > -1 ? this.state.month - 1 : 11,
            prevYear = prevMonth === 11?  this.state.year - 1 : this.state.year,
            prevDaysNum = this.getDaysInMonth(prevMonth, prevYear),
            currentDaysNum = this.getDaysInMonth((new Date).getMonth(), (new Date).getFullYear()),
            prevDaysVisible = this.state.firstDay === 7? 7 :7 - this.state.firstDay,
            nextDaysVisible = 42 - prevDaysVisible - currentDaysNum;


        let prevDays =  new Array(prevDaysVisible).fill().map(() => {
            return {type: 'sibling', date: prevDaysNum - (--prevDaysVisible)}
        });

        let currentDays = new Array(currentDaysNum).fill().map((item, index)=>{
            return {type: 'current', date: index+1}
        });

        let nextDays = new Array(nextDaysVisible).fill().map((item, index)=>{
            return {type: 'sibling', date: index+1}
        });

        return prevDays.concat(currentDays).concat(nextDays);
    }
    getClassName(type){
        if(type==='current') return "calendar__day";
        return `calendar__day calendar__day--sibling`
    }


    renderDays() {
        return (
            <main className="calendar__table-main">

                {this.getDays().map((item, index) => <div className={this.getClassName(item.type)} key={index}>
                            <span className='calendar__date'>{item.date}</span>
                        </div>)
                }
            </main>
        );
    };

    render() {
        return (<div className="calendar calendar--center">
            {this.renderHeader()}
            <main className="calendar__table">
                {this.renderWeekDays()}
                {this.renderDays()}
            </main>
        </div>);
    };

}

export default Calendar;
