import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface TimelineRefs {
  sectionRef: React.RefObject<HTMLElement>;
  titleRef: React.RefObject<HTMLDivElement>;
  milestonesRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export function useTimelineAnimation(itemCount: number): TimelineRefs {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    milestonesRef.current.forEach((milestone, index) => {
      if (milestone) {
        gsap.fromTo(
          milestone,
          { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: milestone,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    });
  }, [itemCount]);

  return { sectionRef, titleRef, milestonesRef };
}
