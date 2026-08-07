export default function AudioProduction() {
  return (
    <section id="audio-production">
      <div className="page-intro">
        <p className="eyebrow">Audio Production</p>
        <h1>Music is part of how I design.</h1>
        <p>
          I produce my own music and collaborate with other artists, occasionally providing mixing and mastering. That
          practical experience shapes how I think about audio workflows and motivates my work on new music-production tools.
        </p>
      </div>

      <section className="section audio-note">
        <p className="eyebrow">Practice</p>
        <h2>A perspective built at the session level.</h2>
        <p>
          Working directly in creative tools makes the friction in a workflow visible. It is the starting point for my
          interest in thoughtful, AI-native music software - tools that support creative decisions without getting in the way
          of them.
        </p>
      </section>

      <section className="section" aria-labelledby="playlist-heading">
        <p className="eyebrow">Selected listening</p>
        <h2 id="playlist-heading">Music from the studio.</h2>
        <p className="playlist-intro">A selection of tracks that reflects my production work and musical direction.</p>
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
          Open playlist in Spotify <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="section" aria-labelledby="tensor-heading">
        <p className="eyebrow">Personal music project</p>
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
              Tensor is my personal music project, produced independently. Writing music and collaborating with other
              producers and band members through the project is how I learned mixing and mastering. It is where I put
              the production ideas and audio workflows I explore into practice.
            </p>
          </div>
          <figure className="artist-photo">
            <img
              src="/assets/media/tensor-crowd-shot.jpg"
              width="1440"
              height="961"
              alt="Tensor with their audience after a live performance"
            />
            <figcaption>Tensor and their audience after a live performance.</figcaption>
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
              alt="A guitarist silhouetted under a spotlight during a Tensor behind-the-scenes shoot"
              loading="lazy"
            />
            <figcaption>Behind the scenes.</figcaption>
          </figure>
        </div>
      </section>
    </section>
  );
}
