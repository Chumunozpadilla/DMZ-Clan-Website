import { clanInfo } from '../../data/clanInfo';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{clanInfo.name}</strong>
        <p>{clanInfo.affiliation}</p>
      </div>
      <div className="footer-links">
        {clanInfo.socials.map((social) => (
          <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
            {social.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
