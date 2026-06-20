export type Language = "bn" | "en";

export interface Vaccine {
  id: string;
  nameBn: string;
  nameEn: string;
  diseaseBn: string;
  diseaseEn: string;
  scheduleBn: string;
  scheduleEn: string;
  status: "Completed" | "Pending" | "Overdue";
  dose: string;
  dateGiven?: string;
}

export interface TikaCardData {
  healthId: string;
  name: string;
  gender: string;
  dob: string;
  nidOrBirthCert: string;
  bloodGroup: string;
  phone: string;
  allergies?: string;
  emergencyContact?: string;
  qrValue?: string;
  vaccines: Vaccine[];
}

export interface NavItem {
  key: string;
  labelBn: string;
  labelEn: string;
  href: string;
}

export interface StatItem {
  valBn: string;
  valEn: string;
  labelBn: string;
  labelEn: string;
}

export interface StepItem {
  id: number;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
}

export interface CategoryItem {
  nameBn: string;
  nameEn: string;
  avatarUrl: string;
}

export interface AIFeature {
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  icon: string;
}

export const defaultVaccines: Vaccine[] = [
  {
    id: "v-bcg",
    nameBn: "বিসিজি (BCG)",
    nameEn: "BCG Vaccine",
    diseaseBn: "যক্ষ্মা (Tuberculosis)",
    diseaseEn: "Tuberculosis",
    scheduleBn: "জন্মের পরপরই",
    scheduleEn: "At birth",
    status: "Completed",
    dose: "১ম ডোজ (Dose 1)",
    dateGiven: "2015-02-05",
  },
  {
    id: "v-penta-1",
    nameBn: "পেন্টাভ্যালেন্ট - ১ (Pentavalent-1)",
    nameEn: "Pentavalent - 1",
    diseaseBn: "ডিফথেরিয়া, হুপিং কাশি, ধনুষ্টঙ্কার, হেপাটাইটিস-বি, হিমোফাইলাস ইনফ্লুয়েঞ্জা",
    diseaseEn: "Diphtheria, Pertussis, Tetanus, Hep B, Hib",
    scheduleBn: "৬ষ্ঠ সপ্তাহ",
    scheduleEn: "6th Week",
    status: "Completed",
    dose: "১ম ডোজ (Dose 1)",
    dateGiven: "2015-03-10",
  },
  {
    id: "v-opv-1",
    nameBn: "ওপিভি - ১ (OPV-1)",
    nameEn: "OPV - 1",
    diseaseBn: "পোলিও (Poliomyelitis)",
    diseaseEn: "Poliomyelitis",
    scheduleBn: "৬ষ্ঠ সপ্তাহ",
    scheduleEn: "6th Week",
    status: "Completed",
    dose: "১ম ডোজ (Dose 1)",
    dateGiven: "2015-03-10",
  },
  {
    id: "v-pcv-1",
    nameBn: "পিসিভি - ১ (PCV-1)",
    nameEn: "PCV - 1",
    diseaseBn: "নিউমোকক্কাল নিউমোনিয়া (Pneumococcal)",
    diseaseEn: "Pneumococcal Pneumonia",
    scheduleBn: "৬ষ্ঠ সপ্তাহ",
    scheduleEn: "6th Week",
    status: "Completed",
    dose: "১ম ডোজ (Dose 1)",
    dateGiven: "2015-03-10",
  },
  {
    id: "v-penta-2",
    nameBn: "পেন্টাভ্যালেন্ট - ২ (Pentavalent-2)",
    nameEn: "Pentavalent - 2",
    diseaseBn: "ডিফথেরিয়া, হুপিং কাশি, ধনুষ্টঙ্কার, হেপাটাইটিস-বি, হিমোফাইলাস ইনফ্লুয়েঞ্জা",
    diseaseEn: "Diphtheria, Pertussis, Tetanus, Hep B, Hib",
    scheduleBn: "১০ম সপ্তাহ",
    scheduleEn: "10th Week",
    status: "Completed",
    dose: "২য় ডোজ (Dose 2)",
    dateGiven: "2015-04-12",
  },
  {
    id: "v-penta-3",
    nameBn: "পেন্টাভ্যালেন্ট - ৩ (Pentavalent-3)",
    nameEn: "Pentavalent - 3",
    diseaseBn: "ডিফথেরিয়া, হুপিং কাশি, ধনুষ্টঙ্কার, হেপাটাইটিস-বি, হিমোফাইলাস ইনফ্লুয়েঞ্জা",
    diseaseEn: "Diphtheria, Pertussis, Tetanus, Hep B, Hib",
    scheduleBn: "১৪তম সপ্তাহ",
    scheduleEn: "14th Week",
    status: "Completed",
    dose: "৩য় ডোজ (Dose 3)",
    dateGiven: "2015-05-18",
  },
  {
    id: "v-mr-1",
    nameBn: "এমআর - ১ (MR-1)",
    nameEn: "MR - 1",
    diseaseBn: "হাম ও রুবেলা (Measles & Rubella)",
    diseaseEn: "Measles & Rubella",
    scheduleBn: "৯ম মাস পূর্ণ হলে",
    scheduleEn: "9 Months Completed",
    status: "Completed",
    dose: "১ম ডোজ (Dose 1)",
    dateGiven: "2015-10-20",
  },
  {
    id: "v-mr-2",
    nameBn: "এমআর - ২ (MR-2)",
    nameEn: "MR - 2",
    diseaseBn: "হাম ও রুবেলা (Measles & Rubella)",
    diseaseEn: "Measles & Rubella",
    scheduleBn: "১৫তম মাস পূর্ণ হলে",
    scheduleEn: "15 Months Completed",
    status: "Completed",
    dose: "২য় ডোজ (Dose 2)",
    dateGiven: "2016-04-20",
  },
  {
    id: "v-covid-1",
    nameBn: "কোভিড-১৯ ডোজ ১ (COVID-19)",
    nameEn: "COVID-19 Dose 1",
    diseaseBn: "করোনা ভাইরাস (SARS-CoV-2)",
    diseaseEn: "Coronavirus",
    scheduleBn: "১২ বছর+ বয়সীদের জন্য",
    scheduleEn: "For 12+ years",
    status: "Completed",
    dose: "১ম ডোজ (Dose 1)",
    dateGiven: "2021-11-15",
  },
  {
    id: "v-covid-2",
    nameBn: "কোভিড-১৯ ডোজ ২ (COVID-19)",
    nameEn: "COVID-19 Dose 2",
    diseaseBn: "করোনা ভাইরাস (SARS-CoV-2)",
    diseaseEn: "Coronavirus",
    scheduleBn: "১ম ডোজের ৪ সপ্তাহ পর",
    scheduleEn: "4 weeks after 1st Dose",
    status: "Completed",
    dose: "২য় ডোজ (Dose 2)",
    dateGiven: "2021-12-15",
  },
  {
    id: "v-booster",
    nameBn: "কোভিড বুস্টার ডোজ (Booster)",
    nameEn: "COVID-19 Booster",
    diseaseBn: "করোনা ভাইরাস বুস্টার",
    diseaseEn: "Coronavirus Booster",
    scheduleBn: "২য় ডোজের ৫ মাস পর",
    scheduleEn: "5 months after 2nd Dose",
    status: "Pending",
    dose: "বুস্টার (Booster)",
  }
];

