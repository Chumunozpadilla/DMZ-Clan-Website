import { Menu, Radio, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { clanInfo } from '../../data/clanInfo';
import { navigation } from '../../data/navigation';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <NavLink className="brand" to="/" onClick={() => setOpen(false)}>
        <span className="brand-mark">DMZ</span>
        <span>
          <strong>{clanInfo.name}</strong>
          <small>Containment Net</small>
        </span>
      </NavLink>
      <button className="mobile-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
        {navigation.map((item) => (
          <NavLink key={item.href} to={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </NavLink>
        ))}
        <a className="nav-discord" href={clanInfo.discordInvite} target="_blank" rel="noreferrer">
          <Radio size={16} />
          Discord
        </a>
      </nav>
    </header>
  );
}
