import { useState } from 'react'

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function CalendarWidget() {
  const today = new Date()
  const [viewDate, setViewDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  })

  const { year, month } = viewDate
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstDay = new Date(year, month, 1).getDay()

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear()

  function prevMonth() {
    setViewDate(({ year, month }) =>
      month === 0 ? { year: year - 1, month: 11 } : { year, month: month - 1 }
    )
  }

  function nextMonth() {
    setViewDate(({ year, month }) =>
      month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 }
    )
  }

  const monthLabel = new Date(year, month, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="bg-white/50 backdrop-blur rounded-2xl p-4 w-full">
      <div className="flex items-center justify-between mb-3">
        <button
          aria-label="Previous month"
          onClick={prevMonth}
          className="text-lavender-400 hover:text-lavender-500 font-bold w-6 text-center"
        >
          ‹
        </button>
        <span className="text-sm font-semibold text-gray-700">{monthLabel}</span>
        <button
          aria-label="Next month"
          onClick={nextMonth}
          className="text-lavender-400 hover:text-lavender-500 font-bold w-6 text-center"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-xs text-gray-400 font-medium py-1">
            {d}
          </div>
        ))}
        {cells.map((day, i) => (
          <div
            key={i}
            className={`text-xs py-1 rounded-full ${
              day === null
                ? ''
                : isToday(day)
                ? 'bg-lavender-500 text-white font-bold'
                : 'text-gray-600 hover:bg-lavender-100 cursor-default'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}