export const translations = {
  bn: {
    govTitle: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার",
    govMinistry: "স্বাস্থ্য ও পরিবার কল্যাণ মন্ত্রণালয়",
    tikaCard: "TIKA CARD",
    tikaSub: "জাতীয় ডিজিটাল স্বাস্থ্য সেবা প্ল্যাটফর্ম",
    howItWorks: "কিভাবে কাজ করে",
    forWhom: "কাদের জন্য",
    benefits: "সুবিধা",
    services: "সেবা সমূহ",
    contact: "যোগাযোগ",
    login: "লগইন",
    register: "রেজিস্ট্রেশন",
    heroBadge: "এক জাতি, এক স্বাস্থ্য পরিচয়",
    heroDesc: "জন্ম নিবন্ধন থেকে শুরু করে সারাজীবনের স্বাস্থ্যসেবা— Tika Card সংযুক্ত করছে নাগরিক, হাসপাতাল, টিকা কেন্দ্র, ও সকল সরকারি স্বাস্থ্যসেবা এক নিরাপদ প্ল্যাটফর্মে।",
    getStarted: "এখনই শুরু করুন",
    howItWorksBtn: "কিভাবে কাজ করে দেখুন",
    govSecured: "Government Secured",
    govSecuredDesc: "সরকারিভাবে সুরক্ষিত ও পরিচালিত",
    dataProtection: "100% Data Protection",
    dataProtectionDesc: "সম্পূর্ণ সুরক্ষিত ব্যক্তিগত তথ্য",
    nationalTrusted: "National Trusted",
    nationalTrustedDesc: "দেশজুড়ে গ্রহণযোগ্য ও বিশ্বস্ত",
    dataSovereign: "Bangladesh Data Sovereign",
    dataSovereignDesc: "সার্বভৌম জাতীয় তথ্য ভাণ্ডার",
    birth: "জন্ম",
    child: "শিশু",
    adolescent: "কিশোর",
    adult: "প্রাপ্তবয়স্ক",
    senior: "বয়স্ক",
    howItWorksTitle: "কিভাবে কাজ করে",
    forWhomTitle: "কাদের জন্য",
    forWhomDesc: "পরিবারের সবার স্বাস্থ্য তথ্য, এক কার্ডে, এক জায়গায়।",
    aiSupportTitle: "AI স্বাস্থ্য সহায়তা",
    ecosystemTitle: "সংযুক্ত জাতীয় স্বাস্থ্য ইকোসিস্টেম",
    ecosystemSub: "একটি ডিজিটাল সংযোগ, অসীম সেবা",
    gov: "সরকার",
    hospital: "হাসপাতাল",
    clinic: "ক্লিনিক ও কমিউনিটি সেন্টার",
    tikaCenter: "টিকা কেন্দ্র",
    lab: "ল্যাব ও ডায়াগনস্টিক",
    pharmacy: "ফার্মেসি",
    citizen: "নাগরিক",
    walletTitle: "আপনার ডিজিটাল স্বাস্থ্য ওয়ালেট",
    statsTitle: "আমাদের অগ্রগতি",
    footerText1: "আপনার স্বাস্থ্য তথ্য, নিরাপদ হাতে, দেশের অগ্রযাত্রার সাথে।",
    footerText2: "আমরা প্রতিজ্ঞাবদ্ধ—একটি সুস্থ, নিরাপদ ও উন্নত বাংলাদেশ গড়তে।",
    dataProtectionAct: "Data Protection Act 2018 Compliant",
    isoCertified: "ISO/IEC 27001 Certified",
    govInitiative: "Bangladesh Government Initiative",
    genderMale: "পুরুষ",
    genderFemale: "নারী",
    genderOther: "অন্যান্য",
    dobLabel: "জন্ম তারিখ",
    nidOrBirthLabel: "জাতীয় পরিচয়পত্র / জন্ম নিবন্ধন নং",
    bloodGroupLabel: "রক্তের গ্রুপ",
    phoneLabel: "মোবাইল নম্বর",
    allergiesLabel: "অ্যালার্জি (ঐচ্ছিক)",
    emergencyLabel: "জরুরি যোগাযোগ নম্বর (ঐচ্ছিক)",
    generateCardBtn: "টিকা কার্ড তৈরি করুন",
    cardGeneratedSuccess: "টিকা কার্ড সফলভাবে তৈরি হয়েছে!",
    viewWallet: "ডিজিটাল ওয়ালেটে দেখুন",
    emptyFieldErr: "অনুগ্রহ করে সকল আবশ্যকীয় তথ্য পূরণ করুন!",
    nidLengthErr: "NID বা জন্ম নিবন্ধন নম্বর অবশ্যই ১০ বা ১৭ ডিজিটের হতে হবে!",
    phoneLengthErr: "মোবাইল নম্বরটি সঠিক নয় (১১ ডিজিট প্রয়োজন)!",
    healthId: "হেলথ আইডি",
    allVaccines: "টিকার তালিকা ও স্থিতি",
    pending: "বাকি আছে",
    completed: "সম্পন্ন",
    overdue: "মেয়াদোত্তীর্ণ",
    updateStatus: "স্থিতি আপডেট করুন",
    addVaccine: "নতুন টিকা যুক্ত করুন",
    verifyCard: "কার্ড যাচাইকরণ",
    scanQR: "কিউআর কোড স্ক্যান",
    verifySuccess: "সফলভাবে যাচাই করা হয়েছে!",
    cardNotFound: "কার্ডটি পাওয়া যায়নি!",
    enterHealthId: "হেলথ আইডি লিখুন",
    search: "অনুসন্ধান",
    aiPlaceholder: "টিকা, রোগ প্রতিরোধ বা স্বাস্থ্য বিষয়ক যেকোনো প্রশ্ন করুন...",
    askAi: "এআই সহকারীকে জিজ্ঞেস করুন",
    aiDisclaimer: "সতর্কতা: এটি একটি এআই চালিত পরামর্শ। যেকোনো জটিল পরিস্থিতিতে চিকিৎসকের পরামর্শ নিন।",
    chatbotTitle: "টিকেট কার্ড এআই হেলথ অ্যাসিস্ট্যান্ট",
    online: "অনলাইন",
    vaccineForecast: "টিকা পূর্বভাস",
    vaccineForecastDesc: "আপনার পরবর্তী টিকা কখন প্রয়োজন",
    riskAlert: "ঝুঁকি সতর্কতা",
    riskAlertDesc: "সম্ভাব্য স্বাস্থ্য ঝুঁকি আগেই জানায়",
    healthReminder: "স্বাস্থ্য রিমাইন্ডার",
    healthReminderDesc: "ওষুধ, টিকা ও চেকআপ স্মরণ করিয়ে দেয়",
    fastAppt: "ত্বরিত অ্যাপয়েন্টমেন্ট",
    fastApptDesc: "হাসপাতাল ও ক্লিনিকে দ্রুত বুকিং সহায়তা",
    smartAdvice: "স্মার্ট পরামর্শ",
    smartAdviceDesc: "আপনার জন্য উপযুক্ত স্বাস্থ্য পরামর্শ ও গাইডলাইন",
    welcomeAi: "আসসালামু আলাইকুম! আমি আপনার এআই স্বাস্থ্য সহকারী। টিকা বা কোনো স্বাস্থ্য সেবা সম্পর্কে আপনার কোনো প্রশ্ন আছে কি?",
    generatedCardHeader: "জাতীয় ডিজিটাল স্বাস্থ্য পরিচয়পত্র",
    reGenerate: "তথ্য পরিবর্তন করুন",
    downloadCard: "কার্ড ডাউনলোড করুন",
    searchPlaceholder: "যেকোনো টিকার নাম খুঁজুন...",
    addVaccineTitle: "টিকা ডাটা এন্ট্রি (চিকিৎসক/নার্স টেস্ট মোড)",
    vaccineNameLabel: "টিকার নাম",
    diseaseLabel: "রোগের নাম",
    doseLabel: "ডোজ নম্বর / নাম",
    registerDoc: "চিকিৎসক / স্বাস্থ্যকর্মী মোড",
    generalCitizen: "সাধারণ নাগরিক মোড",
    switchMode: "প্যানেল পরিবর্তন",
  },
  en: {
    govTitle: "Government of the People's Republic of Bangladesh",
    govMinistry: "Ministry of Health and Family Welfare",
    tikaCard: "TIKA CARD",
    tikaSub: "National Digital Health Service Platform",
    howItWorks: "How It Works",
    forWhom: "For Whom",
    benefits: "Benefits",
    services: "Services",
    contact: "Contact",
    login: "Login",
    register: "Register",
    heroBadge: "One Nation, One Health Identity",
    heroDesc: "From birth registration to lifetime healthcare—Tika Card connects citizens, hospitals, vaccine centers, and all government health facilities into a single secure platform.",
    getStarted: "Get Started Now",
    howItWorksBtn: "Watch How It Works",
    govSecured: "Government Secured",
    govSecuredDesc: "Officially secured & monitored",
    dataProtection: "100% Data Protection",
    dataProtectionDesc: "Fully protected personal details",
    nationalTrusted: "National Trusted",
    nationalTrustedDesc: "Nationwide trusted & accepted",
    dataSovereign: "Bangladesh Data Sovereign",
    dataSovereignDesc: "Sovereign national data treasury",
    birth: "Birth",
    child: "Children",
    adolescent: "Teens",
    adult: "Adults",
    senior: "Seniors",
    howItWorksTitle: "How It Works",
    forWhomTitle: "For Whom",
    forWhomDesc: "All family members' health data, in one card, in one place.",
    aiSupportTitle: "AI Health Assistant",
    ecosystemTitle: "Connected National Health Ecosystem",
    ecosystemSub: "A digital connection, infinite services",
    gov: "Government",
    hospital: "Hospital",
    clinic: "Clinic & Community",
    tikaCenter: "Vaccine Center",
    lab: "Lab & Diagnostics",
    pharmacy: "Pharmacy",
    citizen: "Citizen",
    walletTitle: "Your Digital Health Wallet",
    statsTitle: "Our Progress",
    footerText1: "Your health data, in safe hands, with national progress.",
    footerText2: "We are committed—to building a healthy, safe & developed Bangladesh.",
    dataProtectionAct: "Data Protection Act 2018 Compliant",
    isoCertified: "ISO/IEC 27001 Certified",
    govInitiative: "Bangladesh Government Initiative",
    genderMale: "Male",
    genderFemale: "Female",
    genderOther: "Other",
    dobLabel: "Date of Birth",
    nidOrBirthLabel: "National ID / Birth Certificate No",
    bloodGroupLabel: "Blood Group",
    phoneLabel: "Mobile Number",
    allergiesLabel: "Allergies (Optional)",
    emergencyLabel: "Emergency Phone Number (Optional)",
    generateCardBtn: "Generate Tika Card",
    cardGeneratedSuccess: "Tika Card generated successfully!",
    viewWallet: "View in Digital Wallet",
    emptyFieldErr: "Please fill in all required fields!",
    nidLengthErr: "NID or Birth Certificate No. must be 10 or 17 digits!",
    phoneLengthErr: "Incorrect Mobile Number (11 digits required)!",
    healthId: "Health ID",
    allVaccines: "Vaccination List & Status",
    pending: "Pending",
    completed: "Completed",
    overdue: "Overdue",
    updateStatus: "Update Status",
    addVaccine: "Add New Vaccine",
    verifyCard: "Verify Credit",
    scanQR: "QR Code Scan Mockup",
    verifySuccess: "Verified Successfully!",
    cardNotFound: "Card not found!",
    enterHealthId: "Enter Health ID",
    search: "Search",
    aiPlaceholder: "Ask any question about vaccines, immunology, health advice...",
    askAi: "Ask AI Assistant",
    aiDisclaimer: "Disclaimer: This is an AI powered instruction. Consult a qualified doctor for actual medical concerns.",
    chatbotTitle: "Tika Card AI Health Assistant",
    online: "Online",
    vaccineForecast: "Vaccine Forecast",
    vaccineForecastDesc: "When your next immunization is needed",
    riskAlert: "Risk Alerter",
    riskAlertDesc: "Identifies potential health risks in advance",
    healthReminder: "Health Reminders",
    healthReminderDesc: "Reminds you of medicines, vaccines & checkups",
    fastAppt: "Fast Booking",
    fastApptDesc: "Assists with fast ticket booking in hospitals",
    smartAdvice: "Smart Advice",
    smartAdviceDesc: "Tailored health guidance and tips for you",
    welcomeAi: "Hello there! I am your AI Health Assistant. Do you have any questions today regarding vaccines or healthcare Services in Bangladesh?",
    generatedCardHeader: "National Digital Health Identity Card",
    reGenerate: "Change Information",
    downloadCard: "Download Card",
    searchPlaceholder: "Search any vaccine...",
    addVaccineTitle: "Vaccine Data Entry (Doctor/Nurse Test Mode)",
    vaccineNameLabel: "Vaccine Name",
    diseaseLabel: "Disease Target",
    doseLabel: "Dose No",
    registerDoc: "Doctor / Healthcare Worker Mode",
    generalCitizen: "General Citizen Mode",
    switchMode: "Switch Mode Panel",
  }
};

