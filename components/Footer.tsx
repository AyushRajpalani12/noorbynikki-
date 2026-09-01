"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

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

  return (
    <footer className="relative overflow-hidden bg-[#f8f3ea] text-[#343434] border-t border-[#e5dccd]">
      
      {/* LEFT FLORAL DESIGN */}
      <img
        src="/footer-left.png"
        alt="Floral Left"
        className="
          absolute
          left-0
          top-0
          h-full
          w-[170px]
          lg:w-[230px]
          object-cover
          object-left
          pointer-events-none
          select-none
          hidden
          md:block
        "
      />

      {/* RIGHT FLORAL DESIGN */}
      <img
        src="/footer-right.png"
        alt="Floral Right"
        className="
          absolute
          right-0
          top-0
          h-full
          w-[170px]
          lg:w-[230px]
          object-cover
          object-right
          pointer-events-none
          select-none
          hidden
          md:block
        "
      />

      {/* MAIN CONTAINER */}
      <div className="relative z-10 max-w-[1250px] mx-auto px-6 md:px-12 lg:px-16">

        {/* FOOTER COLUMNS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 pt-14 lg:pt-16 pb-14">

          {/* ================= MY ACCOUNT ================= */}
          <div>
            <h4 className="text-[15px] font-medium tracking-[2px] uppercase mb-5">
              My Account
            </h4>

            <ul className="space-y-3 text-[14px] text-[#4a4a4a]">

              <li>
                <Link
                  href="/account"
                  className="flex items-center gap-2 hover:text-[#b27a22] transition-colors duration-300"
                >
                  <span className="text-[18px] leading-none">›</span>
                  My Account
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="flex items-center gap-2 hover:text-[#b27a22] transition-colors duration-300"
                >
                  <span className="text-[18px] leading-none">›</span>
                  Register
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="flex items-center gap-2 hover:text-[#b27a22] transition-colors duration-300"
                >
                  <span className="text-[18px] leading-none">›</span>
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/orders"
                  className="flex items-center gap-2 hover:text-[#b27a22] transition-colors duration-300"
                >
                  <span className="text-[18px] leading-none">›</span>
                  View Order
                </Link>
              </li>

              <li>
                <Link
                  href="/track"
                  className="flex items-center gap-2 hover:text-[#b27a22] transition-colors duration-300"
                >
                  <span className="text-[18px] leading-none">›</span>
                  Track Your Shipment
                </Link>
              </li>

            </ul>

            {/* PAYMENT METHODS */}
            <div className="mt-7">

              <h5 className="text-[13px] font-medium tracking-[1px] uppercase mb-3">
                We Accept
              </h5>

              <div className="flex items-center gap-1.5 flex-wrap">

                {/* VISA */}
                <div className="bg-white border border-gray-300 px-2 py-1 text-[9px] font-bold text-blue-800 shadow-sm">
                  VISA
                </div>

                {/* MASTERCARD */}
                <div className="bg-white border border-gray-300 px-1.5 py-1 text-[9px] font-bold">
                  <span className="text-red-600">Master</span>
                  <span className="text-yellow-600">Card</span>
                </div>

                {/* MAESTRO */}
                <div className="bg-white border border-gray-300 px-1.5 py-1 text-[9px] font-bold text-blue-600">
                  Maestro
                </div>

                {/* NET BANKING */}
                <div className="bg-white border border-gray-300 px-1.5 py-1 text-[8px] font-semibold text-gray-600">
                  NET
                  <br />
                  BANKING
                </div>

              </div>

            </div>
          </div>


          {/* ================= CUSTOMER SERVICE ================= */}
          <div>
            <h4 className="text-[15px] font-medium tracking-[2px] uppercase mb-5">
              Customer Service
            </h4>

            <ul className="space-y-3 text-[14px] text-[#4a4a4a]">

              <li>
                <Link
                  href="/privacy-policy"
                  className="flex items-center gap-2 hover:text-[#b27a22] transition-colors duration-300"
                >
                  <span className="text-[18px] leading-none">›</span>
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="flex items-center gap-2 hover:text-[#b27a22] transition-colors duration-300"
                >
                  <span className="text-[18px] leading-none">›</span>
                  Terms & Condition
                </Link>
              </li>

              <li>
                <Link
                  href="/cancellation-returns"
                  className="flex items-center gap-2 hover:text-[#b27a22] transition-colors duration-300"
                >
                  <span className="text-[18px] leading-none">›</span>
                  Cancellation, Shipping & Return Policy
                </Link>
              </li>

            </ul>
          </div>


          {/* ================= INFORMATION ================= */}
          <div>
            <h4 className="text-[15px] font-medium tracking-[2px] uppercase mb-5">
              Information
            </h4>

            <ul className="space-y-3 text-[14px] text-[#4a4a4a]">

              <li>
                <Link
                  href="/about"
                  className="flex items-center gap-2 hover:text-[#b27a22] transition-colors duration-300"
                >
                  <span className="text-[18px] leading-none">›</span>
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="flex items-center gap-2 hover:text-[#b27a22] transition-colors duration-300"
                >
                  <span className="text-[18px] leading-none">›</span>
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  href="/why-us"
                  className="flex items-center gap-2 hover:text-[#b27a22] transition-colors duration-300"
                >
                  <span className="text-[18px] leading-none">›</span>
                  Why Choose Us
                </Link>
              </li>

              <li>
                <Link
                  href="/certificate"
                  className="flex items-center gap-2 hover:text-[#b27a22] transition-colors duration-300"
                >
                  <span className="text-[18px] leading-none">›</span>
                  Our Certificate
                </Link>
              </li>

              <li>
                <Link
                  href="/how-to-order"
                  className="flex items-center gap-2 hover:text-[#b27a22] transition-colors duration-300"
                >
                  <span className="text-[18px] leading-none">›</span>
                  How To Order
                </Link>
              </li>

              <li>
                <Link
                  href="/logistics"
                  className="flex items-center gap-2 hover:text-[#b27a22] transition-colors duration-300"
                >
                  <span className="text-[18px] leading-none">›</span>
                  Logistics Partner
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 hover:text-[#b27a22] transition-colors duration-300"
                >
                  <span className="text-[18px] leading-none">›</span>
                  Contact Us
                </Link>
              </li>

            </ul>
          </div>


          {/* ================= CONTACT US ================= */}
          <div>
            <h4 className="text-[15px] font-medium tracking-[2px] uppercase mb-5">
              Contact Us
            </h4>

            {/* ADDRESS */}
            <div className="flex items-start gap-3 mb-5">

              <div className="w-10 h-10 shrink-0 rounded-full border border-[#c99a48] flex items-center justify-center text-[#b27a22]">
                <MapPin size={16} strokeWidth={1.8} />
              </div>

              <p className="text-[14px] leading-6 text-[#4a4a4a]">
               Sumit digitech Pvt Ltd Jaipur 
               MAnsarovar Jaipur , Rajsthan
              </p>

            </div>


            {/* PHONE */}
            <div className="flex items-center gap-3 mb-4">

              <div className="w-10 h-10 shrink-0 rounded-full border border-[#c99a48] flex items-center justify-center text-[#b27a22]">
                <Phone size={15} strokeWidth={1.8} />
              </div>

              <a
                href="tel:+918385973582"
                className="text-[14px] hover:text-[#b27a22] transition-colors"
              >
                +91 837748438734
              </a>

            </div>


            {/* EMAIL */}
            <div className="flex items-center gap-3 mb-5">

              <div className="w-10 h-10 shrink-0 rounded-full border border-[#c99a48] flex items-center justify-center text-[#b27a22]">
                <Mail size={15} strokeWidth={1.8} />
              </div>

              <a
                href="mailto:Support@Royalexport.in"
                className="text-[14px] hover:text-[#b27a22] transition-colors"
              >
                sumitdigitech@gmail.com
              </a>

            </div>


            {/* SOCIAL MEDIA */}
            <div className="flex items-center gap-3 mt-5">

              {/* FACEBOOK */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-[#c99a48] flex items-center justify-center text-[#b27a22] hover:bg-[#b27a22] hover:text-white transition-all duration-300"
              >
                <svg
                  className="w-[17px] h-[17px] fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M14 8h3V4h-3c-3.3 0-6 2.7-6 6v2H5v4h3v8h4v-8h3.5l.5-4H12v-2c0-1.1.9-2 2-2z" />
                </svg>
              </a>


              {/* PINTEREST */}
              <a
                href="#"
                aria-label="Pinterest"
                className="w-10 h-10 rounded-full border border-[#c99a48] flex items-center justify-center text-[#b27a22] hover:bg-[#b27a22] hover:text-white transition-all duration-300"
              >
                <span className="font-bold text-[16px]">
                  P
                </span>
              </a>


              {/* INSTAGRAM */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-[#c99a48] flex items-center justify-center text-[#b27a22] hover:bg-[#b27a22] hover:text-white transition-all duration-300"
              >
                <svg
                  className="w-[17px] h-[17px] fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 12 16.5 4.5 4.5 0 0 0 12 7.5zm0 2A2.5 2.5 0 1 1 12 14.5 2.5 2.5 0 0 1 12 9.5zm5-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
              </a>


              {/* YOUTUBE */}
              <a
                href="#"
                aria-label="Youtube"
                className="w-10 h-10 rounded-full border border-[#c99a48] flex items-center justify-center text-[#b27a22] hover:bg-[#b27a22] hover:text-white transition-all duration-300"
              >
                <svg
                  className="w-[19px] h-[19px] fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.5 15.6V8.4L15.8 12l-6.3 3.6z" />
                </svg>
              </a>

            </div>

          </div>

        </div>


        {/* COPYRIGHT */}
        <div className="border-t border-[#ded5c7] py-5 text-left text-[13px] text-[#555]">
          © {year || "2026"} Royal Export . All Rights Reserved.
        </div>

      </div>


      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Chat"
        className="
          fixed
          bottom-6
          right-6
          z-50
          w-14
          h-14
          bg-[#25D366]
          text-white
          rounded-full
          shadow-xl
          flex
          items-center
          justify-center
          hover:scale-110
          transition-all
          duration-300
        "
      >
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>

    </footer>
  );
}