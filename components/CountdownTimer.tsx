export const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-10">
      {["DAYS", "HOURS", "MINS", "SECS"].map((label) => (
        <div key={label} className="bg-surface border border-border-subtle rounded-2xl p-4 min-w-[80px] md:min-w-[100px] text-center">
          <div className="text-primary font-heading text-3xl md:text-5xl font-bold tracking-tighter">
            {/* Logic will be added in client component variant */}
            00
          </div>
          <div className="text-muted text-[10px] md:text-xs font-body font-medium uppercase mt-1 tracking-widest">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
};
