"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "hi" | "te"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "app.title": "Health & Legal Help",
    "home.health": "Health Suggestions",
    "home.legal": "Legal Suggestions",
    "home.faq": "Offline FAQ",
    "health.title": "Health Suggestions",
    "health.ask": "Ask a health question",
    "health.voice": "Speak your question",
    "health.text": "Type your question",
    "health.submit": "Get Advice",
    "health.empty": "Please enter a question to get started.",
    "health.invalid": "Please ask a health question so I can assist you.",
    "legal.title": "Legal Suggestions",
    "legal.ask": "Ask a legal question",
    "legal.voice": "Speak your question",
    "legal.text": "Type your question",
    "legal.submit": "Get Advice",
    "legal.empty": "Please enter a question to get started.",
    "legal.invalid": "Please ask a legal question so I can assist you.",
    "common.back": "Back",
    "common.home": "Home",
    "common.listen": "Listen",
    "common.speak": "Speak",
    "common.stop": "Stop",
    "common.disclaimer":
      "⚠️ This information is for educational purposes only and is not a substitute for professional medical or legal advice.",
    "common.emergency": "🚨 Emergency: Ambulance 108 | Police 100 | Women Helpline 1091",
    "faq.title": "Frequently Asked Questions",
    "faq.fever": "What should I do if I have a fever?",
    "faq.fever.answer":
      "Step 1: Rest - Sleep helps your body fight infection. Step 2: Drink water - Stay hydrated, drink 2-3 liters daily. Step 3: Take paracetamol - Follow dosage on package (usually 500mg every 4-6 hours). Step 4: Cool compress - Put on forehead. See a doctor if: Fever lasts more than 3 days, Temperature is above 103°F (39.4°C), You have difficulty breathing, You have severe headache with stiff neck.",
    "faq.cough": "What should I do if I have a cough?",
    "faq.cough.answer":
      "Step 1: Drink warm water - Helps soothe throat, drink 6-8 glasses daily. Step 2: Rest - Give your body time to heal. Step 3: Honey - A spoonful can help (not for babies under 1 year). Step 4: Avoid smoke - Stay in clean air. See a doctor if: Cough lasts more than 2 weeks, You cough up blood, You have chest pain, You have difficulty breathing.",
    "faq.headache": "What should I do if I have a headache?",
    "faq.headache.answer":
      "Step 1: Rest - Lie down in a quiet, dark room for 30 minutes. Step 2: Drink water - Dehydration causes headaches. Step 3: Take paracetamol - Follow dosage on package. Step 4: Apply cold compress - On forehead or neck for 15 minutes. See a doctor if: Headache is severe and sudden, It lasts more than 3 days, You have fever with headache, You have vision changes.",
    "faq.stomach": "What should I do if I have stomach problems?",
    "faq.stomach.answer":
      "Step 1: Rest - Avoid heavy activities. Step 2: Drink water slowly - Small sips, avoid cold water. Step 3: Eat light food - Rice, bread, banana, boiled vegetables. Step 4: Avoid dairy and spicy food. See a doctor if: Diarrhea lasts more than 3 days, You have severe pain, You see blood in stool, You have signs of dehydration (dry mouth, dark urine).",
    "faq.cold": "What should I do if I have a cold?",
    "faq.cold.answer":
      "Step 1: Rest - Get plenty of sleep (8+ hours). Step 2: Drink warm fluids - Tea, soup, warm water. Step 3: Use saline drops - For nose congestion. Step 4: Gargle salt water - For sore throat (1/2 teaspoon salt in warm water). See a doctor if: Cold lasts more than 10 days, You develop high fever, You have difficulty breathing, You have severe sore throat.",
    "faq.legal.consumer": "How do I file a consumer complaint?",
    "faq.legal.consumer.answer":
      "Step 1: Gather Evidence - Collect all purchase receipts, product photos, warranty cards, and communication with seller. Step 2: Contact Seller First - Send written complaint to seller/company within 30 days. Keep copy of letter. Step 3: File Consumer Complaint - For amounts under ₹10 lakh: District Consumer Forum. For ₹10 lakh to ₹1 crore: State Consumer Commission. For above ₹1 crore: National Consumer Commission. Step 4: Required Documents - Complaint form (Form-1A), copies of bills/receipts, ID proof (Aadhaar/PAN), address proof. Step 5: Filing Fee - ₹100 to ₹5,000 based on claim amount. Step 6: Timeline - Decision typically within 3-6 months. Free Help: National Consumer Helpline 1800-11-4000 (10 AM - 5:30 PM), Online filing: www.edaakhil.nic.in, Legal aid centers in your district.",
    "faq.legal.divorce": "How do I file for divorce?",
    "faq.legal.divorce.answer":
      "Step 1: Contact a lawyer - Get professional legal help. Step 2: Gather documents - Marriage certificate, property papers, children's birth certificates. Step 3: Know your rights - Both men and women have equal rights to property and children. Step 4: Visit legal aid center - Free help if you cannot afford a lawyer. Important: Divorce takes time (usually 6 months to 2 years), You have rights to property and children, Domestic violence is illegal. Free Help: Legal aid centers in your district, NGOs, Women's helpline 1091.",
    "faq.legal.property": "How do I protect my property?",
    "faq.legal.property.answer":
      "Step 1: Register your property - Go to land office with all documents. Step 2: Keep all documents - Deeds, receipts, tax papers, registration certificate. Step 3: Get a survey - Know exact boundaries of your property. Step 4: Make a will - Protect your family's future. Important: Never sign papers you don't understand, Get legal help before buying/selling, Verify seller's ownership documents. Free Help: Legal aid centers, Property registration offices.",
    "faq.legal.rights": "What are my basic legal rights?",
    "faq.legal.rights.answer":
      "You have the following rights: Equality - No discrimination based on caste, religion, gender, age. Freedom - Freedom of speech, movement, religion, assembly. Protection - Protection from violence and exploitation. Justice - Right to fair trial and legal help. If your rights are violated: Report to police, Contact legal aid center, Call women's helpline if needed (1091), Contact NGOs and community organizations.",
    "faq.legal.contract": "What should I know about contracts?",
    "faq.legal.contract.answer":
      "Step 1: Read carefully - Understand every word before signing. Step 2: Ask questions - Don't sign if confused. Step 3: Get legal review - Have a lawyer check it. Step 4: Keep copies - Always keep a copy for yourself. Never sign: Papers you don't understand, Blank papers, Papers with corrections you didn't make. Free Help: Legal aid centers, Lawyer consultation.",
    "faq.legal.arrest": "What should I do if I am arrested?",
    "faq.legal.arrest.answer":
      "EMERGENCY: If You Are Arrested - Step 1: Stay Calm - Do not resist or argue with police. Step 2: Know Your Rights - You have the right to remain silent. Step 3: Ask for Lawyer - Say 'I want to speak to a lawyer' and stay silent. Step 4: Do Not Sign Anything - Without a lawyer present. Your Legal Rights: Right to know charges, Right to remain silent, Right to a lawyer (free if poor), Right to inform family, Right to medical exam if injured, Right to bail hearing within 24-48 hours. What Happens: Police take you to station, You will be questioned (you can refuse), You will be presented before magistrate within 24 hours, Bail hearing will be held, You can get free legal help. Free Help: Legal Aid Centers, Police Station, District Court, NGOs, National Legal Services Authority (NALSA). Important: Do not confess without a lawyer, Keep all documents, Note down police officer names, Contact family immediately, Ask for bail as soon as possible.",
    "location.nearby": "Nearby Facilities",
    "location.loading": "Finding nearby facilities...",
    "location.error": "Location Error",
    "location.permission_denied": "Location Access Disabled",
    "location.enable_location":
      "Enable location access to find nearby hospitals, clinics, police stations, legal aid centers, and courts.",
    "location.enable": "Enable Location Access",
    "location.fallback_title": "Can't find nearby facilities? Try these options:",
    "location.fallback_1": "Call 108 for ambulance or 100 for police",
    "location.fallback_2": "Search online for 'legal aid center near me' or 'district court'",
    "location.fallback_3": "Visit your local government office for facility information",
    "location.no_facilities": "No facilities found nearby. Please try again or use the fallback options.",
    "location.directions": "Get Directions",
  },
  hi: {
    "app.title": "स्वास्थ्य और कानूनी सहायता",
    "home.health": "स्वास्थ्य सुझाव",
    "home.legal": "कानूनी सुझाव",
    "home.faq": "ऑफलाइन FAQ",
    "health.title": "स्वास्थ्य सुझाव",
    "health.ask": "स्वास्थ्य प्रश्न पूछें",
    "health.voice": "अपना प्रश्न बोलें",
    "health.text": "अपना प्रश्न टाइप करें",
    "health.submit": "सलाह प्राप्त करें",
    "health.empty": "शुरुआत करने के लिए कृपया एक प्रश्न दर्ज करें।",
    "health.invalid": "कृपया एक स्वास्थ्य प्रश्न पूछें ताकि मैं आपकी सहायता कर सकूं।",
    "legal.title": "कानूनी सुझाव",
    "legal.ask": "कानूनी प्रश्न पूछें",
    "legal.voice": "अपना प्रश्न बोलें",
    "legal.text": "अपना प्रश्न टाइप करें",
    "legal.submit": "सलाह प्राप्त करें",
    "legal.empty": "शुरुआत करने के लिए कृपया एक प्रश्न दर्ज करें।",
    "legal.invalid": "कृपया एक कानूनी प्रश्न पूछें ताकि मैं आपकी सहायता कर सकूं।",
    "common.back": "वापस",
    "common.home": "होम",
    "common.listen": "सुनें",
    "common.speak": "बोलें",
    "common.stop": "रोकें",
    "common.disclaimer": "⚠️ यह जानकारी केवल शैक्षणिक उद्देश्यों के लिए है और पेशेवर चिकित्सा या कानूनी सलाह का विकल्प नहीं है।",
    "common.emergency": "🚨 आपातकाल: एम्बुलेंस 108 | पुलिस 100 | महिला हेल्पलाइन 1091",
    "faq.title": "अक्सर पूछे जाने वाले प्रश्न",
    "faq.fever": "अगर मुझे बुखार है तो क्या करूं?",
    "faq.fever.answer":
      "चरण 1: आराम करें - नींद आपके शरीर को संक्रमण से लड़ने में मदद करती है। चरण 2: पानी पिएं - हाइड्रेटेड रहें, दिन में 2-3 लीटर पानी पिएं। चरण 3: पैरासिटामोल लें - पैकेज पर दिए गए खुराक का पालन करें (आमतौर पर 500mg हर 4-6 घंटे में)। चरण 4: ठंडी पट्टी लगाएं - माथे पर लगाएं। डॉक्टर से मिलें अगर: बुखार 3 दिन से ज्यादा रहे, तापमान 103°F (39.4°C) से ऊपर हो, सांस लेने में कठिनाई हो, गंभीर सिरदर्द हो।",
    "faq.cough": "अगर मुझे खांसी है तो क्या करूं?",
    "faq.cough.answer":
      "चरण 1: गर्म पानी पिएं - गले को शांत करने में मदद करता है, दिन में 6-8 गिलास पिएं। चरण 2: आराम करें - अपने शरीर को ठीक होने का समय दें। चरण 3: शहद - एक चम्मच मदद कर सकता है (1 साल से कम उम्र के बच्चों के लिए नहीं)। चरण 4: धुआं से बचें - स्वच्छ हवा में रहें। डॉक्टर से मिलें अगर: खांसी 2 हफ्ते से ज्यादा रहे, खून की खांसी आए, सीने में दर्द हो, सांस लेने में कठिनाई हो।",
    "faq.headache": "अगर मुझे सिरदर्द है तो क्या करूं?",
    "faq.headache.answer":
      "चरण 1: आराम करें - शांत, अंधेरे कमरे में 30 मिनट के लिए लेटें। चरण 2: पानी पिएं - निर्जलीकरण सिरदर्द का कारण बनता है। चरण 3: पैरासिटामोल लें - पैकेज पर दिए गए खुराक का पालन करें। चरण 4: ठंडी पट्टी लगाएं - माथे या गर्दन पर 15 मिनट के लिए। डॉक्टर से मिलें अगर: सिरदर्द गंभीर और अचानक हो, 3 दिन से ज्यादा रहे, बुखार के साथ हो, दृष्टि में परिवर्तन हो।",
    "faq.stomach": "अगर मुझे पेट की समस्या है तो क्या करूं?",
    "faq.stomach.answer":
      "चरण 1: आराम करें - भारी गतिविधियों से बचें। चरण 2: धीरे-धीरे पानी पिएं - छोटे घूंट में, ठंडा पानी न पिएं। चरण 3: हल्का भोजन खाएं - चावल, ब्रेड, केला, उबली हुई सब्जियां। चरण 4: दूध और मसालेदार भोजन से बचें। डॉक्टर से मिलें अगर: दस्त 3 दिन से ज्यादा रहे, गंभीर दर्द हो, मल में खून आए, निर्जलीकरण के संकेत हों।",
    "faq.cold": "अगर मुझे सर्दी है तो क्या करूं?",
    "faq.cold.answer":
      "चरण 1: आराम करें - 8+ घंटे की नींद लें। चरण 2: गर्म तरल पदार्थ पिएं - चाय, सूप, गर्म पानी। चरण 3: नमकीन बूंदें लगाएं - नाक की भीड़ के लिए। चरण 4: नमकीन पानी से गरारे करें - गले के दर्द के लिए (गर्म पानी में 1/2 चम्मच नमक)। डॉक्टर से मिलें अगर: सर्दी 10 दिन से ज्यादा रहे, उच्च बुखार हो, सांस लेने में कठिनाई हो, गंभीर गले में दर्द हो।",
    "faq.legal.consumer": "मैं उपभोक्ता शिकायत कैसे दर्ज करूं?",
    "faq.legal.consumer.answer":
      "चरण 1: सबूत इकट्ठा करें - सभी खरीद रसीदें, उत्पाद की तस्वीरें, वारंटी कार्ड, विक्रेता के साथ संचार। चरण 2: पहले विक्रेता से संपर्क करें - 30 दिनों के भीतर विक्रेता/कंपनी को लिखित शिकायत भेजें। पत्र की प्रति रखें। चरण 3: उपभोक्ता शिकायत दर्ज करें - ₹10 लाख से कम के लिए: जिला उपभोक्ता मंच। ₹10 लाख से ₹1 करोड़ के लिए: राज्य उपभोक्ता आयोग। ₹1 करोड़ से ऊपर के लिए: राष्ट्रीय उपभोक्ता आयोग। चरण 4: आवश्यक दस्तावेज - शिकायत फॉर्म (फॉर्म-1A), बिल/रसीद की प्रतियां, आईडी प्रमाण (आधार/पैन), पता प्रमाण। चरण 5: फाइलिंग शुल्क - ₹100 से ₹5,000 दावे की राशि के आधार पर। चरण 6: समय सीमा - निर्णय आमतौर पर 3-6 महीने में। मुफ्त सहायता: राष्ट्रीय उपभोक्ता हेल्पलाइन 1800-11-4000 (10 AM - 5:30 PM), ऑनलाइन फाइलिंग: www.edaakhil.nic.in, आपके जिले में कानूनी सहायता केंद्र।",
    "faq.legal.divorce": "मैं तलाक के लिए आवेदन कैसे करूं?",
    "faq.legal.divorce.answer":
      "चरण 1: एक वकील से संपर्क करें - पेशेवर कानूनी सहायता प्राप्त करें। चरण 2: दस्तावेज इकट्ठा करें - विवाह प्रमाणपत्र, संपत्ति के कागजात, बच्चों के जन्म प्रमाणपत्र। चरण 3: अपने अधिकार जानें - पुरुषों और महिलाओं दोनों को संपत्ति और बच्चों के अधिकार हैं। चरण 4: कानूनी सहायता केंद्र जाएं - यदि आप वकील का खर्च नहीं उठा सकते तो मुफ्त सहायता। महत्वपूर्ण: तलाक में समय लगता है (आमतौर पर 6 महीने से 2 साल), आपको संपत्ति और बच्चों के अधिकार हैं, घरेलू हिंसा अवैध है। मुफ्त सहायता: आपके जिले में कानूनी सहायता केंद्र, NGO, महिला हेल्पलाइन 1091।",
    "faq.legal.property": "मैं अपनी संपत्ति की रक्षा कैसे करूं?",
    "faq.legal.property.answer":
      "चरण 1: अपनी संपत्ति पंजीकृत करें - सभी दस्तावेजों के साथ भूमि कार्यालय जाएं। चरण 2: सभी दस्तावेज रखें - डीड, रसीदें, कर के कागजात, पंजीकरण प्रमाणपत्र। चरण 3: सर्वेक्षण करवाएं - अपनी संपत्ति की सटीक सीमाएं जानें। चरण 4: वसीयत बनाएं - अपने परिवार के भविष्य की रक्षा करें। महत्वपूर्ण: ऐसे कागजात पर हस्ताक्षर न करें जिन्हें आप नहीं समझते, खरीद/बिक्री से पहले कानूनी सहायता लें, विक्रेता के स्वामित्व दस्तावेजों की पुष्टि करें। मुफ्त सहायता: कानूनी सहायता केंद्र, संपत्ति पंजीकरण कार्यालय।",
    "faq.legal.rights": "मेरे बुनियादी कानूनी अधिकार क्या हैं?",
    "faq.legal.rights.answer":
      "आपके पास निम्नलिखित अधिकार हैं: समानता - जाति, धर्म, लिंग, आयु के आधार पर कोई भेदभाव नहीं। स्वतंत्रता - भाषण, आंदोलन, धर्म, सभा की स्वतंत्रता। सुरक्षा - हिंसा और शोषण से सुरक्षा। न्याय - निष्पक्ष परीक्षण और कानूनी सहायता का अधिकार। यदि आपके अधिकारों का उल्लंघन होता है: पुलिस को रिपोर्ट करें, कानूनी सहायता केंद्र से संपर्क करें, यदि आवश्यक हो तो महिला हेल्पलाइन (1091) को कॉल करें, NGO और सामुदायिक संगठनों से संपर्क करें।",
    "faq.legal.contract": "मुझे अनुबंधों के बारे में क्या जानना चाहिए?",
    "faq.legal.contract.answer":
      "चरण 1: ध्यान से पढ़ें - हस्ताक्षर करने से पहले हर शब्द को समझें। चरण 2: सवाल पूछें - यदि भ्रमित हों तो हस्ताक्षर न करें। चरण 3: कानूनी समीक्षा प्राप्त करें - एक वकील से इसकी जांच करवाएं। चरण 4: प्रतियां रखें - हमेशा अपने लिए एक प्रति रखें। कभी हस्ताक्षर न करें: ऐसे कागजात जिन्हें आप नहीं समझते, खाली कागजात, ऐसे कागजात जिनमें सुधार हो जो आपने नहीं किए। मुफ्त सहायता: कानूनी सहायता केंद्र, वकील परामर्श।",
    "faq.legal.arrest": "मैं अरेस्ट के लिए कैसे करूं?",
    "faq.legal.arrest.answer":
      "EMERGENCY: If You Are Arrested - Step 1: Stay Calm - Do not resist or argue with police. Step 2: Know Your Rights - You have the right to remain silent. Step 3: Ask for Lawyer - Say 'I want to speak to a lawyer' and stay silent. Step 4: Do Not Sign Anything - Without a lawyer present. Your Legal Rights: Right to know charges, Right to remain silent, Right to a lawyer (free if poor), Right to inform family, Right to medical exam if injured, Right to bail hearing within 24-48 hours. What Happens: Police take you to station, You will be questioned (you can refuse), You will be presented before magistrate within 24 hours, Bail hearing will be held, You can get free legal help. Free Help: Legal Aid Centers, Police Station, District Court, NGOs, National Legal Services Authority (NALSA). Important: Do not confess without a lawyer, Keep all documents, Note down police officer names, Contact family immediately, Ask for bail as soon as possible.",
    "location.nearby": "पास की सुविधाएं",
    "location.loading": "पास की सुविधाएं खोज रहे हैं...",
    "location.error": "स्थान त्रुटि",
    "location.permission_denied": "स्थान पहुंच अक्षम",
    "location.enable_location":
      "पास के अस्पतालों, क्लीनिकों, पुलिस स्टेशनों, कानूनी सहायता केंद्रों और अदालतों को खोजने के लिए स्थान पहुंच सक्षम करें।",
    "location.enable": "स्थान पहुंच सक्षम करें",
    "location.fallback_title": "पास की सुविधाएं नहीं मिल सकीं? ये विकल्प आजमाएं:",
    "location.fallback_1": "एम्बुलेंस के लिए 108 या पुलिस के लिए 100 पर कॉल करें",
    "location.fallback_2": "'मेरे पास कानूनी सहायता केंद्र' या 'जिला अदालत' के लिए ऑनलाइन खोजें",
    "location.fallback_3": "सुविधा की जानकारी के लिए अपने स्थानीय सरकारी कार्यालय में जाएं",
    "location.no_facilities": "पास में कोई सुविधा नहीं मिली। कृपया फिर से प्रयास करें या फॉलबैक विकल्पों का उपयोग करें।",
    "location.directions": "दिशा निर्देश प्राप्त करें",
  },
  te: {
    "app.title": "ఆరోగ్య మరియు చట్ట సహాయం",
    "home.health": "ఆరోగ్య సూచనలు",
    "home.legal": "చట్ట సూచనలు",
    "home.faq": "ఆఫ్‌లైన్ FAQ",
    "health.title": "ఆరోగ్య సూచనలు",
    "health.ask": "ఆరోగ్య ప్రశ్న అడగండి",
    "health.voice": "మీ ప్రశ్నను చెప్పండి",
    "health.text": "మీ ప్రశ్నను టైప్ చేయండి",
    "health.submit": "సలహా పొందండి",
    "health.empty": "ప్రారంభించడానికి దయచేసి ప్రశ్న నమోదు చేయండి.",
    "health.invalid": "దయచేసి ఆరోగ్య ప్రశ్న అడగండి ఇంకా నేను మీకు సహాయం చేయగలను.",
    "legal.title": "చట్ట సూచనలు",
    "legal.ask": "చట్ట ప్రశ్న అడగండి",
    "legal.voice": "మీ ప్రశ్నను చెప్పండి",
    "legal.text": "మీ ప్రశ్నను టైప్ చేయండి",
    "legal.submit": "సలహా పొందండి",
    "legal.empty": "ప్రారంభించడానికి దయచేసి ప్రశ్న నమోదు చేయండి.",
    "legal.invalid": "దయచేసి చట్ట ప్రశ్న అడగండి ఇంకా నేను మీకు సహాయం చేయగలను.",
    "common.back": "వెనుకకు",
    "common.home": "హోమ్",
    "common.listen": "వినండి",
    "common.speak": "మాట్లాడండి",
    "common.stop": "ఆపండి",
    "common.disclaimer": "⚠️ ఈ సమాచారం విద్యా ప్రయోజనాల కోసం మాత్రమే మరియు వృత్తిపరమైన వైద్య లేదా చట్ట సలహా యొక్క ప్రత్యామ్నాయం కాదు.",
    "common.emergency": "🚨 అత్యవసర: అంబులెన్స్ 108 | పోలీసు 100 | మహిళా హెల్‌లైన్ 1091",
    "faq.title": "తరచుగా అడిగే ప్రశ్నలు",
    "faq.fever": "నాకు జ్వరం ఉంటే నేను ఏమి చేయాలి?",
    "faq.fever.answer":
      "దశ 1: విశ్రాంతి తీసుకోండి - నిద్ర మీ శరీరం సంక్రమణ నుండి రక్షణ చేయడానికి సహాయపడుతుంది. దశ 2: నీరు తాగండి - హైడ్రేటెడ్ ఉండండి, రోజుకు 2-3 లీటర్ నీరు తాగండి. దశ 3: పారాసెటామోల్ తీసుకోండి - ప్యాకేజీ పై ఇచ్చిన మోతాదు అనుసరించండి (సాధారణంగా 500mg ప్రతి 4-6 గంటలకు). దశ 4: చల్లని కంప్రెస్ లగాయించండి - నుదిటిపై. డాక్టర్‌ను చూడండి: జ్వరం 3 రోజుల కంటే ఎక్కువ ఉంటే, ఉష్ణోగ్రత 103°F (39.4°C) కంటే ఎక్కువ ఉంటే, శ్వాస తీసుకోవడంలో ఇబ్బంది ఉంటే, తీవ్రమైన తలనొప్పి ఉంటే.",
    "faq.cough": "నాకు దగ్గ ఉంటే నేను ఏమి చేయాలి?",
    "faq.cough.answer":
      "దశ 1: వెచ్చని నీరు తాగండి - గొంతును శాంతపరుస్తుంది, రోజుకు 6-8 గ్లాసులు తాగండి. దశ 2: విశ్రాంతి తీసుకోండి - మీ శరీరం నయం కావడానికి సమయం ఇవ్వండి. దశ 3: తేనె - ఒక చెంచా సహాయపడుతుంది (1 సంవత్సరం కంటే తక్కువ పిల్లలకు కాదు). దశ 4: పొగ నుండి తప్పుకోండి - స్వచ్ఛమైన గాలిలో ఉండండి. డాక్టర్‌ను చూడండి: దగ్గ 2 వారాల కంటే ఎక్కువ ఉంటే, రక్తం కోసుకుంటే, ఛాతీ నొప్పి ఉంటే, శ్వాస తీసుకోవడంలో ఇబ్బంది ఉంటే.",
    "faq.headache": "నాకు తలనొప్పి ఉంటే నేను ఏమి చేయాలి?",
    "faq.headache.answer":
      "దశ 1: విశ్రాంతి తీసుకోండి - నిశ్శబ్ద, చీకటి గదిలో 30 నిమిషాలు పడుకోండి. దశ 2: నీరు తాగండి - నిర్జలీకరణ తలనొప్పికి కారణమవుతుంది. దశ 3: పారాసెటామోల్ తీసుకోండి - ప్యాకేజీ పై ఇచ్చిన మోతాదు అనుసరించండి. దశ 4: చల్లని కంప్రెస్ లగాయించండి - నుదిటిపై లేదా మెడపై 15 నిమిషాలు. డాక్టర్‌ను చూడండి: తలనొప్పి తీవ్రమైనది మరియు ఆకస్మికమైనది ఉంటే, 3 రోజుల కంటే ఎక్కువ ఉంటే, జ్వరం ఉంటే, దృష్టిలో మార్పు ఉంటే.",
    "faq.stomach": "నాకు కడుపు సమస్యలు ఉంటే నేను ఏమి చేయాలి?",
    "faq.stomach.answer":
      "దశ 1: విశ్రాంతి తీసుకోండి - భారీ కార్యకలాపాల నుండి తప్పుకోండి. దశ 2: నెమ్మదిగా నీరు తాగండి - చిన్న సిప్‌లలో, చల్లని నీరు తాగవద్దు. దశ 3: తేలికైన ఆహారం తినండి - అన్నం, రొట్టె, అరటి, ఉడికిన కూరగాయలు. దశ 4: పాలు మరియు మసాలా ఆహారం నుండి తప్పుకోండి. డాక్టర్‌ను చూడండి: విరేచనలు 3 రోజుల కంటే ఎక్కువ ఉంటే, తీవ్రమైన నొప్పి ఉంటే, మలంలో రక్తం ఉంటే, నిర్జలీకరణ సంకేతాలు ఉంటే.",
    "faq.cold": "నాకు జలుబు ఉంటే నేను ఏమి చేయాలి?",
    "faq.cold.answer":
      "దశ 1: విశ్రాంతి తీసుకోండి - 8+ గంటల నిద్ర తీసుకోండి. దశ 2: వెచ్చని ద్రవాలు తాగండి - చాయ, సూప్, వెచ్చని నీరు. దశ 3: ఉప్పు చుక్కలు ఉపయోగించండి - ముక్కు ఆక్రమణ కోసం. దశ 4: ఉప్పు నీటితో గర్గర చేయండి - గొంతు నొప్పి కోసం (వెచ్చని నీటిలో 1/2 చెంచా ఉప్పు). డాక్టర్‌ను చూడండి: జలుబు 10 రోజుల కంటే ఎక్కువ ఉంటే, ఉచ్చ జ్వరం ఉంటే, శ్వాస తీసుకోవడంలో ఇబ్బంది ఉంటే, తీవ్రమైన గొంతు నొప్పి ఉంటే.",
    "faq.legal.consumer": "నేను ఎక్కువ వినియోగదారు ఫిర్యాదు ఎలా దాఖలు చేయాలి?",
    "faq.legal.consumer.answer":
      "దశ 1: సాక్ష్యం సేకరించండి - అన్ని కొనుగోలు రసీదులు, ఉత్పత్తి ఫోటోలు, వారెంటీ కార్డులు, విక్రేతకు సంబంధించిన సంభాషణ. దశ 2: ముందుగా విక్రేతకు సంపర్కం చేయండి - 30 రోజుల్లో విక్రేత/కంపనీకు వ్రాతపూర్వక ఫిర్యాదు పంపండి. లేఖ యొక్క కాపీ ఉంచండి. దశ 3: వినియోగదారు ఫిర్యాదు దాఖలు చేయండి - ₹10 లక్ష కంటే తక్కువ: జిల్లా వినియోగదారు ఫోరమ్. ₹10 లక్ష నుండి ₹1 కోటి: రాష్ట్ర వినియోగదారు కమిషన్. ₹1 కోటికి ఎక్కువ: జాతీయ వినియోగదారు కమిషన్. దశ 4: అవసరమైన డాక్యుమెంట్‌లు - ఫిర్యాదు ఫారమ్ (ఫారమ్-1A), బిల్‌ల/రసీదుల కాపీలు, ID ప్రూఫ్ (ఆధార్/PAN), చిరునామా ప్రూఫ్. దశ 5: ఫైలింగ్ ఫీ - ₹100 నుండి ₹5,000 క్లెయిమ్ మొత్తం ఆధారంగా. దశ 6: సమయ సీమ - నిర్ణయం సాధారణంగా 3-6 నెలల్లో. ఉచిత సహాయం: జాతీయ వినియోగదారు హెల్‌లైన్ 1800-11-4000 (10 AM - 5:30 PM), ఆన్‌లైన్ ఫైలింగ్: www.edaakhil.nic.in, మీ జిల్లలో చట్ట సహాయ కేంద్రాలు.",
    "faq.legal.divorce": "నేను విడాకులు కోసం దరఖాస్తు చేయడం ఎలా?",
    "faq.legal.divorce.answer":
      "దశ 1: న్యాయవాదిని సంపర్కం చేయండి - వృత్తిపర చట్ట సహాయం పొందండి. దశ 2: డాక్యుమెంట్‌లు సేకరించండి - వివాహ సర్టిఫికేట్, ఆస్తి కాగితాలు, పిల్లల జన్మ సర్టిఫికెట్‌లు. దశ 3: మీ హక్కులను తెలుసుకోండి - పురుషులకు మరియు మహిళలకు ఆస్తి మరియు పిల్లల హక్కులు ఉన్నాయి. దశ 4: చట్ట సహాయ కేంద్రానికి వెళ్లండి - మీరు న్యాయవాది ఖర్చు భరించలేకపోతే ఉచిత సహాయం. ముఖ్యమైనది: విడాకులకు సమయం పడుతుంది (సాధారణంగా 6 నెలల నుండి 2 సంవత్సరాలు), మీకు ఆస్తి మరియు పిల్లల హక్కులు ఉన్నాయి, గృహ హింస చట్టవిరుద్ధం. ఉచిత సహాయం: మీ జిల్లలో చట్ట సహాయ కేంద్రాలు, NGO, మహిళా హెల్‌లైన్ 1091.",
    "faq.legal.property": "నేను నా ఆస్తిని ఎలా రక్షించాలి?",
    "faq.legal.property.answer":
      "దశ 1: మీ ఆస్తిని నమోదు చేయండి - అన్ని డాక్యుమెంట్‌లతో భూమి కార్యాలయానికి వెళ్లండి. దశ 2: అన్ని డాక్యుమెంట్‌లను ఉంచండి - డీడ్‌లు, రసీదులు, ట్యాక్స్ కాగితాలు, నమోదు సర్టిఫికెట్. దశ 3: సర్వే చేయించుకోండి - మీ ఆస్తి యొక్క ఖచ్చితమైన సరిహద్దులను తెలుసుకోండి. దశ 4: వసీయత చేయించుకోండి - మీ కుటుంబం యొక్క భవిష్యత్తును రక్షించండి. ముఖ్యమైనది: మీరు అర్థం చేసుకోని కాగితాలపై సంతకం చేయవద్దు, కొనుగోలు/విక్రయానికి ముందు చట్ట సహాయం పొందండి, విక్రేత యొక్క యాజమాన్య డాక్యుమెంట్‌లను ధృవీకరించండి. ఉచిత సహాయం: చట్ట సహాయ కేంద్రాలు, ఆస్తి నమోదు కార్యాలయాలు.",
    "faq.legal.rights": "నా ప్రాథమిక చట్ట హక్కులు ఏమిటి?",
    "faq.legal.rights.answer":
      "మీకు ఈ క్రింది హక్కులు ఉన్నాయి: సమానత్వం - జాతి, మతం, లింగం, వయస్సు ఆధారంగా వివక్ష ఉండదు. స్వేచ్ఛ - ప్రసంగం, చలనం, మతం, సమావేశం యొక్క స్వేచ్ఛ. సంరక్షణ - హింస మరియు దోపిడీ నుండి సంరక్షణ. న్యాయం - న్యాయమైన విచారణ మరియు చట్ట సహాయ హక్కు. మీ హక్కులు ఉల్లంఘించినట్లయితే: పోలీసుకు నివేదించండి, చట్ట సహాయ కేంద్రానికి సంపర్కం చేయండి, అవసరమైతే మహిళా హెల్‌లైన్ (1091)కు కాల్ చేయండి, NGO మరియు సామాజిక సంస్థలకు సంపర్కం చేయండి.",
    "faq.legal.contract": "నేను ఒప్పందాల గురించి ఏమి తెలుసుకోవాలి?",
    "faq.legal.contract.answer":
      "దశ 1: జాగ్రత్తగా చదవండి - సంతకం చేయడానికి ముందు ప్రతి పదాన్ని అర్థం చేసుకోండి. దశ 2: ప్రశ్నలు అడగండి - గందరగోళం ఉంటే సంతకం చేయవద్దు. దశ 3: చట్ట సమీక్ష పొందండి - న్యాయవాదిని దీన్ని తనిఖీ చేయించుకోండి. దశ 4: కాపీలను ఉంచండి - ఎల్లప్పుడు మీ కోసం ఒక కాపీ ఉంచండి. ఎప్పుడూ సంతకం చేయవద్దు: మీరు అర్థం చేసుకోని కాగితాలు, ఖాళీ కాగితాలు, మీరు చేయని సవరణలు ఉన్న కాగితాలు. ఉచిత సహాయం: చట్ట సహాయ కేంద్రాలు, న్యాయవాది సలహా.",
    "faq.legal.arrest": "నేను అరెస్ట్ కోసం ఎలా చేయాలి?",
    "faq.legal.arrest.answer":
      "EMERGENCY: If You Are Arrested - Step 1: Stay Calm - Do not resist or argue with police. Step 2: Know Your Rights - You have the right to remain silent. Step 3: Ask for Lawyer - Say 'I want to speak to a lawyer' and stay silent. Step 4: Do Not Sign Anything - Without a lawyer present. Your Legal Rights: Right to know charges, Right to remain silent, Right to a lawyer (free if poor), Right to inform family, Right to medical exam if injured, Right to bail hearing within 24-48 hours. What Happens: Police take you to station, You will be questioned (you can refuse), You will be presented before magistrate within 24 hours, Bail hearing will be held, You can get free legal help. Free Help: Legal Aid Centers, Police Station, District Court, NGOs, National Legal Services Authority (NALSA). Important: Do not confess without a lawyer, Keep all documents, Note down police officer names, Contact family immediately, Ask for bail as soon as possible.",
    "location.nearby": "సమీపంలోని సువిధలు",
    "location.loading": "సమీపంలోని సువిధలను కనుగొంటున్నాము...",
    "location.error": "స్థానం లోపం",
    "location.permission_denied": "స్థానం ప్రాప్తి నిలిపివేయబడింది",
    "location.enable_location":
      "సమీపంలోని ఆసుపత్రులు, క్లినిక్‌లు, పోలీసు స్టేషన్‌లు, చట్ట సహాయ కేంద్రాలు మరియు న్యాయస్థానాలను కనుగొనడానికి స్థానం ప్రాప్తిని ప్రారంభించండి.",
    "location.enable": "స్థానం ప్రాప్తిని ప్రారంభించండి",
    "location.fallback_title": "సమీపంలోని సువిధలు కనుగొనలేకపోయారా? ఈ ఎంపికలను ప్రయత్నించండి:",
    "location.fallback_1": "అంబులెన్స్ కోసం 108 లేదా పోలీసు కోసం 100కు కాల్ చేయండి",
    "location.fallback_2": "'నా సమీపంలో చట్ట సహాయ కేంద్రం' లేదా 'జిల్లా న్యాయస్థానం' కోసం ఆన్‌లైన్‌లో శోధించండి",
    "location.fallback_3": "సువిధ సమాచారం కోసం మీ స్థానిక ప్రభుత్వ కార్యాలయానికి సందర్శించండి",
    "location.no_facilities": "సమీపంలో సువిధలు కనుగొనబడలేదు. దయచేసి మళ్లీ ప్రయత్నించండి లేదా ఫాల్‌బ్యాక్ ఎంపికలను ఉపయోగించండి.",
    "location.directions": "దిశలను పొందండి",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("language") as Language | null
    if (saved && ["en", "hi", "te"].includes(saved)) {
      setLanguageState(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  const value: LanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    t,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
