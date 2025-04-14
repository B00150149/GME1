import React from 'react';
import '../styles/Footer.css';
import Image from 'next/image';
import logo from '../images/logo2.png'; // Adjust the path if necessary
import Link from 'next/link'; // Import Next.js Link component
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa'; // Import Twitter and Instagram icons

export default function Footer() {
  return (
    <footer className="footer">

      {/* Logo Section */}
      <div className="footer__logo">
        <Image src={logo} alt="Logo" width={50} height={70} />
      </div>

      {/* Footer Links */}
      <div className="footer-links">
        <Link href="/privacy-policy">Privacy Policy</Link>
        <Link href="/terms-and-conditions">Terms and Conditions</Link>
        <Link href="/contact-us">Contact Us</Link>
      </div>

      {/* Social Icons Section */}
      <div className="footer-social">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter className="social-icon" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF className="social-icon" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="social-icon" />
        </a>
      </div>

    </footer>
  );
}
