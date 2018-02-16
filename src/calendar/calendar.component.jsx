/**
 * Created by bogdan on 15.02.18.
 */
import React from 'react';

// sass
import './calendar.component.scss';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun', 'Sut'];

class Calendar extends React.Component {

    constructor() {
        super();

        this.state = {
            _choosen: {},
            _date: {}
        };

        this.state._date.now = new Date();
        this.state._date.month = this.state._date.now.getMonth(); //
        this.state._date.year = this.state._date.now.getFullYear();
        this.state._choosen.month = this.state._date.month;
        this.state._choosen.year = this.state._date.year;
        this.state._choosen.firstDay =  this.getFirstDay(this.state._choosen.month, this.state._choosen.year);
        console.log('choosen', this.state._choosen);

    }

    getDaysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    };

    getFirstDay(month, year) {
        return new Date(year, month, 1).getDay();
    };

    showNextMonth() {
        let state = this.state;
        state._choosen.month = (this.state._choosen.month + 1 > 11 ? 0 : this.state._choosen.month + 1);
        state._choosen.year = state._choosen.month === 0? state._choosen.year + 1: state._choosen.year;
        state._choosen.firstDay = this.getFirstDay(this.state._choosen.month, this.state._choosen.year);
        this.setState(state);
        console.log('choosen', this.state._choosen);

    };

    showPrevMonth() {
        let state = this.state;
        state._choosen.month = (this.state._choosen.month - 1 < 0 ? 11 : this.state._choosen.month - 1);
        state._choosen.year = state._choosen.month === 11? state._choosen.year - 1: state._choosen.year;
        state._choosen.firstDay = this.getFirstDay(this.state._choosen.month, this.state._choosen.year);
        this.setState(state);
        console.log('choosen', this.state._choosen);

    };

    getHeader() {
        return (
            <header className="calendar__header">
                <div className="calendar__switcher">
                    <button className="calendar__switcher-toggle"
                            onClick={() => this.showPrevMonth()}>Prev</button>
                    <span className="calendar__switcher-title">{this.state._choosen.month}</span>
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
        let prevMonth = this.state._choosen.month - 1 > -1 ? this.state._choosen.month - 1 : 11;
        let prevYear = prevMonth === 11?  this.state._choosen.year - 1 : this.state._choosen.year;
        let prevDays = this.getDaysInMonth(prevMonth, prevYear);
        console.log('prevDays', prevDays);
        let prevDaysVisible = 7 - this.state._choosen.firstDay;

        return new Array(prevDaysVisible).fill().map((item, index) => {
            prevDaysVisible--;
            return <div className="calendar__day">
                <span className="calendar__date">{prevDays - prevDaysVisible - 2}</span>
            </div>;
        });
    }

    getDays() {
        console.log(this.state._choosen.month, this.state._choosen.year);
        let daysInMonth = this.getDaysInMonth(this.state._choosen.month, this.state._choosen.year);
        console.log('daysInMonth', daysInMonth);
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
        return (<div className="calendar">
            {this.getHeader()}
            <main className="calendar__table">
                {this.getWeekDays()}
                {this.getDays()}
            </main>
        </div>);
    };

}

export default Calendar;
