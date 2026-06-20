import React from "react";
import { TikaCardData, Language } from "../types";
import { ShieldCheck, Sparkles, AlertCircle, HelpCircle } from "lucide-react";

// Interactive custom simulated high-contrast QR code
const InteractiveQRCode = ({ value }: { value: string }) => (
  <div className="bg-white p-1 rounded-lg shadow-inner flex items-center justify-center border-2 border-cyan-400 group-hover:border-white transition-all duration-300 w-16 h-16 sm:w-20 sm:h-20 shrink-0">
    <svg viewBox="0 0 100 100" className="w-full h-full text-[#071C40]" fill="currentColor">
      {/* Top Left Finder pattern */}
      <rect x="0" y="0" width="28" height="28" />
      <rect x="4" y="4" width="20" height="20" fill="white" />
      <rect x="8" y="8" width="12" height="12" />
      
      {/* Top Right Finder pattern */}
      <rect x="72" y="0" width="28" height="28" />
      <rect x="76" y="4" width="20" height="20" fill="white" />
      <rect x="80" y="8" width="12" height="12" />
      
      {/* Bottom Left Finder pattern */}
      <rect x="0" y="72" width="28" height="28" />
      <rect x="4" y="76" width="20" height="20" fill="white" />
      <rect x="8" y="80" width="12" height="12" />

      {/* Alignment / Timings and Random High-tech binary looking codes */}
      <rect x="36" y="4" width="8" height="4" />
      <rect x="52" y="4" width="6" height="12" />
      <rect x="36" y="14" width="12" height="4" />
      <rect x="42" y="24" width="8" height="8" />
      <rect x="12" y="36" width="12" height="4" />
      <rect x="0" y="46" width="4" height="8" />
      <rect x="20" y="52" width="8" height="4" />
      
      <rect x="76" y="36" width="4" height="12" />
      <rect x="86" y="36" width="8" height="4" />
      <rect x="80" y="46" width="12" height="12" />
      <rect x="84" y="50" width="4" height="4" fill="white" />
      
      <rect x="36" y="76" width="12" height="4" />
      <rect x="56" y="76" width="8" height="12" />
      <rect x="36" y="86" width="12" height="8" />
      <rect x="72" y="86" width="12" height="8" />
      
      <rect x="56" y="36" width="12" height="12" />
      <rect x="60" y="40" width="4" height="4" fill="white" />
      <rect x="40" y="56" width="12" height="8" />
      <rect x="50" y="66" width="8" height="8" />
    </svg>
  </div>
);

// Bangladesh Government Circular Seal component in pure high-fidelity JSX SVG
const BDGovernmentSeal = () => (
  <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-full bg-white p-[1px] shadow-sm flex items-center justify-center">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Outer Green Ring */}
      <circle cx="50" cy="50" r="49" fill="#15803d" />
      <circle cx="50" cy="50" r="41" fill="none" stroke="white" strokeWidth="1.5" />
      
      {/* Crimson Center Circle */}
      <circle cx="50" cy="50" r="34" fill="#b91c1c" />
      
      {/* Golden Bangladesh Map Layout inside red circle */}
      <path 
        d="M 46 25 Q 49 22 53 25 Q 55 28 58 31 Q 59 36 57 41 Q 61 44 65 48 Q 63 52 59 56 Q 59 62 55 66 Q 50 68 45 72 Q 41 68 43 62 Q 45 56 42 50 Q 38 48 37 42 Q 40 37 42 32 Z" 
        fill="#fef08a" 
        stroke="#eab308" 
        strokeWidth="1.5" 
      />
      
      {/* Decorative Golden Dots representing the 4 stars */}
      <circle cx="28" cy="28" r="3.5" fill="#fef08a" />
      <circle cx="72" cy="28" r="3.5" fill="#fef08a" />
      <circle font-family="sans-serif" cx="28" cy="72" r="3.5" fill="#fef08a" />
      <circle cx="72" cy="72" r="3.5" fill="#fef08a" />
    </svg>
  </div>
);

interface BDDigitalTikaCardProps {
  cardData: TikaCardData;
  lang: Language;
  onClick?: () => void;
  className?: string;
  glow?: boolean;
}

