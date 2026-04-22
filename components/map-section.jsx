import { restaurant } from "@/lib/data";
import { SectionTitle } from "@/components/section-title";

export function MapSection() {
  return (
    <section className="section map-section">
      <div className="container split">
        <div>
          <SectionTitle
            eyebrow="Visit Us"
            title="Easy to find, easy to love"
            text="Located near Ayregaon Selfie Point with quick access for dine-in, takeaway, and delivery."
          />
          <div className="contact-card glass-card">
            <p><strong>Address:</strong> {restaurant.address}</p>
            <p><strong>Map Code:</strong> {restaurant.mapCode}</p>
            <p><strong>Phone:</strong> {restaurant.phone}</p>
            <p><strong>Status:</strong> {restaurant.status}</p>
          </div>
        </div>
        <div className="map-frame">
          <iframe
            title="Amazing Chinese Restaurant Map"
            src="https://www.google.com/maps?q=Ayregaon%20Selfie%20Point%2C%20Dombivli%20Kopar%20East%2C%20Maharashtra%20421201&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
