/**
 * Festive toran edge: a row of scallops (in the colour of the section above)
 * with a gold bead line, hung across the top of a section.
 * The parent section must be `relative`.
 */
export function Toran({
  scallop,
  bead = "#D49635",
}: {
  /** colour of the scallops — usually the background of the section above */
  scallop: string;
  bead?: string;
}) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10" aria-hidden="true">
      <div
        className="h-[14px]"
        style={{
          backgroundImage: `radial-gradient(circle 13px at 50% 0, ${scallop} 12.5px, transparent 13px)`,
          backgroundSize: "28px 14px",
          backgroundPosition: "center top",
          backgroundRepeat: "repeat-x",
        }}
      />
      <div
        className="mt-1 h-2"
        style={{
          backgroundImage: `radial-gradient(circle, ${bead} 2.2px, transparent 2.8px)`,
          backgroundSize: "14px 8px",
          backgroundPosition: "center",
          backgroundRepeat: "repeat-x",
        }}
      />
    </div>
  );
}
