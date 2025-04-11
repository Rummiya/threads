import React from "react"

interface Props {
  count: number
  title: string
}

export const CountInfo: React.FC<Props> = ({ count, title }) => {
  return (
    <div className="flex flex-col items-center space-x-2 p-4 max-md:p-2 max-xs:p-0">
      <span className="text-4xl max-md:text-2xl font-semibold">{count}</span>
      <span className="max-md:text-sm max-xs:text-[12px]" style={{ margin: 0 }}>
        {title}
      </span>
    </div>
  )
}
