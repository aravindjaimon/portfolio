'use client';

import { useState, FormEvent } from 'react';
import { Mail, ArrowRight, Check, AlertCircle } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'inline' | 'card';
  className?: string;
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error';

export function NewsletterSignup({ variant = 'card', className = '' }: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<SubmitState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setState('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setState('loading');

    // Simulate API call - replace with actual newsletter service integration
    // Examples: ConvertKit, Buttondown, Mailchimp, Resend
    try {
      // TODO: Integrate with newsletter service
      // await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });

      // Simulate success for now
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setState('success');
      setEmail('');
    } catch {
      setState('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  if (variant === 'inline') {
    return (
      <div className={className}>
        {state === 'success' ? (
          <div className="flex items-center gap-2 text-green-500 font-mono text-sm">
            <Check size={16} />
            Thanks for subscribing!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === 'error') setState('idle');
                }}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A] border border-[#2D2D2D] text-white placeholder:text-white/30 font-mono text-sm focus:outline-none focus:border-[#C41E3A] transition-colors"
                disabled={state === 'loading'}
                required
              />
            </div>
            <button
              type="submit"
              disabled={state === 'loading'}
              className="px-4 py-2 bg-[#C41E3A] text-white font-mono text-sm hover:bg-[#A01830] transition-colors disabled:opacity-50"
            >
              {state === 'loading' ? '...' : <ArrowRight size={16} />}
            </button>
          </form>
        )}
        {state === 'error' && (
          <p className="mt-2 text-red-500 text-xs font-mono flex items-center gap-1">
            <AlertCircle size={12} />
            {errorMessage}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`p-6 bg-[#1A1A1A] border border-[#2D2D2D] ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[#C41E3A]/10 border border-[#C41E3A]/20">
          <Mail size={20} className="text-[#C41E3A]" />
        </div>
        <div>
          <h4 className="font-bebas text-lg text-white tracking-wide">Stay Updated</h4>
          <p className="text-white/50 text-xs font-mono">No spam, unsubscribe anytime</p>
        </div>
      </div>

      {state === 'success' ? (
        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 text-green-500 font-mono text-sm">
          <Check size={16} />
          Thanks for subscribing! Check your inbox.
        </div>
      ) : (
        <>
          <p className="text-white/60 text-sm mb-4">
            Get notified about new blog posts on software engineering, architecture, and building products.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === 'error') setState('idle');
                }}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-[#2D2D2D] text-white placeholder:text-white/30 font-mono text-sm focus:outline-none focus:border-[#C41E3A] transition-colors"
                disabled={state === 'loading'}
                required
              />
            </div>

            {state === 'error' && (
              <p className="text-red-500 text-xs font-mono flex items-center gap-1">
                <AlertCircle size={12} />
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'loading'}
              className="w-full py-3 bg-[#C41E3A] text-white font-mono text-sm hover:bg-[#A01830] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {state === 'loading' ? (
                'Subscribing...'
              ) : (
                <>
                  Subscribe
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
