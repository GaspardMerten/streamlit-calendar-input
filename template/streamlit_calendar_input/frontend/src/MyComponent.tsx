import { ComponentProps, Streamlit, withStreamlitConnection } from "streamlit-component-lib"
import React, { ReactElement, useEffect } from "react"
import "./Calendar.css"

function MyComponent({ args, disabled, theme }: ComponentProps): ReactElement {
    const { available_dates = [] } = args

    const availableDateSet = new Set(available_dates)
    const today = new Date()
    const [selectedDate, setSelectedDate] = React.useState<string | null>(null)

    // Compute full month range
    const start = new Date(available_dates[0] || today)
    const end = new Date(available_dates[available_dates.length - 1] || today)
    const months = monthRange(start, end)

    // Pagination state
    const [visibleMonthIndex, setVisibleMonthIndex] = React.useState(months.length - 1)

    useEffect(() => {
        Streamlit.setFrameHeight(
            (document.querySelector(".calendar-root")?.getBoundingClientRect().height || 0) + 50
        )
    }, [visibleMonthIndex, available_dates])

    function monthRange(start: Date, end: Date): [number, number][] {
        const months: [number, number][] = []
        let y = start.getFullYear(), m = start.getMonth()

        while (y < end.getFullYear() || (y === end.getFullYear() && m <= end.getMonth())) {
            months.push([y, m])
            m++
            if (m > 11) {
                y++
                m = 0
            }
        }
        return months
    }

    function formatDate(date: Date): string {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
    }

    function onDateClick(isoDate: string) {
        if (!disabled) {
            Streamlit.setComponentValue(isoDate)
            setSelectedDate(isoDate)
        }
    }

    function renderCalendar(): ReactElement[] {
        const [year, month] = months[visibleMonthIndex]
        const firstOfMonth = new Date(year, month, 1)
        const lastOfMonth = new Date(year, month + 1, 0)

        const startDay = new Date(firstOfMonth)
        startDay.setDate(startDay.getDate() - ((startDay.getDay() + 6) % 7)) // move to Monday
        const endDay = new Date(lastOfMonth)
        endDay.setDate(endDay.getDate() + (7 - ((endDay.getDay() + 6) % 7) - 1)) // move to Sunday

        const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        const rows = []
        let date = new Date(startDay)

        while (date <= endDay) {
            const week = []
            for (let i = 0; i < 7; i++) {
                const iso = formatDate(date)
                const isCurrentMonth = date.getMonth() === month
                const isAvailable = availableDateSet.has(iso)

                let className = "calendar-cell"
                if (!isCurrentMonth || date > today) {
                    className += " empty"
                } else if (!isAvailable) {
                    className += " missing"
                }
                if (iso === selectedDate) {
                    className += " selected"
                }

                week.push(
                    <div
                        key={iso}
                        className={className}
                        data-date={iso}
                        onClick={() => className.includes("empty") ? null : onDateClick(iso)}
                    >
                        {isCurrentMonth ? date.getDate() : ""}
                    </div>
                )
                date.setDate(date.getDate() + 1)
            }
            rows.push(<div className="week-row" key={date.toISOString()}>{week}</div>)
        }

        return [
            <div className="calendar-controls" key="nav">
                <button style={{color: theme?.textColor ?? 'white'}} disabled={visibleMonthIndex === 0} onClick={() => setVisibleMonthIndex(i => Math.max(0, i - 1))}>←</button>
                <span>{firstOfMonth.toLocaleString("default", { month: "long", year: "numeric" })}</span>
                <button style={{color: theme?.textColor ?? 'white'}} disabled={visibleMonthIndex === months.length - 1} onClick={() => setVisibleMonthIndex(i => Math.min(months.length - 1, i + 1))}>→</button>
            </div>,
            <div className="weekdays" key="weekdays">
                {weekdayLabels.map(day => <div key={day}>{day}</div>)}
            </div>,
            ...rows
        ]
    }

    return <div className="calendar-root">{renderCalendar()}</div>
}

export default withStreamlitConnection(MyComponent)
