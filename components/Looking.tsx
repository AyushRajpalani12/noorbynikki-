'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Gem,
  Heart,
} from 'lucide-react';

export default function Looking() {
  return (
    <section className="relative overflow-hidden bg-[#fffaf6] py-14 sm:py-16 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-[#7a1738]/[0.06] blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-[460px] w-[460px] rounded-full bg-amber-300/20 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #6d1633 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* ================================================= */}
        {/* TOP HEADING */}
        {/* ================================================= */}

        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#7a1738]/30" />

            <div className="flex items-center gap-2 text-[#7a1738]">
              <Sparkles className="h-4 w-4" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-[11px]">
                Signature Collection
              </span>
            </div>

            <span className="h-px w-10 bg-[#7a1738]/30" />
          </div>

          <h2 className="font-serif text-4xl leading-tight tracking-[-0.02em] text-[#2f1520] sm:text-5xl lg:text-6xl">
            Crafted to Make You
            <span className="block italic text-[#8a2045]">
              Look Effortlessly Elegant
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-[15px]">
            Explore timeless ethnic silhouettes, graceful fabrics and
            thoughtfully designed details created for celebrations, festive
            moments and beautiful everyday styling.
          </p>
        </div>

        {/* ================================================= */}
        {/* MAIN SHOWCASE */}
        {/* ================================================= */}

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* ================= LEFT BIG IMAGE ================= */}

          <div className="group relative overflow-hidden rounded-[30px] bg-[#4f152a] shadow-[0_30px_70px_rgba(78,21,42,0.16)] lg:col-span-7">
            <div className="relative min-h-[520px] sm:min-h-[620px] lg:min-h-[720px]">
              <Image
                src="/morehomepage.png"
                alt="Premium ethnic wear collection"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#250912]/85 via-[#250912]/10 to-transparent" />

              <div className="absolute inset-0 bg-gradient-to-r from-[#35101d]/25 via-transparent to-transparent" />

              {/* luxury frame */}
              <div className="pointer-events-none absolute inset-5 rounded-[22px] border border-white/15" />

              {/* floating top badge */}
              <div className="absolute left-7 top-7 rounded-full border border-white/20 bg-black/15 px-4 py-2 backdrop-blur-xl sm:left-10 sm:top-10">
                <span className="text-[9px] font-semibold uppercase tracking-[0.26em] text-white/90">
                  New Season
                </span>
              </div>

              {/* content bottom */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-7 sm:p-10 lg:p-12">
                <div className="max-w-xl">
                  <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-amber-200">
                    Festive Luxe
                  </p>

                  <h3 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
                    Grace That
                    <span className="block italic text-[#f4cb84]">
                      Speaks for Itself
                    </span>
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
                    Elegant craftsmanship, flattering cuts and premium details
                    designed to bring effortless sophistication to every look.
                  </p>

                  <Link
                    href="/#collection"
                    className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#f2c978] px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#421225] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#f8d999]"
                  >
                    Explore Collection

                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="flex flex-col gap-6 lg:col-span-5">
            {/* image card */}

            <div className="group relative flex-1 overflow-hidden rounded-[30px] bg-[#ece0d8] shadow-[0_25px_60px_rgba(78,21,42,0.12)]">
              <div className="relative min-h-[420px] lg:min-h-[480px]">
                <Image
                  src="/hiran.png"
                  alt="Elegant festive ethnic fashion"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#32101c]/75 via-transparent to-transparent" />

                <div className="pointer-events-none absolute inset-4 rounded-[22px] border border-white/20" />

                <div className="absolute bottom-7 left-7 right-7">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-amber-100">
                    Refined Tradition
                  </span>

                  <h3 className="mt-2 font-serif text-3xl text-white sm:text-4xl">
                    Timeless Indian
                    <span className="block italic text-[#f5d28d]">
                      Elegance
                    </span>
                  </h3>
                </div>
              </div>
            </div>

            {/* statement card */}

            <div className="relative overflow-hidden rounded-[28px] bg-[#641a37] p-7 text-white shadow-[0_20px_50px_rgba(75,15,39,0.18)] sm:p-8">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/[0.06]" />

              <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full border border-white/[0.06]" />

              <Sparkles className="mb-5 h-5 w-5 text-amber-300" />

              <p className="font-serif text-2xl leading-snug sm:text-3xl">
                Made for the moments
                <span className="block italic text-[#f3ca83]">
                  you want to remember.
                </span>
              </p>

              <p className="mt-4 max-w-sm text-xs leading-6 text-white/65">
                From festive gatherings to intimate celebrations, our
                collections bring comfort, confidence and beautiful detailing
                together.
              </p>
            </div>
          </div>
        </div>

        {/* ================================================= */}
        {/* BOTTOM FEATURES */}
        {/* ================================================= */}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-2xl border border-[#f0e0d9] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#fbefea]">
              <Gem className="h-5 w-5 text-[#7a1738]" />
            </div>

            <h4 className="text-sm font-semibold text-[#32121f]">
              Premium Fabrics
            </h4>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Selected for graceful fall, softness and lasting comfort.
            </p>
          </div>

          <div className="group rounded-2xl border border-[#f0e0d9] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#fbefea]">
              <Sparkles className="h-5 w-5 text-[#7a1738]" />
            </div>

            <h4 className="text-sm font-semibold text-[#32121f]">
              Detailed Craftsmanship
            </h4>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Thoughtful embroidery and finishing that elevate every outfit.
            </p>
          </div>

          <div className="group rounded-2xl border border-[#f0e0d9] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#fbefea]">
              <Heart className="h-5 w-5 text-[#7a1738]" />
            </div>

            <h4 className="text-sm font-semibold text-[#32121f]">
              Designed With Love
            </h4>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Pieces made to feel special from the first wear.
            </p>
          </div>

          <div className="group rounded-2xl border border-[#f0e0d9] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#fbefea]">
              <ShieldCheck className="h-5 w-5 text-[#7a1738]" />
            </div>

            <h4 className="text-sm font-semibold text-[#32121f]">
              Quality Assured
            </h4>

            <p className="mt-1 text-xs leading-5 text-gray-500">
              Carefully checked to ensure a premium shopping experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}