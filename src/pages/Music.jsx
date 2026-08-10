export default function Music() {
  const capabilities = [
    {
      title: 'Songwriting & Arrangement',
      description: 'Writing original music from initial ideas through full arrangements for live and studio contexts.',
    },
    {
      title: 'Recording & Production',
      description: 'Tracking, editing, and producing sessions — managing the creative and technical decisions that shape a record.',
    },
    {
      title: 'Mixing & Mastering',
      description: 'Taking raw recordings to release-ready masters. Learned through years of iteration on my own projects.',
    },
    {
      title: 'Project Coordination',
      description: 'Scheduling studio time, managing rehearsals, booking shows, and keeping collaborative projects moving with limited time and budget.',
    },
    {
      title: 'Marketing & Release Strategy',
      description: 'Building a visual identity, planning releases, promoting tracks, and growing an audience independently.',
    },
    {
      title: 'Live Performance',
      description: 'Playing shows, coordinating with venues and sound engineers, and translating studio work to the stage.',
    },
  ];

  return (
    <section id="music">
      <div className="page-intro">
        <p className="eyebrow">Music</p>
        <h1>Writing, producing, and shipping records.</h1>
        <p>
          I've spent years writing, recording, mixing, and mastering my own music. Along the way I've learned
          how to run a creative project end-to-end — from the first demo to a finished release, from booking a
          studio to booking a show.
        </p>
      </div>

      <section className="section" aria-labelledby="playlist-heading">
        <p className="eyebrow">Recordings</p>
        <h2 id="playlist-heading">What came out of the studio.</h2>
        <p className="playlist-intro">Tracks I wrote, produced, and engineered.</p>
        <div className="spotify-embed">
          <iframe
            title="Joshua Brenneman audio production playlist on Spotify"
            src="https://open.spotify.com/embed/playlist/2ZA5D6NJ5HQanMRfAfX8zQ?utm_source=generator&amp;si=1472ec09bbaf4aad"
            width="100%"
            height="460"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
        <a
          className="spotify-link"
          href="https://open.spotify.com/playlist/2ZA5D6NJ5HQanMRfAfX8zQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in Spotify <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="section" aria-labelledby="music-capabilities-heading">
        <div className="section-heading">
          <p className="eyebrow" id="music-capabilities-heading">Capabilities</p>
          <p>What goes into getting a record from an idea to someone's headphones.</p>
        </div>
        <div className="capability-grid">
          {capabilities.map((cap, i) => (
            <article key={i}>
              <h2>{cap.title}</h2>
              <p>{cap.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="tensor-heading">
        <p className="eyebrow">Project spotlight</p>
        <article className="artist-feature">
          <div className="artist-copy">
            <img
              className="artist-logo"
              src="/assets/media/tensor-logo-wide.png"
              width="3758"
              height="905"
              alt="Tensor"
            />
            <h2 id="tensor-heading">Tensor</h2>
            <p>
              Tensor is a band I started and run independently. It's where all of the above comes together —
              writing the songs, producing the recordings, coordinating four people's schedules for studio and
              rehearsal, booking shows, handling promotion, and shipping releases on a timeline with no external
              pressure to do so.
            </p>
          </div>
          <figure className="artist-photo">
            <img
              src="/assets/media/tensor-crowd-shot.jpg"
              width="1440"
              height="961"
              alt="Tensor performing live with their audience"
            />
            <figcaption>Tensor live.</figcaption>
          </figure>
        </article>
      </section>

      <section className="section" aria-labelledby="studio-stage-heading">
        <p className="eyebrow">Studio &amp; stage</p>
        <h2 id="studio-stage-heading">The work behind the work.</h2>
        <div className="audio-gallery">
          <figure>
            <img
              src="/assets/media/josh_nick_soundboard.jpg"
              width="1440"
              height="1800"
              alt="Two people at a recording-studio soundboard during a session"
              loading="lazy"
            />
            <figcaption>In the studio.</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/media/aceofcups-crowd.jpg"
              width="1366"
              height="2048"
              alt="View from a stage toward a crowd and drum kit during a live performance"
              loading="lazy"
            />
            <figcaption>From the stage.</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/media/josh-live-guitar.jpg"
              width="1440"
              height="961"
              alt="Joshua playing electric guitar onstage under colored lights"
              loading="lazy"
            />
            <figcaption>Live guitar.</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/media/tensor-bts-guitar.jpg"
              width="1329"
              height="698"
              alt="A guitarist silhouetted under a spotlight during a behind-the-scenes shoot"
              loading="lazy"
            />
            <figcaption>Behind the scenes.</figcaption>
          </figure>
        </div>
      </section>
    </section>
  );
}
