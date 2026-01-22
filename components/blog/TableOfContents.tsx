'use client';

import { useState, useEffect, useCallback } from 'react';
import { List, ChevronDown, ChevronUp } from 'lucide-react';
import { NewsletterSignup } from './NewsletterSignup';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  // Track which heading is currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
      setActiveId(id);
      setIsExpanded(false);
    }
  }, []);

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile: Collapsible */}
      <div className="lg:hidden mb-8">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#1A1A1A] border border-[#2D2D2D] text-white/80 font-mono text-sm"
        >
          <span className="flex items-center gap-2">
            <List size={16} />
            Table of Contents
          </span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {isExpanded && (
          <nav className="px-4 py-3 bg-[#1A1A1A] border border-t-0 border-[#2D2D2D]">
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleClick(e, item.id)}
                    className={`block py-1 text-sm transition-colors ${
                      activeId === item.id
                        ? 'text-[#C41E3A] font-medium'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop: Sticky Sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 space-y-6">
          <div className="p-4 bg-[#1A1A1A] border border-[#2D2D2D]">
            <h4 className="flex items-center gap-2 text-white/80 font-mono text-sm mb-4 pb-2 border-b border-[#2D2D2D]">
              <List size={16} />
              On this page
            </h4>
            <nav>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item.id} style={{ paddingLeft: `${(item.level - 2) * 12}px` }}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleClick(e, item.id)}
                      className={`block py-1.5 text-sm transition-colors border-l-2 pl-3 -ml-px ${
                        activeId === item.id
                          ? 'border-[#C41E3A] text-[#C41E3A]'
                          : 'border-transparent text-white/50 hover:text-white/80 hover:border-white/20'
                      }`}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Newsletter in sidebar */}
          <NewsletterSignup />
        </div>
      </aside>
    </>
  );
}
