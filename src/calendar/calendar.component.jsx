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

        this.state = {
            _chosen: {},
            _date: {}
        };

        this.state._date.now = new Date();
        this.state._date.month = this.state._date.now.getMonth(); //
        this.state._date.year = this.state._date.now.getFullYear();
        this.state._chosen.month = this.state._date.month;
        this.state._chosen.year = this.state._date.year;
        this.state._chosen.firstDay =  this.getFirstDay(this.state._chosen.month, this.state._chosen.year);
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
        state._chosen = {month, year, firstDay};
        this.setState(state);
    }

    showNextMonth() {
        let month = (this.state._chosen.month + 1 > 11 ? 0 : this.state._chosen.month + 1);
        let year = state._chosen.month === 0? state._chosen.year + 1: state._chosen.year;
        this.updateChosen(month, year);
    };

    showPrevMonth() {
        let month =  (this.state._chosen.month - 1 < 0 ? 11 : this.state._chosen.month - 1);
        let year = state._chosen.month === 11? state._chosen.year - 1: state._chosen.year;
        this.updateChosen(month, year);
    };

    getHeader() {
        return (
            <header className="calendar__header">
                <div className="calendar__switcher">
                    <button className="calendar__switcher-toggle"
                            onClick={() => this.showPrevMonth()}>Prev</button>
                    <span className="calendar__switcher-title">{months[this.state._chosen.month]}</span>
                    <button className="calendar__switcher-toggle"
                            onClick={() => this.showNextMonth()}>Next</button>
                </div>
            </header>);
    };

    getWeekDays() {
        return (
            <header className="calendar__table-header">
                {weekdays.map(item => {
                    return <div className="calendar__weekday">{item}</div>
                })}
            </header>
        );
    };

    getPrevDays(){
        let prevMonth = this.state._chosen.month - 1 > -1 ? this.state._chosen.month - 1 : 11,
            prevYear = prevMonth === 11?  this.state._chosen.year - 1 : this.state._chosen.year,
            prevDays = this.getDaysInMonth(prevMonth, prevYear),
            prevDaysVisible = 7 - this.state._chosen.firstDay;

        return new Array(prevDaysVisible).fill().map((item, index) => {
            prevDaysVisible--;
            return <div className="calendar__day calendar__day--prev">
                <span className="calendar__date">{prevDays - prevDaysVisible}</span>
            </div>;
        });
    }

    getDays() {
        let daysInMonth = this.getDaysInMonth(this.state._chosen.month, this.state._chosen.year);
        return (
            <main className="calendar__table-main">
                {this.getPrevDays()}
                {new Array(daysInMonth).fill()
                    .map((item, index) => {
                        return <div className="calendar__day">
                            <span className="calendar__date">{index + 1}</span>
                        </div>
                    })
                }
            </main>
        );
    };

    render() {
        return (<div className="calendar calendar--center">
            {this.getHeader()}
            <main className="calendar__table">
                {this.getWeekDays()}
                {this.getDays()}
            </main>
        </div>);
    };

}

export default Calendar;
