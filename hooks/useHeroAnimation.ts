import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroRefs {
  nameRef: React.RefObject<HTMLHeadingElement>;
  subtitleRef: React.RefObject<HTMLDivElement>;
  taglineRef: React.RefObject<HTMLParagraphElement>;
  iconsRef: React.RefObject<HTMLDivElement>;
  scrollRef: React.RefObject<HTMLDivElement>;
}

export function useHeroAnimation(): HeroRefs {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (nameRef.current) {
      const letters = nameRef.current.querySelectorAll('.letter');
      tl.fromTo(
        letters,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, stagger: 0.05, duration: 0.8 }
      );
    }

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    );

    tl.fromTo(
      taglineRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.3'
    );

    tl.fromTo(
      iconsRef.current?.children,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, stagger: 0.1, duration: 0.4 },
      '-=0.2'
    );

    tl.fromTo(
      scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.2'
    );

    gsap.to(scrollRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: 'power1.inOut'
    });
  }, []);

  return { nameRef, subtitleRef, taglineRef, iconsRef, scrollRef };
}