export const stats: StatItem[] = [
  {
    valBn: "২.৪+ কোটি",
    valEn: "2.4+ Crore",
    labelBn: "নাগরিক নিবন্ধিত",
    labelEn: "Registered Citizens",
  },
  {
    valBn: "৮,৫৮০+",
    valEn: "8,580+",
    labelBn: "স্বাস্থ্য সেবা প্রতিষ্ঠান",
    labelEn: "Healthcare Facilities",
  },
  {
    valBn: "১২.৮+ কোটি",
    valEn: "12.8+ Crore",
    labelBn: "টিকা রেকর্ড",
    labelEn: "Vaccination Records",
  },
  {
    valBn: "৩.২+ কোটি",
    valEn: "3.2+ Crore",
    labelBn: "পরিবার সংযুক্ত",
    labelEn: "Connected Families",
  },
  {
    valBn: "২৪/৭",
    valEn: "24/7",
    labelBn: "জরুরি সেবা সহায়তা",
    labelEn: "Emergency Support",
  }
];

export const steps: StepItem[] = [
  {
    id: 1,
    titleBn: "Tika ID তৈরি",
    titleEn: "Tika ID Creation",
    descBn: "জন্ম নিবন্ধন বা NID দিয়ে এক ক্লিকে সহজে",
    descEn: "With Birth Registration or NID in one simple click",
  },
  {
    id: 2,
    titleBn: "পরিচয় যাচাই",
    titleEn: "Identity Verification",
    descBn: "নিরাপদ বায়োমেট্রিক ও ডেটা সুরক্ষা",
    descEn: "Secure biometric and database encryption verification",
  },
  {
    id: 3,
    titleBn: "স্বাস্থ্য রেকর্ড সংরক্ষণ",
    titleEn: "Health Records Storage",
    descBn: "টিকা, পরীক্ষা ও রিপোর্ট সব এক জায়গায়",
    descEn: "Vaccines, lab tests and health logs kept in one hub",
  },
  {
    id: 4,
    titleBn: "স্মরণ ও পরামর্শ",
    titleEn: "Reminders & Advice",
    descBn: "টিকা, চেকআপ ও জরুরি অ্যালার্ট বিজ্ঞপ্তি",
    descEn: "Vaccine reminders, general checkups and smart hints",
  },
  {
    id: 5,
    titleBn: "সেবা গ্রহণ",
    titleEn: "Avail Health Services",
    descBn: "যেকোনো সময়, যেকোনো জায়গা থেকে সহজে",
    descEn: "Anytime, anywhere in Bangladesh with your Tika ID",
  }
];

