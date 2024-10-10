export const EmptyCard = () => {
  return (
    <div className="grid grid-cols-auto-fill-small gap-5">
      {Array.from({ length: 5 }).map((_value, idx) => (
        <div
          key={idx}
          className="aspect-[9/16] rounded-[8px] bg-[#0f1011] bg-custom-180-gradient"
        ></div>
      ))}
    </div>
  )
}
