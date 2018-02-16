/**
 * Created by bogdan on 15.02.18.
 */
import React from 'react';

// sass
import './calendar.component.scss';

class Calendar extends React.Component {

    constructor() {
        super();


        this.state = {
            _choosen: {},
            _date: {}
        };

        this.state._date.now = new Date();
        this.state._date.day = this.state._date.now.getDay(); // returns week day, where 0 - SUN
        this.state._date.month = this.state._date.now.getMonth(); //
        this.state._date.year = this.state._date.now.getYear();

        //
        this.state._choosen.month = this.state._date.month;
        this.state._choosen.year = this.state._date.year;
    }

    getDaysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    };

    getFirstDay(month, year) {
        return new Date(year, month, 1).getDay();
    };

    showNextMonth() {
        let state = this.state;
        state._choosen.month = (this.state._choosen.month + 1 > 11 ? 0 : this.state._choosen.month + 1) + 1;
        this.setState(state);
    };

    showPrevMonth() {
        let state = this.state;
        state._choosen.month = (this.state._choosen.month - 1 < 0 ? 11 : this.state._choosen.month - 1) - 1;
        this.setState(state);
    };


    getPrevDays(){
        let prevMonth = this.state._choosen.month - 1 > 0 ? this.state._choosen.month - 1 : 11;
        let prevYear = this.state._choosen.year - 1;
        let prevDays = this.getDaysInMonth(prevMonth, prevYear);
        let prevDaysVisible = 6 - this.state._choosen.firstDay;

        return new Array(prevDaysVisible).fill().map((item, index) => {
            prevDaysVisible--;
            return <div className="calendar__day">
                <span className="calendar__date">{prevDays - prevDaysVisible - 2}</span>
            </div>;
        });

    }

    renderHeader() {
        return (
            <header className="calendar__header">
                <div className="calendar__switcher">
                    <button className="calendar__switcher-toggle calendar__switcher-toggle-prev"
                            onClick={() => this.showPrevMonth()}>Next</button>
                    {/*<span className="calendar__switcher-title"></span>*/}
                    <button className="calendar__switcher-toggle calendar__switcher-toggle-next"
                            onClick={() => this.showNextMonth()}>Prev</button>
                </div>
            </header>);
    };

    renderWeekDays() {
        return (
            <header className="calendar__table-header">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sun', 'Sut'].map(item => {
                    return <div className="calendar__weekday">{item}</div>
                })}
            </header>
        );
    };

    renderDays() {
        return (
            <main className="calendar__table-main">
                {this.getPrevDays()}
                {new Array(this.getDaysInMonth(this.state._choosen.month, this.state._choosen.year)).fill()
                    .map((item, index) => {
                        return <div className="calendar__day">
                            <span className="calendar__date">{index + 1}</span>
                        </div>
                    })
                }
            </main>
        )
    };

    render() {
        return (<div className="calendar">
            {this.renderHeader()}
            <main className="calendar__table">
                {this.renderWeekDays()}
                {this.renderDays()}
            </main>
        </div>);
    };

    componentWillMount() {
        let state = this.state;
        state._choosen.firstDay = this.getFirstDay(this.state._choosen.month, this.state._choosen.year);
        this.setState(state);
    }
}

export default Calendar;
