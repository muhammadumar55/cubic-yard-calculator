'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS, SITE_NAME } from '../../lib/site.js';

// Logo SVG — inline for zero request cost
function Logo() {
  return (
    <Link
      href="/"
      aria-label={`${SITE_NAME} — Home`}
      className="flex items-center gap-2.5 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:rounded-lg"
    >
      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary-600 group-hover:bg-primary-500 transition-colors flex-shrink-0">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false">
          {/* 3D cube wireframe */}
          <path d="M11 2L20 7V15L11 20L2 15V7L11 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M11 2V20" stroke="white" strokeWidth="1.5"/>
          <path d="M2 7L11 12L20 7" stroke="white" strokeWidth="1.5"/>
        </svg>
      </span>
      <span className="font-bold text-base leading-tight text-slate-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        Cubic Yard<br/>
        <span className="text-primary-600 dark:text-primary-400">Calculator</span>
      </span>
    </Link>
  );
}

// Theme toggle button
function ThemeToggle() {
  const [theme, setTheme] = useState('auto');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cyc-theme');
      if (stored === 'dark' || stored === 'light') setTheme(stored);
      else setTheme('auto');
    } catch { /* ignore */ }
  }, []);

  function toggle() {
    const isDark = document.documentElement.classList.contains('dark');
    const next = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', !isDark);
    try { localStorage.setItem('cyc-theme', next); } catch { /* ignore */ }
    setTheme(next);
  }

  const isDark = theme === 'dark' ||
    (theme === 'auto' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn-ghost rounded-xl p-2.5 text-slate-500 dark:text-slate-400"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </button>
  );
}

// Desktop dropdown item
function DropdownMenu({ item, isOpen, onOpen, onClose, menuId }) {
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target) &&
          triggerRef.current && !triggerRef.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Keyboard navigation
  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      onClose();
      triggerRef.current?.focus();
    }
    if (e.key === 'ArrowDown' && !isOpen) {
      onOpen();
    }
  }

  function handleMenuKeyDown(e) {
    const focusable = menuRef.current?.querySelectorAll('a[href]');
    if (!focusable?.length) return;
    const arr = Array.from(focusable);
    const idx = arr.indexOf(document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      arr[(idx + 1) % arr.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      arr[(idx - 1 + arr.length) % arr.length]?.focus();
    } else if (e.key === 'Escape') {
      onClose();
      triggerRef.current?.focus();
    } else if (e.key === 'Tab') {
      onClose();
    }
  }

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => isOpen ? onClose() : onOpen()}
        onKeyDown={handleKeyDown}
        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px]
          ${isOpen
            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30'
            : 'text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
      >
        {item.label}
        <svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
          aria-hidden="true"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {isOpen && (
        <div
          id={menuId}
          ref={menuRef}
          role="menu"
          aria-label={`${item.label} submenu`}
          onKeyDown={handleMenuKeyDown}
          className="absolute top-full left-0 mt-1.5 w-56 rounded-xl bg-white dark:bg-slate-800 shadow-xl ring-1 ring-slate-200 dark:ring-slate-700 z-50 py-1 animate-fade-in"
        >
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              onClick={onClose}
              className="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// Mobile drawer
function MobileDrawer({ isOpen, onClose, pathname }) {
  const drawerRef = useRef(null);
  const closeRef = useRef(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus the close button when drawer opens
      setTimeout(() => closeRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Trap focus inside drawer
  useEffect(() => {
    if (!isOpen) return;
    function trapFocus(e) {
      if (e.key !== 'Tab' || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }
    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const [openSection, setOpenSection] = useState(null);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-y-0 right-0 z-50 w-[min(340px,100vw)] bg-white dark:bg-slate-900 shadow-2xl flex flex-col animate-slide-in"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <span className="font-bold text-slate-900 dark:text-white">{SITE_NAME}</span>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="btn-ghost p-2 rounded-lg"
            aria-label="Close navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto px-4 py-4" aria-label="Mobile navigation">
          <ul role="list" className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <div>
                    <button
                      type="button"
                      onClick={() => setOpenSection(openSection === item.label ? null : item.label)}
                      aria-expanded={openSection === item.label}
                      className="flex w-full items-center justify-between px-3 py-3 rounded-lg text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors min-h-[44px]"
                    >
                      {item.label}
                      <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                        aria-hidden="true"
                        className={`transition-transform ${openSection === item.label ? 'rotate-180' : ''}`}
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                    {openSection === item.label && (
                      <ul role="list" className="mt-1 ml-3 border-l-2 border-slate-200 dark:border-slate-700 pl-3 space-y-0.5">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={onClose}
                              aria-current={pathname === child.href ? 'page' : undefined}
                              className={`block px-3 py-2.5 rounded-lg text-sm transition-colors min-h-[44px] flex items-center
                                ${pathname === child.href
                                  ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30 font-medium'
                                  : 'text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={pathname === item.href ? 'page' : undefined}
                    className={`block px-3 py-3 rounded-lg text-sm font-semibold transition-colors min-h-[44px] flex items-center
                      ${pathname === item.href
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30'
                        : 'text-slate-800 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA in drawer */}
        <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/#calculator"
            onClick={onClose}
            className="btn-primary w-full text-center rounded-xl py-3 text-sm"
          >
            Calculate Now
          </Link>
        </div>
      </div>
    </>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = useCallback(() => setOpenMenu(null), []);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  // Add shadow on scroll
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 8); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => { closeMobile(); }, [pathname, closeMobile]);

  return (
    <>
      <header
        className={`sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b transition-shadow
          ${scrolled
            ? 'border-slate-200 dark:border-slate-800 shadow-sm'
            : 'border-transparent'
          }`}
        style={{ height: 'var(--header-height)' }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 h-full flex items-center gap-4">
          {/* Logo */}
          <Logo />

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-1 flex-1 ml-4"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map((item) => {
              const menuId = `nav-dropdown-${item.label.toLowerCase().replace(/\s+/g, '-')}`;
              return item.children ? (
                <DropdownMenu
                  key={item.href}
                  item={item}
                  isOpen={openMenu === item.label}
                  onOpen={() => setOpenMenu(item.label)}
                  onClose={closeMenu}
                  menuId={menuId}
                />
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] flex items-center
                    ${pathname === item.href
                      ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30'
                      : 'text-slate-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <Link
              href="/#calculator"
              className="btn-primary text-sm px-4 py-2"
            >
              Calculate Now
            </Link>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex items-center gap-1 ml-auto md:hidden">
            <ThemeToggle />
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
              aria-label="Open navigation menu"
              onClick={() => setMobileOpen(true)}
              className="btn-ghost rounded-xl p-2.5 text-slate-600 dark:text-slate-300"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — rendered outside header for correct stacking */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={closeMobile}
        pathname={pathname}
      />
    </>
  );
}
