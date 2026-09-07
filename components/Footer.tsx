'use client';

import React, { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
// sugfaguuafoitgofdiu
export default function Footer() {
  const [year, setYear] = useState<number | string>("");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const whatsappNumber = "918385973582";

  const whatsappMessage = encodeURIComponent(
    "Hello! I have a query regarding your ethnic suit collection."
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const serviceLinks = [
    {
      name: "Privacy Policy",
    },
    {
      name: "Terms & Condition",
    },
    {
      name: "Cancellation, Shipping & Return Policy",
    },
  ];

  const informationLinks = [
    {
      name: "About Us",
    },
    {
      name: "FAQ",
    },
    {
      name: "Why Choose Us",
    },
    {
      name: "Our Certificate",
    },
    {
      name: "How To Order",
    },
    {
      name: "Logistics Partner",
    },
    {
      name: "Contact Us",
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden border-t border-[#d9cdbd] bg-[#f8f3ea] text-[#343434]">

      {/* =====================================================
          LEFT FLORAL DESIGN
      ===================================================== */}
      <img
        src="/footer-left.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-0
          top-0
          z-0
          h-full
          w-[100px]
          sm:w-[140px]
          lg:w-[205px]
          object-cover
          object-left
          opacity-65
          sm:opacity-75
          select-none
        "
      />

      {/* =====================================================
          RIGHT FLORAL DESIGN
      ===================================================== */}
      <img
        src="/footer-right.png"
        alt=""
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-0
          top-0
          z-0
          h-full
          w-[100px]
          sm:w-[140px]
          lg:w-[205px]
          object-cover
          object-right
          opacity-65
          sm:opacity-75
          select-none
        "
      />

      {/* =====================================================
          CENTER READABILITY LAYER
      ===================================================== */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          bg-gradient-to-r
          from-[#f8f3ea]/70
          via-[#f8f3ea]/95
          to-[#f8f3ea]/70
          sm:from-[#f8f3ea]/35
          sm:via-[#f8f3ea]/95
          sm:to-[#f8f3ea]/35
        "
      />

      {/* =====================================================
          MAIN CONTAINER
      ===================================================== */}
      <div className="relative z-10 mx-auto max-w-[1180px] px-5 sm:px-10 lg:px-16">

        {/* TOP DECORATION */}
        <div className="flex items-center justify-center gap-3 pt-8 sm:pt-10">
          <span className="h-px w-10 sm:w-12 bg-[#b88a3b]" />
          <span className="h-2 w-2 rotate-45 border border-[#a7193b] bg-[#a7193b]" />
          <span className="h-px w-10 sm:w-12 bg-[#b88a3b]" />
        </div>

        {/* =====================================================
            THREE COLUMN FOOTER
        ===================================================== */}
        <div
          className="
            grid
            grid-cols-1
            gap-8
            py-8
            sm:gap-10
            sm:py-10
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-16
            lg:py-12
          "
        >

          {/* =================================================
              CUSTOMER SERVICE
          ================================================= */}
          <div>
            <h3
              className="
                mb-3 sm:mb-4
                font-serif
                text-[17px] sm:text-[19px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-[#20252b]
              "
            >
              Customer Service
            </h3>
            <div className="mb-5 sm:mb-6 h-px w-12 bg-[#b88a3b]" />

            <ul className="space-y-3.5 sm:space-y-4">
              {serviceLinks.map((item) => (
                <li key={item.name} className="cursor-pointer group">
                  <div
                    className="
                      flex
                      items-start
                      gap-2.5
                      text-[13px] sm:text-[14px]
                      leading-6
                      text-[#4f4a44]
                      transition-colors
                      duration-300
                      group-hover:text-[#a7193b]
                    "
                  >
                    <ChevronRight
                      size={15}
                      strokeWidth={1.8}
                      className="
                        mt-1
                        shrink-0
                        text-[#a87928]
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                        group-hover:text-[#a7193b]
                      "
                    />
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">{item.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>


          {/* =================================================
              INFORMATION
          ================================================= */}
          <div>
            <h3
              className="
                mb-3 sm:mb-4
                font-serif
                text-[17px] sm:text-[19px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-[#20252b]
              "
            >
              Information
            </h3>
            <div className="mb-5 sm:mb-6 h-px w-12 bg-[#b88a3b]" />

            <ul className="space-y-3 sm:space-y-3.5">
              {informationLinks.map((item) => (
                <li key={item.name} className="cursor-pointer group">
                  <div
                    className="
                      flex
                      items-center
                      gap-2.5
                      text-[13px] sm:text-[14px]
                      text-[#4f4a44]
                      transition-colors
                      duration-300
                      group-hover:text-[#a7193b]
                    "
                  >
                    <ChevronRight
                      size={15}
                      strokeWidth={1.8}
                      className="
                        shrink-0
                        text-[#a87928]
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                        group-hover:text-[#a7193b]
                      "
                    />
                    <span className="transition-transform duration-300 group-hover:translate-x-0.5">{item.name}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>


          {/* =================================================
              CONTACT US
          ================================================= */}
          <div>
            <h3
              className="
                mb-3 sm:mb-4
                font-serif
                text-[17px] sm:text-[19px]
                font-semibold
                uppercase
                tracking-[0.08em]
                text-[#20252b]
              "
            >
              Contact Us
            </h3>
            <div className="mb-5 sm:mb-6 h-px w-12 bg-[#b88a3b]" />

            {/* ADDRESS */}
            <div className="mb-5 sm:mb-6 flex items-start gap-3">
              <div
                className="
                  flex
                  h-9 w-9 sm:h-10 sm:w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#c69b51]
                  bg-[#fffaf3]
                  text-[#a87928]
                  shadow-sm
                "
              >
                <MapPin size={16} strokeWidth={1.7} />
              </div>
              <div>
                <p
                  className="
                    mb-0.5 sm:mb-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-[#917e69]
                  "
                >
                  Visit Us
                </p>
                <p className="text-[13px] sm:text-[14px] leading-5 sm:leading-6 text-[#4f4a44]">
                  Sumit Digitech Pvt Ltd
                  <br />
                  Mansarovar, Jaipur
                  <br />
                  Rajasthan, India
                </p>
              </div>
            </div>

            {/* PHONE */}
            <div className="mb-5 sm:mb-6 flex items-center gap-3">
              <div
                className="
                  flex
                  h-9 w-9 sm:h-10 sm:w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#c69b51]
                  bg-[#fffaf3]
                  text-[#a87928]
                  shadow-sm
                "
              >
                <Phone size={15} strokeWidth={1.7} />
              </div>
              <div>
                <p
                  className="
                    mb-0.5 sm:mb-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-[#917e69]
                  "
                >
                  Call Us
                </p>
                <a
                  href="tel:+91837748438734"
                  className="
                    text-[13px] sm:text-[14px]
                    text-[#4f4a44]
                    transition-colors
                    duration-300
                    hover:text-[#a7193b]
                  "
                >
                  +91 837748438734
                </a>
              </div>
            </div>

            {/* EMAIL */}
            <div className="mb-6 sm:mb-7 flex items-center gap-3">
              <div
                className="
                  flex
                  h-9 w-9 sm:h-10 sm:w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#c69b51]
                  bg-[#fffaf3]
                  text-[#a87928]
                  shadow-sm
                "
              >
                <Mail size={15} strokeWidth={1.7} />
              </div>
              <div className="min-w-0">
                <p
                  className="
                    mb-0.5 sm:mb-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.15em]
                    text-[#917e69]
                  "
                >
                  Email Us
                </p>
                <a
                  href="mailto:sumitdigitech@gmail.com"
                  className="
                    break-all
                    text-[13px] sm:text-[14px]
                    text-[#4f4a44]
                    transition-colors
                    duration-300
                    hover:text-[#a7193b]
                  "
                >
                  sumitdigitech@gmail.com
                </a>
              </div>
            </div>

            {/* SOCIAL ICONS */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* FACEBOOK */}
              <a
                href="#"
                aria-label="Facebook"
                className="
                  flex
                  h-9 w-9 sm:h-10 sm:w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#c69b51]
                  bg-[#fffaf3]
                  text-[#a87928]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#a7193b]
                  hover:text-white
                  hover:shadow-lg
                "
              >
                <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-current">
                  <path d="M14 8h3V4h-3c-3.3 0-6 2.7-6 6v2H5v4h3v8h4v-8h3.5l.5-4H12v-2c0-1.1.9-2 2-2z" />
                </svg>
              </a>

              {/* PINTEREST */}
              <a
                href="#"
                aria-label="Pinterest"
                className="
                  flex
                  h-9 w-9 sm:h-10 sm:w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#c69b51]
                  bg-[#fffaf3]
                  text-[#a87928]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#a7193b]
                  hover:text-white
                  hover:shadow-lg
                "
              >
                <span className="font-serif text-[16px] sm:text-[18px] font-bold">
                  P
                </span>
              </a>

              {/* INSTAGRAM */}
              <a
                href="#"
                aria-label="Instagram"
                className="
                  flex
                  h-9 w-9 sm:h-10 sm:w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#c69b51]
                  bg-[#fffaf3]
                  text-[#a87928]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#a7193b]
                  hover:text-white
                  hover:shadow-lg
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-[16px] w-[16px] fill-none stroke-current"
                  strokeWidth="1.8"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>

              {/* YOUTUBE */}
              <a
                href="#"
                aria-label="Youtube"
                className="
                  flex
                  h-9 w-9 sm:h-10 sm:w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#c69b51]
                  bg-[#fffaf3]
                  text-[#a87928]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-[#a7193b]
                  hover:text-white
                  hover:shadow-lg
                "
              >
                <svg viewBox="0 0 24 24" className="h-[16px] w-[16px] fill-current">
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.5 15.6V8.4L15.8 12l-6.3 3.6z" />
                </svg>
              </a>
            </div>

          </div>

        </div>


        {/* =====================================================
            COPYRIGHT
        ===================================================== */}
        <div className="border-t border-[#d9cdbd]">
          <div
            className="
              flex
              flex-col
              items-center
              justify-between
              gap-2
              py-5
              text-center
              sm:flex-row
              sm:text-left
            "
          >
            <p className="text-[11px] text-[#706860] sm:text-[12px]">
              © {year || "2026"}{" "}
              <span className="font-medium text-[#3f3a35]">
                Royal Export
              </span>
              . All Rights Reserved.
            </p>

            <p className="text-[10px] uppercase tracking-[0.18em] text-[#9a8e80]">
              Crafted With Elegance
            </p>
          </div>
        </div>

      </div>


      {/* =====================================================
          FLOATING WHATSAPP
      ===================================================== */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Chat"
        className="
          fixed
          bottom-4
          right-4
          z-50
          flex
          h-12 w-12 sm:h-14 sm:w-14
          items-center
          justify-center
          rounded-full
          bg-[#25D366]
          text-white
          shadow-[0_8px_25px_rgba(37,211,102,0.35)]
          transition-all
          duration-300
          hover:scale-110
          hover:shadow-[0_12px_30px_rgba(37,211,102,0.45)]
          sm:bottom-6
          sm:right-6
        "
      >
        <svg
          className="h-6 w-6 sm:h-7 sm:w-7 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>

    </footer>
  );
}