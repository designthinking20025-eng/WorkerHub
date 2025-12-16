export type Language = 'en' | 'hi' | 'te' | 'kn' | 'ta' | 'mr';

export interface Translations {
  selectLanguage: string;
  chooseYourLanguage: string;
  workerHub: string;
  home: string;
  profiles: string;
  myProfile: string;
  changeLanguage: string;
  searchProfiles: string;
  availableWorkers: string;
  viewProfile: string;
  skills: string;
  experience: string;
  years: string;
  availability: string;
  hourlyRate: string;
  available: string;
  busy: string;
  contactInfo: string;
  phone: string;
  email: string;
  workExperience: string;
  location: string;
  professionalNetwork: string;
  forBlueCollar: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    selectLanguage: 'Select Language',
    chooseYourLanguage: 'Choose Your Language',
    workerHub: 'WorkerHub',
    home: 'Home',
    profiles: 'Profiles',
    myProfile: 'My Profile',
    changeLanguage: 'Change Language',
    searchProfiles: 'Search profiles...',
    availableWorkers: 'Available Workers',
    viewProfile: 'View Profile',
    skills: 'Skills',
    experience: 'Experience',
    years: 'years',
    availability: 'Availability',
    hourlyRate: 'Hourly Rate',
    available: 'Available',
    busy: 'Busy',
    contactInfo: 'Contact Information',
    phone: 'Phone',
    email: 'Email',
    workExperience: 'Work Experience',
    location: 'Location',
    professionalNetwork: 'Professional Network',
    forBlueCollar: 'for Blue Collar Workers',
  },
  hi: {
    selectLanguage: 'भाषा चुनें',
    chooseYourLanguage: 'अपनी भाषा चुनें',
    workerHub: 'वर्कर हब',
    home: 'होम',
    profiles: 'प्रोफाइल',
    myProfile: 'मेरी प्रोफाइल',
    changeLanguage: 'भाषा बदलें',
    searchProfiles: 'प्रोफाइल खोजें...',
    availableWorkers: 'उपलब्ध कामगार',
    viewProfile: 'प्रोफाइल देखें',
    skills: 'कौशल',
    experience: 'अनुभव',
    years: 'साल',
    availability: 'उपलब्धता',
    hourlyRate: 'प्रति घंटा दर',
    available: 'उपलब्ध',
    busy: 'व्यस्त',
    contactInfo: 'संपर्क जानकारी',
    phone: 'फोन',
    email: 'ईमेल',
    workExperience: 'कार्य अनुभव',
    location: 'स्थान',
    professionalNetwork: 'पेशेवर नेटवर्क',
    forBlueCollar: 'ब्लू कॉलर कामगारों के लिए',
  },
  te: {
    selectLanguage: 'భాషను ఎంచుకోండి',
    chooseYourLanguage: 'మీ భాషను ఎంచుకోండి',
    workerHub: 'వర్కర్ హబ్',
    home: 'హోమ్',
    profiles: 'ప్రొఫైల్స్',
    myProfile: 'నా ప్రొఫైల్',
    changeLanguage: 'భాషను మార్చండి',
    searchProfiles: 'ప్రొఫైల్స్ శోధించండి...',
    availableWorkers: 'అందుబాటులో ఉన్న కార్మికులు',
    viewProfile: 'ప్రొఫైల్ చూడండి',
    skills: 'నైపుణ్యాలు',
    experience: 'అనుభవం',
    years: 'సంవత్సరాలు',
    availability: 'అందుబాటు',
    hourlyRate: 'గంటకు రేటు',
    available: 'అందుబాటులో ఉంది',
    busy: 'బిజీగా ఉంది',
    contactInfo: 'సంప్రదింపు సమాచారం',
    phone: 'ఫోన్',
    email: 'ఇమెయిల్',
    workExperience: 'పని అనుభవం',
    location: 'స్థానం',
    professionalNetwork: 'వృత్తిపరమైన నెట్‌వర్క్',
    forBlueCollar: 'బ్లూ కాలర్ కార్మికుల కోసం',
  },
  kn: {
    selectLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    chooseYourLanguage: 'ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆರಿಸಿ',
    workerHub: 'ವರ್ಕರ್ ಹಬ್',
    home: 'ಮುಖಪುಟ',
    profiles: 'ಪ್ರೊಫೈಲ್‌ಗಳು',
    myProfile: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
    changeLanguage: 'ಭಾಷೆ ಬದಲಾಯಿಸಿ',
    searchProfiles: 'ಪ್ರೊಫೈಲ್‌ಗಳನ್ನು ಹುಡುಕಿ...',
    availableWorkers: 'ಲಭ್ಯವಿರುವ ಕಾರ್ಮಿಕರು',
    viewProfile: 'ಪ್ರೊಫೈಲ್ ವೀಕ್ಷಿಸಿ',
    skills: 'ಕೌಶಲ್ಯಗಳು',
    experience: 'ಅನುಭವ',
    years: 'ವರ್ಷಗಳು',
    availability: 'ಲಭ್ಯತೆ',
    hourlyRate: 'ಗಂಟೆಗೆ ದರ',
    available: 'ಲಭ್ಯವಿದೆ',
    busy: 'ಕಾರ್ಯನಿರತ',
    contactInfo: 'ಸಂಪರ್ಕ ಮಾಹಿತಿ',
    phone: 'ಫೋನ್',
    email: 'ಇಮೇಲ್',
    workExperience: 'ಕೆಲಸದ ಅನುಭವ',
    location: 'ಸ್ಥಳ',
    professionalNetwork: 'ವೃತ್ತಿಪರ ನೆಟ್‌ವರ್ಕ್',
    forBlueCollar: 'ಬ್ಲೂ ಕಾಲರ್ ಕಾರ್ಮಿಕರಿಗಾಗಿ',
  },
  ta: {
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    chooseYourLanguage: 'உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்',
    workerHub: 'வொர்கர் ஹப்',
    home: 'முகப்பு',
    profiles: 'சுயவிவரங்கள்',
    myProfile: 'எனது சுயவிவரம்',
    changeLanguage: 'மொழியை மாற்றவும்',
    searchProfiles: 'சுயவிவரங்களைத் தேடுங்கள்...',
    availableWorkers: 'கிடைக்கக்கூடிய தொழிலாளர்கள்',
    viewProfile: 'சுயவிவரத்தைக் காண்க',
    skills: 'திறன்கள்',
    experience: 'அனுபவம்',
    years: 'ஆண்டுகள்',
    availability: 'கிடைக்கும் தன்மை',
    hourlyRate: 'மணிக்கு கட்டணம்',
    available: 'கிடைக்கிறது',
    busy: 'பிஸியாக உள்ளது',
    contactInfo: 'தொடர்பு தகவல்',
    phone: 'தொலைபேசி',
    email: 'மின்னஞ்சல்',
    workExperience: 'பணி அனுபவம்',
    location: 'இடம்',
    professionalNetwork: 'தொழில்முறை நெட்வொர்க்',
    forBlueCollar: 'ப்ளூ காலர் தொழிலாளர்களுக்காக',
  },
  mr: {
    selectLanguage: 'भाषा निवडा',
    chooseYourLanguage: 'तुमची भाषा निवडा',
    workerHub: 'वर्कर हब',
    home: 'मुख्यपृष्ठ',
    profiles: 'प्रोफाइल',
    myProfile: 'माझे प्रोफाइल',
    changeLanguage: 'भाषा बदला',
    searchProfiles: 'प्रोफाइल शोधा...',
    availableWorkers: 'उपलब्ध कामगार',
    viewProfile: 'प्रोफाइल पहा',
    skills: 'कौशल्ये',
    experience: 'अनुभव',
    years: 'वर्षे',
    availability: 'उपलब्धता',
    hourlyRate: 'तासाचे दर',
    available: 'उपलब्ध',
    busy: 'व्यस्त',
    contactInfo: 'संपर्क माहिती',
    phone: 'फोन',
    email: 'ईमेल',
    workExperience: 'कामाचा अनुभव',
    location: 'स्थान',
    professionalNetwork: 'व्यावसायिक नेटवर्क',
    forBlueCollar: 'ब्लू कॉलर कामगारांसाठी',
  },
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  hi: 'हिंदी',
  te: 'తెలుగు',
  kn: 'ಕನ್ನಡ',
  ta: 'தமிழ்',
  mr: 'मराठी',
};

export const languageFlags: Record<Language, string> = {
  en: '🇬🇧',
  hi: '🇮🇳',
  te: '🇮🇳',
  kn: '🇮🇳',
  ta: '🇮🇳',
  mr: '🇮🇳',
};