export const categories: CategoryItem[] = [
  {
    nameBn: "শিশু ও নবজাতক",
    nameEn: "Infants & Toddlers",
    avatarUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eb2?w=150&auto=format&fit=crop&q=80",
  },
  {
    nameBn: "শিক্ষার্থী",
    nameEn: "Students",
    avatarUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=150&auto=format&fit=crop&q=80",
  },
  {
    nameBn: "প্রাপ্তবয়স্ক",
    nameEn: "Adults",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    nameBn: "বয়স্ক নাগরিক",
    nameEn: "Senior Citizens",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  {
    nameBn: "সকল পরিবার",
    nameEn: "Whole Families",
    avatarUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=150&auto=format&fit=crop&q=80",
  }
];

export const safetyBadges = [
  {
    key: "secured",
    titleBn: "Government Secured",
    titleEn: "Government Secured",
    subtitleBn: "বাংলাদেশ সরকার কর্তৃক সুনিয়ন্ত্রিত",
    subtitleEn: "Protected and sanctioned by Gov",
  },
  {
    key: "protection",
    titleBn: "100% Data Protection",
    titleEn: "100% Data Protection",
    subtitleBn: "ব্যক্তিগত তথ্যের সর্বোচ্চ নিরাপত্তা",
    subtitleEn: "User healthcare privacy guaranteed",
  },
  {
    key: "trusted",
    titleBn: "National Trusted",
    titleEn: "National Trusted",
    subtitleBn: "দেশজুড়ে সকল হাসপাতালে গৃহীত",
    subtitleEn: "Trusted across Bangladesh hospitals",
  },
  {
    key: "sovereign",
    titleBn: "Bangladesh Data Sovereign",
    titleEn: "Bangladesh Data Sovereign",
    subtitleBn: "সার্বভৌম জাতীয় ক্লাউড সার্ভার",
    subtitleEn: "Sovereign national health cloud data",
  }
];
