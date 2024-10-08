interface ErrorInstructionProps {
  children?: React.ReactNode
}

export const ErrorInstruction = (props: ErrorInstructionProps) => {
  return (
    <p className="absolute bottom-[-0.25rem] translate-y-full w-full text-center text-[0.875rem] text-[#FF8480]">
      {props.children}
    </p>
  )
}
