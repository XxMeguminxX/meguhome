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
    <div className="bg-[#4ECDC4] border-2 border-[#1a1a2e] rounded-2xl p-4 w-full shadow-[4px_4px_0px_#1a1a2e]">
      <div className="flex items-center justify-between mb-3">
        <button
          aria-label="Previous month"
          onClick={prevMonth}
          className="bg-white border-2 border-[#1a1a2e] rounded-lg w-7 h-7 flex items-center justify-center font-bold text-[#1a1a2e] hover:bg-[#FFE66D] shadow-[2px_2px_0px_#1a1a2e] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1a1a2e]"
        >
          ‹
        </button>
        <span className="text-sm font-black text-[#1a1a2e]">{monthLabel}</span>
        <button
          aria-label="Next month"
          onClick={nextMonth}
          className="bg-white border-2 border-[#1a1a2e] rounded-lg w-7 h-7 flex items-center justify-center font-bold text-[#1a1a2e] hover:bg-[#FFE66D] shadow-[2px_2px_0px_#1a1a2e] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#1a1a2e]"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center">
        {DAY_NAMES.map(d => (
          <div key={d} className="text-xs text-[#1a1a2e]/60 font-bold py-1">
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
                ? 'bg-[#FFE66D] text-[#1a1a2e] font-black border border-[#1a1a2e] rounded-lg'
                : 'text-[#1a1a2e] hover:bg-white/50 cursor-default rounded-lg font-medium'
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  )
}