export const BDDigitalTikaCard: React.FC<BDDigitalTikaCardProps> = ({
  cardData,
  lang,
  onClick,
  className = "",
  glow = true
}) => {
  const isBn = lang === "bn";

  // Formatted ID split in groups of 4: TK1234 5678 9012
  const formattedId = cardData.healthId || "TK0000 0000 0000";

  return (
    <div 
      onClick={onClick}
      className={`relative w-full max-w-[420px] aspect-[1.586/1] bg-gradient-to-br from-[#021330] via-[#0b2b5d] to-[#124c94] rounded-[22px] p-4 sm:p-5 text-white flex flex-col justify-between overflow-hidden cursor-pointer select-none border border-white/20 shadow-xl transition-all duration-300 group hover:shadow-2xl hover:border-cyan-400/50 ${
        glow ? "shadow-cyan-950/40" : ""
      } ${className}`}
      style={{
        boxShadow: glow 
          ? "0 20px 45px -12px rgba(13, 148, 136, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2)" 
          : "0 10px 25px -5px rgba(0, 0, 0, 0.3)"
      }}
    >
      {/* 1. Fine Security Wave Overlay Line Art (Guilloche Pattern) */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="guilloche" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0,20 Q 10,0 20,20 T 40,20" fill="none" stroke="white" strokeWidth="1" />
              <path d="M 0,10 Q 10,30 20,10 T 40,10" fill="none" stroke="white" strokeWidth="0.5" />
              <path d="M 0,30 Q 10,10 20,30 T 40,30" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="15" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="20" cy="20" r="5" fill="none" stroke="white" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#guilloche)" />
        </svg>
      </div>

      {/* 2. Plastic Card Specular Shimmer Reflex Highlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-white/[0.12] translate-y-[-50%] rotate-12 pointer-events-none transform origin-top-left transition-transform duration-700 ease-out group-hover:translate-x-[20%]"></div>
      
      {/* 3. Subtle background shining orb */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 rounded-full bg-cyan-500/10 blur-[60px] pointer-events-none group-hover:bg-cyan-500/15 transition-all duration-500"></div>

      {/* --- TOP HEADER BANNER --- */}
      <div className="flex justify-between items-start z-10">
        
        {/* Left Side: National Seal with Project branding */}
        <div className="flex items-center gap-2 sm:gap-3">
          <BDGovernmentSeal />
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1">
              <span className="text-[12px] sm:text-[14px] font-black tracking-wider text-white leading-none font-display uppercase group-hover:text-cyan-300 transition-colors">
                {isBn ? "টিকা কার্ড" : "TIKA CARD"}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
            </div>
            
            <span className="text-[6.5px] sm:text-[8px] text-teal-200/90 font-semibold leading-tight tracking-tight max-w-[150px] sm:max-w-xs mt-0.5">
              {isBn ? "জাতীয় ডিজিটাল স্বাস্থ্য পরিচয়পত্র" : "National Digital Health ID Card"}
            </span>

            <span className="text-[5.5px] sm:text-[6.5px] text-white/50 block font-mono tracking-wider">
              {isBn ? "স্বাস্থ্য ও পরিবার কল্যাণ মন্ত্রণালয়" : "HEALTH & FAMILY WELFARE MINISTRY"}
            </span>
          </div>
        </div>

        {/* Right Side: Security Chip and National Flag Emblem */}
        <div className="flex items-center gap-3">
          {/* Smartcard Metal Chip Widget */}
          <div className="w-8 h-6 sm:w-9 sm:h-7 bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-500 rounded-[5px] border border-amber-100 shadow-sm flex flex-col justify-around px-1 relative overflow-hidden shrink-0">
            {/* Fine circuit board style path engravings */}
            <div className="h-px bg-[#b45309]/35 w-full"></div>
            <div className="h-px bg-[#b45309]/35 w-full"></div>
            <div className="h-px bg-[#b45309]/35 w-full"></div>
            <div className="absolute inset-y-0 left-1/3 w-px bg-[#b45309]/30"></div>
            <div className="absolute inset-y-0 right-1/3 w-px bg-[#b45309]/30"></div>
            <div className="w-2.5 h-1.5 bg-yellow-400/90 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-amber-500/20"></div>
          </div>

          {/* Secure NFC contactless smart symbol */}
          <div className="hidden sm:flex flex-col gap-0.5 text-white/50 group-hover:text-cyan-400 font-bold max-sm:scale-75 transition-colors">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c3.95.49 7 3.85 7 7.93s-3.05 7.44-7 7.93V4.07z" />
            </svg>
          </div>
        </div>
      </div>

      {/* --- MIDDLE CARD DETAILS SECTION --- */}
      <div className="grid grid-cols-12 gap-2 sm:gap-3 items-center my-auto z-10">
        
        {/* Left 8 Columns: Health Metrics & Personal Data */}
        <div className="col-span-8 space-y-2 sm:space-y-3 text-left">
          {/* Health ID Area */}
          <div>
            <span className="text-[7px] sm:text-[9.5px] text-cyan-200/90 uppercase tracking-widest font-mono font-black select-none block leading-none">
              {isBn ? "হেলথ আইডি" : "HEALTH ID"}
            </span>
            <span className="text-base sm:text-xl font-extrabold tracking-widest text-[#00FFF0] block font-mono filter drop-shadow-[0_2px_4px_rgba(0,255,240,0.15)] leading-tight mt-0.5 sm:mt-1 font-display">
              {formattedId}
            </span>
          </div>

          {/* Patient Profile Details */}
          <div className="space-y-1">
            {/* Citizens Name */}
            <div>
              <span className="text-[6.5px] sm:text-[8px] text-gray-300 block font-mono tracking-wider leading-none uppercase">
                {isBn ? "নাগরিকের নাম (Name)" : "Citizen Name"}
              </span>
              <span className="text-xs sm:text-base font-bold text-white tracking-wide block truncate mt-0.5">
                {cardData.name}
              </span>
            </div>

            {/* Sub details: Gender, DOB, Blood Group */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 pt-1 border-t border-white/10">
              <div>
                <span className="text-[5.5px] sm:text-[7.5px] text-gray-300 block font-mono leading-none uppercase">
                  {isBn ? "জন্ম তারিখ" : "DOB"}
                </span>
                <span className="text-[9px] sm:text-xs font-bold text-white block mt-0.5 max-sm:tracking-tight">
                  {cardData.dob}
                </span>
              </div>

              <div>
                <span className="text-[5.5px] sm:text-[7.5px] text-gray-300 block font-mono leading-none uppercase">
                  {isBn ? "লিঙ্গ" : "Gender"}
                </span>
                <span className="text-[9px] sm:text-xs font-bold text-teal-100 block truncate mt-0.5">
                  {isBn 
                    ? (cardData.gender === "Female" ? "নারী" : cardData.gender === "Male" ? "পুরুষ" : "অন্যান্য") 
                    : cardData.gender
                  }
                </span>
              </div>

              <div>
                <span className="text-[5.5px] sm:text-[7.5px] text-rose-300 block font-mono leading-none uppercase font-extrabold">
                  {isBn ? "রক্তের গ্রুপ" : "Blood Group"}
                </span>
                <span className="text-[10px] sm:text-xs font-extrabold text-red-400 block mt-0.5">
                  {cardData.bloodGroup}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Columns: Interactive Frame and High-tech Holographic QR */}
        <div className="col-span-4 flex flex-col items-center justify-center pl-1 sm:pl-2 relative">
          {/* Framed QR Code with scanner targeting guide lines */}
          <div className="relative group/qr p-1 rounded-xl bg-slate-950/40 border border-white/10 active:scale-95 transition-transform">
            {/* Neon scanner brackets corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400 rounded-tl-sm pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400 rounded-tr-sm pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400 rounded-bl-sm pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400 rounded-br-sm pointer-events-none"></div>
            
            <InteractiveQRCode value={cardData.qrValue || ""} />
          </div>

          <span className="text-[5px] sm:text-[6px] text-cyan-300 font-mono tracking-widest uppercase mt-1 text-center scale-90 sm:scale-100 block">
            {isBn ? "স্ক্যান ভেরিফাই" : "SCAN TO VERIFY"}
          </span>
        </div>
      </div>

      {/* --- BOTTOM BASE BAR --- */}
      <div className="flex justify-between items-center bg-white/5 border border-white/10 px-2 py-1 rounded-[8px] z-10 text-[6.5px] sm:text-[8px] font-mono leading-none tracking-normal">
        <div className="flex items-center gap-1 hover:text-cyan-300 transition-colors">
          <ShieldCheck className="w-3 h-3 text-emerald-400 animate-pulse shrink-0" />
          <span className="uppercase font-semibold text-gray-200 truncate max-w-[200px] sm:max-w-xs">
            {isBn ? "যুগান্তকারী ডিজিটাল প্রযুক্তি দ্বারা সংরক্ষিত ও পরিচালিত" : "BANGLADESH NATIONAL MEDICAL DATABASE"}
          </span>
        </div>

        <span className="text-cyan-300 font-extrabold tracking-widest text-[5.5px] sm:text-[7.5px] shrink-0 text-right">
          SECURE CARD V4
        </span>
      </div>
    </div>
  );
};
