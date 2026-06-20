/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, Fingerprint, FileText, Bell, HeartHandshake, UserCheck, 
  CheckCircle2, Clock, AlertTriangle, Calendar, Search, Award, 
  Phone, Activity, ArrowRight, Lock, Plus, Download, RefreshCw, 
  Globe, Bot, Sparkles, Menu, X, ChevronDown, QrCode, Stethoscope, Smartphone
} from "lucide-react";

import { 
  Language, Vaccine, TikaCardData, StepItem, StatItem, CategoryItem,
  defaultVaccines, translations, stats, steps, categories, safetyBadges 
} from "./types";

import { BDDigitalTikaCard } from "./components/BDDigitalTikaCard";

// Interactive custom simulated QR code
const QRCodeSVG = ({ value }: { value: string }) => (
  <div className="bg-white p-1 rounded-sm shadow-sm flex items-center justify-center border border-gray-100" style={{ width: '64px', height: '64px' }}>
    <svg viewBox="0 0 100 100" className="w-full h-full text-[#071C40]" fill="currentColor">
      <rect x="0" y="0" width="25" height="25" />
      <rect x="5" y="5" width="15" height="15" fill="white" />
      <rect x="9" y="9" width="7" height="7" />
      
      <rect x="75" y="0" width="25" height="25" />
      <rect x="80" y="5" width="15" height="15" fill="white" />
      <rect x="84" y="8" width="7" height="7" />
      
      <rect x="0" y="75" width="25" height="25" />
      <rect x="5" y="80" width="15" height="15" fill="white" />
      <rect x="9" y="84" width="7" height="7" />

      <rect x="35" y="5" width="10" height="5" />
      <rect x="55" y="5" width="5" height="15" />
      <rect x="35" y="15" width="15" height="5" />
      <rect x="40" y="25" width="10" height="10" />
      <rect x="10" y="35" width="15" height="5" />
      <rect x="0" y="45" width="5" height="10" />
      <rect x="20" y="50" width="10" height="5" />
      
      <rect x="75" y="35" width="5" height="15" />
      <rect x="85" y="35" width="10" height="5" />
      <rect x="80" y="45" width="15" height="15" />
      <rect x="85" y="50" width="5" height="5" fill="white" />
      
      <rect x="35" y="75" width="15" height="5" />
      <rect x="55" y="75" width="10" height="15" />
      <rect x="35" y="85" width="15" height="10" />
      <rect x="70" y="85" width="15" height="10" />
      
      <rect x="55" y="35" width="15" height="15" />
      <rect x="60" y="40" width="5" height="5" fill="white" />
      <rect x="40" y="55" width="15" height="10" />
      <rect x="50" y="65" width="10" height="10" />
    </svg>
  </div>
);

