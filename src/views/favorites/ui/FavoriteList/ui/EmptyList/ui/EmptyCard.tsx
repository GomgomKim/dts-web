export const EmptyCard = () => {
  return (
    <div className="grid-empty 2xl:grid-empty-large m-auto grid auto-rows-[0] grid-rows-1 gap-5">
      {Array.from({ length: 8 }).map((_value, idx) => (
        <div
          key={idx}
          className="aspect-[9/16] rounded-[8px] bg-[#0f1011] bg-custom-180-gradient"
        ></div>
      ))}
    </div>
  )
}
