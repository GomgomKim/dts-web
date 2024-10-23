export const EmptyCard = () => {
  return (
    <div className="grid gap-5 m-auto grid-row-1 auto-rows-[0] grid-empty 2xl:grid-empty-large">
      {Array.from({ length: 8 }).map((_value, idx) => (
        <div
          key={idx}
          className="aspect-[9/16] rounded-[8px] bg-[#0f1011] bg-custom-180-gradient"
        ></div>
      ))}
    </div>
  )
}