export default function App() {
  const [lang, setLang] = useState<Language>("bn");
  const [panelMode, setPanelMode] = useState<"citizen" | "healthcare">("citizen");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);

  // Default simulated user card matches 'Sadia Islam' from the image
  const initialCard: TikaCardData = {
    healthId: "TK1234 5678 9012",
    name: "Sadia Islam",
    gender: "Female",
    dob: "2015-01-15",
    nidOrBirthCert: "20151234567890123",
    bloodGroup: "O+",
    phone: "01712-345678",
    allergies: "Dust Allergy (ধুলোবালির অ্যালার্জি)",
    emergencyContact: "01712-345678",
    qrValue: "TIKA-CARD:SadiaIslam:TK123456789012:2015-01-15:O+",
    vaccines: [...defaultVaccines],
  };

  const [currentCard, setCurrentCard] = useState<TikaCardData>(initialCard);
  const [allRegisteredCards, setAllRegisteredCards] = useState<TikaCardData[]>([initialCard]);
  
  // Card Generator Form States
  const [formName, setFormName] = useState("");
  const [formGender, setFormGender] = useState("Female");
  const [formDob, setFormDob] = useState("");
  const [formNidBirth, setFormNidBirth] = useState("");
  const [formBlood, setFormBlood] = useState("O+");
  const [formPhone, setFormPhone] = useState("");
  const [formAllergies, setFormAllergies] = useState("");
  const [formEmergency, setFormEmergency] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccessMessage, setFormSuccessMessage] = useState("");

  // AI Chat States
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    { sender: "ai", text: translations[lang].welcomeAi }
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Lifespan immunizations active tab
  const [activeLifespanTab, setActiveLifespanTab] = useState<"birth" | "child" | "adolescent" | "adult" | "senior">("child");

  // Ecosystem active hub details modal/card info
  const [activeEcosystemHub, setActiveEcosystemHub] = useState<string | null>(null);

  // Scanner modal or verify health ID
  const [searchHealthId, setSearchHealthId] = useState("");
  const [verifyResult, setVerifyResult] = useState<TikaCardData | null>(null);
  const [verificationError, setVerificationError] = useState("");
  const [cameraScanActive, setCameraScanActive] = useState(false);

  // Custom data adding in healthcare mode
  const [newVacName, setNewVacName] = useState("");
  const [newVacDisease, setNewVacDisease] = useState("");
  const [newVacDose, setNewVacDose] = useState("");
  const [newVacSchedule, setNewVacSchedule] = useState("");
  const [adminStatusMsg, setAdminStatusMsg] = useState("");

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, aiLoading]);

  // Update welcome text in chat when language changes
  useEffect(() => {
    setChatMessages([
      { sender: "ai", text: translations[lang].welcomeAi }
    ]);
  }, [lang]);

  const t = translations[lang];

  // Quick prompt questions for the AI assistant
  const samplePrompts = {
    bn: [
      "শিশুদের বিসিজি (BCG) টিকা কখন দেওয়া উচিত?",
      "কোভিড বুস্টার টিকা কত মাস বিরতিতে নেওয়া যায়?",
      "গর্ভবতী মায়েদের ধনুষ্টঙ্কারের টিকা কখন প্রয়োজন?",
      "টিকা দেওয়ার পর জ্বর আসলে করণীয় কি?"
    ],
    en: [
      "When should children receive the BCG vaccine?",
      "How many months gap is needed for COVID-19 booster?",
      "When do pregnant mothers need the Tetanus vaccine?",
      "What to do if a child gets a fever after vaccination?"
    ]
  };

  // Generate unique randomized Health ID
  const generateHealthId = () => {
    const part1 = Math.floor(1000 + Math.random() * 9000);
    const part2 = Math.floor(1000 + Math.random() * 9000);
    const part3 = Math.floor(1000 + Math.random() * 9000);
    return `TK${part1} ${part2} ${part3}`;
  };

  // Handle generating national ID card
  const handleGenerateCard = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormSuccessMessage("");

    if (!formName || !formDob || !formNidBirth || !formPhone) {
      setFormError(t.emptyFieldErr);
      return;
    }

    // Validation
    const cleanNid = formNidBirth.replace(/\s+/g, "");
    if (cleanNid.length !== 10 && cleanNid.length !== 17) {
      setFormError(t.nidLengthErr);
      return;
    }

    const cleanPhone = formPhone.replace(/\s+/g, "");
    if (cleanPhone.length < 11) {
      setFormError(t.phoneLengthErr);
      return;
    }

    const generatedId = generateHealthId();

    const newCard: TikaCardData = {
      healthId: generatedId,
      name: formName,
      gender: formGender,
      dob: formDob,
      nidOrBirthCert: formNidBirth,
      bloodGroup: formBlood,
      phone: formPhone,
      allergies: formAllergies || (lang === "bn" ? "কোনোটিই নয়" : "None"),
      emergencyContact: formEmergency || "None",
      qrValue: `TIKA-CARD:${formName}:${generatedId}:${formDob}:${formBlood}`,
      vaccines: defaultVaccines.map(v => ({ ...v, status: Math.random() > 0.5 ? "Completed" : "Pending" })),
    };

    setCurrentCard(newCard);
    setAllRegisteredCards(prev => [...prev, newCard]);
    setFormSuccessMessage(t.cardGeneratedSuccess);
    
    // Smooth scroll to digital wallet screen
    const section = document.getElementById("digital-wallet-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Autofill test data
  const handleAutofillTestData = () => {
    setFormName(lang === "bn" ? "হৃদয় রহমান" : "Hridoy Rahman");
    setFormGender("Male");
    setFormDob("2002-08-25");
    setFormNidBirth("20021234567890123");
    setFormBlood("B+");
    setFormPhone("01755667788");
    setFormAllergies(lang === "bn" ? "পেনিসিলিন এলার্জি" : "Penicillin Allergy");
    setFormEmergency("01811223344");
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;
    
    const userMsg = textToSend.trim();
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");
    setAiLoading(true);

    try {
      // Build client side history
      const historyPayload = chatMessages
        .filter(m => m.text !== translations[lang].welcomeAi)
        .map(m => ({
          role: m.sender === "user" ? "user" : "model",
          text: m.text
        }));

      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg,
          history: historyPayload
        })
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with AI Server");
      }

      const data = await response.json();
      setChatMessages(prev => [...prev, { sender: "ai", text: data.text }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { 
        sender: "ai", 
        text: lang === "bn" 
          ? "দুঃখিত, এআই সার্ভারের সংযোগে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।" 
          : "Sorry, I had trouble reaching the AI health server. Please try again." 
      }]);
    } finally {
      setAiLoading(false);
    }
  };

  // Toggle single vaccine status in the simulated smartphone wallet
  const handleToggleVaccineStatus = (vaccineId: string) => {
    const updatedVaccines = currentCard.vaccines.map(v => {
      if (v.id === vaccineId) {
        const nextStatus = v.status === "Completed" ? "Pending" : "Completed";
        return {
          ...v,
          status: nextStatus as any,
          dateGiven: nextStatus === "Completed" ? new Date().toISOString().substring(0, 10) : undefined
        };
      }
      return v;
    });

    const updatedCard = { ...currentCard, vaccines: updatedVaccines };
    setCurrentCard(updatedCard);
    setAllRegisteredCards(prev => prev.map(c => c.healthId === currentCard.healthId ? updatedCard : c));
  };

  // Verify and look up a card in Provider/Admin mode
  const handleSearchCard = () => {
    setVerificationError("");
    setVerifyResult(null);

    const formattedId = searchHealthId.trim().toUpperCase();
    const found = allRegisteredCards.find(c => c.healthId.replace(/\s+/g, "").toUpperCase() === formattedId.replace(/\s+/g, ""));
    
    if (found) {
      setVerifyResult(found);
    } else {
      setVerificationError(t.cardNotFound);
    }
  };

  // Simulate scanning QR Code
  const handleSimulatedQRScan = () => {
    setCameraScanActive(true);
    setTimeout(() => {
      setCameraScanActive(false);
      setVerifyResult(currentCard);
      setSearchHealthId(currentCard.healthId);
      const audio = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAAAn");
      audio.play().catch(() => {});
    }, 1800);
  };

  // Admin: Insert new custom immunization dose record
  const handleAdminAddVaccine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVacName || !newVacDisease) {
      setAdminStatusMsg(lang === "bn" ? "রং এন্ট্রি! নাম ও রোগ উল্লেখ করুন।" : "Error! Name and Disease are required.");
      return;
    }

    const customVac: Vaccine = {
      id: `v-custom-${Date.now()}`,
      nameBn: newVacName,
      nameEn: newVacName,
      diseaseBn: newVacDisease,
      diseaseEn: newVacDisease,
      scheduleBn: newVacSchedule || (lang === "bn" ? "প্রয়োজনীয় সময়" : "As per requirement"),
      scheduleEn: newVacSchedule || "Needed custom time",
      status: "Completed",
      dose: newVacDose || "১ম ডোজ (Dose 1)",
      dateGiven: new Date().toISOString().substring(0, 10)
    };

    const targetCard = verifyResult || currentCard;
    const updatedCard = {
      ...targetCard,
      vaccines: [customVac, ...targetCard.vaccines]
    };

    if (verifyResult) {
      setVerifyResult(updatedCard);
    }
    setCurrentCard(updatedCard);
    setAllRegisteredCards(prev => prev.map(c => c.healthId === targetCard.healthId ? updatedCard : c));

    setNewVacName("");
    setNewVacDisease("");
    setNewVacDose("");
    setNewVacSchedule("");
    setAdminStatusMsg(lang === "bn" ? "নতুন টিকা সাফল্যজনকভাবে সংযুক্ত করা হয়েছে!" : "New vaccine dose added successfully!");
    
    setTimeout(() => setAdminStatusMsg(""), 4000);
  };

  return (
    <div className="absolute inset-0 overflow-y-auto bg-slate-50 selection:bg-brand-blue selection:text-white" id="main-container">
      {/* Top Banner Alert Bar */}
      <div className="bg-[#04122d] text-white text-xs py-1.5 px-4 flex justify-between items-center border-b border-white/5 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>BD-SECURE PUBLIC REPOSITORY : VER-4.9.0</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>PORTAL SYSTEM CLOUD LIVE</span>
          <span>UTC: {new Date().toISOString().slice(11,19)}</span>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex justify-between items-center">
          
          {/* Government Bangladesh Branding & Portal Logo */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 hover:opacity-90 transition-opacity">
              <svg viewBox="0 0 100 100" className="w-[42px] h-[42px]" fill="none">
                <circle cx="50" cy="50" r="48" fill="#086F7C" />
                <circle cx="50" cy="50" r="42" fill="#E11D48" />
                <circle cx="50" cy="50" r="30" fill="#086F7C" />
                <path d="M40,55 Q50,40 60,55" stroke="white" strokeWidth="4" strokeLinecap="round" />
                <circle cx="50" cy="40" r="5" fill="#FBBF24" />
                <path d="M30,65 Q50,55 70,65" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <div className="hidden lg:flex flex-col text-left">
                <span className="text-[10px] text-gray-500 font-bold leading-tight">{t.govTitle}</span>
                <span className="text-[12px] text-brand-teal font-extrabold leading-tight">{t.govMinistry}</span>
              </div>
            </div>

            <div className="w-[1px] h-8 bg-gray-200 hidden lg:block"></div>

            {/* Tika Card Logo - Matches Blue circular crosses */}
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute w-3.5 h-3.5 rounded-full bg-blue-600 top-0"></div>
                <div className="absolute w-3.5 h-3.5 rounded-full bg-blue-400 left-0"></div>
                <div className="absolute w-3.5 h-3.5 rounded-full bg-cyan-400 right-0"></div>
                <div className="absolute w-3.5 h-3.5 rounded-full bg-[#086F7C] bottom-0"></div>
                <div className="absolute w-1.5 h-1.5 rounded-full bg-white"></div>
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-extrabold tracking-wider text-brand-dark leading-none">{t.tikaCard}</span>
                <span className="text-[9px] text-gray-500 font-semibold leading-none">{t.tikaSub}</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-sm font-semibold text-gray-600">
            <a href="#how-it-works" className="hover:text-brand-blue transition-colors px-1 py-1">{t.howItWorks}</a>
            <a href="#for-whom" className="hover:text-brand-blue transition-colors px-1 py-1">{t.forWhom}</a>
            <a href="#ai-support" className="hover:text-brand-blue transition-colors px-1 py-1">{t.aiSupportTitle}</a>
            <a href="#ecosystem" className="hover:text-brand-blue transition-colors px-1 py-1">{t.ecosystemTitle}</a>
            <a href="#stats" className="hover:text-brand-blue transition-colors px-1 py-1">{t.statsTitle}</a>
          </nav>

          {/* Action and Admin Control Right Toggles */}
          <div className="flex items-center gap-3">
            
            {/* Language Selector */}
            <div className="relative">
              <button 
                onClick={() => setLangDropdown(!langDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
                id="lang-selector-btn"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === "bn" ? "বাংলা" : "English"}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {langDropdown && (
                <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-100 rounded-lg shadow-lg py-1 z-50 animate-fade-in">
                  <button 
                    onClick={() => { setLang("bn"); setLangDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-brand-blue/5 hover:text-brand-blue flex items-center justify-between"
                  >
                    <span>বাংলা</span>
                    {lang === "bn" && <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>}
                  </button>
                  <button 
                    onClick={() => { setLang("en"); setLangDropdown(false); }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-brand-blue/5 hover:text-brand-blue flex items-center justify-between"
                  >
                    <span>English</span>
                    {lang === "en" && <span className="w-1.5 h-1.5 rounded-full bg-brand-blue"></span>}
                  </button>
                </div>
              )}
            </div>

            {/* Workplace Modes switch button */}
            <button 
              onClick={() => setPanelMode(panelMode === "citizen" ? "healthcare" : "citizen")}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                panelMode === "healthcare" 
                  ? "bg-amber-500 border-amber-600 text-white shadow-sm" 
                  : "bg-brand-blue/5 border-brand-blue/10 text-brand-blue hover:bg-brand-blue/10"
              }`}
              id="workspace-toggle-btn"
            >
              {panelMode === "healthcare" ? <Stethoscope className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
              <span>{panelMode === "healthcare" ? t.registerDoc : t.generalCitizen}</span>
            </button>

            {/* Quick Actions login / register */}
            <a 
              href="#generate-section"
              className="px-4 py-1.5 bg-brand-blue text-white rounded-lg text-xs font-bold hover:bg-opacity-95 transition text-center shadow-md shadow-brand-blue/20"
              id="header-cta-btn"
            >
              {t.register}
            </a>

            {/* Mobile Menu Icon */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-1.5 hover:bg-gray-100 rounded-lg text-gray-600"
              id="mobile-hamburguer-btn"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="xl:hidden border-t border-gray-100 bg-white overflow-hidden px-4 py-4 space-y-3 font-semibold text-gray-700"
            >
              <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-brand-blue transition">{t.howItWorks}</a>
              <a href="#for-whom" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-brand-blue transition">{t.forWhom}</a>
              <a href="#ai-support" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-brand-blue transition">{t.aiSupportTitle}</a>
              <a href="#ecosystem" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-brand-blue transition">{t.ecosystemTitle}</a>
              <a href="#stats" onClick={() => setIsMobileMenuOpen(false)} className="block py-2 hover:text-brand-blue transition">{t.statsTitle}</a>
              <hr className="my-2 border-gray-100" />
              <button 
                onClick={() => { setPanelMode(panelMode === "citizen" ? "healthcare" : "citizen"); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-between py-2 text-left text-brand-teal"
              >
                <span>{panelMode === "healthcare" ? t.generalCitizen : t.registerDoc}</span>
                {panelMode === "healthcare" ? <UserCheck className="w-4 h-4" /> : <Stethoscope className="w-4 h-4" />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Interactive Floating AI Assistant Sphere Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setAiChatOpen(!aiChatOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative group p-4 rounded-full text-white bg-gradient-to-r from-brand-blue to-cyan-500 shadow-xl shadow-brand-blue/30 overflow-hidden flex items-center justify-center cursor-pointer"
          id="floating-ai-agent-btn"
        >
          {/* Animated pulsing wave inside */}
          <span className="absolute inset-0 bg-white/20 animate-ping opacity-75 rounded-full"></span>
          <Bot className="w-6 h-6 relative z-10" />
          
          <AnimatePresence>
            {!aiChatOpen && (
              <motion.span 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute right-14 bg-brand-dark border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-md"
              >
                {lang === "bn" ? "এআই সহকারী সাহায্য করুন" : "AI Assistant Help!"}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Floating AI Chat Panel */}
      <AnimatePresence>
        {aiChatOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-11/12 max-w-[420px] h-[550px] bg-white rounded-2xl shadow-2xl z-50 border border-gray-100 flex flex-col overflow-hidden"
            id="ai-chatbot-dialog"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#04122d] to-[#0f3d8c] px-4 py-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full bg-white/15 flex items-center justify-center border border-white/20">
                  <span className="w-2 h-2 rounded-full absolute -top-0.5 -right-0.5 bg-emerald-400 animate-pulse"></span>
                  <Bot className="w-4.5 h-4.5 text-cyan-400" />
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-bold leading-tight tracking-wide uppercase">{t.chatbotTitle}</h4>
                  <span className="text-[9px] text-[#0FD5EE] font-mono leading-none">{t.online}</span>
                </div>
              </div>
              <button 
                onClick={() => setAiChatOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg text-white"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 text-sm">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-start gap-2.5`}
                >
                  {msg.sender === "ai" && (
                    <div className="w-6.5 h-6.5 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue mt-0.5 shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}
                  <div className={`p-3 max-w-[80%] rounded-2xl font-sans leading-relaxed text-left ${
                    msg.sender === "user" 
                      ? "bg-brand-blue text-white rounded-tr-none shadow-md shadow-brand-blue/10" 
                      : "bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm"
                  }`}>
                    {msg.text.split("\n\n").map((chunk, j) => (
                      <p key={j} className="mb-1.5 last:mb-0 whitespace-pre-line">{chunk}</p>
                    ))}
                  </div>
                </div>
              ))}
              
              {aiLoading && (
                <div className="flex justify-start items-center gap-2 text-xs font-medium text-gray-400 font-sans">
                  <div className="w-6.5 h-6.5 rounded-full bg-brand-blue/5 flex items-center justify-center text-brand-blue/50 shrink-0">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  </div>
                  <span>{lang === "bn" ? "এআই সহকারী ভাবছে..." : "Assistant is writing..."}</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Sample Questions List */}
            <div className="px-3 py-2 bg-slate-50 border-t border-gray-100 overflow-x-auto flex gap-1.5 no-scrollbar">
              {samplePrompts[lang].map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(p)}
                  className="px-2.5 py-1 text-[10px] font-bold text-gray-500 bg-white hover:bg-brand-blue/5 hover:text-brand-blue border border-gray-100 hover:border-brand-blue/30 rounded-full shrink-0 transition"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage(chatInput)}
                placeholder={t.aiPlaceholder}
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 focus:border-brand-blue rounded-xl text-xs font-medium focus:outline-none transition font-sans"
              />
              <button 
                onClick={() => handleSendMessage(chatInput)}
                className="p-2 bg-brand-blue text-white hover:bg-opacity-90 transition rounded-xl"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="px-3 py-1 bg-gray-50 text-[8px] text-gray-400 border-t border-gray-100 text-center uppercase font-bold tracking-wider">
              {t.aiDisclaimer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header Section */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-[#ecf7f9] via-white to-white border-b border-gray-100 px-4">
        {/* Floating background glowing grid shapes */}
        <div className="absolute right-0 top-10 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute left-10 bottom-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Hero details side (Left) */}
          <div className="text-left space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0FD5EE]/10 border border-[#0FD5EE]/30 text-[#086F7C] font-extrabold text-xs tracking-wider">
              <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#0e4ba8]" />
              <span>{t.heroBadge}</span>
            </div>

            {/* Display Title */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-gray-900 tracking-tight leading-tight select-none font-display">
              Every Citizen.<br />
              <span className="text-brand-blue">Every Vaccine.</span><br />
              Every Health Record.<br />
              <span className="text-brand-teal">One Secure Platform.</span>
            </h1>

            {/* Bangla Hero description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg font-medium">
              {t.heroDesc}
            </p>

            {/* Core Hero Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a 
                href="#generate-section"
                className="px-6 py-3.5 bg-brand-blue hover:bg-opacity-95 text-white font-extrabold rounded-xl transition flex items-center justify-center gap-2 group text-sm shadow-lg shadow-brand-blue/30"
              >
                <span>{t.getStarted}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#how-it-works"
                className="px-6 py-3.5 bg-white border border-brand-teal/20 hover:border-brand-teal/40 text-brand-teal font-extrabold rounded-xl transition flex items-center justify-center gap-1.5 text-sm"
              >
                <Activity className="w-4 h-4 animate-pulse" />
                <span>{t.howItWorksBtn}</span>
              </a>
            </div>

            {/* Mini Safety Grid directly below Hero Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {safetyBadges.map((badge) => (
                <div key={badge.key} className="flex gap-2 text-left">
                  <div className="mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold text-gray-900 leading-tight">{badge.titleBn}</h5>
                    <p className="text-[9px] text-gray-500 font-medium leading-none mt-0.5">{lang === "bn" ? badge.subtitleBn : badge.subtitleEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Visual side (Right) - Holds Cards Mockups */}
          <div className="relative flex flex-col xl:flex-row items-center justify-center gap-6 py-4">
            
            {/* Glossy Tika Card Container */}
            <motion.div 
              whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full max-w-[380px] shrink-0"
              id="hero-floating-tika-card"
            >
              <BDDigitalTikaCard cardData={currentCard} lang={lang} glow={true} />
            </motion.div>

            {/* Smart Wallet mockup floating device next to card */}
            <motion.div 
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="relative w-full max-w-[245px] bg-[#071C40] rounded-3xl p-3 border-4 border-slate-700 shadow-xl overflow-hidden leading-tight flex-shrink-0 shrink-0 text-white"
            >
              {/* Phone Indicator Bar */}
              <div className="flex justify-between items-center text-[8px] text-gray-400 px-3 pb-2 border-b border-white/5 font-mono">
                <span>09:41</span>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
                <div className="flex gap-1 items-center">
                  <span>5G</span>
                  <div className="w-3.5 h-1.5 border border-gray-400 rounded-sm"></div>
                </div>
              </div>

              <div className="py-2.5 text-left text-xs">
                {/* Patient name greetings */}
                <div className="flex justify-between items-center mb-2.5">
                  <div>
                    <span className="text-[8px] text-gray-400 block">{translations[lang].walletTitle}</span>
                    <span className="font-extrabold block text-cyan-300">{currentCard.name}</span>
                  </div>
                  <Smartphone className="w-4 h-4 text-gray-400" />
                </div>

                {/* Progress Circle bar for completed vaccinations */}
                <div className="bg-sky-950/40 p-2.5 rounded-xl border border-sky-900 mb-2.5">
                  <div className="flex justify-between items-center text-[10px] mb-1.5">
                    <span className="font-bold">{t.allVaccines}</span>
                    <span className="text-cyan-400 font-bold">
                      {currentCard.vaccines.filter(v => v.status === "Completed").length} / {currentCard.vaccines.length}
                    </span>
                  </div>
                  {/* Miniature Vaccine Progress bar */}
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-cyan-400 h-full transition-all duration-500"
                      style={{ width: `${(currentCard.vaccines.filter(v => v.status === "Completed").length / currentCard.vaccines.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Standard Vaccines Small list with interactive toggler */}
                <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
                  {currentCard.vaccines.slice(0, 5).map((vac) => (
                    <div 
                      key={vac.id}
                      onClick={() => handleToggleVaccineStatus(vac.id)}
                      className="p-1.5 rounded bg-[#0f3d8c]/30 hover:bg-[#0f3d8c]/60 border border-white/5 flex justify-between items-center text-[9px] cursor-pointer transition"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${vac.status === 'Completed' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                        <div className="flex flex-col text-left">
                          <span className="font-bold leading-none">{lang === 'bn' ? vac.nameBn : vac.nameEn}</span>
                          <span className="text-[7.5px] text-gray-400 leading-none">{lang === 'bn' ? vac.dose : vac.dose}</span>
                        </div>
                      </div>
                      
                      <span className={`px-1.5 py-0.5 rounded-full text-[7px] font-bold ${
                        vac.status === "Completed" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"
                      }`}>
                        {vac.status === "Completed" ? t.completed : t.pending}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Life stage sliders timeline at bottom header */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-2 bg-white/80 p-2 rounded-2xl border border-gray-100 shadow-sm">
            {(["birth", "child", "adolescent", "adult", "senior"] as any[]).map((stage) => (
              <button
                key={stage}
                onClick={() => setActiveLifespanTab(stage)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${
                  activeLifespanTab === stage 
                    ? "bg-brand-blue text-white shadow-md shadow-brand-blue/20" 
                    : "text-gray-600 hover:bg-slate-100"
                }`}
              >
                {t[stage]}
              </button>
            ))}
          </div>

          {/* Active timeline detailed description card */}
          <div className="mt-4 max-w-2xl mx-auto p-4 bg-[#ecf7f9]/50 border border-[#0FD5EE]/10 rounded-2xl text-xs sm:text-sm font-semibold text-brand-dark animate-fade-in text-center leading-relaxed">
            {activeLifespanTab === "birth" && (
              lang === "bn" 
                ? "👶 নবজাতক ও শিশুজন্ম: জন্মের পরপরই বাধ্যতামূলক বিসিজি (ক্ষয়রোগের বিরোধী) ও হেপাটাইটিস-বি টিকা দিয়ে শিশুর জীবন সুরক্ষা শুরু করুন।"
                : "👶 Birth & Newborn: Ensure early life protection with recommended BCG and Hepatitis B vaccinations administered immediately post birth."
            )}
            {activeLifespanTab === "child" && (
              lang === "bn" 
                ? "👶 শিশু স্বাস্থ্য (১-৫ বছর): পেন্টাভ্যালেন্ট, ওপিভি, পিসিভি, এবং এমআর (হাম-রুবেলা) টিকার ডোজসমূহ সম্পন্ন করুন নিয়মতান্ত্রিক ১০টি রোগ প্রতিরোধের জন্য।"
                : "👶 Childhood Health (1-5 yrs): Complete standard doses of Pentavalent, Oral Polio Vaccine, Pneumococcal Conjugate, and MR vaccines against 10 targeted diseases."
            )}
            {activeLifespanTab === "adolescent" && (
              lang === "bn" 
                ? "👧 কিশোর-কিশোরী (১০-১৮ বছর): টিটি (ধনুষ্টঙ্কার বিষক্রিয়া প্রতিরোধী) ও এইচপিভি (জরায়ু ক্যানসার প্রতিরোধী) টিকা দেওয়ার মোক্ষম সময়।"
                : "👧 Adolescents (10-18 yrs): Prime age for administering Tetanus Toxoid (TT) and Human Papillomavirus (HPV) vaccinations for youth protection."
            )}
            {activeLifespanTab === "adult" && (
              lang === "bn" 
                ? "🧑 প্রাপ্তবয়স্ক মোড়: কোভিড-১৯ টিকা ও বুস্টারস, ইনফ্লুয়েঞ্জা ও হেপাটাইটিস বি স্ক্রীনিং সহ বার্ষিক টিকা ট্র্যাকিং নিশ্চিত করা।"
                : "🧑 Adults (19-59 yrs): Maintain regular digital vaccine history checks, including COVID-19 boosters, Flu shots, and Hepatitis B records."
            )}
            {activeLifespanTab === "senior" && (
              lang === "bn" 
                ? "👵 বয়স্ক নাগরিক: নিউমোকক্কাল নিউমোনিয়া ও ফ্লু প্রতিরোধে নিয়মিত ট্র্যাকিং, বার্ধক্যকালীন দীর্ঘমেয়াদী ভাইরাসের সংক্রমন এড়াতে।"
                : "👵 Senior Citizens (60+ yrs): Prioritize seasonal influenza defenses and Pneumococcal vaccines to guard against acute respiratory infections."
            )}
          </div>
        </div>
      </section>

      {/* "কিভাবে কাজ করে" Step Section */}
      <section id="how-it-works" className="py-20 bg-white border-b border-gray-50 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-display text-center">{t.howItWorksTitle}</h2>
            <div className="w-16 h-1 bg-brand-blue mx-auto rounded-full"></div>
          </div>

          {/* Steps Horizontal Flow Layout with icons */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
            {steps.map((step, idx) => (
              <div key={step.id} className="relative group text-center space-y-4">
                
                {/* Flow SVG arrow connectors between columns in tablets/desktops */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-4 translate-x-1/2 z-10 text-slate-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}

                {/* Beautiful Glowing Rounded ID badge circle */}
                <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-gray-100 group-hover:border-brand-blue/30 group-hover:text-brand-blue flex items-center justify-center mx-auto text-gray-600 transition duration-300 shadow-sm shadow-slate-100/50">
                  {step.id === 1 && <Fingerprint className="w-7 h-7" />}
                  {step.id === 2 && <UserCheck className="w-7 h-7" />}
                  {step.id === 3 && <FileText className="w-7 h-7" />}
                  {step.id === 4 && <Bell className="w-7 h-7 animate-bounce" />}
                  {step.id === 5 && <HeartHandshake className="w-7 h-7" />}
                </div>

                <div className="space-y-1">
                  <h4 className="text-sm font-extrabold text-gray-900">{lang === 'bn' ? step.titleBn : step.titleEn}</h4>
                  <p className="text-xs text-gray-500 font-semibold px-2">{lang === 'bn' ? step.descBn : step.descEn}</p>
                </div>

                {/* Micro numerical item in corner */}
                <span className="absolute top-0 left-1/2 -translate-x-12 bg-gray-200 text-gray-700 text-[10px] font-mono font-bold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                  {step.id}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Side-by-Side: "কাদের জন্য" & "AI স্বাস্থ্য সহায়তা" Bento row */}
      <section id="for-whom" className="py-20 bg-slate-50 border-b border-gray-100 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Card Left: "কাদের জন্য" For Whom */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-gray-100 flex flex-col justify-between text-left space-y-6">
            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold tracking-wider text-brand-teal block">{t.forWhom}</span>
              <h3 className="text-2xl font-black text-gray-900 font-display leading-tight">{t.forWhomTitle}</h3>
              <div className="w-10 h-1 bg-brand-teal rounded-full mt-2"></div>
            </div>

            {/* Avatars Grid List */}
            <div className="space-y-4">
              {categories.map((cat, i) => (
                <div key={i} className="flex items-center gap-4 p-2 hover:bg-slate-50 rounded-xl transition">
                  <img 
                    src={cat.avatarUrl} 
                    alt={cat.nameEn} 
                    className="w-11 h-11 rounded-full object-cover border-2 border-brand-teal/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h5 className="text-sm font-extrabold text-gray-900 leading-tight">{lang === 'bn' ? cat.nameBn : cat.nameEn}</h5>
                    <p className="text-[11px] text-gray-500 leading-none mt-1">
                      {lang === 'bn' ? `${cat.nameBn} জন্য সুরক্ষিত সেবা` : `Secure vaccine protection for ${cat.nameEn.toLowerCase()}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <p className="p-3 bg-[#ecf7f9] text-brand-dark rounded-xl text-xs font-bold font-sans">
              📍 {t.forWhomDesc}
            </p>
          </div>

          {/* Card Right: "AI স্বাস্থ্য সহায়তা" Glowing Assistant visual panel */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-gray-100 text-left space-y-6" id="ai-support">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-brand-blue block">AI Health Copilot</span>
                <h3 className="text-2xl font-black text-brand-blue font-display leading-tight">{t.aiSupportTitle}</h3>
                <div className="w-10 h-1 bg-brand-blue rounded-full mt-2"></div>
              </div>
              
              {/* Quick AI Trigger button */}
              <button 
                onClick={() => setAiChatOpen(true)}
                className="px-4 py-2 bg-brand-blue/10 hover:bg-brand-blue text-brand-blue hover:text-white rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 shadow-sm"
              >
                <Bot className="w-4 h-4" />
                <span>{t.askAi}</span>
              </button>
            </div>

            {/* 2x2 grid representing the features shown in the image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 flex gap-3">
                <Calendar className="w-6 h-6 text-brand-blue shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-extrabold text-gray-900">{t.vaccineForecast}</h4>
                  <p className="text-xs text-gray-500 mt-1">{t.vaccineForecastDesc}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 flex gap-3">
                <AlertTriangle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-extrabold text-gray-900">{t.riskAlert}</h4>
                  <p className="text-xs text-gray-500 mt-1">{t.riskAlertDesc}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 flex gap-3">
                <Clock className="w-6 h-6 text-teal-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-extrabold text-[#086F7C]">{t.healthReminder}</h4>
                  <p className="text-xs text-gray-500 mt-1">{t.healthReminderDesc}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex gap-3">
                <UserCheck className="w-6 h-6 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-extrabold text-indigo-900">{t.fastAppt}</h4>
                  <p className="text-xs text-gray-500 mt-1">{t.fastApptDesc}</p>
                </div>
              </div>
            </div>

            {/* Bottom pulsing centered glows representing AI glowing orb */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-gray-100 flex flex-col items-center text-center space-y-3 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-28 h-28 bg-[#0FD5EE]/10 rounded-full blur-xl animate-pulse"></div>
              
              {/* Spinning AI Orb */}
              <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-brand-blue to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-brand-blue/20">
                <span className="w-full h-full absolute inset-0 bg-brand-blue/30 rounded-full animate-ping"></span>
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-xs font-black tracking-widest text-brand-dark uppercase">{t.smartAdvice}</h4>
                <p className="text-[11px] text-gray-500 font-semibold mt-1 max-w-sm">{t.smartAdviceDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Core Interactive Section: Form Card Generator & Mobile Wallet Drawer */}
      <section id="generate-section" className="py-20 bg-white border-b border-gray-100 px-4">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-xl mx-auto text-center mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold text-gray-900 font-display text-center" id="core-generator-title">
              {lang === "bn" ? "টিকা কার্ড এবং আইডি জেনারেটর" : "Tika Card Generation Workbench"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {lang === "bn" ? "আপনার সঠিক তথ্য দিয়ে এখনই ডিজিটাল টিকা পরিচয়পত্র তৈরি করুন।" : "Provide accurate details to instantly issue your secure health identity document."}
            </p>
            <div className="w-16 h-1 bg-brand-blue mx-auto rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* COLUMN Left: Registration Form (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-gray-100 text-left">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black tracking-widest uppercase text-brand-blue">{lang === 'bn' ? "ডিজিটাল আবেদন পত্র" : "Digital Application Form"}</span>
                <button
                  type="button"
                  onClick={handleAutofillTestData}
                  className="px-2.5 py-1 bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 text-[10px] font-bold rounded-lg border border-amber-500/20 transition flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3 h-3 animate-spin duration-3000" />
                  <span>{lang === "bn" ? "টেস্ট ডেমো তথ্য পূরণ করুন" : "Autofill Test Demo"}</span>
                </button>
              </div>

              {formError && (
                <div className="p-3 mb-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <span>{formError}</span>
                </div>
              )}

              {formSuccessMessage && (
                <div className="p-3 mb-4 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-xs font-semibold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{formSuccessMessage}</span>
                </div>
              )}

              <form onSubmit={handleGenerateCard} className="space-y-4">
                {/* Form row 1: Name & Gender */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">{lang === 'bn' ? "নাগরিকের নাম (Name)" : "Citizen's Full Name"}</label>
                    <input 
                      type="text" 
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder={lang === 'bn' ? "যেমন: সাদিয়া ইসলাম" : "Example: Sadia Islam"}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-brand-blue rounded-xl text-xs focus:outline-none transition font-sans"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">{lang === 'bn' ? "লিঙ্গ (Gender)" : "Gender"}</label>
                    <select 
                      value={formGender}
                      onChange={(e) => setFormGender(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-brand-blue rounded-xl text-xs font-semibold focus:outline-none transition"
                    >
                      <option value="Female">{lang === 'bn' ? "নারী (Female)" : "Female"}</option>
                      <option value="Male">{lang === 'bn' ? "পুরুষ (Male)" : "Male"}</option>
                      <option value="Other">{lang === 'bn' ? "অন্যান্য (Other)" : "Other"}</option>
                    </select>
                  </div>
                </div>

                {/* Form row 2: Birth Date & Blood Group */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">{t.dobLabel}</label>
                    <input 
                      type="date" 
                      value={formDob}
                      onChange={(e) => setFormDob(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-brand-blue rounded-xl text-xs focus:outline-none transition font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">{t.bloodGroupLabel}</label>
                    <select 
                      value={formBlood}
                      onChange={(e) => setFormBlood(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-brand-blue rounded-xl text-xs font-bold focus:outline-none transition"
                    >
                      {["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Form row 3: NID/Birth certificate & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">{t.nidOrBirthLabel}</label>
                    <input 
                      type="text" 
                      value={formNidBirth}
                      onChange={(e) => setFormNidBirth(e.target.value)}
                      placeholder={lang === 'bn' ? "১০ বা ১৭ ডিজিট নম্বর" : "10 or 17 digit identification number"}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-brand-blue rounded-xl text-xs focus:outline-none transition font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">{t.phoneLabel}</label>
                    <input 
                      type="text" 
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="e.g. 01712345678"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-brand-blue rounded-xl text-xs focus:outline-none transition font-mono"
                    />
                  </div>
                </div>

                {/* Optional rows: Allergies & Emergency Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">{t.allergiesLabel}</label>
                    <input 
                      type="text" 
                      value={formAllergies}
                      onChange={(e) => setFormAllergies(e.target.value)}
                      placeholder={lang === 'bn' ? "যেমন: ধুলা এলার্জি, পেনিসিলিন..." : "e.g. penicillin, dust allergy"}
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-brand-blue rounded-xl text-xs focus:outline-none transition font-sans"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 block">{t.emergencyLabel}</label>
                    <input 
                      type="text" 
                      value={formEmergency}
                      onChange={(e) => setFormEmergency(e.target.value)}
                      placeholder="e.g. 01800000000"
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-200 focus:border-brand-blue rounded-xl text-xs focus:outline-none transition font-mono"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-3 bg-brand-blue hover:bg-opacity-95 text-white rounded-xl text-sm font-extrabold shadow-md shadow-brand-blue/20 transition cursor-pointer"
                  id="form-submit-btn"
                >
                  ✨ {t.generateCardBtn}
                </button>
              </form>
            </div>

            {/* COLUMN Right: Generated Output Display & Wallet Toggle (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 text-center" id="digital-wallet-section">
              <span className="text-xs font-black tracking-widest text-brand-teal uppercase block">{lang === 'bn' ? "ডিজিটাল ওয়ালেট এবং লাইভ কার্ড" : "Realtime Digital Wallet & NFC Card Preview"}</span>
              
              {/* Virtual Glowing Tika ID Card */}
              <div className="mx-auto w-full max-w-[380px] shrink-0">
                <BDDigitalTikaCard cardData={currentCard} lang={lang} glow={true} />
              </div>

              {/* Simulated Smartphone Detail view representing "আপনার ডিজিটাল স্বাস্থ্য ওয়ালেট" */}
              <div className="max-w-[360px] mx-auto bg-[#071C40] rounded-3xl p-5 border-4 border-slate-700 text-white shadow-xl">
                {/* Micro Phone top details */}
                <div className="flex justify-between items-center text-[10px] text-gray-400 pb-3 border-b border-white/5 font-mono mb-4">
                  <span>10:30 AM</span>
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                  <div className="flex gap-1 items-center">
                    <span>99%</span>
                    <div className="w-4 h-2 border border-gray-500 rounded-sm bg-cyan-400"></div>
                  </div>
                </div>

                {/* Patient overview header */}
                <div className="flex justify-between items-start text-left mb-4">
                  <div>
                    <span className="text-[8px] text-gray-400 block uppercase font-mono">DIGITAL WALLET PROFILE</span>
                    <h4 className="text-base font-extrabold text-cyan-300 leading-tight block">{currentCard.name}</h4>
                    <span className="text-[9px] text-slate-300 block font-mono">{currentCard.phone}</span>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-full text-[9px] bg-sky-500/20 text-cyan-300 border border-cyan-500/30 font-bold block">
                      {currentCard.bloodGroup}
                    </span>
                  </div>
                </div>

                {/* All vaccines title */}
                <div className="flex justify-between items-center text-xs pb-2 border-b border-white/5 mb-3 font-bold">
                  <span>{t.allVaccines}</span>
                  <span className="text-cyan-400">
                    {currentCard.vaccines.filter(v => v.status === "Completed").length} / {currentCard.vaccines.length}
                  </span>
                </div>

                {/* Active Vaccination Registry inside smartphone view */}
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
                  {currentCard.vaccines.map((vac) => (
                    <div 
                      key={vac.id}
                      onClick={() => handleToggleVaccineStatus(vac.id)}
                      className="p-2 bg-[#0f3d8c]/30 hover:bg-[#0f3d8c]/50 rounded-xl border border-white/5 flex justify-between items-center cursor-pointer transition text-[10px] text-left"
                    >
                      <div className="space-y-0.5">
                        <span className="font-extrabold block text-white">{lang === 'bn' ? vac.nameBn : vac.nameEn}</span>
                        <span className="text-[8.5px] text-slate-400 block">{lang === 'bn' ? vac.diseaseBn : vac.diseaseEn}</span>
                        {vac.dateGiven && (
                          <span className="text-[7.5px] text-cyan-400 font-mono block">Dose given: {vac.dateGiven}</span>
                        )}
                      </div>
                      
                      <div className="text-right shrink-0">
                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-extrabold ${
                          vac.status === "Completed" 
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/10" 
                            : "bg-amber-500/20 text-amber-400 border border-amber-500/10"
                        }`}>
                          {vac.status === 'Completed' ? t.completed : t.pending}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[9px] text-[#0FD5EE] font-mono uppercase text-center font-bold tracking-wider">
                  ✦ {lang === "bn" ? "ট্যাপ করে টিকার স্থিতি পরিবর্তন করুন" : "Click rows to toggle vaccine status"}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* "সংযুক্ত জাতীয় স্বাস্থ্য ইকোসিস্টেম" Network Diagram Section */}
      <section id="ecosystem" className="py-20 bg-slate-50 border-b border-gray-100 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          
          <div className="max-w-xl mx-auto space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-wider text-brand-teal block">{lang === 'bn' ? "জাতীয় ডেটা হাব" : "National Data Hub Integration"}</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-display text-center">{t.ecosystemTitle}</h2>
            <p className="text-xs sm:text-sm text-gray-500 font-semibold">{t.ecosystemSub}</p>
            <div className="w-16 h-1 bg-brand-teal mx-auto rounded-full mt-2"></div>
          </div>

          {/* Connected Diagram Row with responsive lines */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0FD5EE]/5 rounded-full blur-xl"></div>
            
            <div className="grid grid-cols-2 md:grid-cols-7 gap-4 items-center relative z-10">
              
              {[
                { hub: "gov", icon: <Award className="w-6 h-6 text-brand-blue" />, label: t.gov, desc: "নীতি নির্ধারণ ও জাতীয় নজরদারি ভাণ্ডার" },
                { hub: "hospital", icon: <Stethoscope className="w-6 h-6 text-red-500" />, label: t.hospital, desc: "জরুরি চিকিৎসা এবং দীর্ঘমেয়াদী সংক্রামক ট্র্যাকিং" },
                { hub: "clinic", icon: <CheckCircle2 className="w-6 h-6 text-emerald-500" />, label: t.clinic, desc: "পারিবারিক মৌলিক ও শৈশব টিকাদান কার্যক্রম" },
                { hub: "center", icon: <Calendar className="w-6 h-6 text-[#086F7C]" />, label: t.tikaCenter, desc: "উদ্বুদ্ধকরণ ও টিকাদানের মূল বাস্তবায়ন কেন্দ্র" },
                { hub: "lab", icon: <Search className="w-6 h-6 text-indigo-500" />, label: t.lab, desc: "টেস্ট রিপোর্ট ও স্বাস্থ্য ঝুঁকি ডাটা এন্ট্রি" },
                { hub: "pharmacy", icon: <CheckCircle2 className="w-6 h-6 text-amber-500" />, label: t.pharmacy, desc: "মেডিসিন এলার্জি ও জরুরি কড়া নজরদারি" },
                { hub: "citizen", icon: <UserCheck className="w-6 h-6 text-cyan-600" />, label: t.citizen, desc: "নিজস্ব স্বাস্থ্য পরিচয় ধারণকারী নাগরিক সেবাগ্রাহক" },
              ].map((item, idx) => (
                <div 
                  key={item.hub}
                  onClick={() => setActiveEcosystemHub(activeEcosystemHub === item.hub ? null : item.hub)}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer text-center space-y-3 relative ${
                    activeEcosystemHub === item.hub 
                      ? "bg-brand-blue/5 border-brand-blue shadow-md" 
                      : "bg-slate-50/50 border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mx-auto">
                    {item.icon}
                  </div>
                  <h4 className="text-xs font-black text-gray-900 leading-tight">{item.label}</h4>
                  
                  {/* Miniature connection indicators */}
                  {idx < 6 && (
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 text-slate-300 pointer-events-none hidden md:block">
                      <span>↔</span>
                    </div>
                  )}
                </div>
              ))}

            </div>

            {/* Hub interactive description drawer */}
            <AnimatePresence>
              {activeEcosystemHub && (
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8 p-4 bg-slate-50 border border-gray-100 rounded-2xl text-xs sm:text-sm font-semibold text-gray-700 max-w-xl mx-auto block leading-relaxed"
                >
                  📡 <span className="font-bold text-brand-dark">
                    {activeEcosystemHub === 'gov' && t.gov}
                    {activeEcosystemHub === 'hospital' && t.hospital}
                    {activeEcosystemHub === 'clinic' && t.clinic}
                    {activeEcosystemHub === 'center' && t.tikaCenter}
                    {activeEcosystemHub === 'lab' && t.lab}
                    {activeEcosystemHub === 'pharmacy' && t.pharmacy}
                    {activeEcosystemHub === 'citizen' && t.citizen}
                  </span>:{" "}
                  {activeEcosystemHub === 'gov' && (lang === 'bn' ? "জাতীয় নীতি নির্ধারণ ও সার্বিক অগ্রগতি পর্যবেক্ষণ ভাণ্ডার যা সম্পূর্ণ ডিজিটালি সকল বিভাগের সমন্বয় করে।" : "Monitors national coverage statistics, epidemiological threats, and maintains central registry policy structures.")}
                  {activeEcosystemHub === 'hospital' && (lang === 'bn' ? "হাসপাতালে রোগ নির্ণয় কালীন সময়ে টিকা আইডি সার্চ করে রোগীর পূর্ববর্তী টিকা ডাটা দেখা ও জরুরি সংক্রমন সনাক্ত করা।" : "Hospitals instantly pull Tika IDs to learn patient immunogenic status and avoid dangerous drug prescription mix-ups.")}
                  {activeEcosystemHub === 'clinic' && (lang === 'bn' ? "শিশুদের ও মায়েদের মৌলিক টিকাদান রেকর্ড এই প্যানেল থেকে সার্বক্ষণিক আপডেট করা সম্ভব।" : "Rural primary health centers record maternal and child immunization data directly into the centralized ledger.")}
                  {activeEcosystemHub === 'center' && (lang === 'bn' ? "জাতীয় গণটিকাদান ক্যাম্পে দ্রুত কিউআর কোড স্ক্যান করে ডোজ সম্পন্ন নিশ্চিত করার প্রধান কেন্দ্র।" : "Pop-up hubs and camps read scannable QR tags to systematically confirm mass immunization doses without paperwork.")}
                  {activeEcosystemHub === 'lab' && (lang === 'bn' ? "ল্যাব টেস্ট বা রক্ত পরীক্ষার রিপোর্ট যাচাই করে রোগীর দীর্ঘমেয়াদী সংক্রামক ডাটা টিকা প্রোফাইলে সংরক্ষণ করা।" : "Diagnostic hubs write lab findings directly to the sovereign health record, allowing seamless historical medical audits.")}
                  {activeEcosystemHub === 'pharmacy' && (lang === 'bn' ? "মেডিসিন সরবরাহের সময়ে টিকা আইডি ভেরিফাই করে রোগীর ড্রাগ এলার্জি আছে কিনা তা জেনে ঔষধ বিতরণ করা।" : "Sovereign validation helps pharmacists review systemic vaccine history or drug allergies before dispatching high-risk pharmaceuticals.")}
                  {activeEcosystemHub === 'citizen' && (lang === 'bn' ? "টিকা পরিচয়পত্র কার্ড ধারণকারী প্রতিটি নাগরিক যারা যেকোনো সময় দেশের যেকোনো কেন্দ্রে বিনামূল্যে ভেরিফাইড সেবা পাবেন।" : "The key stakeholder who holds complete verified medical sovereignty from birth through lifetime care.")}
                </motion.div>
              )}
            </AnimatePresence>
            
            <p className="text-[10px] sm:text-xs text-gray-400 font-mono mt-6 uppercase leading-none font-bold tracking-wider">
              ✦ {lang === "bn" ? "যেকোনো নোডে ক্লিক করে বিস্তারিত ডিজিটাল সমন্বয় ও নিরাপত্তা সম্পর্কে জানুন" : "Click nodes to learn about decentralized integrated coordinate security"}
            </p>
          </div>
        </div>
      </section>

      {/* Verification & Nurse Panel (Provider Workspace Area) */}
      <section className="py-20 bg-white border-b border-gray-100 px-4" id="provider-panel">
        <div className="max-w-7xl mx-auto">
          
          <div className="max-w-xl mx-auto text-center mb-16 space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-wider bg-amber-500/10 border border-amber-500/20 text-amber-600 px-3 py-1 rounded-full">{t.switchMode}</span>
            <h2 className="text-3xl font-extrabold text-gray-900 font-display text-center" id="provider-workspace-title">
              {lang === "bn" ? "স্বাস্থ্যসেবা কর্মী ও চিকিৎসক প্যানেল" : "Healthcare Provider & Doctor Workbench"}
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium leading-relaxed">
              {lang === "bn" ? "নাগরিকের বা সন্তানের হেলথ আইডি (Health ID) সঠিকতা যাচাই করুন এবং নতুন ভ্যাকসিনের ডাটা এন্ট্রি সম্পন্ন করুন।" : "Validate citizen vaccine passports, inspect scannable QR components, or write historical immunization data."}
            </p>
            <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Left box: Verify Citizen Card by input or mock camera */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-gray-100 text-left space-y-6">
              <span className="text-xs font-black tracking-widest text-[#071C40] uppercase">{lang === 'bn' ? "কিউআর ও কার্ড ভেরিফিকেশন" : "QR & Card Verification Hub"}</span>
              
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    value={searchHealthId}
                    onChange={(e) => setSearchHealthId(e.target.value)}
                    placeholder={lang === 'bn' ? "হেলথ আইডি লিখুন (যেমন: TK1234 5678 9012)" : "Enter Health ID (e.g., TK1234 5678 9012)"}
                    className="flex-1 px-3.5 py-2.5 bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-xs font-mono uppercase focus:outline-none transition leading-tight"
                  />
                  <button 
                    onClick={handleSearchCard}
                    className="px-6 py-2.5 bg-brand-dark hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold transition shrink-0"
                  >
                    {t.search}
                  </button>
                </div>

                <div className="text-center font-bold">
                  <span className="text-[10px] text-gray-400 font-mono block uppercase mb-1">{lang === "bn" ? "অথবা" : "OR"}</span>
                  
                  {cameraScanActive ? (
                    <div className="relative w-full max-w-[280px] h-[160px] bg-black/90 rounded-2xl border-2 border-brand-blue flex flex-col items-center justify-center gap-2 overflow-hidden mx-auto font-mono text-cyan-400 text-[10px]">
                      <div className="absolute inset-x-0 top-1/2 h-[2px] bg-red-500 animate-bounce"></div>
                      <QrCode className="w-8 h-8 animate-pulse text-white" />
                      <span>{lang === "bn" ? "ডিজিটাল স্ক্যানার সক্রিয় হচ্ছে..." : "CAMERA INTERACTIVE SCANNING..."}</span>
                    </div>
                  ) : (
                    <button 
                      onClick={handleSimulatedQRScan}
                      className="inline-flex items-center gap-2 p-3 bg-white hover:bg-slate-100 border border-gray-200 rounded-xl text-xs font-extrabold text-gray-700 transition"
                    >
                      <QrCode className="w-4 h-4 text-brand-blue" />
                      <span>{lang === 'bn' ? "সরাসরি কিউআর কোড স্ক্যান করুন" : "Trigger Live Simulated QR scan"}</span>
                    </button>
                  )}
                </div>

                {/* Verification result receipt display */}
                {verifyResult && (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-xs text-gray-800 space-y-3 font-sans animate-fade-in">
                    <div className="flex gap-2 items-center text-emerald-600 font-extrabold uppercase text-[10px]">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{t.verifySuccess} (Gov Registry Verified)</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 leading-none">
                      <div>
                        <span className="text-[9px] text-gray-500 block">Citizen Full Name</span>
                        <span className="font-bold text-gray-900">{verifyResult.name}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 block">Citizen ID Status</span>
                        <span className="font-bold text-gray-900">{verifyResult.healthId}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 block">Birth Date</span>
                        <span className="font-bold text-gray-900">{verifyResult.dob}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 block">Vitals (Blood)</span>
                        <span className="font-bold text-gray-900">{verifyResult.bloodGroup}</span>
                      </div>
                    </div>
                  </div>
                )}

                {verificationError && (
                  <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-xs font-semibold">
                    ⚠️ {verificationError}
                  </div>
                )}
              </div>
            </div>

            {/* Right box: Admin mock add vaccinations write-only */}
            <div className="bg-slate-50 p-6 sm:p-8 rounded-3xl border border-gray-100 text-left space-y-4">
              <span className="text-xs font-black tracking-widest text-amber-600 uppercase block">{t.addVaccineTitle}</span>

              {adminStatusMsg && (
                <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl text-xs font-semibold">
                  ✓ {adminStatusMsg}
                </div>
              )}

              <form onSubmit={handleAdminAddVaccine} className="space-y-3 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-700 block">{t.vaccineNameLabel}</label>
                    <input 
                      type="text" 
                      value={newVacName}
                      onChange={(e) => setNewVacName(e.target.value)}
                      placeholder="e.g. BCG Booster, HPV Dose 2"
                      className="w-full px-3 py-2 bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-xs focus:outline-none transition leading-tight"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-700 block">{t.diseaseLabel}</label>
                    <input 
                      type="text" 
                      value={newVacDisease}
                      onChange={(e) => setNewVacDisease(e.target.value)}
                      placeholder="e.g. Cervical Cancer (ক্যানসার)"
                      className="w-full px-3 py-2 bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-xs focus:outline-none transition leading-tight"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-700 block">{t.doseLabel}</label>
                    <input 
                      type="text" 
                      value={newVacDose}
                      onChange={(e) => setNewVacDose(e.target.value)}
                      placeholder="e.g. Dose 1, Booster 2"
                      className="w-full px-3 py-2 bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-xs focus:outline-none transition leading-tight"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-700 block">{lang === "bn" ? "টিকার সময়সূচী" : "Vaccination Schedule"}</label>
                    <input 
                      type="text" 
                      value={newVacSchedule}
                      onChange={(e) => setNewVacSchedule(e.target.value)}
                      placeholder="e.g. At age 12, 5 months gap"
                      className="w-full px-3 py-2 bg-white border border-gray-200 focus:border-amber-500 rounded-xl text-xs focus:outline-none transition leading-tight"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-extrabold shadow-sm transition shrink-0 cursor-pointer"
                >
                  ➕ {t.addVaccine}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* "আমাদের অগ্রগতি" Stats Section */}
      <section id="stats" className="py-20 bg-slate-50 border-b border-gray-100 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="max-w-xl mx-auto text-center space-y-3">
            <span className="text-xs uppercase font-extrabold tracking-wider text-brand-blue block">National Metrics</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight font-display text-center">{t.statsTitle}</h2>
            <div className="w-16 h-1 bg-brand-blue mx-auto rounded-full mt-2"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {stats.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gray-100 text-center shadow-sm hover:shadow-md transition-shadow justify-between flex flex-col"
              >
                <span className="text-2xl sm:text-3xl font-black text-brand-blue tracking-tight block font-display leading-none">
                  {lang === 'bn' ? item.valBn : item.valEn}
                </span>
                <span className="text-xs font-extrabold text-gray-600 uppercase tracking-wider block mt-2.5 leading-tight">
                  {lang === 'bn' ? item.labelBn : item.labelEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Banner Area */}
      <footer className="bg-slate-900 text-white">
        
        {/* Banner Alert panel dark cyan */}
        <div className="bg-gradient-to-r from-teal-900  to-emerald-800 text-center py-10 px-4">
          <div className="max-w-4xl mx-auto space-y-3 text-white">
            <ShieldCheck className="w-10 h-10 text-cyan-300 mx-auto animate-pulse" />
            <h3 className="text-xl sm:text-2xl font-black leading-tight">{t.footerText1}</h3>
            <p className="text-xs sm:text-sm text-cyan-100 font-medium">{t.footerText2}</p>
          </div>
        </div>

        {/* Corporate badges list */}
        <div className="max-w-7xl mx-auto px-4 py-8 border-b border-white/5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
          
          <div className="flex justify-center md:justify-start items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <div className="text-left leading-none">
              <span className="text-[12px] font-extrabold text-white block">Data Protection Act 2018</span>
              <span className="text-[10px] text-slate-400 block mt-1">100% Compliant Database</span>
            </div>
          </div>

          <div className="flex justify-center md:justify-start items-center gap-3">
            <Award className="w-8 h-8 text-cyan-400" />
            <div className="text-left leading-none">
              <span className="text-[12px] font-extrabold text-white block">ISO/IEC 27001 Certified</span>
              <span className="text-[10px] text-slate-400 block mt-1">Global Security Standards</span>
            </div>
          </div>

          <div className="flex justify-center md:justify-start items-center gap-3">
            <svg viewBox="0 0 100 100" className="w-8 h-8" fill="none">
              <circle cx="50" cy="50" r="48" fill="#15803d" />
              <circle cx="50" cy="50" r="38" fill="#b91c1c" />
            </svg>
            <div className="text-left leading-none">
              <span className="text-[12px] font-extrabold text-white block">Bangladesh Gov Initiative</span>
              <span className="text-[10px] text-slate-400 block mt-1">Ministry of Welfare Public Services</span>
            </div>
          </div>

        </div>

        {/* Copyright and signature */}
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-[10px] text-slate-500 font-bold uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} Tika Card National Portal System. All rights reserved. Managed by health and family welfare ministries, Bangladesh.</span>
        </div>
      </footer>
    </div>
  );
}
