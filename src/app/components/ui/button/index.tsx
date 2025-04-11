import { Button as NextButton } from "@nextui-org/react"
import React from "react"

type Props = {
  children: React.ReactNode
  icon?: JSX.Element
  className?: string
  type?: "button" | "submit" | "reset"
  fullWidth?: boolean
  isLoading?: boolean
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined
}

export const Button: React.FC<Props> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
  isLoading,
}) => {
  return (
    <NextButton
      startContent={icon}
      size="lg"
      color={color}
      variant="light"
      className={className}
      type={type}
      fullWidth={fullWidth}
      isLoading={isLoading}
    >
      {children}
    </NextButton>
  )
}
