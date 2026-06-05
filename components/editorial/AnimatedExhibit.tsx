/** Wraps a scroll animation with a labelled header + distinct tinted frame,
 *  so a fast-scrolling reader sees what the animation is. Label text is UI
 *  chrome (not manuscript). */

export default function AnimatedExhibit({
  title,
  description,
  children,
  eyebrow = "[ Animated · scroll ]",
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  eyebrow?: string;
}) {
  return (
    <section className="my-16 w-full bg-[#ECEAE5] md:my-20">
      <div className="mx-auto max-w-2xl px-6 pt-16 pb-2 text-center">
        <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.22em] text-[#B84221]">
          {eyebrow}
        </p>
        <h3 className="mb-3 font-serif text-[clamp(1.35rem,2.6vw,1.9rem)] font-semibold leading-tight text-[#1C1A17]">
          {title}
        </h3>
        <p className="mx-auto max-w-xl font-reading text-[0.95rem] leading-[1.6] text-[#4A4A4A]">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}
