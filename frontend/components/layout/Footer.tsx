'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaRegBuilding,
  FaWhatsapp,
  FaArrowUp,
  FaSnowflake,
} from 'react-icons/fa';

const quickLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/about', label: 'عن الشركة' },
  { href: '/services', label: 'الخدمات' },
  { href: '/portfolio', label: 'أعمالنا' },
  { href: '/contact', label: 'اتصل بنا' },
];

const serviceLinks = [
  'تكييف مركزي',
  'صيانة دورية',
  'تركيب مكيفات',
  'تصنيع وتركيب دكت',
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-card footer-brand-card">
            <div className="footer-brand-top">
              <div className="footer-logo-wrap">
                <Image
                  src="/logo.png"
                  alt="رياح الجليد"
                  width={72}
                  height={72}
                  className="footer-logo"
                />
              </div>

              <div>
                <h3 className="footer-brand-title">رياح الجليد</h3>
                <p className="footer-brand-subtitle">
                  حلول احترافية في التكييف المركزي والسبليت والتهوية والدكت.
                </p>
              </div>
            </div>

            <p className="footer-description">
              شركة متخصصة في تركيب وصيانة أنظمة التكييف والتبريد للمنازل
              والشركات والمشاريع، مع التزام بالجودة والسرعة والدقة في التنفيذ.
            </p>

            <div className="footer-actions">
              <a
                href="https://wa.me/966565247407"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-action-button footer-action-primary"
              >
                <FaWhatsapp />
                <span>واتساب</span>
              </a>

              <a href="tel:+966565247407" className="footer-action-button">
                <FaPhone />
                <span>اتصال</span>
              </a>
            </div>
          </div>

          <div className="footer-card">
            <h4 className="footer-heading">روابط سريعة</h4>
            <ul className="footer-list">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="footer-link">
                    <span className="footer-link-bullet" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-card">
            <h4 className="footer-heading">خدماتنا</h4>
            <ul className="footer-list">
              {serviceLinks.map((item) => (
                <li key={item} className="footer-static-item">
                  <span className="footer-link-bullet" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-card">
            <h4 className="footer-heading">بيانات التواصل</h4>

            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <span>الرياض - طريق الملك عبدالعزيز</span>
              </div>

              <a href="tel:+966565247407" className="footer-contact-item">
                <div className="footer-contact-icon">
                  <FaPhone />
                </div>
                <span>+966 56 524 7407</span>
              </a>

              <a
                href="mailto:RiaHaljalid@icloud.com"
                className="footer-contact-item"
              >
                <div className="footer-contact-icon">
                  <FaEnvelope />
                </div>
                <span>RiaHaljalid@icloud.com</span>
              </a>

              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <FaRegBuilding />
                </div>
                <span>السجل التجاري: 1010632725</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <div className="footer-copy">
              <FaSnowflake className="footer-copy-icon" />
              <span>© {currentYear} رياح الجليد. جميع الحقوق محفوظة.</span>
            </div>

            <div className="footer-dev">
              تصميم وتطوير: <span>Team Hawk</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
            className="back-to-top"
          >
            <FaArrowUp />
            <span>للأعلى</span>
          </button>
        </div>
      </div>
    </footer>
  );
}