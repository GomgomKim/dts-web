interface ErrorInstructionProps {
  children?: React.ReactNode
}

export const ErrorInstruction = (props: ErrorInstructionProps) => {
  return (
    <p className="absolute -bottom-1 w-full translate-y-full text-center text-[0.875rem] text-[#FF8480] 2xl:text-[1.25rem]">
      {props.children}
    </p>
  )
}
