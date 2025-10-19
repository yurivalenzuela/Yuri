import "../about.css";

export default function About() {
  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="container">
          <h1>About Faith & Flour</h1>
          <p className="subtitle">
            Baked with love, lifted by grace — every bite is a reminder of God’s goodness.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="about-body">
        <div className="container">
          {/* Our Story */}
          <article className="block">
            <h2>Our Story</h2>
            <p>
              Faith & Flour started in a small kitchen with a simple prayer:
              “Lord, use our hands to serve others.” What began as weekend cookie
              batches for family and friends became a little bakery with a big heart.
              We don’t just bake; we share joy, comfort, and the sweetness of God’s
              faithfulness—one box at a time.
            </p>
          </article>

          {/* Mission */}
          <article className="block">
            <h2>Our Mission</h2>
            <p>
              To make homemade treats that warm the soul and gather people together.
              We honor God by doing small things with great love: honest ingredients,
              careful hands, and consistent quality. Whether it’s a birthday cake,
              a box of cookies for a friend, or dessert for your church group,
              we want every bite to feel like a hug.
            </p>
          </article>

          {/* Why Choose Us */}
          <article className="block">
            <h2>Why Choose Faith & Flour?</h2>
            <ul className="why">
              <li><strong>Made with Prayer:</strong> We pray over our work and the people we serve.</li>
              <li><strong>Honest Ingredients:</strong> Real butter, real chocolate, real vanilla—no shortcuts.</li>
              <li><strong>Consistent Quality:</strong> Every batch is tested, tasted, and baked with care.</li>
              <li><strong>Community-Minded:</strong> We love blessing outreaches, small groups, and school events.</li>
            </ul>
          </article>

          {/* Impact / Stats */}
          <section className="impact">
            <h3>Our Little Impact</h3>
            <div className="impact-grid">
              <div className="card">
                <div className="big">3,000+</div>
                <div className="label">Boxes Shared</div>
              </div>
              <div className="card">
                <div className="big">1,200+</div>
                <div className="label">Celebrations Served</div>
              </div>
              <div className="card">
                <div className="big">98%</div>
                <div className="label">Happy Customers</div>
              </div>
              <div className="card">
                <div className="big">24/7</div>
                <div className="label">Grateful Hearts</div>
              </div>
            </div>
          </section>

          {/* Closing */}
          <article className="banner">
            <p>
              <strong>“Taste and see that the Lord is good.”</strong> — Psalm 34:8
              <br />
              From our oven to your table, may every bite carry joy, comfort, and grace.
            </p>
          </article>

          <p className="tiny-note">
            © {new Date().getFullYear()} Faith & Flour — Baked with love, lifted by grace.
          </p>
        </div>
      </section>
    </main>
  );
}
