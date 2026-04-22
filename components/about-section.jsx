import { SectionTitle } from "@/components/section-title";

export function AboutSection({ standalone = false }) {
  return (
    <section className={`section ${standalone ? "container" : ""}`}>
      <div className={standalone ? "" : "container"}>
        <SectionTitle
          eyebrow="About Us"
          title="A neighborhood restaurant with bold wok flavors"
          text="Amazing Chinese Restaurant was built to blend family dining warmth with premium presentation and memorable Chinese comfort food."
        />
        <div className="info-grid">
          <article className="info-card">
            <h3>Our story</h3>
            <p>We started with a simple goal: serve craveable Chinese comfort food that feels special every time.</p>
          </article>
          <article className="info-card">
            <h3>Why choose us</h3>
            <p>Balanced flavors, warm hospitality, elegant plating, and consistent quality for every table.</p>
          </article>
          <article className="info-card">
            <h3>Hygiene promise</h3>
            <p>Sanitized prep areas, fresh raw ingredients, and clean handling practices for every order.</p>
          </article>
          <article className="info-card">
            <h3>Fresh ingredients</h3>
            <p>From crunchy vegetables to aromatic sauces, each plate is prepared to feel vibrant and satisfying.</p>
          </article>
          <article className="info-card">
            <h3>Comfortable seating</h3>
            <p>Thoughtful table layouts and a welcoming atmosphere make the space ideal for lunch and dinner outings.</p>
          </article>
          <article className="info-card">
            <h3>Family dining</h3>
            <p>Comfort food, combos, and shareable portions make the space welcoming for groups and celebrations.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
