import moment from "moment/moment";

function CalendarFunc(props) {
    const { date } = props;

    const month = date.getMonth()
    const year = date.getFullYear()

    const beginingMonthDate = year + '-' + (month + 1) + '-1 01:00'                 // дата начала текущего месяца
    const prevMonthDate = year + '-' + month + '-1 01:00'                           // дата начала предыдущего месяца
    const nextMonthDate = year + '-' + (month + 2) + '-1 01:00'                     // дата начала следующего месяца


    const calendarNotes = []                                                        // массив элементов (дней) календаря

    let classTd = ''                                                                // класс элементов календаря

    const daysInMonth = function(date) {                                            // число дней в месяце
		return 33 - new Date(date.getFullYear(), date.getMonth(), 33).getDate();
	};

    const weekdayBeginingMonth = function(date) {                                   // число дня недели (день недели) с которого начинаеться месяц
        let weekdayCount = new Date(date).getDay()
        return weekdayCount === 0 ? weekdayCount = 6 : weekdayCount - 1
    }

    let daysPrevMonthCount = daysInMonth(new Date(prevMonthDate)) + 1               // счетчик дней предыдущего месяца

    Array.from({ length: weekdayBeginingMonth(beginingMonthDate) }).forEach(() => {                                         // добавление дней предыдущего месяца в массив элементов календаря
        classTd = 'ui-datepicker-other-month'
        calendarNotes.unshift(( <td className={classTd}>{daysPrevMonthCount -= 1}</td> ));
    })

    Array.from({ length: daysInMonth(date) }).forEach((item, index) => {                                                 // добавление дней текущего месяца в массив элементов каледнаря
        index === date.getDate() - 1 ? classTd = 'ui-datepicker-today' : classTd = ''
        calendarNotes.push(( <td className={classTd}>{index + 1}</td> ));
    });

    const daysNextMonth = weekdayBeginingMonth(nextMonthDate) === 0 ? 0 : 7 - weekdayBeginingMonth(nextMonthDate)           // количество дней следующего месяца попадпющих в календарь

    Array.from({ length: daysNextMonth }).forEach((item, index) => {                                                        // добавление дней следующего месяца в массив элементов календаря
        classTd = 'ui-datepicker-other-month'
        calendarNotes.push(( <td className={classTd}>{index + 1}</td> ));
    })

    return (
        <div className="ui-datepicker">
            <div className="ui-datepicker-material-header">
                <div className="ui-datepicker-material-day">{moment().format('dddd')}</div>
                <div className="ui-datepicker-material-date">
                    <div className="ui-datepicker-material-day-num">{moment().format('Do')}</div>
                    <div className="ui-datepicker-material-month">{moment().format('MMMM')}</div>
                    <div className="ui-datepicker-material-year">{moment().format('YYYY')}</div>
                </div>
            </div>
            <div className="ui-datepicker-header">
                <div className="ui-datepicker-title">
                    <span className="ui-datepicker-month">{moment().format('MMMM')}</span>&nbsp;<span className="ui-datepicker-year">{moment().format('YYYY')}</span>
                </div>
            </div>
            <table className="ui-datepicker-calendar">
                <colgroup>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col></col>
                    <col className="ui-datepicker-week-end"></col>
                    <col className="ui-datepicker-week-end"></col>
                </colgroup>
                <thead>
                    <tr>
                        <th scope="col" title="Понедельник">Mon</th>
                        <th scope="col" title="Вторник">Tue</th>
                        <th scope="col" title="Среда">Wen</th>
                        <th scope="col" title="Четверг">Thu</th>
                        <th scope="col" title="Пятница">Fri</th>
                        <th scope="col" title="Суббота">Sat</th>
                        <th scope="col" title="Воскресенье">Sun</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {calendarNotes.slice(0,7)}
                    </tr>
                    <tr>
                        {calendarNotes.slice(7,14)}
                    </tr>
                    <tr>
                        {calendarNotes.slice(14,21)}
                    </tr>
                    <tr>
                        {calendarNotes.slice(21,28)}
                    </tr>
                    <tr>
                        {calendarNotes.slice(28,35)}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CalendarFunc;