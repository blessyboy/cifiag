import { useSite } from "../../site/SiteContext";
import { SmartLink } from "../primitives/SmartLink";

export function Footer() {
  const site = useSite();
  const contact = site?.contact;
  const hasContact = !!contact && (contact.address.length > 0 || contact.phones.length > 0 || contact.emails.length > 0);

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <section aria-labelledby="footer-about" className="site-footer__brand">
          <img className="site-footer__logo" src={site?.logo.src ?? "/logo.png"} alt="" width="72" height="64" loading="lazy" />
          <h2 id="footer-about" className="site-footer__heading">
            {site?.shortName ?? "CIFIAG"}
          </h2>
          <p>{site?.siteName}</p>
          {site?.tagline && <p className="site-footer__muted">{site.tagline}</p>}
        </section>

        <section aria-labelledby="footer-contact">
          <h2 id="footer-contact" className="site-footer__heading">
            Contact
          </h2>
          {hasContact ? (
            <address>
              {contact!.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              {contact!.phones.map((phone) => (
                <a key={phone} className="block" href={`tel:${phone.replace(/\s+/g, "")}`}>
                  {phone}
                </a>
              ))}
              {contact!.emails.map((email) => (
                <a key={email} className="block" href={`mailto:${email}`}>
                  {email}
                </a>
              ))}
            </address>
          ) : (
            <p className="site-footer__muted">Verified contact details will be published soon.</p>
          )}
        </section>

        <nav aria-labelledby="footer-links">
          <h2 id="footer-links" className="site-footer__heading">
            Information
          </h2>
          <ul className="plain-list">
            {site?.footerMenu.map((item) => (
              <li key={item.href}>
                <SmartLink href={item.href}>{item.label}</SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        {site && site.social.length > 0 && (
          <nav aria-labelledby="footer-social">
            <h2 id="footer-social" className="site-footer__heading">
              Follow us
            </h2>
            <ul className="plain-list">
              {site.social.map((s) => (
                <li key={s.href}>
                  <SmartLink href={s.href}>{s.label}</SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
      <div className="container site-footer__base">
        <p>
          © {new Date().getFullYear()} {site?.siteName ?? "CIFIAG"}
        </p>
      </div>
    </footer>
  );
}
