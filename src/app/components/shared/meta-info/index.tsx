import React from "react"
import { IconType } from "react-icons"

type Props = {
  count: number
  Icon: IconType
}

export const MetaInfo: React.FC<Props> = ({ count, Icon }) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      {count > 0 && (
        <p className="text-1 font-semibold text-default-400">{count}</p>
      )}
      <p className="text-default-400 text-xl hover:opacity-50 ease-in duration-75">
        <Icon />
      </p>
    </div>
  )
}
