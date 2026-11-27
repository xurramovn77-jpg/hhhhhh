import React, { useEffect, useMemo, useRef, useState } from 'react';
import spaceHeroUrl from 'container:///mnt/data/src/assets/62fb684098bf20a5-image_20261125_181700.webp';
import jsLogoUrl from 'container:///mnt/data/src/assets/176d695b7251e55c-js_logo_cutout.png';
import pythonLogoUrl from 'container:///mnt/data/src/assets/0707f12c8ac7e14c-python_logo_cutout.png';
import htmlLogoUrl from 'container:///mnt/data/src/assets/f0279a08d5e3a86a-html_logo_cutout.png';
import cssLogoUrl from 'container:///mnt/data/src/assets/bfa27ccd661da09a-css_logo_cutout.png';
import nodeLogoUrl from 'container:///mnt/data/src/assets/260046c3167c2fcb-node_logo_cutout.png';
import gitLogoUrl from 'container:///mnt/data/src/assets/efe5152ee7e8b0df-git_logo_cutout.png';
import idrokLogoUrl from 'container:///mnt/data/src/assets/8d27d466e8a53451-idrok_logo_cutout.png';
import { GraduationCap, Search, Heart, Star, Clock, BookOpen, Play, CheckCircle2, ChevronLeft, ChevronRight, Trophy, Users, Target, Award, Flame, ArrowRight, Sparkles, BarChart3, X, Check, RotateCcw, Menu, Zap, Globe, Calculator, Code2, ChevronDown, Eye, EyeOff, Brain, Copy, Rocket, Atom, Boxes, FolderGit2, Layers, Server, Terminal, Palette, MonitorSmartphone, Database, GitBranch, Cloud, Hammer, CirclePlay, FileCode2, LogOut, ShieldCheck, BadgeCheck, Pencil, Settings, Bell, Languages, Moon, Sun, User, Send, MessageCircle, RefreshCw } from 'lucide-react';

type Lesson = { id:string; title:string; minutes:number; content:string[]; points:string[]; code:string; codeLang:string; task:string };
type Course = { id:string; title:string; category:string; mentor:string; mentorRole:string; rating:number; students:number; duration:string; lessonsCount:number; level:string; price:string; gradient:string; icon:React.ReactNode; desc:string; tech:string[]; lessons:Lesson[]; meta?:string };
type QuizQ = { q:string; code?:string; options:string[]; correct:number; explain:string };
type Project = { id:string; title:string; desc:string; level:string; tech:string[]; time:string; tasks:string[]; result:string };

const DARK_GRADIENT = 'linear-gradient(135deg,#2563EB,#7C3AED)';
const GRAD_FRONTEND = ['linear-gradient(135deg,#7C3AED,#2563EB)','linear-gradient(135deg,#8B5CF6,#3B82F6)','linear-gradient(135deg,#6D28D9,#1D4ED8)','linear-gradient(135deg,#A855F7,#2563EB)','linear-gradient(135deg,#7C3AED,#0EA5E9)'];
const GRAD_BACKEND = ['linear-gradient(135deg,#0EA5E9,#2563EB)','linear-gradient(135deg,#38BDF8,#1D4ED8)','linear-gradient(135deg,#06B6D4,#2563EB)','linear-gradient(135deg,#0EA5E9,#1E40AF)','linear-gradient(135deg,#38BDF8,#7C3AED)'];
const GRAD_PYTHON = ['linear-gradient(135deg,#7C3AED,#EC4899)','linear-gradient(135deg,#8B5CF6,#F472B6)','linear-gradient(135deg,#6D28D9,#DB2777)','linear-gradient(135deg,#A855F7,#EC4899)','linear-gradient(135deg,#7C3AED,#F43F5E)'];
const GRAD_MOBIL = ['linear-gradient(135deg,#10B981,#0EA5E9)','linear-gradient(135deg,#22C55E,#38BDF8)','linear-gradient(135deg,#059669,#2563EB)','linear-gradient(135deg,#10B981,#06B6D4)','linear-gradient(135deg,#34D399,#0EA5E9)'];
const GRAD_FULLSTACK = ['linear-gradient(135deg,#6D28D9,#2563EB)','linear-gradient(135deg,#8B5CF6,#1D4ED8)','linear-gradient(135deg,#7C3AED,#0EA5E9)','linear-gradient(135deg,#5B21B6,#3B82F6)','linear-gradient(135deg,#9333EA,#2563EB)'];
function mkLessons(prefix:string, titles:string[]): Lesson[]{
  return titles.map((t,i)=>({id: prefix + "-" + (i+1), title:t, minutes:22+i*3, content:[t + " - amaliyot bilan organamiz. Har bir qadamda kod yozib, natijani darhol korasiz.", "Bu darsda eng muhim tushunchani ajratib olamiz va uni kichik mashq bilan mustahkamlaymiz."], points:[t,"Amaliy mashq","Kod namunasi"], code:"// " + t + "\nconsole.log(\"Amaliyotni boshlang\");", codeLang:"Kod", task: t + " boyicha kichik mashq bajaring va natijani Kod muharririda tekshiring."}));
}
const CATEGORIES = ['Barchasi','Frontend','Backend','Python','Mobil','Fullstack'];
const DAYS = ['Dush','Sesh','Chor','Pay','Jum','Shan','Yak'];
const WEEK = [50,85,65,115,90,45,75];
const GLASS = 'bg-[rgba(13,18,38,0.74)] backdrop-blur-2xl border border-[rgba(147,197,253,0.30)] rounded-[18px] shadow-[0_20px_44px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.10)] text-[#F1F5F9]';
const GLASS_SOFT = 'bg-white/[0.08] backdrop-blur-xl border border-[rgba(147,197,253,0.20)] rounded-[18px] text-[#F1F5F9] shadow-[0_14px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)]';
const BTN = 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold rounded-full hover:shadow-[0_12px_30px_rgba(59,130,246,0.45)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300';
const BTN_DARK = 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-bold rounded-full hover:shadow-[0_10px_26px_rgba(59,130,246,0.45)] active:scale-[0.98] transition-all duration-200';
const INPUT = 'w-full bg-[#020617] border border-white/15 rounded-[18px] px-4 py-3 text-[16px] font-medium text-white placeholder:text-[#64748B] outline-none focus:border-[#60A5FA] focus:ring-2 focus:ring-[#2563EB]/30 transition shadow-sm';
const MUTED = 'text-[#CBD5E1]';
const CHIP = 'bg-white/[0.07] border border-white/15 text-[#E2E8F0] px-3 py-1.5 rounded-full text-[13px] font-bold';
type ChatChannelId = 'qa' | 'projects' | 'contest';
type ChatMessage = { id:string; channel:ChatChannelId; author:string; text:string; created_at:string };
const CHAT_CHANNELS: {id:ChatChannelId; title:string; desc:string; online:number; color:string; emoji:string}[] = [
  {id:'qa', title:'Savol-javob', desc:'Tushunmagan joyingni so‘ra — o‘quvchilar va mentorlar javob beradi.', online:128, color:'#2563EB', emoji:'💬'},
  {id:'projects', title:'Loyihalar almashish', desc:'Loyihangni ulash, boshqalarning ishini ko‘r va fikr bildir.', online:96, color:'#7C3AED', emoji:'🚀'},
  {id:'contest', title:'Haftalik musobaqa', desc:'Har hafta kichik vazifa — ball to‘pla, reytingda yuqoriga ko‘taril.', online:214, color:'#F59E0B', emoji:'🏆'},
];
const CHAT_SEEDS: ChatMessage[] = [
  {id:'seed-qa-1', channel:'qa', author:'Kamola R.', text:'Salom! Flexbox da justify-content bilan align-items farqi nima? Har doim adashtirib yuboraman.', created_at:'2026-02-10T09:12:00'},
  {id:'seed-qa-2', channel:'qa', author:'Javohir T.', text:'justify-content — gorizontal, align-items — vertikal tekislash. Bir misol bilan ko‘rsatib beraman: qator ichida birinchi o‘rtaga, ikkinchi tepaga qo‘yadi.', created_at:'2026-02-10T09:18:00'},
  {id:'seed-qa-3', channel:'qa', author:'Laylo A.', text:'Rahmat! Endi tushundim — ertaga shu mavzuda testni ham yechib ko‘raman.', created_at:'2026-02-10T09:24:00'},
  {id:'seed-projects-1', channel:'projects', author:'Sardor M.', text:'Birinchi portfolio saytimni tugatdim! Hero, loyihalar va aloqa bo‘limi bor. Fikrlaringizni kutaman.', created_at:'2026-02-10T10:02:00'},
  {id:'seed-projects-2', channel:'projects', author:'Kamola R.', text:'Zo‘r chiqibdi! Faqat mobil ko‘rinishda kartochkalar orasiga biroz ko‘proq bo‘shliq kerak ekan.', created_at:'2026-02-10T10:11:00'},
  {id:'seed-projects-3', channel:'projects', author:'Bekzod N.', text:'Men ham ob-havo ilovasini qildim — shahar yozilsa harorat chiqadi. Ertaga shu yerga ulashaman.', created_at:'2026-02-10T10:19:00'},
  {id:'seed-contest-1', channel:'contest', author:'Javohir T.', text:'Bu haftaning vazifasi: hisoblagich ilovasi! Bosganda son oshsin va kamaysin. Eng toza kod — g‘olib.', created_at:'2026-02-10T08:45:00'},
  {id:'seed-contest-2', channel:'contest', author:'Laylo A.', text:'Men qildim! Endi nolga yetganda tugma o‘chib turadigan qilib qo‘ydim.', created_at:'2026-02-10T09:40:00'},
  {id:'seed-contest-3', channel:'contest', author:'Sardor M.', text:'Hozir boshlayman — kechgacha ulguraman. Omad hammaga!', created_at:'2026-02-10T09:52:00'},
];
function chatAvatarColor(name:string){
  const colors = ['#2563EB','#7C3AED','#047857','#9D174D','#92400E','#0E7490','#DB2777'];
  let h = 0; for(let i=0;i<name.length;i++){ h = (h*31 + name.charCodeAt(i)) >>> 0; }
  return colors[h % colors.length];
}
function chatInitials(name:string){ return name.trim().split(/\s+/).map(w=>w[0]).join('').slice(0,2).toUpperCase() || 'ID'; }
function chatTime(iso:string){
  const d = new Date(iso);
  if(Number.isNaN(d.getTime())) return '';
  try{ return d.toLocaleTimeString('uz-UZ',{hour:'2-digit', minute:'2-digit'}); }catch{ return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`; }
}
const AVATAR_OPTIONS = [
  {id:'nx', emoji:'', label:'NX harflari', bg:'#2563EB'},
  {id:'dev', emoji:'👨‍💻', label:'Dasturchi', bg:'#2563EB'},
  {id:'coder', emoji:'👩‍💻', label:'Dasturchi', bg:'#7C3AED'},
  {id:'rocket', emoji:'🚀', label:'Raketa', bg:'#0E7490'},
  {id:'grad', emoji:'🎓', label:'Bitiruvchi', bg:'#047857'},
  {id:'snake', emoji:'🐍', label:'Python', bg:'#92400E'},
  {id:'bolt', emoji:'⚡', label:'Chaqmoq', bg:'#9D174D'},
  {id:'laptop', emoji:'💻', label:'Noutbuk', bg:'#1D4ED8'},
];
const LOGIN_LOGOS = [
  {src: jsLogoUrl, alt:'JavaScript logosi'},
  {src: pythonLogoUrl, alt:'Python logosi'},
  {src: htmlLogoUrl, alt:'HTML5 logosi'},
  {src: cssLogoUrl, alt:'CSS3 logosi'},
  {src: nodeLogoUrl, alt:'Node.js logosi'},
  {src: gitLogoUrl, alt:'Git logosi'},
];

const COURSES: Course[] = [
  { id:'html-css', title:'HTML & CSS: Noldan sayt tuzilmasi', category:'Frontend', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.9, students:3420, duration:'14 soat', lessonsCount:28, level:'Boshlang‘ich', price:'Bepul', gradient:GRAD_FRONTEND[0], icon:<FileCode2 size={30}/>, tech:['HTML','CSS','Flexbox'], desc:'Saytning skeleti va ko‘rinishini noldan qurasiz. Teglar, bloklar, ranglar, shriftlar va moslashuvchan joylashuv — barchasi amaliyot bilan. Kurs oxirida o‘z birinchi sahifangiz tayyor bo‘ladi.',
    lessons:[
      {id:'html-1',title:'HTML nima? Birinchi sahifang',minutes:18,content:['HTML — saytning skeleti. Har bir sahifa teglar bilan quriladi: sarlavha, matn, rasm va tugma — barchasi teg. Brauzer bu teglarni o‘qib, siz ko‘rayotgan sahifaga aylantiradi.','Bu darsda birinchi faylingizni yaratasiz: sarlavha, ikki qator matn va bitta tugma. Kodni yozishdan qo‘rqmang — xato qilish o‘rganishning bir qismi.'],points:['<!DOCTYPE html> — hujjat turi','<h1> sarlavha, <p> matn','<button> tugma'],code:`<h1>Salom, men Nurislomman!</h1>\n<p>Bu mening birinchi saytim.</p>\n<button>Men bilan tanish</button>`,codeLang:'HTML',task:'O‘z ismingiz, bir qator tanishtiruv va bitta tugma bilan sahifa yarating.'},
      {id:'html-2',title:'Rasm, havola va ro‘yxatlar',minutes:22,content:['Sayt faqat matndan iborat emas. Rasm sahifani jonlantiradi, havola boshqa sahifaga olib boradi, ro‘yxat esa ma’lumotni tartibga soladi.','Havolada href — manzil, rasmda src — rasm manzili, alt — rasm yuklanmasa chiqadigan matn. Bu uchta atributni bilishning o‘zi ko‘p sahifani qurishga yetadi.'],points:['<a href="..."> havola','<img src="..." alt="..."> rasm','<ul> va <ol> ro‘yxatlar'],code:`<a href="#ishlar">Ishlarimni ko‘rish</a>\n<img src="men.jpg" alt="Nurislom portreti">\n<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>`,codeLang:'HTML',task:'3 ta ko‘nikmangiz ro‘yxatini va bir havolani sahifangizga qo‘shing.'},
      {id:'html-3',title:'CSS: rang, shrift va bloklar',minutes:26,content:['CSS — saytning kiyimi. HTML skelet bo‘lsa, CSS unga rang, o‘lcham va joylashuv beradi. Bitta qoida bilan butun sahifaning ko‘rinishini o‘zgartirish mumkin.','Eng ko‘p ishlatiladigan xossalar: color — matn rangi, background — fon, font-size — shrift o‘lchami, padding — ichki bo‘shliq, border-radius — burchak yumaloqligi.'],points:['Tanlovchi + xossa + qiymat','class bilan tanlash','padding, margin, border-radius'],code:`h1 {\n  color: #6D28D9;\n  font-size: 42px;\n}\nbutton {\n  background: #6D28D9;\n  color: white;\n  padding: 12px 20px;\n  border-radius: 999px;\n}`,codeLang:'CSS',task:'Sarlavhangizni binafsha, tugmangizni yumaloq va oq yozuvli qiling.'},
      {id:'html-4',title:'Flexbox: elementlarni yonma-yon qo‘yish',minutes:28,content:['Flexbox — elementlarni qator yoki ustun bo‘yicha tartibga solishning eng qulay usuli. display: flex yozishingiz bilan bolalar yonma-yon turadi.','justify-content elementlar orasidagi bo‘shliqni, align-items esa vertikal tekislashni boshqaradi. Shu ikki xossa bilan menyu, kartochkalar va hero bo‘limini yig‘ish mumkin.'],points:['display: flex','justify-content: space-between','gap — elementlar orasi'],code:`.qator {\n  display: flex;\n  gap: 16px;\n  justify-content: space-between;\n  align-items: center;\n}`,codeLang:'CSS',task:'3 ta kartochkani Flexbox bilan bitta qatorga joylashtiring.'},
      {id:'html-5',title:'Mobilga moslashuv va birinchi sahifa',minutes:30,content:['Saytlarning yarmidan ko‘pi telefonda ochiladi. Shuning uchun sahifa kichik ekranda ham chiroyli ko‘rinishi kerak. max-width va media so‘rovlar shu ishni bajaradi.','Bu yakuniy darsda hamma o‘rganganingizni birlashtirasiz: sarlavha, ro‘yxat, kartochkalar va tugma — bitta to‘liq sahifa.'],points:['max-width: 1100px','@media (max-width: 600px)','Mobil avval, keyin kompyuter'],code:`@media (max-width: 600px) {\n  h1 { font-size: 30px; }\n  .qator { flex-direction: column; }\n}`,codeLang:'CSS',task:'Sahifangizni telefon kengligida tekshiring: kartochkalar ustma-ust tushsin.'},
    ]},
  { id:'js', title:'JavaScript chuqur: Mantiq va interaktivlik', category:'Frontend', mentor:'Javohir To‘xtayev', mentorRole:'Senior dasturchi • 7 yil tajriba', rating:4.9, students:2980, duration:'20 soat', lessonsCount:36, level:'O‘rta', price:'149 000 so‘m', gradient:GRAD_FRONTEND[1], icon:<Code2 size={30}/>, tech:['JavaScript','DOM','Events'], desc:'Tugma bosilganda nima bo‘lishini siz boshqarasiz. O‘zgaruvchilar, funksiyalar, shartlar va DOM bilan ishlash — saytni jonlantiradigan hamma narsa shu kursda.',
    lessons:[
      {id:'js-1',title:'O‘zgaruvchilar: let va const',minutes:22,content:['O‘zgaruvchi — qiymatni saqlaydigan quti. let — o‘zgaradigan qiymat uchun, const — o‘zgarmaydigan qiymat uchun. Zamonaviy kodda const ko‘proq ishlatiladi.','Ismni aniq tanlang: ism, yosh, narx — bir harfli x, y dan ko‘ra tushunarliroq. Yaxshi nom — kodning yarim tushuntirishi.'],points:['let — o‘zgaradi','const — o‘zgarmaydi','Aniq nom tanlash'],code:`const ism = "Nurislom";\nlet ball = 0;\nball = ball + 10;\nconsole.log(ism, ball);`,codeLang:'JavaScript',task:'Ismingiz va ballingizni o‘zgaruvchiga yozing, ballni 10 ga oshiring.'},
      {id:'js-2',title:'Funksiyalar: bir yoz, ko‘p ishlat',minutes:26,content:['Funksiya — bir marta yozib, istalgan joyda chaqiriladigan kod bo‘lagi. Masalan, salomlashish funksiyasi har safar ismni qayta yozmasdan ishlaydi.','Funksiya parametr oladi va return bilan natija qaytaradi. Bu — dasturlashdagi eng muhim odat: takrorlanadigan ishni funksiyaga chiqarish.'],points:['function nomi() { }','Parametr va return','Funksiyani chaqirish'],code:`function salomlash(ism) {\n  return "Salom, " + ism + "!";\n}\nconsole.log(salomlash("Nurislom"));`,codeLang:'JavaScript',task:'Ikki sonni qo‘shadigan hisobla(a, b) funksiyasini yozing.'},
      {id:'js-3',title:'Tugmani jonlantirish: addEventListener',minutes:28,content:['Saytning interaktivligi shu yerda boshlanadi. Tugmani topasiz, bosilganda nima bo‘lishini aytasiz — brauzer qolganini bajaradi.','addEventListener("click", ...) — eng ko‘p ishlatiladigan yozuv. Xuddi shu usul bilan menyu, modal oyna va hisoblagichlar ishlaydi.'],points:['getElementById bilan topish','addEventListener("click", ...)','Matnni textContent bilan o‘zgartirish'],code:`const tugma = document.getElementById("bos");\nconst matn = document.getElementById("natija");\nlet son = 0;\ntugma.addEventListener("click", () => {\n  son = son + 1;\n  matn.textContent = "Bosildi: " + son;\n});`,codeLang:'JavaScript',task:'Bosilganda sonni bittaga oshiradigan hisoblagich tugmasi yasang.'},
      {id:'js-4',title:'Shartlar: if / else bilan qaror',minutes:24,content:['Dastur ham qaror qabul qiladi: agar ball 90 dan katta bo‘lsa — “A’lo”, aks holda — “Yana urinib ko‘r”. If aynan shu mantiqni yozadi.','Taqqoslash operatorlari: > katta, < kichik, === teng. Bitta = qiymat beradi, uchta === taqqoslaydi — bu farqni adashtirmang.'],points:['if / else if / else','=== taqqoslash, = qiymat berish','Mantiqiy shartlar'],code:`if (ball >= 90) {\n  console.log("A'lo!");\n} else if (ball >= 60) {\n  console.log("O'tdi");\n} else {\n  console.log("Yana urinib ko'r");\n}`,codeLang:'JavaScript',task:'Ballga qarab “A’lo”, “O‘tdi” yoki “Qayta urinish” chiqaradigan kod yozing.'},
      {id:'js-5',title:'Ro‘yxatlar va sikl: 100 ta kartochka',minutes:30,content:['Bir xil ishni 100 marta qo‘lda yozish o‘rniga sikl ishlatiladi. Massiv — bir nechta qiymatning ro‘yxati, for — shu ro‘yxat bo‘ylab yurish usuli.','Bu darsdan keyin loyiha kartochkalarini massivdan avtomatik chiqarishni bilasiz — portfolio va do‘kon sahifalarining asosi shu.'],points:['Massiv: ["HTML", "CSS"]','for sikli','Massivdan sahifa yasash'],code:`const fanlar = ["HTML", "CSS", "JS"];\nfor (let i = 0; i < fanlar.length; i++) {\n  console.log(fanlar[i]);\n}`,codeLang:'JavaScript',task:'O‘rgangan 5 ta texnologiyangizni massivga yozib, sikl bilan ekranga chiqaring.'},
    ]},
  { id:'python', title:'Python asoslari: Dasturlash mantiqi', category:'Python', mentor:'Javohir To‘xtayev', mentorRole:'Senior dasturchi • 7 yil tajriba', rating:5.0, students:5180, duration:'18 soat', lessonsCount:30, level:'Boshlang‘ich', price:'Bepul', gradient:GRAD_PYTHON[0], icon:<Terminal size={30}/>, tech:['Python','Mantiq','Funksiyalar'], desc:'Mantiqni eng sodda tilda o‘rganing. Python da shart, sikl va funksiyani tushungan odam istalgan tilga oson o‘tadi. Har bir darsda real mini-dastur yozasiz.',
    lessons:[
      {id:'py-1',title:'Python va birinchi dastur',minutes:18,content:['Python — o‘qilishi eng oson til. Birinchi dasturingiz bir qator: print() bilan ekranga matn chiqarish.','Kod muharririni o‘rnatib, faylni saqlab, ishga tushirishni shu darsda o‘rganasiz. Xato chiqsa — xato matnini o‘qishning o‘zi mahorat.'],points:['print() — ekranga chiqarish','Izoh: # bilan','Faylni ishga tushirish'],code:`print("Salom, dunyo!")\nprint("Men dasturchiman")`,codeLang:'Python',task:'O‘z ismingiz va maqsadingizni print() bilan chiqaring.'},
      {id:'py-2',title:'O‘zgaruvchilar va turlar',minutes:24,content:['Python da turlar avtomatik aniqlanadi: 25 — son, "Nurislom" — matn, True — mantiqiy qiymat.','Matn va sonni qo‘shib bo‘lmaydi — avval str() yoki int() bilan turini almashtirish kerak. Bu xato yangi boshlovchilarda eng ko‘p uchraydi.'],points:['int, str, bool','Turlarni almashtirish','Nomlash qoidalari'],code:`ism = "Nurislom"\nyosh = 21\nprint("Mening ismim " + ism)\nprint(yosh + 5)`,codeLang:'Python',task:'Ism va yoshni saqlab, 5 yildan keyingi yoshni hisoblang.'},
      {id:'py-3',title:'if: dastur qaror qabul qilsin',minutes:27,content:['Foydalanuvchi kiritgan ballga qarab dastur turlicha javob bersin. If — shu qarorni yozish usuli.','Python da bloklar bo‘shliq (indent) bilan ajratiladi. To‘rt bo‘shliq — Python ning odobi, qavs emas.'],points:['if / elif / else','Indent — 4 bo‘shliq','input() bilan so‘rash'],code:`ball = int(input("Ballingiz: "))\nif ball >= 90:\n    print("A'lo!")\nelse:\n    print("Yana urinib ko'r")`,codeLang:'Python',task:'Ball so‘rab, natijaga qarab xabar chiqaradigan dastur yozing.'},
      {id:'py-4',title:'Sikllar: takrorlanadigan ish',minutes:30,content:['For sikli ro‘yxat bo‘ylab yuradi, while shart bajarilguncha ishlaydi. Cheksiz sikldan qochish uchun shartni o‘zgartirishni unutmang.','Bu darsda 1 dan 100 gacha sonlar yig‘indisini hisoblaydigan dastur yozasiz.'],points:['for va range()','while','break / continue'],code:`for ism in ["Nurislom", "Javohir"]:\n    print("Salom, " + ism)`,codeLang:'Python',task:'Do‘stlaringiz ro‘yxatini sikl bilan salomlashadigan dastur yozing.'},
      {id:'py-5',title:'Funksiyalar va kalkulyator',minutes:34,content:['Funksiya — bir marta yozib, ko‘p marta chaqiriladigan kod. Kalkulyator — funksiyalarni o‘rganish uchun eng yaxshi loyiha.','Yakuniy vazifa: qo‘shish, ayirish, ko‘paytirish va bo‘lish funksiyalarini yozib, menyuga ulang.'],points:['def va return','Parametr va argument','Kalkulyator loyihasi'],code:`def qosh(a, b):\n    return a + b\nprint(qosh(12, 8))`,codeLang:'Python',task:'4 amalni bajaradigan kalkulyator funksiyalarini yozing.'},
    ]},
  { id:'react', title:'React: Zamonaviy saytlar', category:'Frontend', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.9, students:2140, duration:'22 soat', lessonsCount:32, level:'Yuqori', price:'149 000 so‘m', gradient:GRAD_FRONTEND[2], icon:<Layers size={30}/>, tech:['React','Komponent','useState'], desc:'Bu saytning o‘zi React da yozilgan. Komponentlar, holat va ro‘yxatlar bilan katta saytlarni tartibli, qayta ishlatiladigan bo‘laklarga bo‘lib qurasiz.',
    lessons:[
      {id:'re-1',title:'Komponent: sahifani bo‘laklarga bo‘lish',minutes:24,content:['React da sahifa komponentlardan iborat: Header, Kartochka, Tugma — har biri alohida funksiya. Bir marta yozasiz, istalgan joyda ishlatasiz.','Komponent — oddiy funksiya, u JSX qaytaradi. JSX HTML ga o‘xshaydi, lekin ichida {} bilan JavaScript yozish mumkin.'],points:['Komponent — funksiya','JSX — HTML + JS','Qayta ishlatish'],code:`function Kartochka() {\n  return <div>Salom, men kartochkaman</div>;\n}`,codeLang:'React',task:'Ismingiz va kasbingizni ko‘rsatadigan Kartochka komponentini yozing.'},
      {id:'re-2',title:'Props: komponentga ma’lumot berish',minutes:26,content:['Bitta Kartochka komponenti bilan 10 ta turli loyiha ko‘rsatish uchun props kerak. Props — komponentga tashqaridan beriladigan ma’lumot.','Props ni funksiya parametridan olasiz: function Kartochka({ sarlavha }) — va ichida ishlatasiz.'],points:['props — tashqi ma’lumot','Destructuring','Bir komponent, ko‘p ko‘rinish'],code:`function Kartochka({ sarlavha }) {\n  return <h3>{sarlavha}</h3>;\n}\n<Kartochka sarlavha="Portfolio" />`,codeLang:'React',task:'Sarlavha va matnni props dan oladigan kartochka yozing.'},
      {id:'re-3',title:'useState: tugma bosilganda sahifa o‘zgaradi',minutes:30,content:['React ning kuchi — holat. useState o‘zgaruvchini va uni o‘zgartiradigan funksiyani beradi. Holat o‘zgarsa, sahifa avtomatik yangilanadi.','Hisoblagich — useState ning eng sodda misoli: son o‘zgaradi, ekrandagi raqam o‘zi yangilanadi, sahifani qayta yuklash shart emas.'],points:['const [son, setSon] = useState(0)','Holat o‘zgarsa — sahifa yangilanadi','onClick bilan bog‘lash'],code:`const [son, setSon] = useState(0);\n<button onClick={() => setSon(son + 1)}>\n  Bosildi: {son}\n</button>`,codeLang:'React',task:'Bosilganda sonni oshiradigan React hisoblagichini yozing.'},
      {id:'re-4',title:'Ro‘yxatlar: map bilan kartochkalar',minutes:28,content:['Loyihalar ro‘yxatini qo‘lda emas, map bilan chiqaramiz. Har bir element uchun komponent qaytaramiz, React qolganini bajaradi.','Har bir elementga key kerak — React qaysi kartochka qaysi ekanini shu orqali biladi. Odatda key sifatida id ishlatiladi.'],points:['massiv.map(...)','key={loyiha.id}','Dinamik ro‘yxat'],code:`{loyihalar.map((l) => (\n  <Kartochka key={l.id} sarlavha={l.nomi} />\n))}`,codeLang:'React',task:'3 ta loyihangizni massivdan map bilan chiqaring.'},
      {id:'re-5',title:'Shartli ko‘rinish: tab va modal',minutes:32,content:['Tab bosilganda faqat o‘sha bo‘lim ko‘rinsa — bu shartli ko‘rinish. Tanlangan tab holatda saqlanadi, sahifa shunga qarab chiziladi.','IDROK ning o‘zi shu usulda ishlaydi: tab holati o‘zgarsa, ko‘rinadigan bo‘lim ham o‘zgaradi.'],points:['Tanlangan tab — holat','{shart && <Bo‘lim/>}','Modal va tablar'],code:`{tab === "kurslar" && <Kurslar />}\n{tab === "profil" && <Profil />}`,codeLang:'React',task:'Ikki tabli (Haqimda / Ishlarim) sahifa yasang.'},
    ]},
  { id:'tailwind', title:'Tailwind CSS: Tez va chiroyli dizayn', category:'Frontend', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.8, students:1870, duration:'8 soat', lessonsCount:18, level:'O‘rta', price:'Bepul', gradient:GRAD_FRONTEND[3], icon:<Palette size={30}/>, tech:['Tailwind','Utility','Responsive'], desc:'Alohida CSS fayl yozmasdan, to‘g‘ridan-to‘g‘ri class larda dizayn qilish. Tez, tartibli va zamonaviy saytlar aynan shu usulda quriladi.',
    lessons:[
      {id:'tw-1',title:'Utility class: bitta class — bitta ish',minutes:18,content:['Tailwind da har bir class bitta ish qiladi: bg-purple-700 — binafsha fon, text-white — oq matn, rounded-full — yumaloq burchak.','CSS fayl ochmasdan, to‘g‘ridan-to‘g‘ri elementda yozasiz. Avvaliga g‘alati tuyuladi, keyin eng tez usulga aylanadi.'],points:['bg-, text-, p-, m-','Rang + o‘lcham bir joyda','CSS faylga hojat yo‘q'],code:`<button class="bg-violet-700 text-white px-6 py-3 rounded-full">\n  Boshlash\n</button>`,codeLang:'HTML',task:'Tailwind class lari bilan binafsha tugma yasang.'},
      {id:'tw-2',title:'Flex va Grid: joylashuv 2 daqiqada',minutes:24,content:['flex gap-4 — elementlar yonma-yon, grid grid-cols-3 — uch ustunli panjara. Uzun CSS yozmasdan joylashuv tayyor.','Kartochkalar panjarasi, menyu va hero — barchasi 2–3 ta class bilan yig‘iladi.'],points:['flex, items-center, justify-between','grid, grid-cols-3','gap — oraliq'],code:`<div class="grid grid-cols-3 gap-4">\n  <div>Kartochka 1</div>\n  <div>Kartochka 2</div>\n  <div>Kartochka 3</div>\n</div>`,codeLang:'HTML',task:'3 ta kartochkani grid bilan panjaraga joylashtiring.'},
      {id:'tw-3',title:'Responsive: sm:, md:, lg:',minutes:22,content:['Telefonda 1 ustun, kompyuterda 3 ustun kerakmi? grid-cols-1 md:grid-cols-3 yozing — bo‘ldi.','Prefikslar: sm — kichik ekran, md — o‘rta, lg — katta. Mobil avval yoziladi, keyin kattalashtiriladi.'],points:['Mobil avval','md: — o‘rta ekrandan','lg: — katta ekrandan'],code:`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">`,codeLang:'HTML',task:'Kartochkalar panjarasini mobil va kompyuterga moslang.'},
      {id:'tw-4',title:'Hover va holatlar',minutes:20,content:['hover: bilan sichqoncha borganda o‘zgarish: hover:-translate-y-1 — kartochka biroz ko‘tariladi, hover:bg-violet-800 — tugma to‘qlashadi.','Kichik animatsiyalar saytni “jonli” ko‘rsatadi. Lekin me’yorida: hamma narsa sakramasligi kerak.'],points:['hover: prefiksi','transition — silliq o‘tish','shadow — soya'],code:`<div class="bg-white rounded-3xl shadow hover:-translate-y-1 transition">\n  Kartochka\n</div>`,codeLang:'HTML',task:'Hover da ko‘tariladigan kartochka yasang.'},
      {id:'tw-5',title:'Yakuniy: chiroyli hero bo‘limi',minutes:26,content:['Hamma o‘rganganingizni birlashtirasiz: katta sarlavha, ikki tugma, statistika va kartochka.','Yaxshi hero — 3 soniyada tushunarli: nima, kim uchun, keyingi qadam nima.'],points:['Katta sarlavha','Aniq tugma','Bo‘shliq — hashamat'],code:`<section class="max-w-6xl mx-auto px-6 py-16">\n  <h1 class="text-5xl font-extrabold">Noldan o'z saytingni yarat</h1>\n</section>`,codeLang:'HTML',task:'O‘z portfolio sahifangiz uchun hero bo‘limini Tailwind da yig‘ing.'},
    ]},
  { id:'node', title:'Node.js & Express: Backend', category:'Backend', mentor:'Javohir To‘xtayev', mentorRole:'Senior dasturchi • 7 yil tajriba', rating:4.8, students:1540, duration:'16 soat', lessonsCount:26, level:'Yuqori', price:'149 000 so‘m', gradient:GRAD_BACKEND[0], icon:<Server size={30}/>, tech:['Node.js','Express','API'], desc:'Sayt faqat old qismdan iborat emas. Backend — ma’lumot saqlaydigan, hisoblaydigan va javob beradigan qism. Node.js bilan JavaScript ni serverda ham ishlatasiz.',
    lessons:[
      {id:'node-1',title:'Node.js nima? Server nima qiladi?',minutes:22,content:['Brauzer so‘raydi, server javob beradi. Node.js — JavaScript ni brauzerdan tashqarida, serverda ishlatish imkoniyati.','Bu kursda o‘zingizning birinchi serveringizni yozasiz: u “Salom!” deb javob beradi.'],points:['Client — Server','So‘rov va javob','Node.js o‘rnatish'],code:`// server.js\nconsole.log("Server ishga tushdi");`,codeLang:'JavaScript',task:'Node.js ni o‘rnatib, birinchi console.log dasturingizni ishga tushiring.'},
      {id:'node-2',title:'Express: birinchi API',minutes:28,content:['Express — server yozishni osonlashtiradigan kutubxona. Bir necha qatorda sahifa yoki API tayyor bo‘ladi.','GET / — asosiy sahifa, GET /kurslar — kurslar ro‘yxati. Har bir manzil — bitta funksiya.'],points:['express()','app.get(...)','Port 3000'],code:`const express = require("express");\nconst app = express();\napp.get("/", (req, res) => {\n  res.send("Salom, server!");\n});\napp.listen(3000);`,codeLang:'JavaScript',task:'“Salom, server!” qaytaradigan Express server yozing.'},
      {id:'node-3',title:'JSON: frontend bilan gaplashish',minutes:26,content:['Frontend va backend JSON bilan gaplashadi — bu matn ko‘rinishidagi ma’lumot. Kurslar ro‘yxati, foydalanuvchi, loyiha — barchasi JSON.','Frontend fetch bilan so‘raydi, backend JSON bilan javob beradi. Shu almashuv zamonaviy saytlarning asosi.'],points:['JSON — matnli ma’lumot','res.json(...)','fetch bilan so‘rov'],code:`app.get("/kurslar", (req, res) => {\n  res.json([{ id: 1, nomi: "HTML & CSS" }]);\n});`,codeLang:'JavaScript',task:'Kurslar ro‘yxatini JSON qaytaradigan manzil yarating.'},
      {id:'node-4',title:'POST: ma’lumotni saqlash',minutes:30,content:['GET — olish, POST — yuborish. Forma to‘ldirilganda yoki tugma bosilganda ma’lumot POST bilan serverga boradi.','Body ni o‘qish uchun express.json() kerak — bo‘lmasa server bo‘sh kelganini ko‘radi.'],points:['POST — yuborish','express.json()','Body ni o‘qish'],code:`app.use(express.json());\napp.post("/kurs", (req, res) => {\n  console.log(req.body);\n  res.json({ ok: true });\n});`,codeLang:'JavaScript',task:'Yangi kurs nomini qabul qilib, “saqlandi” qaytaradigan POST yarating.'},
      {id:'node-5',title:'Ma’lumotlar bazasi bilan bog‘lanish',minutes:34,content:['Server o‘chsa, ma’lumot yo‘qolmasligi uchun baza kerak. Baza — tartibli, saqlanadigan jadval.','Bu darsda kurslar ro‘yxatini avval massivda, keyin bazada saqlashni taqqoslaysiz.'],points:['Baza — doimiy saqlash','Ro‘yxatni bazadan o‘qish','Xatoni to‘g‘ri qaytarish'],code:`// avval massivda\nconst kurslar = [];\n// keyin: bazadan o'qish\n// const kurslar = await db.kurslar();`,codeLang:'JavaScript',task:'Kurslaringizni massiv o‘rniga bazadan o‘qiydigan qilib rejalang.'},
    ]},
  { id:'git', title:'Git & GitHub: Jamoada ishlash', category:'Fullstack', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.9, students:2210, duration:'5 soat', lessonsCount:12, level:'Boshlang‘ich', price:'Bepul', gradient:GRAD_FULLSTACK[0], icon:<GitBranch size={30}/>, tech:['Git','GitHub','Commit'], desc:'Kodning tarixi va jamoa bilan ishlash. Git sizning ishingizni saqlaydi, xatoni orqaga qaytaradi va boshqalar bilan bir loyihada ishlashga yordam beradi.',
    lessons:[
      {id:'git-1',title:'Git nima va nima uchun kerak?',minutes:18,content:['Git — kodning tarixchisi. Har bir o‘zgarish saqlanadi: kim, qachon, nimani o‘zgartirgani ko‘rinadi.','Xato qildingizmi? Oldingi versiyaga qaytasiz. Loyiha buzildimi? Ishlagan nusxani tiklaysiz.'],points:['Versiya tarixi','Orqaga qaytish','Jamoada ishlash'],code:`git init\n# loyiha papkasida Git ni boshlash`,codeLang:'Terminal',task:'Loyihangiz papkasida git init ni ishga tushiring.'},
      {id:'git-2',title:'Commit: o‘zgarishni saqlash',minutes:20,content:['O‘zgarishni uch bosqichda saqlaysiz: git add — tanlash, git commit — saqlash, xabar — nima qilganingizni yozish.','Yaxshi commit xabari: “Hero bo‘limi qo‘shildi”, “Tugma rangi tuzatildi”. “asdf” — yomon xabar.'],points:['git add .','git commit -m "..."','Aniq xabar yozish'],code:`git add .\ngit commit -m "Hero bo'limi qo'shildi"`,codeLang:'Terminal',task:'Bugungi o‘zgarishingizni aniq xabar bilan commit qiling.'},
      {id:'git-3',title:'GitHub: kodni internetga qo‘yish',minutes:22,content:['GitHub — kod uchun ijtimoiy tarmoq va ombor. Kodni u yerga yuklasangiz, istalgan joydan kirish va boshqalarga ko‘rsatish mumkin.','Portfolio uchun GitHub — ish daftari: ish beruvchi sizning kodingizni shu yerda ko‘radi.'],points:['Repository — ombor','git push — yuklash','README — tanishtiruv'],code:`git remote add origin <repo-manzil>\ngit push -u origin main`,codeLang:'Terminal',task:'GitHub da repository ochib, loyihangizni push qiling.'},
      {id:'git-4',title:'Branch: yangi ishni alohida qilish',minutes:24,content:['Branch — loyihaning nusxasi. Yangi bo‘limni alohida branch da qilasiz, tayyor bo‘lganda asosiyga qo‘shasiz.','Bu usulda asosiy sayt buzilmaydi: tajriba branch da, tayyor ish — main da.'],points:['git checkout -b yangi-bolim','Branch — nusxa','Merge — qo‘shish'],code:`git checkout -b yangi-bolim\n# ish tugagach:\ngit checkout main\ngit merge yangi-bolim`,codeLang:'Terminal',task:'Yangi bo‘lim uchun alohida branch ochib, unda ishlang.'},
      {id:'git-5',title:'Pull Request va jamoa odobi',minutes:26,content:['Jamoada kod to‘g‘ridan-to‘g‘ri emas, Pull Request bilan qo‘shiladi: boshqalar ko‘rib chiqadi, izoh beradi, keyin qabul qiladi.','Yaxshi PR — kichik, aniq va tushuntirilgan. 500 qatorli “hammasini o‘zgartirdim” PR ni hech kim o‘qimaydi.'],points:['Pull Request — taklif','Code review — tekshiruv','Kichik o‘zgarish'],code:`# Pull Request sarlavhasi:\n"Portfolio sahifasiga hero qo'shildi"`,codeLang:'Terminal',task:'O‘z loyihangiz uchun birinchi Pull Request matnini yozing.'},
    ]},
  { id:'deploy', title:'Domain, Hosting, SEO: Saytni nashr qilish', category:'Fullstack', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.8, students:1980, duration:'6 soat', lessonsCount:10, level:'O‘rta', price:'149 000 so‘m', gradient:GRAD_FULLSTACK[1], icon:<Rocket size={30}/>, tech:['Deploy','Domain','SEO'], desc:'Sayt faqat kompyuteringizda tursa, uni hech kim ko‘rmaydi. Nashr qilish — saytni internetga chiqarish, manzil berish va qidiruvda topiladigan qilish.',
    lessons:[
      {id:'dep-1',title:'Deploy nima? Saytni internetga chiqarish',minutes:20,content:['Deploy — tayyor saytni hostingga yuklash. Shundan keyin sayt istalgan telefondan, istalgan joydan ochiladi.','Bu kursda bepul hosting variantlari bilan birinchi saytingizni nashr qilasiz.'],points:['Hosting — sayt uyi','Deploy — yuklash','Havola bilan bo‘lishish'],code:`# Deploy qadamlari:\n# 1. Loyihani yig'ish\n# 2. Hostingga yuklash\n# 3. Havolani tekshirish`,codeLang:'Terminal',task:'Portfolio loyihangizni nashr qilish rejasini yozing.'},
      {id:'dep-2',title:'Domain: saytga nom tanlash',minutes:18,content:['Domain — saytning manzili va ismi: nurislom.uz kabi. Qisqa, esda qolarli va talaffuzi oson nom tanlang.','Nom tanlashda o‘z ismingiz — eng xavfsiz tanlov: u siz bilan birga o‘sadi.'],points:['Qisqa va esda qolarli','.uz yoki .com','Nomni tekshirish'],code:`nurislom.uz\n# qisqa, shaxsiy, esda qolarli`,codeLang:'Terminal',task:'O‘zingiz uchun 3 ta domain nomini yozib, eng yaxshisini tanlang.'},
      {id:'dep-3',title:'Tezlik: sayt sekin bo‘lmasin',minutes:24,content:['Sayt 3 soniyadan kech ochilsa, odam ketadi. Rasmni kichraytirish va keraksiz kodni olib tashlash — eng oson tezlatish usuli.','Rasmni yuklashdan oldin siqing, katta rasmni kichik ekranda ham katta qilib bermang.'],points:['Rasmni siqish','Keraksiz kodni olib tashlash','Tezlikni o‘lchash'],code:`<!-- Katta rasm o'rniga siqilgan rasm -->\n<img src="men-kichik.jpg" alt="Nurislom">`,codeLang:'HTML',task:'Portfolio rasmlaringizni siqib, sahifa tezligini tekshiring.'},
      {id:'dep-4',title:'SEO: Google da topilish',minutes:26,content:['SEO — saytning qidiruvda chiqishi. To‘g‘ri sarlavha, tavsif va sarlavha teglari qidiruv tizimiga sayt nima haqida ekanini aytadi.','Har bir sahifada bitta H1, aniq title va meta description bo‘lsin.'],points:['<title> — sahifa nomi','meta description','Bitta H1'],code:`<title>Nurislom | Frontend dasturchi</title>\n<meta name="description" content="Nurislomning portfolio sayti">`,codeLang:'HTML',task:'Har bir sahifangizga aniq title va description yozing.'},
      {id:'dep-5',title:'Yakuniy: portfolio nashrga tayyor',minutes:28,content:['Tekshiruv ro‘yxati: barcha havolalar ishlaydimi, telefonda ko‘rinishi yaxshimi, ism va aloqa to‘g‘rimi?','Nashrdan keyin saytni 3 kishiga yuborib, fikrini so‘rang. Birinchi fikrlar — eng qimmatli dars.'],points:['Havolalarni tekshirish','Mobil ko‘rinish','Do‘stlardan fikr so‘rash'],code:`# Nashr oldidan:\n# [x] Havolalar\n# [x] Mobil ko'rinish\n# [x] Aloqa`,codeLang:'Terminal',task:'Portfolio saytingizni nashr qilib, havolasini 3 kishiga yuboring.'},
    ]},
  { id:'ts-next', title:'TypeScript & Next.js', category:'Frontend', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.9, students:1640, duration:'40 soat', lessonsCount:22, level:'Yuqori', price:'149 000 so‘m', gradient:GRAD_FRONTEND[4], icon:<FileCode2 size={30}/>, tech:['TypeScript','Next.js','SSR'], desc:'Turlar bilan xatosiz kod va Next.js bilan tez, SEO ga mos saytlar. Katta loyihalar uchun zamonaviy Frontend.', lessons: mkLessons('ts-next', ['TypeScript turlari','Interface va Type','Next.js sahifalar','API routes','Yakuniy loyiha'])},
  { id:'sql-mongo', title:'SQL & MongoDB', category:'Backend', mentor:'Javohir To‘xtayev', mentorRole:'Senior dasturchi • 7 yil tajriba', rating:4.8, students:1420, duration:'40 soat', lessonsCount:20, level:'O‘rta', price:'149 000 so‘m', gradient:GRAD_BACKEND[1], icon:<Database size={30}/>, tech:['SQL','MongoDB','Baza'], desc:'Jadvallar va hujjatlar: SQL sorovlari, MongoDB kolleksiyalari va bazani togridan togri loyihalash.', lessons: mkLessons('sql-mongo', ['Jadval va hujjat','SELECT sorovlari','MongoDB CRUD','Indeks va tezlik','Baza loyihasi'])},
  { id:'rest-api', title:'REST API', category:'Backend', mentor:'Javohir To‘xtayev', mentorRole:'Senior dasturchi • 7 yil tajriba', rating:4.9, students:1580, duration:'40 soat', lessonsCount:18, level:'O‘rta', price:'149 000 so‘m', gradient:GRAD_BACKEND[2], icon:<Globe size={30}/>, tech:['REST','API','HTTP'], desc:'Toza API loyihalash: resurslar, status kodlar, xatolar va Frontend bilan kelishilgan shartnoma.', lessons: mkLessons('rest-api', ['HTTP va resurslar','GET va POST','Status kodlar','Xatolar va validatsiya','API loyihasi'])},
  { id:'backend-sec', title:'Backend xavfsizlik', category:'Backend', mentor:'Javohir To‘xtayev', mentorRole:'Senior dasturchi • 7 yil tajriba', rating:4.9, students:1210, duration:'40 soat', lessonsCount:16, level:'Yuqori', price:'149 000 so‘m', gradient:GRAD_BACKEND[3], icon:<ShieldCheck size={30}/>, tech:['JWT','Auth','Xavfsizlik'], desc:'Parol, token, ruxsatlar va hujumlar: xavfsiz backendning asosiy qoidalari amaliyot bilan.', lessons: mkLessons('backend-sec', ['Parol va hash','JWT token','Ruxsatlar','Xavfsizlik hujumlari','Tekshiruv loyihasi'])},
  { id:'nestjs', title:'NestJS', category:'Backend', mentor:'Javohir To‘xtayev', mentorRole:'Senior dasturchi • 7 yil tajriba', rating:4.8, students:980, duration:'40 soat', lessonsCount:20, level:'Yuqori', price:'149 000 so‘m', gradient:GRAD_BACKEND[4], icon:<Server size={30}/>, tech:['NestJS','Modul','TypeScript'], desc:'Tartibli backend arxitekturasi: modullar, kontrollerlar va servislarga bolingan katta loyiha.', lessons: mkLessons('nestjs', ['NestJS tuzilmasi','Modul va kontroller','Servis va DI','Baza bilan boglanish','NestJS loyiha'])},
  { id:'py-oop', title:'Python OOP', category:'Python', mentor:'Javohir To‘xtayev', mentorRole:'Senior dasturchi • 7 yil tajriba', rating:4.9, students:1760, duration:'40 soat', lessonsCount:18, level:'O‘rta', price:'149 000 so‘m', gradient:GRAD_PYTHON[1], icon:<Brain size={30}/>, tech:['OOP','Class','Python'], desc:'Klasslar, obyektlar va meros: katta dasturlarni tartibli bolaklarga bolib yozish.', lessons: mkLessons('py-oop', ['Klass va obyekt','Metodlar','Meros','Polimorfizm','OOP loyiha'])},
  { id:'django', title:'Django', category:'Python', mentor:'Javohir To‘xtayev', mentorRole:'Senior dasturchi • 7 yil tajriba', rating:4.9, students:1540, duration:'40 soat', lessonsCount:22, level:'Yuqori', price:'149 000 so‘m', gradient:GRAD_PYTHON[2], icon:<Layers size={30}/>, tech:['Django','Python','Web'], desc:'Django bilan toliq sayt: modellar, admin panel, shablonlar va foydalanuvchi tizimi.', lessons: mkLessons('django', ['Django loyiha','Modellar','Admin panel','Shablonlar','Django sayt'])},
  { id:'tg-bot', title:'Telegram botlar', category:'Python', mentor:'Javohir To‘xtayev', mentorRole:'Senior dasturchi • 7 yil tajriba', rating:5.0, students:2890, duration:'40 soat', lessonsCount:16, level:'O‘rta', price:'149 000 so‘m', gradient:GRAD_PYTHON[3], icon:<Zap size={30}/>, tech:['Telegram','Bot','Python'], desc:'BotFather dan buyurtma botigacha: tugmalar, holatlar va tolovga tayyor botlar.', lessons: mkLessons('tg-bot', ['BotFather','Birinchi bot','Tugmalar','Holatlar','Buyurtma boti'])},
  { id:'pandas', title:'Pandas tahlil', category:'Python', mentor:'Javohir To‘xtayev', mentorRole:'Senior dasturchi • 7 yil tajriba', rating:4.8, students:1320, duration:'40 soat', lessonsCount:18, level:'O‘rta', price:'149 000 so‘m', gradient:GRAD_PYTHON[4], icon:<BarChart3 size={30}/>, tech:['Pandas','Tahlil','Data'], desc:'Jadval ma’lumotini tozalash, filtrlash va grafik qilish: Pandas bilan birinchi tahlil.', lessons: mkLessons('pandas', ['DataFrame','Filtrlash','Guruhlash','Grafiklar','Tahlil loyihasi'])},
  { id:'flutter', title:'Flutter', category:'Mobil', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.9, students:1980, duration:'40 soat', lessonsCount:24, level:'O‘rta', price:'149 000 so‘m', gradient:GRAD_MOBIL[0], icon:<MonitorSmartphone size={30}/>, tech:['Flutter','Dart','Mobil'], desc:'Bitta kod bilan iOS va Android: Flutter interfeysi, navigatsiya va holat boshqaruvi.', lessons: mkLessons('flutter', ['Flutter o’rnatish','Widgetlar','Navigatsiya','Holat','Flutter ilova'])},
  { id:'dart', title:'Dart', category:'Mobil', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.8, students:1420, duration:'40 soat', lessonsCount:16, level:'Boshlang‘ich', price:'Bepul', gradient:GRAD_MOBIL[1], icon:<Code2 size={30}/>, tech:['Dart','Mobil','Asos'], desc:'Flutter ning tili: o’zgaruvchilar, funksiyalar va asinxron kod — mobilga kirish eshigi.', lessons: mkLessons('dart', ['Dart asoslari','Funksiyalar','Klasslar','Asinxron kod','Dart mashqlar'])},
  { id:'rn', title:'React Native', category:'Mobil', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.8, students:1210, duration:'40 soat', lessonsCount:20, level:'O‘rta', price:'149 000 so‘m', gradient:GRAD_MOBIL[2], icon:<Layers size={30}/>, tech:['React Native','Mobil','JS'], desc:'React bilimingiz bilan mobil ilova: komponentlar, navigatsiya va telefon imkoniyatlari.', lessons: mkLessons('rn', ['React Native kirish','Komponentlar','Navigatsiya','Telefon imkoniyatlari','Mobil ilova'])},
  { id:'mobil-ui', title:'Mobil UI/UX', category:'Mobil', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.9, students:1680, duration:'40 soat', lessonsCount:15, level:'Boshlang‘ich', price:'Bepul', gradient:GRAD_MOBIL[3], icon:<Palette size={30}/>, tech:['UI','UX','Figma'], desc:'Kichik ekranda katta tajriba: mobil interfeys, rang, shrift va foydalanuvchi yo’li.', lessons: mkLessons('mobil-ui', ['Mobil qoidalar','Rang va shrift','Ekranni loyihalash','Prototip','UI loyiha'])},
  { id:'market', title:'Marketga chiqarish', category:'Mobil', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.8, students:980, duration:'40 soat', lessonsCount:14, level:'O‘rta', price:'149 000 so‘m', gradient:GRAD_MOBIL[4], icon:<Rocket size={30}/>, tech:['Play Market','App Store','Nashr'], desc:'Ilovani Play Market va App Store ga chiqarish: skrinshot, tavsif va nashr tekshiruvi.', lessons: mkLessons('market', ['Market talablari','Skrinshot va tavsif','Nashrga tayyorlash','Yangilash','Nashr rejasi'])},
  { id:'docker', title:'Docker', category:'Fullstack', mentor:'Javohir To‘xtayev', mentorRole:'Senior dasturchi • 7 yil tajriba', rating:4.8, students:1150, duration:'40 soat', lessonsCount:16, level:'Yuqori', price:'149 000 so‘m', gradient:GRAD_FULLSTACK[2], icon:<Server size={30}/>, tech:['Docker','Konteyner','DevOps'], desc:'Hamma joyda bir xil ishlaydigan loyiha: konteynerlar, Dockerfile va compose.', lessons: mkLessons('docker', ['Konteyner nima','Dockerfile','Compose','Serverda ishga tushirish','Docker loyiha'])},
  { id:'speed', title:'Saytni tezlashtirish', category:'Fullstack', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.9, students:1420, duration:'40 soat', lessonsCount:14, level:'O‘rta', price:'149 000 so‘m', gradient:GRAD_FULLSTACK[3], icon:<Zap size={30}/>, tech:['Tezlik','SEO','Optimallashtirish'], desc:'3 soniyadan tez sayt: rasm, kod va keshni optimallashtirishning amaliy usullari.', lessons: mkLessons('speed', ['Tezlikni olchash','Rasm optimallashtirish','Kod optimallashtirish','Kesh','Tezlik loyihasi'])},
  { id:'freelance', title:'Freelance & Portfolio', category:'Fullstack', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:5.0, students:2140, duration:'40 soat', lessonsCount:15, level:'Boshlang‘ich', price:'Bepul', gradient:GRAD_FULLSTACK[4], icon:<Trophy size={30}/>, tech:['Freelance','Portfolio','Mijoz'], desc:'Birinchi buyurtmangiz: portfolio, taklif yozish va mijoz bilan ishlashning odoblari.', lessons: mkLessons('freelance', ['Portfolio tuzish','Taklif yozish','Narx belgilash','Mijoz bilan ishlash','Birinchi buyurtma'])},
];

const FEATURED_COURSES: Course[] = [
  { id:'feat-frontend', title:'Frontend Mastery', category:'Frontend', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.9, students:3420, duration:'40 soat', lessonsCount:15, level:'O‘rta', price:'$149', gradient:'linear-gradient(135deg,#7C3AED,#2563EB)', icon:<Atom size={64}/>, desc:'Zamonaviy interfeyslar, komponentlar va animatsiyalar bilan to‘liq frontend.', tech:['HTML','CSS','React'], meta:'40 soat • 15 loyiha', lessons: mkLessons('feat-frontend', ['Frontend kirish','Komponentlar','Holat va hodisalar','Animatsiyalar','Yakuniy loyiha']) },
  { id:'feat-backend', title:'Python Backend Pro', category:'Backend', mentor:'Javohir To‘xtayev', mentorRole:'Senior dasturchi • 7 yil tajriba', rating:4.9, students:2980, duration:'42 soat', lessonsCount:15, level:'O‘rta', price:'$179', gradient:'linear-gradient(135deg,#38BDF8,#2563EB)', icon:<Boxes size={64}/>, desc:'Python bilan API, baza va xavfsiz backend qurish.', tech:['Python','API','Baza'], meta:'42 soat • 15 loyiha', lessons: mkLessons('feat-backend', ['Backend kirish','API asoslari','Baza bilan ishlash','Xavfsizlik','Yakuniy loyiha']) },
  { id:'feat-ai', title:"AI va Ma'lumotlar", category:"Sun'iy Intellekt", mentor:'Javohir To‘xtayev', mentorRole:'Senior dasturchi • 7 yil tajriba', rating:4.9, students:2140, duration:'45 soat', lessonsCount:16, level:'Yuqori', price:'$199', gradient:'linear-gradient(135deg,#A855F7,#EC4899)', icon:<Brain size={64}/>, desc:'Sun’iy intellekt asoslari va ma’lumotlar bilan amaliy ish.', tech:['AI','Python','Data'], meta:'45 soat • 16 loyiha', lessons: mkLessons('feat-ai', ['AI nima?','Ma’lumotni tayyorlash','Model bilan ishlash','Amaliy loyiha','Yakuniy loyiha']) },
  { id:'feat-design', title:'UI/UX Dizayn Tizimi', category:'Dizayn', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.9, students:1870, duration:'35 soat', lessonsCount:14, level:'Boshlang‘ich', price:'$129', gradient:'linear-gradient(135deg,#EA580C,#FACC15)', icon:<Layers size={64}/>, desc:'Rang, shrift va qatlamlar bilan chiroyli dizayn tizimi.', tech:['UI','UX','Figma'], meta:'35 soat • 14 loyiha', lessons: mkLessons('feat-design', ['Dizayn qoidalari','Rang va shrift','Qatlamlar','Prototip','Yakuniy loyiha']) },
  { id:'feat-mobile', title:'Mobile React Native', category:'Mobile', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.9, students:1980, duration:'38 soat', lessonsCount:15, level:'O‘rta', price:'$159', gradient:'linear-gradient(135deg,#10B981,#38BDF8)', icon:<Rocket size={64}/>, desc:'Bitta kod bilan iOS va Android uchun mobil ilova.', tech:['React Native','Mobil','JS'], meta:'38 soat • 15 loyiha', lessons: mkLessons('feat-mobile', ['Mobil kirish','Komponentlar','Navigatsiya','Telefon imkoniyatlari','Yakuniy loyiha']) },
  { id:'feat-devops', title:'DevOps Asoslari', category:'DevOps', mentor:'Javohir To‘xtayev', mentorRole:'Senior dasturchi • 7 yil tajriba', rating:4.9, students:1540, duration:'40 soat', lessonsCount:15, level:'Yuqori', price:'$189', gradient:'linear-gradient(135deg,#6D28D9,#2563EB)', icon:<ShieldCheck size={64}/>, desc:'Deploy, konteyner va xavfsiz nashr qilish asoslari.', tech:['Docker','Deploy','Server'], meta:'40 soat • 15 loyiha', lessons: mkLessons('feat-devops', ['DevOps nima?','Docker','Server','Nashr qilish','Yakuniy loyiha']) },
  { id:'feat-biznes', title:'No-Code va Avtomat', category:'Biznes', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.9, students:1680, duration:'28 soat', lessonsCount:12, level:'Boshlang‘ich', price:'$119', gradient:'linear-gradient(135deg,#EF4444,#F97316)', icon:<Zap size={64}/>, desc:'Kodsiz vositalar bilan tez mahsulot va avtomatlashtirish.', tech:['No-Code','Avtomat','Biznes'], meta:'28 soat • 12 loyiha', lessons: mkLessons('feat-biznes', ['No-Code kirish','Avtomatlashtirish','Mahsulot','Sotuv','Yakuniy loyiha']) },
  { id:'feat-career', title:'Karyera Bootcamp', category:'Karyera', mentor:'Nurislom Xurramov', mentorRole:'Frontend mentori • 6 yil tajriba', rating:4.9, students:2140, duration:'50 soat', lessonsCount:18, level:'Boshlang‘ich', price:'$249', gradient:'linear-gradient(135deg,#0EA5E9,#1D4ED8)', icon:<GraduationCap size={64}/>, desc:'Portfolio, suhbat va birinchi ishga tayyorlanish bootcampi.', tech:['Portfolio','Suhbat','Karyera'], meta:'50 soat • 18 loyiha', lessons: mkLessons('feat-career', ['Portfolio','Taklif yozish','Suhbatga tayyorlanish','Amaliy loyiha','Yakuniy loyiha']) },
];

const QUIZZES: Record<string, QuizQ[]> = {
  'HTML': [
    {q:'Qaysi teg sahifadagi eng katta sarlavha uchun ishlatiladi?',code:'<h1>Salom</h1>',options:['<p>','<h1>','<span>','<div>'],correct:1,explain:'<h1> — sahifadagi asosiy sarlavha. Har bir sahifada bitta <h1> bo‘lgani ma’qul.'},
    {q:'Havola yaratish uchun qaysi teg va atribut to‘g‘ri?',code:'<a href="...">Ko‘rish</a>',options:['<link src="...">','<a href="...">','<href link="...">','<url>...</url>'],correct:1,explain:'Havola <a> tegi bilan, manzil href atributida yoziladi.'},
    {q:'Rasm qo‘shishda alt atributi nima uchun kerak?',options:['Rasmni katta qilish uchun','Rasm yuklanmasa matn chiqishi va qidiruv uchun','Rasmni aylantirish uchun','Hech qanday vazifasi yo‘q'],correct:1,explain:'alt — rasm yuklanmasa chiqadigan matn va qidiruv tizimlari uchun tavsif.'},
    {q:'Ro‘yxatdagi tartibsiz ro‘yxat qaysi teg bilan boshlanadi?',code:'<ul>\n  <li>HTML</li>\n</ul>',options:['<ol>','<list>','<ul>','<li>'],correct:2,explain:'<ul> — tartibsiz (nuqtali) ro‘yxat, <ol> — tartibli (raqamli) ro‘yxat.'},
    {q:'Tugma uchun qaysi teg to‘g‘ri?',options:['<click>','<input type="button"> yoki <button>','<btn>','<press>'],correct:1,explain:'Tugma uchun <button> yoki <input type="button"> ishlatiladi.'},
  ],
  'CSS': [
    {q:'display: flex nima qiladi?',code:'.qator { display: flex; }',options:['Matnni qalin qiladi','Bolalarni yonma-yon, qatorga joylashtiradi','Rasmni aylantiradi','Sahifani yashiradi'],correct:1,explain:'display: flex bolalarni qator bo‘ylab yonma-yon joylashtiradi.'},
    {q:'Tugmani yumaloq qilish uchun qaysi xossa?',code:'button { border-radius: 999px; }',options:['border-color','border-radius','roundness','circle'],correct:1,explain:'border-radius burchaklarni yumaloqlaydi. 999px — to‘liq yumaloq tugma beradi.'},
    {q:'Qaysi yozuv matn rangini binafsha qiladi?',options:['background: #6D28D9;','color: #6D28D9;','font-size: #6D28D9;','border: #6D28D9;'],correct:1,explain:'color — matn rangi, background — fon rangi.'},
    {q:'Telefonda boshqa ko‘rinish berish uchun nima ishlatiladi?',code:'@media (max-width: 600px) { ... }',options:['@phone','@media','@mobile','@screen-only'],correct:1,explain:'@media so‘rovi ekran kengligiga qarab boshqa qoidalarni yoqadi.'},
    {q:'Elementlar orasidagi bo‘shliqni Flex da qaysi xossa beradi?',options:['margin-top','gap','padding-left','space'],correct:1,explain:'gap — flex va grid da elementlar orasidagi bo‘shliq.'},
  ],
  'JavaScript': [
    {q:'let va const farqi nima?',code:'let ball = 0;\nconst ism = "Nurislom";',options:['Farqi yo‘q','let o‘zgaradi, const o‘zgarmaydi','const o‘zgaradi, let o‘zgarmaydi','Ikkalasi ham faqat son saqlaydi'],correct:1,explain:'let ga yangi qiymat berish mumkin, const ga berilgan qiymat o‘zgarmasligi kutiladi.'},
    {q:'Bu kod nima chiqaradi?',code:'function qosh(a, b) {\n  return a + b;\n}\nqosh(3, 4);',options:['34','7','3','Xato'],correct:1,explain:'Funksiya 3 + 4 ni qaytaradi — natija 7.'},
    {q:'Tugma bosilganda kod ishlashi uchun nima yoziladi?',code:'tugma.addEventListener("click", () => { ... })',options:['tugma.onClick = hech narsa','addEventListener("click", ...)','tugma.listen()','tugma.click = false'],correct:1,explain:'addEventListener hodisani kutadi va u sodir bo‘lganda funksiyani ishga tushiradi.'},
    {q:'Massivning uzunligini qanday bilamiz?',code:'const fanlar = ["HTML", "CSS", "JS"];\nfanlar.length; // ?',options:['fanlar.size','fanlar.length','fanlar.count','fanlar.soni'],correct:1,explain:'Massiv uzunligi .length bilan olinadi — bu yerda 3.'},
    {q:'Bu shart qachon bajariladi?',code:'if (ball >= 90) {\n  console.log("A\'lo!");\n}',options:['Ball 90 dan kichik bo‘lsa','Ball 90 ga teng yoki katta bo‘lsa','Har doim','Hech qachon'],correct:1,explain:'>= — “katta yoki teng”. Shart ball 90 va undan katta bo‘lganda bajariladi.'},
  ],
};

const ROADMAP = [
  {n:1,title:'HTML & CSS — Sayt skeleti',subtitle:'Sayt qanday qurilishini tushunasiz',desc:'Teglar, bloklar, ranglar va Flexbox. Birinchi sahifangizni shu bosqichda yaratasiz — sarlavha, kartochkalar va tugmali to‘liq sahifa.',tech:['HTML','CSS','Flexbox'],time:'1–3 hafta',result:'Birinchi sahifangiz'},
  {n:2,title:'JavaScript — Jonlantirish',subtitle:'Tugma bosilganda sahifa javob beradi',desc:'O‘zgaruvchilar, funksiyalar, shartlar va hodisalar. Hisoblagich, menyu va filtrlar — saytni jonlantiradigan hamma narsa.',tech:['JavaScript','DOM','Events'],time:'4–7 hafta',result:'Interaktiv sahifa'},
  {n:3,title:'React + Tailwind — Zamonaviy interfeys',subtitle:'Katta saytlarni tartibli qurasiz',desc:'Komponentlar, holat va Tailwind bilan tez dizayn. IDROK ning o‘zi ham shu texnologiyalarda qurilgan.',tech:['React','Tailwind','Komponent'],time:'8–10 hafta',result:'Portfolio sayt'},
  {n:4,title:'Node.js + Baza — To‘liq sayt va deploy',subtitle:'Saytni internetga chiqarasiz',desc:'Backend, baza, domain va SEO. Kurs oxirida saytingiz haqiqiy manzilga ega bo‘ladi va boshqalar uni ko‘ra oladi.',tech:['Node.js','Express','Deploy'],time:'11–12 hafta',result:'Nashr qilingan sayt'},
];

const PROJECTS: Project[] = [
  {id:'portfolio',title:'Shaxsiy Portfolio Sayt',desc:'O‘zingiz, ko‘nikmalaringiz va ishlaringiz haqida bitta chiroyli sahifa. Bu — sizning ish daftaringiz va birinchi nashr qilingan loyihangiz.',level:'Boshlang‘ich',tech:['HTML','CSS','Tailwind'],time:'1 hafta',tasks:['Hero bo‘limi: ism, lavozim, tugma','Ko‘nikmalar ro‘yxati va kartochkalar','3 ta ish namunasi','Aloqa bo‘limi va nashr'],result:'nashr qilingan portfolio havolasi'},
  {id:'shop',title:'Online Do‘kon sahifasi',desc:'Mahsulotlar, narxlar, filtr va savat mantig‘i. Do‘kon sahifasi — JavaScript ni amalda o‘rganish uchun eng yaxshi loyiha.',level:'O‘rta',tech:['HTML','CSS','JavaScript'],time:'2 hafta',tasks:['Mahsulotlar massivi va kartochkalar','Kategoriya bo‘yicha filtr','Qidiruv maydoni','Savat hisoblagichi'],result:'ishlaydigan do‘kon sahifasi'},
  {id:'weather',title:'Ob-havo Ilovasi',desc:'Shahar nomini yozasiz — ob-havo chiqadi. API bilan ishlash, ma’lumotni olish va sahifada ko‘rsatishni shu loyihada o‘rganasiz.',level:'O‘rta',tech:['JavaScript','API','Fetch'],time:'1,5 hafta',tasks:['Shahar qidiruvi','API dan ma’lumot olish','Harorat va holatni ko‘rsatish','Xato holatini chiroyli ko‘rsatish'],result:'ishlaydigan ob-havo ilovasi'},
  {id:'todo',title:'To-Do Ilova',desc:'Vazifalarni qo‘shish, belgilash va o‘chirish. React da holat bilan ishlashni o‘rganish uchun klassik va foydali loyiha.',level:'O‘rta',tech:['React','useState','Local saqlash'],time:'1 hafta',tasks:['Vazifa qo‘shish formasi','Bajarildi belgisi','Filtr: barchasi / bajarilgan','Vazifalarni saqlash'],result:'ishlaydigan vazifalar ilovasi'},
];

const DIRECTIONS = [
  {id:'frontend', title:'Frontend', desc:'Saytning ko‘rinadigan qismi — foydalanuvchi ko‘radigan va bosadigan hamma narsa.', tech:['HTML','CSS','JS','React'], courses:'5 ta kurs', lessons:'120 dars', filter:'Frontend', query:'', icon:<Code2 size={28}/>},
  {id:'backend', title:'Backend', desc:'Server, ma’lumotlar bazasi va API — saytning ko‘rinmaydigan, lekin eng muhim qismi.', tech:['Node.js','Baza','API'], courses:'5 ta kurs', lessons:'110 dars', filter:'Backend', query:'', icon:<Server size={28}/>},
  {id:'python', title:'Python', desc:'Dasturlash mantiqini eng sodda tilda o‘rganing — botlar va avtomatlashtirishgacha.', tech:['Dasturlash mantiqi','Botlar'], courses:'5 ta kurs', lessons:'105 dars', filter:'Python', query:'', icon:<Terminal size={28}/>},
  {id:'mobil', title:'Mobil dasturlash', desc:'Telefon ilovalari — Flutter va React Native bilan iOS hamda Android uchun bitta kod.', tech:['Flutter','Dart','React Native'], courses:'5 ta kurs', lessons:'95 dars', filter:'Mobil', query:'', icon:<MonitorSmartphone size={28}/>},
  {id:'fullstack', title:'Fullstack & Deploy', desc:'Frontend + Backend + Deploy — g‘oyadan nashr qilingan saytgacha bo‘lgan to‘liq yo‘l.', tech:['Frontend','Backend','Deploy'], courses:'5 ta kurs', lessons:'90 dars', filter:'Fullstack', query:'', icon:<Layers size={28}/>},
];

const EDITOR_TEMPLATES = [
  {name:'Portfolio kartochka', html:`<div class="karta">\n  <h1>Nurislom Xurramov</h1>\n  <p>Frontend dasturchi</p>\n  <button id="aloqa">Aloqa</button>\n  <p id="natija"></p>\n</div>`, css:`.karta { background: white; border-radius: 24px; padding: 28px; max-width: 420px; text-align: center; box-shadow: 0 12px 32px rgba(15,23,42,.12); }\nh1 { color: #0F172A; margin: 0 0 8px; }\np { color: #475569; }\nbutton { background: #2563EB; color: white; border: 0; padding: 12px 22px; border-radius: 999px; font-weight: 700; cursor: pointer; }`, js:`const tugma = document.getElementById("aloqa");\nconst natija = document.getElementById("natija");\ntugma.addEventListener("click", () => {\n  natija.textContent = "Rahmat! Tez orada javob beraman.";\n});`},
  {name:'Tugma animatsiyasi', html:`<div class="markaz">\n  <h2>Hover ni sinab ko‘ring</h2>\n  <button class="sehrli">Sehrli tugma</button>\n  <p id="matn">Tugma ustiga sichqonchani olib boring.</p>\n</div>`, css:`.markaz { text-align: center; padding: 32px; background: #EDE9FF; border-radius: 24px; }\n.sehrli { background: #2563EB; color: white; border: 0; padding: 14px 28px; border-radius: 999px; font-weight: 800; cursor: pointer; transition: transform .2s, background .2s; }\n.sehrli:hover { transform: translateY(-3px) scale(1.04); background: #7C3AED; }`, js:`const matn = document.getElementById("matn");\nconst tugma = document.querySelector(".sehrli");\ntugma.addEventListener("mouseenter", () => { matn.textContent = "Ajoyib! Tugma jonlandi."; });\ntugma.addEventListener("mouseleave", () => { matn.textContent = "Tugma ustiga sichqonchani olib boring."; });`},
  {name:'Hisoblagich', html:`<div class="hisob">\n  <h2>Hisoblagich</h2>\n  <p class="son" id="son">0</p>\n  <button id="kamaytir">−</button>\n  <button id="oshir">+</button>\n</div>`, css:`.hisob { text-align: center; background: white; border-radius: 24px; padding: 28px; box-shadow: 0 12px 32px rgba(15,23,42,.12); }\n.son { font-size: 56px; font-weight: 800; color: #2563EB; margin: 8px 0; }\nbutton { background: #0F172A; color: white; border: 0; width: 52px; height: 52px; border-radius: 50%; font-size: 24px; margin: 0 6px; cursor: pointer; }`, js:`let son = 0;\nconst el = document.getElementById("son");\ndocument.getElementById("oshir").addEventListener("click", () => { son++; el.textContent = son; });\ndocument.getElementById("kamaytir").addEventListener("click", () => { son--; el.textContent = son; });`},
];

const LEADERS = [
  {name:'Nurislom Xurramov', points:2680, lessons:92, color:'#2563EB'},
  {name:'Kamola R.', points:2450, lessons:86, color:'#7C3AED'},
  {name:'Sardor M.', points:2310, lessons:81, color:'#92400E'},
  {name:'Laylo A.', points:2180, lessons:76, color:'#047857'},
  {name:'Bekzod N.', points:2050, lessons:71, color:'#9D174D'},
];

const PARTICLES = Array.from({length:18},(_,i)=>({left:(i*53+11)%100,top:88-(i*7)%55,size:3+(i%4)*2,delay:(i%6)*1.4,duration:9+(i%5)*3,opacity:.35+(i%4)*.15}));
function hashPassword(pw:string){
  let h1 = 0x811c9dc5; let h2 = 0x01000193;
  for(let i=0;i<pw.length;i++){ const c = pw.charCodeAt(i); h1 ^= c; h1 = Math.imul(h1, 0x01000193); h2 ^= c; h2 = Math.imul(h2, 0x01000193); }
  return `${(h1>>>0).toString(16).padStart(8,'0')}-${(h2>>>0).toString(16).padStart(8,'0')}-${pw.length}`;
}
function FlowSection({id, children}:{id:string; children:React.ReactNode; parallax?:number; scrollY?:number}){
  if(id==='editor' || id==='quiz' || id==='rating' || id==='profile') return null;
  return <section id={id} className="flow-section">{children}<div className="flow-divider max-w-[1220px] mx-auto px-4" aria-hidden="true"/></section>;
}

const CROWN_BURST = [
  {x:-22,y:-14,s:5},{x:20,y:-18,s:4},{x:28,y:2,s:6},{x:18,y:18,s:4},{x:-20,y:16,s:6},{x:-28,y:0,s:4},{x:0,y:-24,s:5},{x:8,y:24,s:4},{x:-10,y:-22,s:3},{x:26,y:12,s:3},
];
const CROWN_ORBIT = [0,45,90,135,180,225,270,315];
function PremiumCrown({size=28, className='', celebrate=false}:{size?:number; className?:string; celebrate?:boolean}){
  const gid = React.useId().replace(/[^a-zA-Z0-9]/g,'');
  const compact = size <= 18;
  return (
    <span className={`crown-stage ${className}`} aria-hidden="true" style={{width:size, height:size*0.72}}>
      {!compact && (
        <span className="crown-orbit" aria-hidden="true">
          {CROWN_ORBIT.map((deg,i)=>(<span key={deg} className="crown-orbit-star" style={{transform:`rotate(${deg}deg) translateX(${size*0.72}px) rotate(${-deg}deg)`, animationDelay:`${i*0.22}s`}}>✦</span>))}
        </span>
      )}
      <span className={celebrate ? 'crown-drop' : 'crown-float'}>
        <svg viewBox="0 0 56 40" width={size} height={size*0.72} aria-hidden="true" style={{display:'block', overflow:'visible'}}>
          <defs>
            <linearGradient id={`cg-${gid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#FFFBEB"/><stop offset="28%" stopColor="#FDE68A"/><stop offset="55%" stopColor="#FACC15"/><stop offset="82%" stopColor="#D97706"/><stop offset="100%" stopColor="#92400E"/></linearGradient>
            <linearGradient id={`cgd-${gid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFF7CC"/><stop offset="100%" stopColor="#B45309"/></linearGradient>
            <radialGradient id={`cr-${gid}`} cx="0.35" cy="0.3" r="0.9"><stop offset="0%" stopColor="#FECACA"/><stop offset="45%" stopColor="#DC2626"/><stop offset="100%" stopColor="#7F1D1D"/></radialGradient>
            <linearGradient id={`csh-${gid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="rgba(255,255,255,0)"/><stop offset="50%" stopColor="rgba(255,255,255,.95)"/><stop offset="100%" stopColor="rgba(255,255,255,0)"/></linearGradient>
          </defs>
          <path d="M4 32 L10 10 L20 21 L28 4 L36 21 L46 10 L52 32 Z" fill={`url(#cg-${gid})`} stroke="#FFF7CC" strokeWidth="1.3" strokeLinejoin="round" strokeLinecap="round"/>
          <path d="M8 28 L12 14 L20 21 L28 9 L36 21 L44 14 L48 28 Z" fill="rgba(255,255,255,.22)"/>
          <path d="M10 16 L16 20 L28 7" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="1.4" strokeLinecap="round" opacity="0.8"/>
          <circle cx="28" cy="16.5" r="4.4" fill={`url(#cr-${gid})`} stroke="#FEE2E2" strokeWidth="0.9"/>
          <circle cx="26.6" cy="15" r="1.2" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="17.5" cy="25" r="3.3" fill={`url(#cr-${gid})`} stroke="#FEE2E2" strokeWidth="0.8"/>
          <circle cx="16.5" cy="23.8" r="0.9" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="38.5" cy="25" r="3.3" fill={`url(#cr-${gid})`} stroke="#FEE2E2" strokeWidth="0.8"/>
          <circle cx="37.5" cy="23.8" r="0.9" fill="#FFFFFF" opacity="0.9"/>
          <rect x="4" y="31.5" width="48" height="5.4" rx="2.7" fill={`url(#cgd-${gid})`} stroke="#FFF7CC" strokeWidth="0.9"/>
          <circle cx="10" cy="34.2" r="0.9" fill="#FFFBEB"/><circle cx="28" cy="34.2" r="0.9" fill="#FFFBEB"/><circle cx="46" cy="34.2" r="0.9" fill="#FFFBEB"/>
        </svg>
        <span className="crown-shine" aria-hidden="true" />
      </span>
      {!compact && (<><span className="crown-spark crown-spark-1">✦</span><span className="crown-spark crown-spark-2">✦</span><span className="crown-spark crown-spark-3">✦</span></>)}
      {celebrate && (
        <span className="crown-burst" aria-hidden="true">
          {CROWN_BURST.map((p,i)=>(<span key={i} className="crown-burst-particle" style={{width:p.s, height:p.s, ['--bx' as any]:`${p.x}px`, ['--by' as any]:`${p.y}px`, animationDelay:`${i*0.02}s`}} />))}
        </span>
      )}
    </span>
  );
}
async function callApi(action:string, args:any){
  const res = await fetch("actions", {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({action, args})});
  if(!res.ok) throw new Error('Tarmoq xatosi');
  const json = await res.json();
  if(json.error) throw new Error(String(json.error));
  return json.data;
}

export default function App(){
  const [tab,setTab] = useState<'home'|'directions'|'courses'|'premium'|'community'>('home');
  const [profileMenuOpen,setProfileMenuOpen] = useState(false);
  const [profileMenuView,setProfileMenuView] = useState<'menu'|'profile'|'courses'|'settings'|'certificates'|'notifications'>('menu');
  const [showEditProfile,setShowEditProfile] = useState(false);
  const [profileModal,setProfileModal] = useState<'profile'|'edit'|'courses'|'certificates'|'settings'|'favorites'|'notifications'|null>(null);
  const [homeSettings,setHomeSettings] = useState<{stickerScale:number; floatSpeed:number; layout:'scattered'|'compact'|'center'|'right'}>({stickerScale:1, floatSpeed:1, layout:'scattered'});
  const [homeDraft,setHomeDraft] = useState<{stickerScale:number; floatSpeed:number; layout:'scattered'|'compact'|'center'|'right'}>({stickerScale:1, floatSpeed:1, layout:'scattered'});
  const [homeRecordId,setHomeRecordId] = useState<string|null>(null);
  const [homeSaving,setHomeSaving] = useState(false);
  const [showLogoutConfirm,setShowLogoutConfirm] = useState(false);
  const [expandedCourseId,setExpandedCourseId] = useState<string|null>(null);
  useEffect(()=>{ (async()=>{ try{ const d=await callApi('records.list',{collection:'idrok_home_settings'}); const rec=d?.records?.[0]; if(rec?.value){ setHomeRecordId(rec.id); const v=rec.value; const next={stickerScale:typeof v.stickerScale==='number'?Math.min(1.3,Math.max(0.8,v.stickerScale)):1, floatSpeed:typeof v.floatSpeed==='number'?Math.min(2,Math.max(0.5,v.floatSpeed)):1, layout:(['scattered','compact','center','right'].includes(v.layout)?v.layout:'scattered') as typeof homeSettings.layout}; setHomeSettings(next); setHomeDraft(next); } }catch{ /* bosh sahifa sozlamasi bo‘lmasa — standart qoladi */ } })(); },[]);
  async function saveHomeSettings(){
    setHomeSaving(true);
    try{ const value={...homeDraft, updated_at:new Date().toISOString()}; if(homeRecordId) await callApi('records.replace',{collection:'idrok_home_settings', id:homeRecordId, value}); else { const c=await callApi('records.create',{collection:'idrok_home_settings', value, idempotency_key:'idrok-home-settings-v1'}); if(c?.id) setHomeRecordId(c.id); } setHomeSettings(homeDraft); return true; }catch{ setSettingsSaveMsg('Bosh sahifa sozlamalari saqlanmadi — internetni tekshiring.'); return false; } finally{ setHomeSaving(false); }
  }
  function resetHomeSettings(){ const d={stickerScale:1, floatSpeed:1, layout:'scattered' as const}; setHomeDraft(d); setHomeSettings(d); }
  const [certViewId,setCertViewId] = useState<string|null>(null);
  const [certMsg,setCertMsg] = useState('');
  const [settingsDraft,setSettingsDraft] = useState<{lang:'uz'|'ru'|'en'; dark:boolean; notifications:boolean}>({lang:'uz', dark:true, notifications:true});
  const [settingsSaveMsg,setSettingsSaveMsg] = useState('');
  const [settingsSaving,setSettingsSaving] = useState(false);
  const [settingsRecordId,setSettingsRecordId] = useState<string|null>(null);
  const [premiumActive,setPremiumActive] = useState(false);
  const [premiumPlanId,setPremiumPlanId] = useState<string|null>(null);
  const [premiumRecordId,setPremiumRecordId] = useState<string|null>(null);
  const [pendingPremium,setPendingPremium] = useState<{id:string; title:string; price:string; per:string}|null>(null);
  const [premiumSaving,setPremiumSaving] = useState(false);
  const [premiumError,setPremiumError] = useState('');
  const [crownCelebrate,setCrownCelebrate] = useState(false);
  const premiumRecordIdRef = useRef<string|null>(null);
  premiumRecordIdRef.current = premiumRecordId;
  async function confirmPremium(){
    if(!pendingPremium) return;
    setPremiumSaving(true); setPremiumError('');
    try{
      const value = {active:true, planId:pendingPremium.id, planTitle:pendingPremium.title, price:pendingPremium.price, activated_at:new Date().toISOString()};
      if(premiumRecordIdRef.current){
        await callApi('records.replace',{collection:'idrok_premium', id:premiumRecordIdRef.current, value});
      } else {
        const created = await callApi('records.create',{collection:'idrok_premium', value, idempotency_key:'idrok-premium-v1'});
        if(created?.id) setPremiumRecordId(created.id);
      }
      setPremiumActive(true); setPremiumPlanId(pendingPremium.id); setPendingPremium(null); setCrownCelebrate(true); setTimeout(()=>setCrownCelebrate(false), 1750); pushNotif('Premium faollashtirildi 👑', `${pendingPremium.title} faollashdi — toj profilingizda yonadi.`); showToast('Premium faollashtirildi ✓');
    }catch{ setPremiumError('Premium saqlanmadi — internetni tekshiring va qayta urining.'); }
    setPremiumSaving(false);
  }
  function openProfileModal(kind:'profile'|'edit'|'courses'|'certificates'|'settings'|'favorites'|'notifications'){
    setProfileMenuOpen(false); setProfileMenuView('menu'); setCertViewId(null); setCertMsg(''); setSettingsSaveMsg('');
    if(kind==='settings'){ setSettingsDraft(profileSettings); setHomeDraft(homeSettings); setSettingsSaveMsg(''); }
    if(kind==='edit'){ setEditName(displayName); setEditLogin(profile?.login || ''); setEditBio(profileBio); setEditAvatarId(avatarId); setEditError(''); }
    setProfileModal(kind);
  }
  useEffect(()=>{ if(!profileModal) return; const onKey=(e:KeyboardEvent)=>{ if(e.key==='Escape') setProfileModal(null); }; document.addEventListener('keydown',onKey); const prevOverflow=document.body.style.overflow; document.body.style.overflow='hidden'; return ()=>{ document.removeEventListener('keydown',onKey); document.body.style.overflow=prevOverflow; }; },[profileModal]);
  const [editName,setEditName] = useState('');
  const [editLogin,setEditLogin] = useState('');
  const [editBio,setEditBio] = useState('');
  const [editAvatarId,setEditAvatarId] = useState('nx');
  const [editError,setEditError] = useState('');
  const [editSaving,setEditSaving] = useState(false);
  const [avatarColor,setAvatarColor] = useState('#2563EB');
  const [profileBio,setProfileBio] = useState('Frontend yo‘nalishida o‘rganaman — har kuni amaliyot bilan.');
  const [avatarId,setAvatarId] = useState('nx');
  const [profileSettings,setProfileSettings] = useState<{lang:'uz'|'ru'|'en'; dark:boolean; notifications:boolean}>({lang:'uz', dark:true, notifications:true});
  const [profileNameOverride,setProfileNameOverride] = useState('');
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [search,setSearch] = useState('');
  const [filter,setFilter] = useState('Barchasi');
  const [headerSearchOpen,setHeaderSearchOpen] = useState(false);
  const [headerSearch,setHeaderSearch] = useState('');
  const [mobileMenu,setMobileMenu] = useState(false);
  const [selectedCourse,setSelectedCourse] = useState<Course|null>(null);
  const [selectedLesson,setSelectedLesson] = useState<Lesson|null>(null);
  const [selectedProject,setSelectedProject] = useState<Project|null>(null);
  const [favorites,setFavorites] = useState<string[]>([]);
  const [completed,setCompleted] = useState<string[]>([]);
  const [projectDone,setProjectDone] = useState<string[]>([]);
  const [quizBest,setQuizBest] = useState<Record<string,number>>({});
  const [recordId,setRecordId] = useState<string|null>(null);
  const [saveState,setSaveState] = useState<'idle'|'saving'|'saved'|'error'>('idle');
  const [loadError,setLoadError] = useState('');
  const [showFavOnly,setShowFavOnly] = useState(false);
  type Notif = {id:string; title:string; text:string; created_at:string; read:boolean};
  type CourseComment = {id:string; courseId:string; author:string; text:string; created_at:string; replies:{id:string; author:string; text:string; created_at:string}[]};
  type ActivityItem = {lessonId:string; courseId:string; title:string; at:string};
  type DayPlan = {courseId:string; lessons:number; note:string; created_at:string; done:boolean} | null;
  const [notifications,setNotifications] = useState<Notif[]>([]);
  const [notifRecordId,setNotifRecordId] = useState<string|null>(null);
  const [notifOpen,setNotifOpen] = useState(false);
  const [activityLog,setActivityLog] = useState<ActivityItem[]>([]);
  const [activityRecordId,setActivityRecordId] = useState<string|null>(null);
  const [plan,setPlan] = useState<DayPlan>(null);
  const [planRecordId,setPlanRecordId] = useState<string|null>(null);
  const [planCourseId,setPlanCourseId] = useState('html-css');
  const [planLessons,setPlanLessons] = useState(2);
  const [planNote,setPlanNote] = useState('');
  const [planSaving,setPlanSaving] = useState(false);
  const [planMsg,setPlanMsg] = useState('');
  const [planEditing,setPlanEditing] = useState(false);
  const [courseComments,setCourseComments] = useState<CourseComment[]>([]);
  const [commentText,setCommentText] = useState('');
  const [commentSending,setCommentSending] = useState(false);
  const [commentMsg,setCommentMsg] = useState('');
  const [replyTo,setReplyTo] = useState<string|null>(null);
  const [replyText,setReplyText] = useState('');
  const [celebration,setCelebration] = useState<{title:string; sub:string} | null>(null);
  const [priceFilter,setPriceFilter] = useState<'Barchasi'|'Bepul'|'Premium'>('Barchasi');
  const [coursesTab,setCoursesTab] = useState<'all'|'fav'>('all');
  const notifRef = useRef<HTMLDivElement>(null);
  const notifRecordIdRef = useRef<string|null>(null); notifRecordIdRef.current = notifRecordId;
  const activityRecordIdRef = useRef<string|null>(null); activityRecordIdRef.current = activityRecordId;
  const planRecordIdRef = useRef<string|null>(null); planRecordIdRef.current = planRecordId;
  async function persistNotifications(next:Notif[]){
    try{
      const value={items:next, updated_at:new Date().toISOString()};
      if(notifRecordIdRef.current) await callApi('records.replace',{collection:'idrok_notifications', id:notifRecordIdRef.current, value});
      else { const c=await callApi('records.create',{collection:'idrok_notifications', value, idempotency_key:'idrok-notifications-v1'}); if(c?.id) setNotifRecordId(c.id); }
    }catch{ /* bildirishnoma ekranda qoladi */ }
  }
  function pushNotif(title:string, text:string){
    const item:Notif={id:`n-${Date.now()}-${Math.floor(Math.random()*100000)}`, title, text, created_at:new Date().toISOString(), read:false};
    setNotifications(prev=>{ const next=[item, ...prev].slice(0,30); persistNotifications(next); return next; });
  }
  async function persistActivity(next:ActivityItem[]){
    try{
      const value={items:next, updated_at:new Date().toISOString()};
      if(activityRecordIdRef.current) await callApi('records.replace',{collection:'idrok_activity', id:activityRecordIdRef.current, value});
      else { const c=await callApi('records.create',{collection:'idrok_activity', value, idempotency_key:'idrok-activity-v1'}); if(c?.id) setActivityRecordId(c.id); }
    }catch{ /* faoliyat ekranda qoladi */ }
  }
  async function savePlan(){
    if(!planCourseId) return;
    setPlanSaving(true); setPlanMsg('');
    const value={courseId:planCourseId, lessons:Math.max(1,Math.min(5,planLessons)), note:planNote.trim(), created_at:new Date().toISOString(), done:false};
    try{
      if(planRecordIdRef.current) await callApi('records.replace',{collection:'idrok_plan', id:planRecordIdRef.current, value});
      else { const c=await callApi('records.create',{collection:'idrok_plan', value, idempotency_key:'idrok-plan-v1'}); if(c?.id) setPlanRecordId(c.id); }
      setPlan(value); setPlanEditing(false); setPlanMsg('Bugungi rejangiz saqlandi ✓'); pushNotif('Bugungi reja saqlandi','Bugun o‘qish rejangiz dashboardda ko‘rinadi.');
    }catch{ setPlanMsg('Reja saqlanmadi — internetni tekshiring.'); }
    setPlanSaving(false);
  }
  async function togglePlanDone(){
    if(!plan) return;
    const next={...plan, done:!plan.done};
    try{
      if(planRecordIdRef.current) await callApi('records.replace',{collection:'idrok_plan', id:planRecordIdRef.current, value:next});
      setPlan(next); if(next.done) pushNotif('Bugungi reja bajarildi','Tabriklaymiz! Bugungi o‘qish rejangizni bajardingiz.');
    }catch{ setPlanMsg('Reja holati saqlanmadi.'); }
  }
  async function addCourseComment(courseId:string){
    const text=commentText.trim(); if(!text||commentSending) return;
    setCommentSending(true); setCommentMsg('');
    try{
      const created=await callApi('records.create',{collection:'idrok_course_comments', value:{courseId, author:displayName||'IDROK o‘quvchisi', text, created_at:new Date().toISOString(), replies:[]}, idempotency_key:`idrok-comment-${Date.now()}-${Math.floor(Math.random()*1000000)}`});
      const item:CourseComment={id:created?.id||`c-${Date.now()}`, courseId, author:displayName||'IDROK o‘quvchisi', text, created_at:new Date().toISOString(), replies:[]};
      setCourseComments(prev=>[...prev,item]); setCommentText(''); setCommentMsg('Izohingiz saqlandi ✓');
    }catch{ setCommentMsg('Izoh saqlanmadi — internetni tekshiring.'); }
    setCommentSending(false);
  }
  async function addReply(commentId:string){
    const text=replyText.trim(); if(!text) return;
    const target=courseComments.find(c=>c.id===commentId); if(!target) return;
    const reply={id:`r-${Date.now()}`, author:displayName||'IDROK o‘quvchisi', text, created_at:new Date().toISOString()};
    const next={...target, replies:[...target.replies, reply]};
    try{ await callApi('records.replace',{collection:'idrok_course_comments', id:commentId, value:{courseId:next.courseId, author:next.author, text:next.text, created_at:next.created_at, replies:next.replies}}); }catch{ /* javob ekranda qoladi, saqlashda xato bo‘lsa keyingi yuklanishda ko‘rinmasligi mumkin */ }
    setCourseComments(prev=>prev.map(c=>c.id===commentId?next:c)); setReplyText(''); setReplyTo(null);
  }
  const achievements = useMemo(()=>[
    {id:'first-step', title:'Birinchi qadam', desc:'5 ta dars tugatildi', emoji:'🌱', need:5, unlocked: completed.length>=5},
    {id:'active', title:'Faol o‘quvchi', desc:'10 ta dars tugatildi', emoji:'🔥', need:10, unlocked: completed.length>=10},
    {id:'master', title:'Ustoz yo‘lida', desc:'25 ta dars tugatildi', emoji:'🏆', need:25, unlocked: completed.length>=25},
  ],[completed.length]);
  const streakDays = useMemo(()=>{
    const days=new Set(activityLog.map(a=>a.at.slice(0,10)));
    if(days.size===0) return completed.length>0 ? 1 : 0;
    return Math.min(7, Math.max(1, days.size));
  },[activityLog, completed.length]);
  const todayStr = new Date().toISOString().slice(0,10);
  const todayDone = useMemo(()=> activityLog.filter(a=>a.at.slice(0,10)===todayStr).length + (activityLog.length===0 ? Math.min(completed.length,2) : 0),[activityLog, todayStr, completed.length]);
  const dailyGoal = 2;
  const dailyPct = Math.min(100, Math.round((todayDone/dailyGoal)*100));
  const continueCourse = useMemo(()=>{
    const lastId = completed.length ? completed[completed.length-1] : null;
    if(lastId){ const c=COURSES.find(x=>x.lessons.some(l=>l.id===lastId)); if(c) return c; }
    if(plan) return COURSES.find(x=>x.id===plan.courseId) || COURSES[0];
    return COURSES[0];
  },[completed, plan]);
  const continueLesson = useMemo(()=> continueCourse.lessons.find(l=>!completed.includes(l.id)) || continueCourse.lessons[0],[continueCourse, completed]);
  const recentActivity = useMemo(()=>{
    if(activityLog.length) return [...activityLog].slice(-5).reverse();
    return [...completed].slice(-5).reverse().map(id=>{ const c=COURSES.find(x=>x.lessons.some(l=>l.id===id)); const l=c?.lessons.find(x=>x.id===id); return {lessonId:id, courseId:c?.id||'', title:l?.title||id, at:new Date().toISOString()} as ActivityItem; });
  },[activityLog, completed]);
  const unreadCount = notifications.filter(n=>!n.read).length;
  useEffect(()=>{ if(!notifOpen) return; const onDown=(e:MouseEvent)=>{ if(notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false); }; document.addEventListener('mousedown',onDown); return ()=>document.removeEventListener('mousedown',onDown); },[notifOpen]);
  const [quizSubject,setQuizSubject] = useState<string|null>(null);
  const [quizIndex,setQuizIndex] = useState(0);
  const [picked,setPicked] = useState<number|null>(null);
  const [score,setScore] = useState(0);
  const [finished,setFinished] = useState(false);
  const [trialOpen,setTrialOpen] = useState(false);
  const [activeNote,setActiveNote] = useState<string|null>(null);
  const [noteLeaving,setNoteLeaving] = useState(false);
  const noteTimerRef = useRef<ReturnType<typeof setTimeout>|null>(null);
  const noteFadeRef = useRef<ReturnType<typeof setTimeout>|null>(null);
  const [dragOffsets, setDragOffsets] = useState<Record<string, {x:number; y:number}>>({});
  const dragOffsetsRef = useRef<Record<string, {x:number; y:number}>>({});
  const [draggingId, setDraggingId] = useState<string|null>(null);
  const [stickerRecordId, setStickerRecordId] = useState<string|null>(null);
  const stickerRecordIdRef = useRef<string|null>(null);
  stickerRecordIdRef.current = stickerRecordId;
  const heroRef = useRef<HTMLDivElement>(null);
  const dragInfoRef = useRef<{id:string; startX:number; startY:number; startOffset:{x:number; y:number}; startRect:DOMRect; containerRect:DOMRect; moved:boolean}|null>(null);
  const justDraggedRef = useRef(false);
  function startDrag(e: React.PointerEvent, id:string){
    if(e.pointerType==='mouse' && e.button!==0) return;
    const el = e.currentTarget as HTMLElement;
    const container = heroRef.current;
    if(!container) return;
    const startRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    dragInfoRef.current = {id, startX:e.clientX, startY:e.clientY, startOffset: dragOffsetsRef.current[id] || dragOffsets[id] || {x:0, y:0}, startRect, containerRect, moved:false};
    try{ el.setPointerCapture(e.pointerId); }catch{ /* pointer capture mavjud bo‘lmasa — drag oddiy harakat bilan davom etadi */ }
  }
  function moveDrag(e: React.PointerEvent){
    const info = dragInfoRef.current;
    if(!info) return;
    const dx = e.clientX - info.startX;
    const dy = e.clientY - info.startY;
    if(!info.moved && Math.hypot(dx, dy) > 5){ info.moved = true; justDraggedRef.current = true; setDraggingId(info.id); }
    if(!info.moved) return;
    let nx = info.startRect.left + dx;
    let ny = info.startRect.top + dy;
    nx = Math.max(info.containerRect.left + 2, Math.min(nx, info.containerRect.right - info.startRect.width - 2));
    ny = Math.max(info.containerRect.top + 2, Math.min(ny, info.containerRect.bottom - info.startRect.height - 2));
    const next = {x: info.startOffset.x + (nx - info.startRect.left), y: info.startOffset.y + (ny - info.startRect.top)};
    dragOffsetsRef.current = {...dragOffsetsRef.current, [info.id]: next};
    setDragOffsets(dragOffsetsRef.current);
  }
  async function persistStickers(next: Record<string, {x:number; y:number}>){
    try{
      const value = {positions: next, updated_at: new Date().toISOString()};
      if(stickerRecordIdRef.current){
        await callApi('records.replace',{collection:'idrok_stickers', id: stickerRecordIdRef.current, value});
      } else {
        const created = await callApi('records.create',{collection:'idrok_stickers', value, idempotency_key:'idrok-stickers-v1'});
        if(created?.id) setStickerRecordId(created.id);
      }
    }catch{ /* stiker joyi saqlanmasa — ekrandagi joy saqlanib qoladi */ }
  }
  function endDrag(e: React.PointerEvent){
    const info = dragInfoRef.current;
    if(!info) return;
    dragInfoRef.current = null;
    setDraggingId(null);
    try{ (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId); }catch{ /* allaqachon bo‘shatilgan bo‘lishi mumkin */ }
    if(info.moved){
      justDraggedRef.current = true; setTimeout(()=>{ justDraggedRef.current = false; }, 180);
      // Bir-birini to‘smasin: tushgan stiker boshqasi bilan deyarli ustma-ust tushsa, uni pastga suramiz.
      try{
        const container = heroRef.current;
        if(container){
          const els = Array.from(container.querySelectorAll('[data-sticker]')) as HTMLElement[];
          const mine = els.find(el=>el.getAttribute('data-sticker')===info.id);
          if(mine){
            let rect = mine.getBoundingClientRect();
            let next = {...dragOffsetsRef.current};
            for(let attempt=0; attempt<4; attempt++){
              const overlaps = els.some(el=>{
                if(el===mine) return false;
                const r = el.getBoundingClientRect();
                const ox = Math.min(rect.right, r.right) - Math.max(rect.left, r.left);
                const oy = Math.min(rect.bottom, r.bottom) - Math.max(rect.top, r.top);
                return ox > 28 && oy > 28;
              });
              if(!overlaps) break;
              const cur = next[info.id] || {x:0,y:0};
              const shifted = {x: cur.x, y: cur.y + 72};
              next = {...next, [info.id]: shifted};
              dragOffsetsRef.current = next;
              setDragOffsets(next);
              rect = new DOMRect(rect.left, rect.top + 72, rect.width, rect.height);
            }
          }
        }
      }catch{ /* to‘qnashuvni tekshirib bo‘lmasa — joriy joy saqlanadi */ }
      persistStickers(dragOffsetsRef.current);
    }
    else { justDraggedRef.current = false; }
  }
  const activeNoteRef = useRef<string|null>(null);
  activeNoteRef.current = activeNote;
  function closeNote(){
    if(noteTimerRef.current) clearTimeout(noteTimerRef.current);
    if(noteFadeRef.current) clearTimeout(noteFadeRef.current);
    if(!activeNoteRef.current) return;
    setNoteLeaving(true);
    noteTimerRef.current = setTimeout(()=>{ setActiveNote(null); setNoteLeaving(false); }, 280);
  }
  function openNote(id:string){
    if(noteTimerRef.current) clearTimeout(noteTimerRef.current);
    if(noteFadeRef.current) clearTimeout(noteFadeRef.current);
    if(activeNoteRef.current===id){ setNoteLeaving(true); noteTimerRef.current = setTimeout(()=>{ setActiveNote(null); setNoteLeaving(false); }, 280); return; }
    setNoteLeaving(false);
    setActiveNote(id);
    noteFadeRef.current = setTimeout(()=>setNoteLeaving(true), 4600);
    noteTimerRef.current = setTimeout(()=>{ setActiveNote(null); setNoteLeaving(false); }, 5000);
  }
  useEffect(()=>{
    if(!activeNote) return;
    const onDown = (e: MouseEvent)=>{
      const t = e.target as HTMLElement | null;
      if(t && t.closest('[data-sticker]')) return;
      closeNote();
    };
    document.addEventListener('mousedown', onDown);
    return ()=>document.removeEventListener('mousedown', onDown);
  },[activeNote]);
  useEffect(()=>()=>{ if(noteTimerRef.current) clearTimeout(noteTimerRef.current); if(noteFadeRef.current) clearTimeout(noteFadeRef.current); },[]);
  const NOTE_CTAS: Record<string,{label:string; filter:string; query:string}> = {
    'js': {label:"Kursga o'tish →", filter:'Frontend', query:'JavaScript'},
    'python': {label:"Kursga o'tish →", filter:'Python', query:'Python'},
    'html': {label:"Kursga o'tish →", filter:'Frontend', query:'HTML'},
    'css': {label:"Kursga o'tish →", filter:'Frontend', query:'CSS'},
    'node': {label:"Kursga o'tish →", filter:'Backend', query:'Node'},
    'git': {label:"Kursga o'tish →", filter:'Fullstack', query:'Git'},
    'card-live': {label:"Kursga o'tish →", filter:'Python', query:'Python'},
    'card-cert': {label:"Kursga o'tish →", filter:'Frontend', query:''},
    'card-growth': {label:"Kursga o'tish →", filter:'Backend', query:''},
  };
  function goToCourseFromNote(id:string){
    const cta = NOTE_CTAS[id];
    if(!cta) return;
    if(noteTimerRef.current) clearTimeout(noteTimerRef.current);
    if(noteFadeRef.current) clearTimeout(noteFadeRef.current);
    setActiveNote(null);
    setNoteLeaving(false);
    setFilter(cta.filter);
    setSearch(cta.query);
    setShowFavOnly(false);
    setSelectedCourse(null);
    setSelectedLesson(null);
    setSelectedProject(null);
    setTab('courses');
    setTimeout(()=>{ document.getElementById('courses')?.scrollIntoView({behavior:'smooth', block:'start'}); }, 60);
  }
  type ToolbarRole = {label:string; hint:string};
  const TOOLBAR_ROLES: Record<string, ToolbarRole> = {
    js:{label:'Frontend', hint:'Interfeys yasash'},
    html:{label:'Main', hint:'Asosiy tuzilma'},
    css:{label:'Style', hint:'Dizayn va ko‘rinish'},
    python:{label:'AI&Data', hint:'Sun’iy intellekt va ma’lumot'},
    node:{label:'Backend', hint:'Server va baza'},
    git:{label:'Tools', hint:'Kod tarixi va jamoa'},
    'card-live':{label:'AI&Data', hint:'Sun’iy intellekt va ma’lumot'},
    'card-cert':{label:'Frontend', hint:'Interfeys yasash'},
    'card-growth':{label:'Backend', hint:'Server va baza'},
  };
  function toolbarRole(id:string): ToolbarRole { return TOOLBAR_ROLES[id] || {label:id, hint:''}; }
  const DIRECTION_ROLES: Record<string, ToolbarRole> = {
    frontend:{label:'Frontend', hint:'Interfeys yasash'},
    backend:{label:'Backend', hint:'Server va baza'},
    python:{label:'AI&Data', hint:'Sun’iy intellekt va ma’lumot'},
    mobil:{label:'Mobile', hint:'Mobil ilovalar'},
    fullstack:{label:'Fullstack', hint:'To‘liq sayt'},
  };
  const [activeDirection,setActiveDirection] = useState<string|null>(null);
  const [directionLeaving,setDirectionLeaving] = useState(false);
  const directionTimerRef = useRef<ReturnType<typeof setTimeout>|null>(null);
  const directionFadeRef = useRef<ReturnType<typeof setTimeout>|null>(null);
  const activeDirectionRef = useRef<string|null>(null);
  activeDirectionRef.current = activeDirection;
  function closeDirection(){
    if(directionTimerRef.current) clearTimeout(directionTimerRef.current);
    if(directionFadeRef.current) clearTimeout(directionFadeRef.current);
    if(!activeDirectionRef.current) return;
    setDirectionLeaving(true);
    directionTimerRef.current = setTimeout(()=>{ setActiveDirection(null); setDirectionLeaving(false); }, 280);
  }
  function openDirection(id:string){
    if(directionTimerRef.current) clearTimeout(directionTimerRef.current);
    if(directionFadeRef.current) clearTimeout(directionFadeRef.current);
    if(activeDirectionRef.current===id){ setDirectionLeaving(true); directionTimerRef.current = setTimeout(()=>{ setActiveDirection(null); setDirectionLeaving(false); }, 280); return; }
    setDirectionLeaving(false);
    setActiveDirection(id);
    directionFadeRef.current = setTimeout(()=>setDirectionLeaving(true), 4600);
    directionTimerRef.current = setTimeout(()=>{ setActiveDirection(null); setDirectionLeaving(false); }, 5000);
  }
  useEffect(()=>{
    if(!activeDirection) return;
    const onDown = (e: MouseEvent)=>{
      const t = e.target as HTMLElement | null;
      if(t && t.closest('[data-direction-card]')) return;
      closeDirection();
    };
    document.addEventListener('mousedown', onDown);
    return ()=>document.removeEventListener('mousedown', onDown);
  },[activeDirection]);
  useEffect(()=>()=>{ if(directionTimerRef.current) clearTimeout(directionTimerRef.current); if(directionFadeRef.current) clearTimeout(directionFadeRef.current); },[]);
  function goToCourseFromDirection(d:{id:string; filter:string; query:string}){
    if(directionTimerRef.current) clearTimeout(directionTimerRef.current);
    if(directionFadeRef.current) clearTimeout(directionFadeRef.current);
    setActiveDirection(null);
    setDirectionLeaving(false);
    setFilter(d.filter);
    setSearch(d.query);
    setShowFavOnly(false);
    setSelectedCourse(null);
    setSelectedLesson(null);
    setSelectedProject(null);
    setTab('courses');
    setTimeout(()=>{ document.getElementById('courses')?.scrollIntoView({behavior:'smooth', block:'start'}); }, 60);
  }
  const [premiumFocus,setPremiumFocus] = useState<'monthly'|'yearly'|'quarterly'|null>(null);
  useEffect(()=>{
    if(!premiumFocus) return;
    const onDown = (e: MouseEvent)=>{ const t = e.target as HTMLElement | null; if(t && t.closest('[data-premium-card]')) return; setPremiumFocus(null); };
    const onKey = (e: KeyboardEvent)=>{ if(e.key==='Escape') setPremiumFocus(null); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return ()=>{ document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  },[premiumFocus]);
  const [toast,setToast] = useState('');
  const [openStage,setOpenStage] = useState<number|null>(0);
  const [edHtml,setEdHtml] = useState(EDITOR_TEMPLATES[0].html);
  const [edCss,setEdCss] = useState(EDITOR_TEMPLATES[0].css);
  const [edJs,setEdJs] = useState(EDITOR_TEMPLATES[0].js);
  const [preview,setPreview] = useState<{html:string;css:string;js:string;run:number}|null>(null);
  const [previewError,setPreviewError] = useState('');
  const previewRef = useRef<HTMLDivElement>(null);
  const [profile,setProfile] = useState<{login:string; role?:'Student'|'Teacher'}|null>(null);
  const [selectedRole,setSelectedRole] = useState<'Student'|'Teacher'|null>(null);
  const [activeAuthCard,setActiveAuthCard] = useState<'student'|'login'|'teacher'|null>(null);
  const [roleError,setRoleError] = useState('');
  const [regRecordId,setRegRecordId] = useState<string|null>(null);
  const [authLoading,setAuthLoading] = useState(true);
  const [welcome,setWelcome] = useState(false);
  const [regLogin,setRegLogin] = useState('');
  const [regPassword,setRegPassword] = useState('');
  const [showRegPassword,setShowRegPassword] = useState(false);
  const [regErrors,setRegErrors] = useState<Record<string,string>>({});
  const [regSaving,setRegSaving] = useState(false);
  const [regSaveWarning,setRegSaveWarning] = useState('');
  const [accounts,setAccounts] = useState<{id:string; login:string; passwordHash?:string}[]>([]);
  const [authTab,setAuthTab] = useState<'login'|'register'>('login');
  const sidesHidden = authTab === 'login';
  const [loginLogin,setLoginLogin] = useState('');
  const [loginPassword,setLoginPassword] = useState('');
  const [showLoginPassword,setShowLoginPassword] = useState(false);
  const [loginError,setLoginError] = useState('');
  const [loginSaving,setLoginSaving] = useState(false);
  const [authNotice,setAuthNotice] = useState('');
  const [showContact,setShowContact] = useState(false);
  const [contactName,setContactName] = useState('');
  const [contactMessage,setContactMessage] = useState('');
  const [contactSaving,setContactSaving] = useState(false);
  const [contactMsg,setContactMsg] = useState('');
  async function handleContactSubmit(e: React.FormEvent){
    e.preventDefault();
    if(!contactMessage.trim()){ setContactMsg('Xabar matnini yozing.'); return; }
    setContactSaving(true); setContactMsg('');
    try{
      await callApi('records.create',{collection:'idrok_contact', value:{name:contactName.trim(), message:contactMessage.trim(), created_at:new Date().toISOString()}, idempotency_key:`idrok-contact-${Date.now()}-${Math.floor(Math.random()*1000000)}`});
      setContactMsg('Xabar saqlandi.');
      setContactName(''); setContactMessage('');
    }catch{ setContactMsg('Xabar saqlanmadi — internetni tekshiring.'); }
    setContactSaving(false);
  }
  const [forgotNote,setForgotNote] = useState('');
  const [scrollY,setScrollY] = useState(0);
  useEffect(()=>{
    let raf = 0;
    const onScroll = ()=>{
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(()=>{
        const y = window.scrollY || 0;
        setScrollY(y);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
    return ()=>{ window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  },[]);
  useEffect(()=>{
    if(!profile) return;
    const ids = ['home','directions','courses','premium','hamjamiyat'] as const;
    let raf = 0;
    const onScroll = ()=>{
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(()=>{
        if(selectedCourse || selectedLesson || selectedProject) return;
        const pos = (window.scrollY || 0) + 180;
        let current: typeof tab = 'home';
        for(const id of ids){
          const el = document.getElementById(id);
          if(el && el.offsetTop <= pos) current = id === 'hamjamiyat' ? 'community' : id;
        }
        setTab(current);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
    window.addEventListener('resize', onScroll);
    return ()=>{ window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf); };
  },[profile, selectedCourse, selectedLesson, selectedProject]);

  useEffect(()=>{
    if(!profileMenuOpen) return;
    const onDown = (e: MouseEvent)=>{
      if(profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)){ setProfileMenuOpen(false); setProfileMenuView('menu'); }
    };
    const onKey = (e: KeyboardEvent)=>{ if(e.key==='Escape'){ setProfileMenuOpen(false); setProfileMenuView('menu'); } };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return ()=>{ document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  },[profileMenuOpen]);

  const recordIdRef = useRef<string|null>(null);
  recordIdRef.current = recordId;

  async function reloadRecords(){
    const data = await callApi('records.list',{collection:'idrok_state'});
    const rec = data?.records?.[0];
    if(rec){
      setRecordId(rec.id);
      const v = rec.value || {};
      if(Array.isArray(v.favorites)) setFavorites(v.favorites);
      if(Array.isArray(v.completed)) setCompleted(v.completed);
      if(Array.isArray(v.projectDone)) setProjectDone(v.projectDone);
      if(v.quizBest && typeof v.quizBest==='object') setQuizBest(v.quizBest);
    }
    try{
      const regData = await callApi('records.list',{collection:'idrok_registration'});
      const list = Array.isArray(regData?.records) ? regData.records : [];
      const parsed = list.filter((r:any)=>r && r.value && typeof r.value.login === 'string').map((r:any)=>({id:r.id, login:r.value.login, passwordHash: typeof r.value.passwordHash === 'string' ? r.value.passwordHash : undefined}));
      setAccounts(parsed);
    }catch(e){ /* ro‘yxatdan o‘tish yozuvlari topilmasa — kirish sahifasi ko‘rinadi */ }
    try{
      const stickerData = await callApi('records.list',{collection:'idrok_stickers'});
      const rec = stickerData?.records?.[0];
      if(rec){
        setStickerRecordId(rec.id);
        const pos = rec.value?.positions;
        if(pos && typeof pos==='object'){
          const clean: Record<string,{x:number;y:number}> = {};
          for(const [k,v] of Object.entries(pos as Record<string, any>)){
            if(v && typeof v.x==='number' && typeof v.y==='number' && Number.isFinite(v.x) && Number.isFinite(v.y)) clean[k] = {x: Math.max(-260, Math.min(260, v.x)), y: Math.max(-260, Math.min(260, v.y))};
          }
          dragOffsetsRef.current = clean;
          setDragOffsets(clean);
        }
      }
    }catch(e){ /* saqlangan stiker joyi bo‘lmasa — boshlang‘ich joyda qoladi */ }
    try{
      const settingsData = await callApi('records.list',{collection:'idrok_settings'});
      const rec = settingsData?.records?.[0];
      if(rec && rec.value && typeof rec.value==='object'){
        const v = rec.value;
        const next = {lang: (v.lang==='ru'||v.lang==='en' ? v.lang : 'uz') as 'uz'|'ru'|'en', dark: v.dark!==false, notifications: v.notifications!==false};
        setSettingsRecordId(rec.id);
        setProfileSettings(next);
        setSettingsDraft(next);
      }
    }catch(e){ /* saqlangan sozlamalar bo‘lmasa — standart sozlamalar qoladi */ }
    try{
      const chatData = await callApi('records.list',{collection:'idrok_chat_messages'});
      const list = Array.isArray(chatData?.records) ? chatData.records : [];
      const parsed: ChatMessage[] = list.filter((r:any)=>r && r.value && typeof r.value.text === 'string' && typeof r.value.author === 'string' && (r.value.channel==='qa' || r.value.channel==='projects' || r.value.channel==='contest')).map((r:any)=>({id:r.id, channel:r.value.channel as ChatChannelId, author:r.value.author, text:r.value.text, created_at: typeof r.value.created_at === 'string' ? r.value.created_at : new Date().toISOString()}));
      parsed.sort((a,b)=>a.created_at.localeCompare(b.created_at));
      setChatMessages(parsed);
    }catch(e){ /* saqlangan chat xabarlari bo‘lmasa — namuna xabarlar ko‘rinadi */ }
    try{
      const premiumData = await callApi('records.list',{collection:'idrok_premium'});
      const rec = premiumData?.records?.[0];
      if(rec && rec.value && rec.value.active){
        setPremiumRecordId(rec.id); setPremiumActive(true); setPremiumPlanId(typeof rec.value.planId==='string' ? rec.value.planId : null);
      }
    }catch(e){ /* saqlangan premium bo‘lmasa — toj ko‘rinmaydi */ }
    try{
      const d = await callApi('records.list',{collection:'idrok_plan'});
      const rec = d?.records?.[0];
      if(rec && rec.value && typeof rec.value.courseId==='string'){ setPlanRecordId(rec.id); setPlan(rec.value); setPlanCourseId(rec.value.courseId); setPlanLessons(Number(rec.value.lessons)||2); setPlanNote(rec.value.note||''); }
    }catch{ /* reja bo‘lmasa — bo‘sh forma ko‘rinadi */ }
    try{
      const d = await callApi('records.list',{collection:'idrok_notifications'});
      const rec = d?.records?.[0];
      if(rec && Array.isArray(rec.value?.items)){ setNotifRecordId(rec.id); setNotifications(rec.value.items); }
    }catch{ /* bildirishnoma bo‘lmasa — bo‘sh ro‘yxat */ }
    try{
      const d = await callApi('records.list',{collection:'idrok_activity'});
      const rec = d?.records?.[0];
      if(rec && Array.isArray(rec.value?.items)){ setActivityRecordId(rec.id); setActivityLog(rec.value.items); }
    }catch{ /* faoliyat bo‘lmasa — tugatgan darslardan hisoblanadi */ }
    try{
      const d = await callApi('records.list',{collection:'idrok_course_comments'});
      const list = Array.isArray(d?.records)?d.records:[];
      setCourseComments(list.filter((r:any)=>r&&r.value&&typeof r.value.text==='string').map((r:any)=>({id:r.id, courseId:r.value.courseId, author:r.value.author, text:r.value.text, created_at:r.value.created_at||new Date().toISOString(), replies:Array.isArray(r.value.replies)?r.value.replies:[]})));
    }catch{ /* izohlar bo‘lmasa — bo‘sh */ }
  }

  useEffect(()=>{ reloadRecords().catch(()=>{ setLoadError('Saqlangan taraqqiyotni yuklashda xatolik. Sahifani yangilab ko‘ring.'); }).finally(()=>setAuthLoading(false)); },[]);

  async function persist(next:{favorites:string[]; completed:string[]; quizBest:Record<string,number>; projectDone:string[]}){
    setSaveState('saving');
    try{
      const value = {favorites:next.favorites, completed:next.completed, quizBest:next.quizBest, projectDone:next.projectDone, updated_at:new Date().toISOString()};
      if(recordIdRef.current){
        await callApi('records.replace',{collection:'idrok_state', id:recordIdRef.current, value});
      } else {
        const created = await callApi('records.create',{collection:'idrok_state', value, idempotency_key:'idrok-state-v1'});
        if(created?.id) setRecordId(created.id);
      }
      setSaveState('saved');
      setTimeout(()=>setSaveState('idle'),2200);
    }catch(e){ setSaveState('error'); setToast('Saqlashda xatolik — internetni tekshiring.'); setTimeout(()=>setToast(''),3000); }
  }

  function showToast(t:string){ setToast(t); setTimeout(()=>setToast(''),2600); }

  const displayName = profile ? (profileNameOverride || (profile.login.trim().toLowerCase()==='nurislom' ? 'Nurislom Xurramov' : profile.login.trim())) : '';
  const profileInitials = displayName ? displayName.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() : 'N';
  const avatarOpt = AVATAR_OPTIONS.find(a=>a.id===avatarId) || AVATAR_OPTIONS[0];
  const avatarEmoji = avatarOpt.emoji;
  const avatarBg = avatarOpt.id==='nx' ? avatarColor : avatarOpt.bg;
  const renderAvatar = (sizeClass:string, textClass:string) => (
    <span className={`${sizeClass} shrink-0 rounded-full text-white font-extrabold grid place-items-center border-2 border-white/60`} style={{backgroundColor: avatarBg}} aria-hidden="true">{avatarEmoji ? <span className={textClass} style={{lineHeight:1}}>{avatarEmoji}</span> : profileInitials}</span>
  );
  const mastery = useMemo(()=>{
    const byCat = (cats:string[]) => {
      const cs = COURSES.filter(c=>cats.includes(c.category));
      const total = cs.reduce((s,c)=>s+c.lessons.length,0);
      const done = cs.reduce((s,c)=>s+c.lessons.filter(l=>completed.includes(l.id)).length,0);
      const base = {Frontend:64, Backend:48, Python:72, Mobil:35, Fullstack:28} as Record<string,number>;
      if(!total || done===0) return base[cats[0]] || 30;
      return Math.max(8, Math.round((done/total)*100));
    };
    return [
      {n:'Frontend', p: byCat(['Frontend'])},
      {n:'Backend', p: byCat(['Backend'])},
      {n:'Python', p: byCat(['Python'])},
      {n:'Mobil', p: byCat(['Mobil'])},
      {n:'Fullstack', p: byCat(['Fullstack'])},
    ];
  },[completed]);
  const enrolledCourses = useMemo(()=> COURSES.filter(c=>c.lessons.some(l=>completed.includes(l.id)) || favorites.includes(c.id) || c.id==='html-css'),[completed, favorites]);
  const myCertsDynamic = useMemo(()=> enrolledCourses.map(c=>{
    const done = c.lessons.filter(l=>completed.includes(l.id)).length;
    const pct = Math.round((done / Math.max(1,c.lessons.length))*100);
    const emoji = c.category==='Python' ? '🐍' : c.category==='Backend' ? '⚙️' : c.category==='Mobil' ? '📱' : c.category==='Fullstack' ? '🚀' : '🌐';
    return {id:`cert-${c.id}`, courseId:c.id, title:c.title, status: pct>=100 ? 'Olingan' : (pct>0 ? 'Davom etmoqda' : 'Boshlangan'), date:'2026-yil', color: c.category==='Python' ? '#DB2777' : '#2563EB', emoji, progress:pct};
  }),[enrolledCourses, completed]);
  const trackLabel = profile?.role || 'Frontend';
  const menuT = profileSettings.lang==='ru'
    ? {profile:'Мой профиль', edit:'Редактировать профиль', courses:'Мои курсы', certs:'Мои сертификаты', settings:'Настройки', logout:'Выйти', back:'Назад'}
    : profileSettings.lang==='en'
    ? {profile:'My profile', edit:'Edit profile', courses:'My courses', certs:'My certificates', settings:'Settings', logout:'Log out', back:'Back'}
    : {profile:'Profilim', edit:'Profilni tahrirlash', courses:'Mening kurslarim', certs:'Sertifikatlarim', settings:'Sozlamalar', logout:'Chiqish', back:'Orqaga'};
  const myCerts = myCertsDynamic;
  function openEditProfile(){ openProfileModal('edit'); }
  async function persistSettings(next:{lang:'uz'|'ru'|'en'; dark:boolean; notifications:boolean}){
    setProfileSettings(next);
    setSettingsDraft(next);
    setSettingsSaving(true);
    setSettingsSaveMsg('');
    try{
      const value = {...next, updated_at:new Date().toISOString()};
      if(settingsRecordId){
        await callApi('records.replace',{collection:'idrok_settings', id: settingsRecordId, value});
      } else {
        const created = await callApi('records.create',{collection:'idrok_settings', value, idempotency_key:`idrok-settings-${Date.now()}-${Math.floor(Math.random()*1000000)}`});
        if(created?.id) setSettingsRecordId(created.id);
      }
      setSettingsSaveMsg('Saqlandi ✓');
      showToast('Sozlamalar saqlandi ✓');
      return true;
    }catch{
      setSettingsSaveMsg('Sozlamalar saqlanmadi — internetni tekshiring. Tanlov ekranda qo‘llandi.');
      return false;
    } finally { setSettingsSaving(false); }
  }
  async function saveSettingsFromDraft(){ await persistSettings(settingsDraft); }
  async function saveEditProfile(){
    const name = editName.trim();
    const login = editLogin.trim();
    if(!name){ setEditError('Ismni yozing.'); return; }
    if(!login){ setEditError('Username ni yozing.'); return; }
    setProfileBio(editBio.trim() || 'Frontend yo‘nalishida o‘rganaman — har kuni amaliyot bilan.');
    setAvatarId(editAvatarId);
    if(editAvatarId==='nx'){ /* NX harflari tanlandi — rang avvalgi tanlovda qoladi */ }
    setEditError('');
    setEditSaving(true);
    const nextProfile = {login, role: profile?.role as 'Student'|'Teacher'|undefined};
    try{
      if(regRecordId && profile){
        const existing = accounts.find(a=>a.id===regRecordId);
        await callApi('records.replace',{collection:'idrok_registration', id: regRecordId, value:{login, role: profile.role, passwordHash: existing?.passwordHash || hashPassword('123456'), registered_at: new Date().toISOString()}});
        setAccounts(prev=>prev.map(a=>a.id===regRecordId ? {...a, login} : a));
      }
    }catch{ /* profil ekranda yangilanadi — saqlashda xato bo‘lsa ham joriy sessiya davom etadi */ }
    setProfile(nextProfile);
    setProfileNameOverride(name);
    setEditSaving(false);
    setShowEditProfile(false);
    setProfileModal(null);
    showToast('Profil yangilandi ✓');
  }

  async function handleRegister(){
    const errors: Record<string,string> = {};
    if(!regLogin.trim()) errors.login = 'Loginni yozing.';
    if(!regPassword) errors.password = 'Parolni yozing.';
    else if(regPassword.length < 6) errors.password = 'Parol kamida 6 belgidan iborat bo‘lishi kerak.';
    setRegErrors(errors);
    if(Object.keys(errors).length > 0) return;
    if(!selectedRole){ setRoleError('Avval Student yoki Teacher ni tanlang'); return; }
    setRoleError('');
    const loginNorm = regLogin.trim().toLowerCase();
    if(accounts.some(a=>a.login.trim().toLowerCase()===loginNorm)){
      setRegErrors({login:'Bu login bilan allaqachon ro‘yxatdan o‘tilgan. Kirish tabiga o‘ting.'});
      return;
    }
    const nextProfile = {login:regLogin.trim(), role: selectedRole as 'Student'|'Teacher'};
    const passwordHash = hashPassword(regPassword);
    setRegSaving(true);
    setRegSaveWarning('');
    try{
      const created = await callApi('records.create',{collection:'idrok_registration', value:{...nextProfile, passwordHash, registered_at:new Date().toISOString()}, idempotency_key:`idrok-registration-${Date.now()}-${Math.floor(Math.random()*1000000)}`});
      if(created?.id){ setRegRecordId(created.id); setAccounts(prev=>[...prev, {...nextProfile, id:created.id, passwordHash}]); }
    }catch(e){
      setRegSaveWarning('Ro‘yxatdan o‘tish hozir saqlanmadi — internetni tekshiring. Sahifa yangilansa qayta ro‘yxatdan o‘tish kerak bo‘lishi mumkin.');
    }
    setRegSaving(false);
    setProfile(nextProfile);
    setLoginLogin('');
    setLoginPassword('');
    setLoginError('');
    setRegPassword('');
    setWelcome(true);
    setTab('home');
    window.scrollTo({top:0});
    setTimeout(()=>setWelcome(false), 1600);
  }

  async function handleLogin(){
    const login = loginLogin.trim();
    const pw = loginPassword;
    setLoginError('');
    setForgotNote('');
    setRoleError('');
    if(!login){ setLoginError('Loginni yozing.'); return; }
    if(!pw){ setLoginError('Parolni yozing.'); return; }
    setLoginSaving(true);
    const loginNorm = login.toLowerCase();
    if(loginNorm==='nurislom' && pw==='123456'){
      setProfile({login:'Nurislom', role: selectedRole ?? undefined});
      setLoginPassword('');
      setLoginSaving(false);
      setWelcome(true);
      setTab('home');
      window.scrollTo({top:0});
      setTimeout(()=>setWelcome(false), 1600);
      return;
    }
    let list = accounts;
    try{
      const regData = await callApi('records.list',{collection:'idrok_registration'});
      const arr = Array.isArray(regData?.records) ? regData.records : [];
      const parsed = arr.filter((r:any)=>r && r.value && typeof r.value.login === 'string').map((r:any)=>({id:r.id, login:r.value.login, passwordHash: typeof r.value.passwordHash === 'string' ? r.value.passwordHash : undefined}));
      if(parsed.length) { setAccounts(parsed); list = parsed; }
    }catch(e){ /* saqlangan hisoblar o‘qilmasa — mavjud ro‘yxat bilan tekshiramiz */ }
    const found = list.find(a=>a.login.trim().toLowerCase()===loginNorm);
    setLoginSaving(false);
    if(!found){ setLoginError('Login yoki parol noto‘g‘ri'); return; }
    if(!found.passwordHash){ setLoginError('Login yoki parol noto‘g‘ri'); return; }
    if(found.passwordHash !== hashPassword(pw)){ setLoginError('Login yoki parol noto‘g‘ri'); return; }
    setProfile({login:found.login, role: selectedRole ?? undefined});
    setRegRecordId(found.id);
    setLoginPassword('');
    setWelcome(true);
    setTab('home');
    window.scrollTo({top:0});
    setTimeout(()=>setWelcome(false), 1600);
  }

  async function handleLogout(){
    setProfile(null);
    setProfileNameOverride('');
    setShowEditProfile(false);
    setProfileModal(null);
    setAvatarColor('#2563EB');
    setSelectedRole(null);
    setRoleError('');
    setWelcome(false);
    setTab('home');
    setSelectedCourse(null); setSelectedLesson(null); setSelectedProject(null);
    setRegPassword(''); setRegLogin(''); setRegErrors({});
    setLoginLogin(''); setLoginPassword(''); setLoginError(''); setForgotNote('');
    setAuthTab('login');
    setAuthNotice('');
    setShowContact(false);
    window.scrollTo({top:0});
  }

  function toggleFav(id:string){
    const next = favorites.includes(id) ? favorites.filter(x=>x!==id) : [...favorites, id];
    setFavorites(next);
    persist({favorites:next, completed, quizBest, projectDone});
    showToast(favorites.includes(id) ? 'Sevimlilardan olib tashlandi' : 'Sevimlilarga qo‘shildi');
  }

  function completeLesson(lessonId:string){
    if(completed.includes(lessonId)) return;
    const next = [...completed, lessonId];
    const before = completed.length; const after = next.length;
    setCompleted(next);
    persist({favorites, completed:next, quizBest, projectDone});
    const course = COURSES.find(c=>c.lessons.some(l=>l.id===lessonId));
    const lesson = course?.lessons.find(l=>l.id===lessonId);
    const act:ActivityItem={lessonId, courseId:course?.id||'', title:lesson?.title||lessonId, at:new Date().toISOString()};
    const nextAct=[...activityLog, act].slice(-50); setActivityLog(nextAct); persistActivity(nextAct);
    pushNotif('Dars tugatildi ✓', `${lesson?.title||'Dars'} tugatildi — +10 ball`);
    if(before<5 && after>=5){ setCelebration({title:'🌱 Birinchi qadam!', sub:'5 ta dars tugatdingiz — ajoyib boshlanish!'}); pushNotif('Yutuq ochildi 🌱','Birinchi qadam — 5 ta dars tugatildi'); }
    else if(before<10 && after>=10){ setCelebration({title:'🔥 Faol o‘quvchi!', sub:'10 ta dars tugatdingiz — sur’atni saqlang!'}); pushNotif('Yutuq ochildi 🔥','Faol o‘quvchi — 10 ta dars tugatildi'); }
    else if(before<25 && after>=25){ setCelebration({title:'🏆 Ustoz yo‘lida!', sub:'25 ta dars tugatdingiz!'}); pushNotif('Yutuq ochildi 🏆','Ustoz yo‘lida — 25 ta dars tugatildi'); }
    else setCelebration({title:'🎉 Tabriklaymiz!', sub:'Dars tugatildi • +10 ball'});
    setTimeout(()=>setCelebration(null), 2600);
    showToast('Ajoyib! Dars tugatildi • +10 ball');
  }

  function toggleProjectTask(key:string){
    const next = projectDone.includes(key) ? projectDone.filter(x=>x!==key) : [...projectDone, key];
    setProjectDone(next);
    persist({favorites, completed, quizBest, projectDone:next});
  }

  function copyCode(code:string){
    const ta = document.createElement('textarea');
    ta.value = code;
    ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try{ document.execCommand('copy'); showToast('Kod nusxalandi ✓'); }catch{ showToast('Nusxalashda xatolik'); }
    document.body.removeChild(ta);
  }

  function runEditor(){
    setPreviewError('');
    setPreview({html:edHtml, css:edCss, js:edJs, run:Date.now()});
    showToast('Kod ishga tushirildi');
  }

  useEffect(()=>{
    if(!preview || !previewRef.current) return;
    const root = previewRef.current;
    root.innerHTML = preview.html;
    const style = document.createElement('style');
    style.textContent = preview.css;
    root.appendChild(style);
    try{
      const scopedDoc = {
        getElementById:(id:string)=>root.querySelector('#'+id),
        querySelector:(s:string)=>root.querySelector(s),
        querySelectorAll:(s:string)=>root.querySelectorAll(s),
        createElement:(t:string)=>document.createElement(t),
        body: root,
      };
      const fn = new Function('document','window','console','alert', `"use strict";\n${preview.js}`);
      fn(scopedDoc, window, console, (m:string)=>{ setPreviewError(String(m)); });
    }catch(e){ setPreviewError(e instanceof Error ? e.message : 'Kodda xato bor — konsolni tekshiring.'); }
  },[preview]);

  const totalLessons = COURSES.reduce((s,c)=>s+c.lessons.length,0);
  const totalProgress = Math.round((completed.length/totalLessons)*100);
  const myPoints = 1890 + completed.length*10 + projectDone.length*5;
  const myLessonsDone = 42 + completed.length;

  const filtered = useMemo(()=> COURSES.filter(c=>{
    const okFilter = filter==='Barchasi' || c.category===filter;
    const q = search.trim().toLowerCase();
    const okSearch = !q || (c.title+' '+c.mentor+' '+c.category+' '+c.tech.join(' ')).toLowerCase().includes(q);
    const okFav = !showFavOnly || favorites.includes(c.id);
    const okPrice = priceFilter==='Barchasi' || (priceFilter==='Bepul' ? c.price==='Bepul' : c.price!=='Bepul');
    return okFilter && okSearch && okFav && okPrice;
  }),[filter,search,showFavOnly,favorites,priceFilter]);

  const currentQuiz = quizSubject ? QUIZZES[quizSubject] : [];
  const currentQ = currentQuiz[quizIndex];

  function pickOption(i:number){
    if(picked!==null) return;
    setPicked(i);
    if(i===currentQ.correct) setScore(s=>s+1);
  }
  function nextQuiz(){
    if(quizIndex+1>=currentQuiz.length){
      setFinished(true);
      const finalScore = score;
      const finalPct = Math.round((finalScore/currentQuiz.length)*100);
      const best = Math.max(quizBest[quizSubject||'']||0, finalPct);
      const nextBest = {...quizBest, [quizSubject||'']: best};
      setQuizBest(nextBest);
      persist({favorites, completed, quizBest:nextBest, projectDone});
    } else { setQuizIndex(quizIndex+1); setPicked(null); }
  }
  function resetQuiz(){ setQuizIndex(0); setPicked(null); setScore(0); setFinished(false); }
  function startQuiz(subj:string){ setQuizSubject(subj); resetQuiz(); setTab('courses'); }

  function openCourse(c:Course){ setSelectedCourse(c); setSelectedLesson(null); setSelectedProject(null); window.scrollTo({top:0}); }
  function openLesson(course:Course, lesson:Lesson){ setSelectedCourse(course); setSelectedLesson(lesson); window.scrollTo({top:0}); }
  function lessonNav(dir:number){
    if(!selectedCourse || !selectedLesson) return;
    const idx = selectedCourse.lessons.findIndex(l=>l.id===selectedLesson.id);
    const next = selectedCourse.lessons[idx+dir];
    if(next) setSelectedLesson(next);
  }
  function goTab(t:typeof tab){ setProfileMenuOpen(false); setProfileMenuView('menu'); setSelectedCourse(null); setSelectedLesson(null); setSelectedProject(null); setTab(t); const target = t === 'community' ? 'hamjamiyat' : t; setTimeout(()=>{ document.getElementById(target)?.scrollIntoView({behavior:'smooth', block:'start'}); }, 60); }
  function goToCommunity(){
    setProfileMenuOpen(false);
    setProfileMenuView('menu');
    setSelectedCourse(null);
    setSelectedLesson(null);
    setSelectedProject(null);
    setTab('community');
    setTimeout(()=>{ document.getElementById('hamjamiyat')?.scrollIntoView({behavior:'smooth', block:'start'}); }, 60);
  }
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatChannel, setChatChannel] = useState<ChatChannelId>('qa');
  const [chatDraft, setChatDraft] = useState('');
  const [chatSending, setChatSending] = useState(false);
  const [chatError, setChatError] = useState('');
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const activeChannel = CHAT_CHANNELS.find(c=>c.id===chatChannel) || CHAT_CHANNELS[0];
  const visibleChatMessages = useMemo(()=>{
    const saved = chatMessages.filter(m=>m.channel===chatChannel);
    const seeds = CHAT_SEEDS.filter(m=>m.channel===chatChannel);
    return [...seeds, ...saved].sort((a,b)=>a.created_at.localeCompare(b.created_at));
  },[chatMessages, chatChannel]);
  const chatCountFor = (id:ChatChannelId)=> CHAT_SEEDS.filter(m=>m.channel===id).length + chatMessages.filter(m=>m.channel===id).length;
  useEffect(()=>{ const el = chatScrollRef.current; if(el) el.scrollTop = el.scrollHeight; },[visibleChatMessages.length, chatChannel]);
  async function reloadChatMessages(){
    try{
      const chatData = await callApi('records.list',{collection:'idrok_chat_messages'});
      const list = Array.isArray(chatData?.records) ? chatData.records : [];
      const parsed: ChatMessage[] = list.filter((r:any)=>r && r.value && typeof r.value.text === 'string' && typeof r.value.author === 'string' && (r.value.channel==='qa' || r.value.channel==='projects' || r.value.channel==='contest')).map((r:any)=>({id:r.id, channel:r.value.channel as ChatChannelId, author:r.value.author, text:r.value.text, created_at: typeof r.value.created_at === 'string' ? r.value.created_at : new Date().toISOString()}));
      parsed.sort((a,b)=>a.created_at.localeCompare(b.created_at));
      setChatMessages(parsed);
    }catch{ setChatError('Xabarlar yangilanmadi — internetni tekshiring.'); }
  }
  async function sendChatMessage(e?: React.FormEvent){
    if(e) e.preventDefault();
    const text = chatDraft.trim();
    if(!text || chatSending) return;
    const author = displayName || 'IDROK o‘quvchisi';
    const created_at = new Date().toISOString();
    setChatSending(true); setChatError('');
    try{
      const created = await callApi('records.create',{collection:'idrok_chat_messages', value:{channel:chatChannel, author, text, created_at}, idempotency_key:`idrok-chat-${Date.now()}-${Math.floor(Math.random()*1000000)}`});
      const msg: ChatMessage = {id: created?.id || `local-${Date.now()}`, channel:chatChannel, author, text, created_at};
      setChatMessages(prev=>[...prev, msg]);
      setChatDraft('');
    }catch{
      setChatError('Xabar saqlanmadi — internetni tekshiring, keyin qayta yuboring.');
    }
    setChatSending(false);
  }

  const navItems: {id:typeof tab; label:string}[] = [
    {id:'home',label:'Bosh sahifa'},{id:'directions',label:'Yo‘nalishlar'},{id:'courses',label:'Kurslar'},{id:'premium',label:'Premium'},{id:'community',label:'Hamjamiyat'},
  ];

  return (
    <div data-safe-area-inset-root style={{boxSizing:'border-box', paddingTop:'var(--safe-area-inset-top)'}} className="min-h-[100dvh] text-[#E2E8F0] overflow-x-clip relative bg-transparent">
      {/* BUTUN SAYT ORQA FONI — animatsiyali kosmos + qora parda */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
        <img src={spaceHeroUrl} alt="" className="cosmos-img w-full h-full object-cover object-center" />
        <div className="cosmos-stars absolute inset-0" style={{backgroundImage:'radial-gradient(rgba(37,99,235,.28) 1px,transparent 1px),radial-gradient(rgba(124,58,237,.20) 1px,transparent 1px)',backgroundSize:'130px 130px,210px 210px',backgroundPosition:'0 0,45px 70px'}} />
        <div className="cosmos-stars-2 absolute inset-0" style={{backgroundImage:'radial-gradient(rgba(37,99,235,.20) 1px,transparent 1px)',backgroundSize:'170px 170px',backgroundPosition:'80px 30px'}} />
        <div className="cosmos-glow absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[86vw] h-[86vw] max-w-[900px] max-h-[900px] rounded-full" style={{background:'radial-gradient(circle, rgba(147,197,253,0.58) 0%, rgba(192,132,252,0.30) 34%, rgba(191,219,254,0.22) 48%, transparent 70%)'}} />
        <div aria-hidden="true" className="design-orb absolute left-[-120px] top-[8%] w-[380px] h-[380px] rounded-full" style={{background:'radial-gradient(circle, rgba(59,130,246,0.34) 0%, rgba(124,58,237,0.16) 42%, transparent 70%)', filter:'blur(6px)'}} />
        <div aria-hidden="true" className="design-orb design-orb-2 absolute right-[-100px] top-[38%] w-[340px] h-[340px] rounded-full" style={{background:'radial-gradient(circle, rgba(192,132,252,0.30) 0%, rgba(56,189,248,0.14) 45%, transparent 70%)', filter:'blur(6px)'}} />
        <div aria-hidden="true" className="design-orb design-orb-3 absolute left-[8%] bottom-[6%] w-[300px] h-[300px] rounded-full" style={{background:'radial-gradient(circle, rgba(16,185,129,0.22) 0%, rgba(56,189,248,0.12) 48%, transparent 70%)', filter:'blur(6px)'}} />
        <div className="cosmos-fog absolute inset-0" style={{background:'linear-gradient(115deg, transparent 30%, rgba(147,197,253,0.22) 48%, rgba(196,181,253,0.18) 58%, transparent 78%)'}} />
        {PARTICLES.map((p,i)=>(<span key={i} className="cosmos-particle absolute rounded-full bg-sky-300" style={{left:`${p.left}%`,top:`${p.top}%`,width:p.size,height:p.size,opacity:(p.opacity*0.35),animationDelay:`${p.delay}s`,animationDuration:`${p.duration}s`}} />))}
        <div className="absolute inset-0" style={{background: profileSettings.dark ? 'rgba(2,6,23,0.55)' : 'rgba(148,163,184,0.28)'}} />
        {!profileSettings.dark && <div className="absolute inset-0" style={{background:'linear-gradient(180deg, rgba(224,242,254,0.55), rgba(255,255,255,0.35))'}} />}
      </div>

      {authLoading ? (
        <div className="min-h-[100dvh] grid place-items-center px-4">
          <div className="text-center"><div className="w-14 h-14 mx-auto rounded-[18px] bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white grid place-items-center shadow-[0_0_30px_rgba(59,130,246,0.6)]"><GraduationCap size={30}/></div><p className="font-extrabold text-[22px] mt-4 text-white">IDROK<span className="text-[#60A5FA]">.</span></p><p className="text-[15px] font-bold text-[#E2E8F0] mt-2">Yuklanmoqda…</p></div>
        </div>
      ) : welcome && profile ? (
        <div className="min-h-[100dvh] grid place-items-center px-4">
        <div className={`${GLASS} p-8 sm:p-10 text-center max-w-[480px] w-full`}>
          <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400/40 grid place-items-center animate-bounce"><BadgeCheck size={44} className="text-emerald-300"/></div>
          <h1 className="text-[28px] font-extrabold mt-5 text-white [overflow-wrap:anywhere]">Xush kelibsiz, {displayName}!</h1>
          <p className="text-[16px] font-medium text-[#E2E8F0] mt-2">Hisobingiz tasdiqlandi.</p>
          <p className="text-[15px] font-bold text-[#93C5FD] mt-3">Platformaga kiryapsiz…</p>
        </div>
        </div>
      ) : !profile ? (
        <main className="min-h-[100dvh] px-3 sm:px-6 py-4 sm:py-8">
          <div className="max-w-[1320px] mx-auto">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <img src={idrokLogoUrl} alt="IDROK" className="idrok-logo-login mx-auto" />
                <span className="block text-[9px] sm:text-[10px] font-bold tracking-[0.22em] text-sky-300 mt-2">DASTURLASH AKADEMIYASI</span>
              </div>
            </div>
            {showContact && <div className={`${GLASS} mt-4 px-4 py-4`}><div className="flex items-center justify-between gap-3"><h2 className="font-extrabold text-[18px] text-white">Aloqa</h2><button onClick={()=>setShowContact(false)} className="text-[#93C5FD] font-bold text-[14px]">Yopish</button></div><form onSubmit={handleContactSubmit} className="mt-3 space-y-3"><div><label htmlFor="contact-name-login" className="block text-left text-[14px] font-bold text-white mb-1.5">Ismingiz</label><input id="contact-name-login" value={contactName} onChange={e=>setContactName(e.target.value)} placeholder="Ismingiz" autoComplete="name" className={INPUT}/></div><div><label htmlFor="contact-msg-login" className="block text-left text-[14px] font-bold text-white mb-1.5">Xabar</label><textarea id="contact-msg-login" value={contactMessage} onChange={e=>setContactMessage(e.target.value)} placeholder="Xabaringizni yozing…" rows={3} className={`${INPUT} resize-none`} /></div>{contactMsg && <p className="text-[14px] font-bold text-white">{contactMsg}</p>}<button type="submit" disabled={contactSaving} className={`${BTN} px-5 py-3 text-[15px] disabled:opacity-60`}>{contactSaving?'Yuborilmoqda…':'Xabarni yuborish'}</button></form></div>}
            {authNotice && <div className={`${GLASS} mt-4 px-4 py-3 text-[14px] font-bold flex gap-3 items-start text-white`}><span className="shrink-0 mt-0.5">✦</span><span className="[overflow-wrap:anywhere]">{authNotice}</span><button onClick={()=>setAuthNotice('')} className="ml-auto text-[#93C5FD] shrink-0">Yopish</button></div>}
            <div className="login-headline-wrap text-center mt-8 sm:mt-10">
              <h1 className="login-headline"><span className="login-headline-line">DASTURLASHNI</span><br /><span className="login-headline-line login-headline-accent">NOLDAN O'RGAN</span></h1>
              <p className="login-subtitle">AMALIYOT BILAN, BOSQICHMA-BOSQICH</p>
            </div>
            <div className="grid lg:hidden grid-cols-3 items-center justify-items-center gap-x-4 gap-y-2 mt-6 px-2" aria-hidden="true">
              {LOGIN_LOGOS.map((logo,i)=>(<span key={logo.alt} className="login-logo login-float" style={{animationDelay:`${i*0.35}s`, animationDuration:`${5.4+(i%3)*0.9}s`}}><img src={logo.src} alt={logo.alt} className="login-logo-img" /></span>))}
            </div>
            <div className="auth-deck relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-center mt-6 sm:mt-8 max-w-[1320px] mx-auto lg:-space-x-10 lg:px-[98px]">
            <div aria-hidden="true" className="login-logo-layer pointer-events-none absolute inset-0 z-0 hidden lg:block">
              <span className="login-logo-pos login-logo-pos-tl"><span className="login-logo login-float" style={{animationDelay:'0s', animationDuration:'8.4s'}}><img src={jsLogoUrl} alt="JavaScript logosi" className="login-logo-img" /></span></span>
              <span className="login-logo-pos login-logo-pos-tr"><span className="login-logo login-float" style={{animationDelay:'0.6s', animationDuration:'9.2s'}}><img src={pythonLogoUrl} alt="Python logosi" className="login-logo-img" /></span></span>
              <span className="login-logo-pos login-logo-pos-ml"><span className="login-logo login-float" style={{animationDelay:'1.2s', animationDuration:'8.8s'}}><img src={htmlLogoUrl} alt="HTML5 logosi" className="login-logo-img" /></span></span>
              <span className="login-logo-pos login-logo-pos-mr"><span className="login-logo login-float" style={{animationDelay:'0.4s', animationDuration:'9.6s'}}><img src={cssLogoUrl} alt="CSS3 logosi" className="login-logo-img" /></span></span>
              <span className="login-logo-pos login-logo-pos-bl"><span className="login-logo login-float" style={{animationDelay:'0.9s', animationDuration:'8.6s'}}><img src={nodeLogoUrl} alt="Node.js logosi" className="login-logo-img" /></span></span>
              <span className="login-logo-pos login-logo-pos-br"><span className="login-logo login-float" style={{animationDelay:'1.6s', animationDuration:'9s'}}><img src={gitLogoUrl} alt="Git logosi" className="login-logo-img" /></span></span>
            </div>
            <article aria-hidden={sidesHidden} onClick={()=>{if(sidesHidden) return; setSelectedRole('Student'); setActiveAuthCard('student'); setRoleError('');}} className={`auth-card auth-side auth-side-student auth-stagger-1 auth-tilt-left min-h-[360px] lg:min-h-[400px] rounded-[32px] p-7 sm:p-8 flex flex-col backdrop-blur-xl lg:w-[336px] lg:shrink-0 overflow-hidden ${sidesHidden?'auth-side-hidden auth-side-hidden-left':''} ${activeAuthCard==='student' ? 'auth-card-popped border-2 border-[#60A5FA] bg-[rgba(37,99,235,0.20)]' : selectedRole==='Student' ? 'border-2 border-[#60A5FA] bg-[rgba(37,99,235,0.20)] shadow-[0_0_36px_rgba(59,130,246,0.55)]' : 'border border-[rgba(96,165,250,0.28)] bg-[rgba(10,15,40,0.88)] shadow-[0_24px_55px_rgba(0,0,0,0.55)]'}`}>
              <span className="inline-flex items-center gap-2"><span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] grid place-items-center text-[30px] shadow-[0_12px_28px_rgba(37,99,235,0.55)]" aria-hidden="true">🎓</span><span className="bg-white/10 border border-white/20 text-white text-[11px] font-extrabold tracking-[0.14em] px-2.5 py-1 rounded-full">O‘QUVCHI</span></span>
              <h2 className="text-[30px] font-extrabold text-white mt-5">Student</h2>
              <p className="text-[16px] font-medium text-[#E2E8F0] leading-relaxed mt-2">O‘rgan, mashq qil, loyiha yarat.</p>
              <p className="text-[13px] font-bold text-[#93C5FD] mt-3">120+ dars • 25 ta real loyiha • Sertifikat</p>
              <button onClick={(e)=>{e.stopPropagation(); if(sidesHidden) return; setSelectedRole('Student'); setRoleError('');}} className={`mt-auto ${BTN} w-full py-3.5 text-[15px] mt-6`}>{selectedRole==='Student' ? '✓ Student tanlandi' : 'Student sifatida tanlash'}</button>
            </article>
            <section onClick={()=>setActiveAuthCard('login')} className={`auth-card auth-center auth-stagger-2 ${GLASS} min-h-[500px] p-6 sm:p-7 rounded-[32px] lg:w-[464px] lg:shrink-0 lg:scale-[1.04] overflow-hidden ${activeAuthCard==='login' ? 'auth-card-popped' : 'shadow-[0_28px_60px_rgba(0,0,0,0.55),0_0_40px_rgba(59,130,246,0.28)]'}`}>
              {authTab==='register' && <div className="bg-white/[0.08] border border-white/15 rounded-2xl px-4 py-3 text-center text-[15px] font-extrabold text-white mb-4">{selectedRole ? `Tanlangan rol: ${selectedRole}` : 'Rolni tanlang'}</div>}
              {roleError && authTab==='register' && <p className="bg-rose-500/20 border border-rose-400/40 text-rose-100 text-[14px] font-bold rounded-2xl px-4 py-3 text-left mb-4">{roleError}</p>}
              <div className="grid grid-cols-2 gap-2 bg-black/40 rounded-full p-1.5 border border-white/20">
                <button onClick={()=>{setAuthTab('login'); setLoginError(''); setForgotNote(''); setRoleError('');}} className={`py-2.5 rounded-full text-[15px] font-extrabold transition ${authTab==='login'?'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]':'text-white hover:bg-white/10'}`}>Kirish</button>
                <button onClick={()=>{setAuthTab('register'); setRegErrors({});}} className={`py-2.5 rounded-full text-[15px] font-extrabold transition ${authTab==='register'?'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]':'text-white hover:bg-white/10'}`}>Ro‘yxatdan o‘tish</button>
              </div>
              {authTab==='login' ? (
                <form onSubmit={e=>{e.preventDefault(); handleLogin();}} noValidate className="mt-5 space-y-4">
                  <div><label htmlFor="login-login" className="block text-left text-[14px] font-bold text-white mb-1.5">Login</label><input id="login-login" value={loginLogin} onChange={e=>setLoginLogin(e.target.value)} placeholder="Masalan: Nurislom" autoComplete="username" className={INPUT}/></div>
                  <div><label htmlFor="login-pass" className="block text-left text-[14px] font-bold text-white mb-1.5">Parol</label><div className="password-field relative"><input id="login-pass" type={showLoginPassword?'text':'password'} value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} placeholder="Parolingiz" autoComplete="current-password" className={`${INPUT} pr-14`}/><button type="button" onClick={()=>setShowLoginPassword(!showLoginPassword)} aria-label={showLoginPassword?'Parolni yashirish':'Parolni ko‘rsatish'} aria-pressed={showLoginPassword} className="password-eye absolute right-2 top-1/2 w-10 h-10 grid place-items-center rounded-full text-white hover:bg-white/10" style={{transform:'translateY(-50%)'}}>{showLoginPassword?<EyeOff size={20}/>:<Eye size={20}/>}</button></div></div>
                  {loginError && <p className="bg-rose-500/20 border border-rose-400/40 text-rose-100 text-[14px] font-bold rounded-2xl px-4 py-3 text-left">{loginError}</p>}
                  <button type="submit" disabled={loginSaving} className={`${BTN} w-full pl-5 pr-1.5 py-1.5 text-[16px] flex items-center justify-between gap-3 disabled:opacity-60`}><span className="py-2.5">{loginSaving?'Kirilmoqda…':'Kirish'}</span><span className="w-11 h-11 shrink-0 rounded-full bg-white/20 grid place-items-center"><ArrowRight size={20}/></span></button>
                </form>
              ) : (
                <form onSubmit={e=>{e.preventDefault(); handleRegister();}} noValidate className="mt-5 space-y-4">
                  {regSaveWarning && <p className="bg-amber-500/20 border border-amber-400/40 text-amber-100 text-[14px] font-bold rounded-2xl px-4 py-3 text-left">{regSaveWarning}</p>}
                  <div><label htmlFor="reg-login" className="block text-left text-[14px] font-bold text-white mb-1.5">Login</label><input id="reg-login" value={regLogin} onChange={e=>setRegLogin(e.target.value)} placeholder="Masalan: Nurislom" autoComplete="username" className={INPUT}/>{regErrors.login && <p className="mt-1.5 bg-rose-500/20 border border-rose-400/40 text-rose-100 text-[14px] font-bold rounded-xl px-3 py-2 text-left">{regErrors.login}</p>}</div>
                  <div><label htmlFor="reg-pass" className="block text-left text-[14px] font-bold text-white mb-1.5">Parol</label><div className="password-field relative"><input id="reg-pass" type={showRegPassword?'text':'password'} value={regPassword} onChange={e=>setRegPassword(e.target.value)} placeholder="Kamida 6 belgi" autoComplete="new-password" className={`${INPUT} pr-14`}/><button type="button" onClick={()=>setShowRegPassword(!showRegPassword)} aria-label={showRegPassword?'Parolni yashirish':'Parolni ko‘rsatish'} aria-pressed={showRegPassword} className="password-eye absolute right-2 top-1/2 w-10 h-10 grid place-items-center rounded-full text-white hover:bg-white/10" style={{transform:'translateY(-50%)'}}>{showRegPassword?<EyeOff size={20}/>:<Eye size={20}/>}</button></div>{regErrors.password && <p className="mt-1.5 bg-rose-500/20 border border-rose-400/40 text-rose-100 text-[14px] font-bold rounded-xl px-3 py-2 text-left">{regErrors.password}</p>}</div>
                  <button type="submit" disabled={regSaving} className={`${BTN} w-full pl-5 pr-1.5 py-1.5 text-[16px] flex items-center justify-between gap-3 disabled:opacity-60`}><span className="py-2.5 text-left">{regSaving?'Ro‘yxatdan o‘tilmoqda…':'Ro‘yxatdan o‘tish'}</span><span className="w-11 h-11 shrink-0 rounded-full bg-white/20 grid place-items-center"><ArrowRight size={20}/></span></button>
                </form>
              )}
              {authTab==='register' && <p className="text-center text-[13px] font-medium text-[#CBD5E1] mt-4">Student yoki Teacher kartasini tanlab, keyin ro‘yxatdan o‘ting</p>}
            </section>
            <article aria-hidden={sidesHidden} onClick={()=>{if(sidesHidden) return; setSelectedRole('Teacher'); setActiveAuthCard('teacher'); setRoleError('');}} className={`auth-card auth-side auth-side-teacher auth-stagger-3 auth-tilt-right min-h-[360px] lg:min-h-[400px] rounded-[32px] p-7 sm:p-8 flex flex-col backdrop-blur-xl lg:w-[336px] lg:shrink-0 overflow-hidden ${sidesHidden?'auth-side-hidden auth-side-hidden-right':''} ${activeAuthCard==='teacher' ? 'auth-card-popped border-2 border-[#C084FC] bg-[rgba(124,58,237,0.20)]' : selectedRole==='Teacher' ? 'border-2 border-[#C084FC] bg-[rgba(124,58,237,0.20)] shadow-[0_0_36px_rgba(168,85,247,0.55)]' : 'border border-[rgba(96,165,250,0.28)] bg-[rgba(10,15,40,0.88)] shadow-[0_24px_55px_rgba(0,0,0,0.55)]'}`}>
              <span className="inline-flex items-center gap-2"><span className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#10B981] to-[#F59E0B] grid place-items-center text-[30px] shadow-[0_12px_28px_rgba(16,185,129,0.55)] border border-[#FDE68A]/50" aria-hidden="true">👨‍🏫</span><span className="bg-white/10 border border-white/20 text-white text-[11px] font-extrabold tracking-[0.14em] px-2.5 py-1 rounded-full">USTOZ</span></span>
              <h2 className="text-[30px] font-extrabold text-white mt-5">Teacher</h2>
              <p className="text-[16px] font-medium text-[#E2E8F0] leading-relaxed mt-2">Kurs yarat, o‘quvchini kuzat.</p>
              <p className="text-[13px] font-bold text-[#FDE68A] mt-3">Kurs yaratish • Kuzatuv • Hamjamiyat</p>
              <button onClick={(e)=>{e.stopPropagation(); if(sidesHidden) return; setSelectedRole('Teacher'); setRoleError('');}} className={`mt-auto bg-gradient-to-r from-[#10B981] to-[#F59E0B] text-slate-900 font-bold rounded-full hover:shadow-[0_0_28px_rgba(245,158,11,0.65)] hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 w-full py-3.5 text-[15px] mt-6`}>{selectedRole==='Teacher' ? '✓ Teacher tanlandi' : 'Teacher sifatida tanlash'}</button>
            </article>
            </div>
            <p className="text-center text-[12px] font-medium text-[#CBD5E1] mt-4">Faqat Login va Parol kifoya.</p>
          </div>
        </main>
      ) : (
        <>
      <header data-safe-area-sticky-top style={{top:'var(--safe-area-inset-top)', backgroundColor:'transparent', borderBottom:'none', backdropFilter:'none', WebkitBackdropFilter:'none'}} className="sticky z-40 relative">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-2.5">
          <button onClick={()=>goTab('home')} className="shrink-0 leading-none" aria-label="IDROK — boshlanish"><img src={idrokLogoUrl} alt="IDROK" className="idrok-logo" /></button>
          <nav aria-label="Bo‘limlar" className="order-3 w-full min-w-0 flex items-center justify-center gap-1 sm:gap-2 flex-wrap sm:order-none sm:flex-1 sm:w-auto sm:mt-0">
            {navItems.map(item=>(
              <button key={item.id} onClick={()=>goTab(item.id)} aria-current={tab===item.id ? 'page' : undefined} className={`site-nav-link ${tab===item.id ? 'site-nav-link-active' : ''}`}>{item.label}</button>
            ))}
          </nav>
          <div className="shrink-0 flex items-center gap-2">
            <button onClick={()=>setHeaderSearchOpen(true)} aria-label="Kurslarni qidirish" className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white grid place-items-center hover:bg-white/20 transition"><Search size={18}/></button>
            <button onClick={()=>openProfileModal('notifications')} aria-label="Bildirishnomalar" className="relative w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white grid place-items-center hover:bg-white/20 transition"><Bell size={18}/>{unreadCount>0 && <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-extrabold grid place-items-center">{unreadCount}</span>}</button>
            <div ref={profileMenuRef} className="relative shrink-0">
              <span className="relative inline-block">{premiumActive && <span className="absolute -top-[13px] left-1/2 -translate-x-1/2 z-20 pointer-events-none"><PremiumCrown size={26} celebrate={crownCelebrate} /></span>}<button onClick={()=>{ setProfileMenuOpen(v=>!v); setProfileMenuView('menu'); }} aria-expanded={profileMenuOpen} aria-haspopup="menu" aria-label="Profil menyusi" className="relative w-11 h-11 rounded-full text-white text-[15px] font-extrabold grid place-items-center border-2 border-white/90 shadow-[0_0_18px_rgba(59,130,246,0.55)] hover:scale-105 active:scale-95 transition" style={{backgroundColor: avatarBg, boxShadow: premiumActive ? '0 0 0 2px rgba(250,204,21,.85), 0 0 22px rgba(245,158,11,.65)' : undefined}}>{avatarEmoji ? <span className="text-[20px]" style={{lineHeight:1}}>{avatarEmoji}</span> : profileInitials}<span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-white" aria-hidden="true" />{profileSettings.notifications && <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-white" aria-hidden="true" />}</button></span>
              {profileMenuOpen && (
                <div role="menu" className="absolute right-0 top-[calc(100%+10px)] z-50 w-[320px] max-w-[88vw] rounded-[20px] border border-[rgba(96,165,250,0.35)] bg-[rgba(8,12,35,0.97)] p-4 shadow-[0_24px_55px_rgba(0,0,0,0.55)] backdrop-blur-xl">
                  {profileMenuView==='menu' && (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="w-12 h-12 shrink-0 rounded-full text-white font-extrabold grid place-items-center" style={{backgroundColor: avatarBg}}>{avatarEmoji ? <span className="text-[22px]" style={{lineHeight:1}}>{avatarEmoji}</span> : profileInitials}</span>
                        <div className="min-w-0"><p className="font-extrabold text-[16px] text-white leading-tight [overflow-wrap:anywhere]">{displayName}</p><p className="text-[13px] font-bold text-[#93C5FD]">{trackLabel === 'Frontend' && !profile?.role ? 'Student' : (profile?.role || 'Student')}</p></div>
                        <span className="ml-auto shrink-0 bg-amber-300 text-slate-900 text-[12px] font-extrabold px-2.5 py-1 rounded-full">Level 5</span>
                      </div>
                      <div className="grid gap-2 mt-4">
                        <button onClick={()=>openProfileModal('profile')} className="w-full text-left px-3 py-2.5 rounded-2xl bg-white/[0.07] border border-white/15 text-white font-bold text-[15px] hover:bg-white/10 transition flex items-center gap-3"><span className="w-9 h-9 shrink-0 rounded-xl bg-[#2563EB]/30 border border-[#60A5FA]/40 grid place-items-center"><User size={17} className="text-sky-300"/></span><span className="flex-1 text-left [overflow-wrap:anywhere]">{menuT.profile}</span><ChevronRight size={16} className="text-slate-400 shrink-0"/></button>
                        <button onClick={()=>openProfileModal('edit')} className="w-full text-left px-3 py-2.5 rounded-2xl bg-white/[0.07] border border-white/15 text-white font-bold text-[15px] hover:bg-white/10 transition flex items-center gap-3"><span className="w-9 h-9 shrink-0 rounded-xl bg-violet-500/20 border border-violet-400/40 grid place-items-center"><Pencil size={17} className="text-violet-300"/></span><span className="flex-1 text-left [overflow-wrap:anywhere]">{menuT.edit}</span><ChevronRight size={16} className="text-slate-400 shrink-0"/></button>
                        <button onClick={()=>openProfileModal('courses')} className="w-full text-left px-3 py-2.5 rounded-2xl bg-white/[0.07] border border-white/15 text-white font-bold text-[15px] hover:bg-white/10 transition flex items-center gap-3"><span className="w-9 h-9 shrink-0 rounded-xl bg-emerald-500/20 border border-emerald-400/40 grid place-items-center"><BookOpen size={17} className="text-emerald-300"/></span><span className="flex-1 text-left [overflow-wrap:anywhere]">{menuT.courses}</span><span className="shrink-0 bg-white/10 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full">{COURSES.filter(c=>c.lessons.some(l=>completed.includes(l.id)) || c.id==='html-css').length} ta</span></button>
                        <button onClick={()=>openProfileModal('favorites')} className="w-full text-left px-3 py-2.5 rounded-2xl bg-white/[0.07] border border-white/15 text-white font-bold text-[15px] hover:bg-white/10 transition flex items-center gap-3"><span className="w-9 h-9 shrink-0 rounded-xl bg-rose-500/20 border border-rose-400/40 grid place-items-center"><Heart size={17} className="text-rose-300"/></span><span className="flex-1 text-left [overflow-wrap:anywhere]">Sevimlilarim</span><span className="shrink-0 bg-rose-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full">{favorites.length} ta</span></button>
                        <button onClick={()=>openProfileModal('certificates')} className="w-full text-left px-3 py-2.5 rounded-2xl bg-white/[0.07] border border-white/15 text-white font-bold text-[15px] hover:bg-white/10 transition flex items-center gap-3"><span className="w-9 h-9 shrink-0 rounded-xl bg-amber-500/20 border border-amber-400/40 grid place-items-center"><Award size={17} className="text-amber-300"/></span><span className="flex-1 text-left [overflow-wrap:anywhere]">{menuT.certs}</span><span className="shrink-0 bg-amber-300 text-slate-900 text-[11px] font-extrabold px-2 py-0.5 rounded-full">{myCerts.length} ta</span></button>
                        <button onClick={()=>openProfileModal('notifications')} className="w-full text-left px-3 py-2.5 rounded-2xl bg-white/[0.07] border border-white/15 text-white font-bold text-[15px] hover:bg-white/10 transition flex items-center gap-3"><span className="relative w-9 h-9 shrink-0 rounded-xl bg-rose-500/20 border border-rose-400/40 grid place-items-center"><Bell size={17} className="text-rose-300"/>{unreadCount>0 && <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-extrabold grid place-items-center">{unreadCount}</span>}</span><span className="flex-1 text-left [overflow-wrap:anywhere]">Bildirishnomalar</span>{unreadCount>0 && <span className="shrink-0 bg-rose-500 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full">{unreadCount} ta yangi</span>}<ChevronRight size={16} className="text-slate-400 shrink-0"/></button>
                        <button onClick={()=>openProfileModal('settings')} className="w-full text-left px-3 py-2.5 rounded-2xl bg-white/[0.07] border border-white/15 text-white font-bold text-[15px] hover:bg-white/10 transition flex items-center gap-3"><span className="w-9 h-9 shrink-0 rounded-xl bg-slate-500/20 border border-white/20 grid place-items-center"><Settings size={17} className="text-slate-200"/></span><span className="flex-1 text-left [overflow-wrap:anywhere]">{menuT.settings}</span><ChevronRight size={16} className="text-slate-400 shrink-0"/></button>
                        <button onClick={()=>{ setProfileMenuOpen(false); setProfileMenuView('menu'); setShowLogoutConfirm(true); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-rose-500/20 border border-rose-400/40 text-rose-100 font-bold text-[15px] hover:bg-rose-500/30 transition"><LogOut size={16}/> {menuT.logout}</button>
                      </div>
                    </>
                  )}
                  {profileMenuView==='profile' && (
                    <div>
                      <button onClick={()=>setProfileMenuView('menu')} className="inline-flex items-center gap-1 text-[#93C5FD] font-bold text-[14px]"><ChevronLeft size={16}/> {menuT.back}</button>
                      <div className="flex items-center gap-3 mt-3"><span className="w-14 h-14 rounded-full text-white text-[18px] font-extrabold grid place-items-center" style={{backgroundColor: avatarColor}}>{profileInitials}</span><div><p className="font-extrabold text-[17px] text-white [overflow-wrap:anywhere]">{displayName}</p><p className="text-[13px] font-bold text-[#93C5FD]">{trackLabel} yo‘nalishi • 7 kunlik seriya 🔥</p><p className="text-[12px] font-medium text-[#CBD5E1] mt-0.5 [overflow-wrap:anywhere]">Login: {profile?.login}</p></div></div>
                      <div className="grid grid-cols-2 gap-2 mt-4 text-center"><div className="bg-white/[0.07] border border-white/15 rounded-2xl p-3"><p className="font-extrabold text-white">{myPoints} ball</p><p className="text-[12px] font-bold text-[#CBD5E1]">Umumiy ball</p></div><div className="bg-white/[0.07] border border-white/15 rounded-2xl p-3"><p className="font-extrabold text-white">{completed.length} / {totalLessons}</p><p className="text-[12px] font-bold text-[#CBD5E1]">Tugatgan dars</p></div></div>
                      <p className="text-[14px] font-medium text-[#E2E8F0] mt-3">Umumiy natija: <b className="text-white">{totalProgress}%</b> • XP 1240 • Level 5</p>
                      <p className="text-[14px] font-medium text-[#E2E8F0] mt-2">Sertifikatlar: HTML &amp; CSS Asoslari, JavaScript Boshlang‘ich</p>
                      <button onClick={()=>{ setProfileMenuOpen(false); setProfileMenuView('menu'); goTab('courses'); }} className={`${BTN} w-full mt-4 py-3 text-[15px]`}>O‘qishni davom ettirish</button>
                    </div>
                  )}
                  {profileMenuView==='courses' && (
                    <div>
                      <button onClick={()=>setProfileMenuView('menu')} className="inline-flex items-center gap-1 text-[#93C5FD] font-bold text-[14px]"><ChevronLeft size={16}/> {menuT.back}</button>
                      <h3 className="font-extrabold text-[17px] text-white mt-3">{menuT.courses}</h3>
                      <p className="text-[13px] font-medium text-[#CBD5E1] mt-1">Boshlagan va sevimli kurslaringiz — davom ettirish uchun kursni bosing.</p>
                      <div className="space-y-2 mt-3 max-h-[320px] overflow-y-auto pr-0.5">{COURSES.filter(c=>c.lessons.some(l=>completed.includes(l.id)) || favorites.includes(c.id) || c.id==='html-css').map(c=>{ const done=c.lessons.filter(l=>completed.includes(l.id)).length; const pct=Math.round(done/c.lessons.length*100); const next=c.lessons.find(l=>!completed.includes(l.id))||c.lessons[0]; return (<button key={c.id} onClick={()=>{ setProfileMenuOpen(false); setProfileMenuView('menu'); openCourse(c); }} className="w-full text-left bg-white/[0.07] border border-white/15 rounded-2xl p-3 hover:bg-white/10 transition"><span className="flex items-center justify-between gap-2"><span className="block font-bold text-[15px] text-white [overflow-wrap:anywhere]">{c.title}</span>{favorites.includes(c.id) && <Heart size={14} className="fill-rose-500 text-rose-500 shrink-0"/>}</span><span className="block text-[12px] font-bold text-[#93C5FD] mt-1">{c.category} • {done} / {c.lessons.length} dars • {pct}%</span><span className="block h-1.5 bg-white/15 rounded-full mt-2"><span className="block h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full" style={{width:`${pct}%`}}/></span><span className="block text-[13px] font-medium text-[#CBD5E1] mt-1.5">Keyingi: {next.title}</span></button>)})}</div>
                      {completed.length===0 && <p className="text-[14px] font-medium text-amber-100 bg-amber-500/15 border border-amber-400/30 rounded-2xl p-3 mt-3">Hali dars tugatilmagan. HTML &amp; CSS kursidan boshlashni tavsiya qilamiz — u bepul.</p>}
                      <button onClick={()=>{ setProfileMenuOpen(false); setProfileMenuView('menu'); goTab('courses'); }} className={`${BTN} w-full mt-3 py-3 text-[15px]`}>Barcha kurslarni ko‘rish</button>
                    </div>
                  )}
                  {profileMenuView==='certificates' && (
                    <div>
                      <button onClick={()=>setProfileMenuView('menu')} className="inline-flex items-center gap-1 text-[#93C5FD] font-bold text-[14px]"><ChevronLeft size={16}/> {menuT.back}</button>
                      <h3 className="font-extrabold text-[17px] text-white mt-3">{menuT.certs}</h3>
                      <p className="text-[13px] font-medium text-[#CBD5E1] mt-1">Egasi: <b className="text-white [overflow-wrap:anywhere]">{displayName}</b> • 2 ta sertifikat olingan</p>
                      <div className="space-y-2 mt-3">{myCerts.map(cert=>(
                        <div key={cert.id} className="bg-white/[0.07] border border-white/15 rounded-2xl p-3 flex items-center gap-3">
                          <span className="w-11 h-11 shrink-0 rounded-2xl grid place-items-center text-[20px] text-white" style={{backgroundColor: cert.color}}>{cert.emoji}</span>
                          <div className="min-w-0 flex-1"><p className="font-bold text-[15px] text-white leading-snug [overflow-wrap:anywhere]">{cert.title}</p><p className="text-[13px] font-medium text-[#CBD5E1] mt-0.5">{cert.status}{cert.progress<100 ? ` • ${cert.progress}%` : ` • ${cert.date}`}</p>{cert.progress<100 && <span className="block h-1.5 bg-white/15 rounded-full mt-2"><span className="block h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full" style={{width:`${cert.progress}%`}}/></span>}</div>
                          {cert.progress===100 ? <span className="shrink-0 inline-flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-[11px] font-extrabold px-2 py-1 rounded-full"><Check size={12}/> Olingan</span> : <span className="shrink-0 bg-amber-300 text-slate-900 text-[11px] font-extrabold px-2 py-1 rounded-full">Davom etmoqda</span>}
                        </div>
                      ))}</div>
                      <button onClick={()=>{ setProfileMenuOpen(false); setProfileMenuView('menu'); goTab('courses'); }} className={`${BTN} w-full mt-3 py-3 text-[15px]`}>Yangi sertifikat uchun o‘qish</button>
                    </div>
                  )}
                  {profileMenuView==='notifications' && (
                    <div>
                      <button onClick={()=>setProfileMenuView('menu')} className="inline-flex items-center gap-1 text-[#93C5FD] font-bold text-[14px]"><ChevronLeft size={16}/> {menuT.back}</button>
                      <div className="flex items-center justify-between mt-3"><h3 className="font-extrabold text-[17px] text-white">Bildirishnomalar</h3>{notifications.length>0 && <button onClick={()=>{ const next=notifications.map(n=>({...n, read:true})); setNotifications(next); persistNotifications(next); }} className="text-[12px] font-bold text-[#93C5FD]">Hammasini o‘qildi deb belgilash</button>}</div>
                      <div className="mt-3 space-y-2 max-h-[320px] overflow-y-auto pr-0.5">
                        {notifications.length===0 && <p className="text-[14px] font-medium text-[#CBD5E1] bg-white/[0.06] border border-white/10 rounded-2xl p-3">Hozircha bildirishnoma yo‘q. Dars tugatsangiz, yutuq yoki Premium olsangiz — shu yerda paydo bo‘ladi.</p>}
                        {notifications.map(n=>(
                          <button key={n.id} onClick={()=>{ const next=notifications.map(x=>x.id===n.id?{...x, read:true}:x); setNotifications(next); persistNotifications(next); }} className={`w-full text-left rounded-2xl p-3 border transition ${n.read?'bg-white/[0.04] border-white/10':'bg-[#2563EB]/20 border-[#60A5FA]/40'}`}>
                            <span className="flex items-center justify-between gap-2"><span className="font-bold text-[14px] text-white [overflow-wrap:anywhere]">{n.title}</span>{!n.read && <span className="w-2 h-2 shrink-0 rounded-full bg-sky-400" />}</span>
                            <span className="block text-[13px] font-medium text-[#CBD5E1] mt-1 [overflow-wrap:anywhere]">{n.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {profileMenuView==='settings' && (
                    <div>
                      <button onClick={()=>{ setSettingsDraft(profileSettings); setProfileMenuView('menu'); }} className="inline-flex items-center gap-1 text-[#93C5FD] font-bold text-[14px]"><ChevronLeft size={16}/> {menuT.back}</button>
                      <h3 className="font-extrabold text-[17px] text-white mt-3">{menuT.settings}</h3>
                      <p className="text-[14px] font-medium text-[#E2E8F0] mt-2 [overflow-wrap:anywhere]">Hisob: <b className="text-white">{displayName}</b> • O‘zgarishlar “Saqlash” bosilganda qo‘llanadi.</p>
                      <div className="mt-4 space-y-3">
                        <div className="bg-white/[0.07] border border-white/15 rounded-2xl p-3">
                          <p className="flex items-center gap-2 font-bold text-[14px] text-white"><Languages size={16} className="text-sky-300"/> Til</p>
                          <div className="grid grid-cols-3 gap-1.5 mt-2.5">
                            {([{id:'uz',label:'O‘zbekcha'},{id:'ru',label:'Русский'},{id:'en',label:'English'}] as const).map(l=>(
                              <button key={l.id} onClick={()=>setSettingsDraft(s=>({...s, lang:l.id}))} aria-pressed={settingsDraft.lang===l.id} className={`px-2 py-2 rounded-xl text-[13px] font-bold transition ${settingsDraft.lang===l.id ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-[0_0_16px_rgba(59,130,246,0.5)]' : 'bg-white/10 border border-white/15 text-white hover:bg-white/15'}`}>{l.label}</button>
                            ))}
                          </div>
                        </div>
                        <div className="bg-white/[0.07] border border-white/15 rounded-2xl p-3 flex items-center gap-3">
                          <span className="w-9 h-9 shrink-0 rounded-xl bg-indigo-500/20 border border-indigo-400/40 grid place-items-center">{settingsDraft.dark ? <Moon size={17} className="text-indigo-300"/> : <Sun size={17} className="text-amber-300"/>}</span>
                          <div className="flex-1 min-w-0"><p className="font-bold text-[14px] text-white">Tungi rejim</p><p className="text-[12px] font-medium text-[#CBD5E1]">{settingsDraft.dark ? 'Yoqilgan — qorong‘u kosmos foni' : 'O‘chirilgan — yorug‘ ko‘rinish'}</p></div>
                          <button onClick={()=>setSettingsDraft(s=>({...s, dark:!s.dark}))} aria-pressed={settingsDraft.dark} aria-label="Tungi rejimni almashtirish" className={`relative w-12 h-7 shrink-0 rounded-full transition ${settingsDraft.dark ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED]' : 'bg-white/20'}`}><span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${settingsDraft.dark ? 'left-6' : 'left-1'}`}/></button>
                        </div>
                        <div className="bg-white/[0.07] border border-white/15 rounded-2xl p-3 flex items-center gap-3">
                          <span className="w-9 h-9 shrink-0 rounded-xl bg-rose-500/20 border border-rose-400/40 grid place-items-center"><Bell size={17} className="text-rose-300"/></span>
                          <div className="flex-1 min-w-0"><p className="font-bold text-[14px] text-white">Bildirishnomalar</p><p className="text-[12px] font-medium text-[#CBD5E1]">{settingsDraft.notifications ? 'Yoqilgan — yangi darslar haqida xabar' : 'O‘chirilgan'}</p></div>
                          <button onClick={()=>setSettingsDraft(s=>({...s, notifications:!s.notifications}))} aria-pressed={settingsDraft.notifications} aria-label="Bildirishnomalarni almashtirish" className={`relative w-12 h-7 shrink-0 rounded-full transition ${settingsDraft.notifications ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED]' : 'bg-white/20'}`}><span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${settingsDraft.notifications ? 'left-6' : 'left-1'}`}/></button>
                        </div>
                        <div className={`rounded-2xl border p-3 text-center ${settingsDraft.dark ? 'bg-[#020617] border-white/15' : 'bg-white border-slate-200'}`}><p className={`text-[13px] font-bold ${settingsDraft.dark ? 'text-white' : 'text-slate-900'}`}>Ko‘rinish namuna: {settingsDraft.dark ? 'Tungi rejim' : 'Kunduzgi rejim'}</p><p className={`text-[12px] font-medium mt-1 ${settingsDraft.dark ? 'text-[#CBD5E1]' : 'text-slate-500'}`}>Til: {settingsDraft.lang==='uz'?'O‘zbekcha':settingsDraft.lang==='ru'?'Русский':'English'} • Bildirishnoma: {settingsDraft.notifications?'Yoqilgan':'O‘chirilgan'}</p></div>
                      </div>
                      {settingsSaveMsg && <p className="mt-3 bg-emerald-500/20 border border-emerald-400/40 text-emerald-100 text-[14px] font-bold rounded-2xl px-4 py-3">{settingsSaveMsg}</p>}
                      <div className="flex gap-2 mt-3"><button type="button" onClick={()=>{ setSettingsDraft(profileSettings); setSettingsSaveMsg(''); setProfileMenuView('menu'); }} className="flex-1 px-4 py-3 rounded-full font-bold border border-white/30 text-white text-[15px] bg-white/10">Bekor qilish</button><button onClick={saveSettingsFromDraft} disabled={settingsSaving} className={`${BTN} flex-1 py-3 text-[15px] disabled:opacity-60`}>{settingsSaving?'Saqlanmoqda…':'Saqlash'}</button></div>
                      <button onClick={()=>{ setSearch(''); setFilter('Barchasi'); setShowFavOnly(false); setProfileMenuOpen(false); setProfileMenuView('menu'); goTab('courses'); }} className="w-full mt-2 px-4 py-3 rounded-full bg-white text-slate-900 font-bold text-[15px]">Qidiruv va filtrlarni tozalash</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {headerSearchOpen && (
        <div className="fixed inset-0 overflow-y-auto z-[85] bg-black/60 backdrop-blur-md pt-[max(1rem,var(--safe-area-inset-top))] pb-6 px-4" role="dialog" aria-modal="true" aria-label="Kurslarni qidirish" onClick={()=>setHeaderSearchOpen(false)}>
          <div className="min-h-full flex items-start justify-center pt-6"><div className={`${GLASS} w-full max-w-[560px] p-5`} onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between gap-3"><h3 className="text-[20px] font-extrabold text-white">Kurslarni qidirish</h3><button onClick={()=>setHeaderSearchOpen(false)} aria-label="Qidiruvni yopish" className="bg-white text-slate-900 w-9 h-9 rounded-full grid place-items-center shrink-0"><X/></button></div>
            <div className="flex items-center gap-2 bg-[#020617] border border-white/15 rounded-full px-4 py-3 mt-4"><Search size={18} className="text-[#93C5FD] shrink-0"/><label htmlFor="header-search-input" className="sr-only">Kurs nomi bo‘yicha qidirish</label><input id="header-search-input" autoFocus value={headerSearch} onChange={e=>setHeaderSearch(e.target.value)} placeholder="Kurs nomini yozing…" className="outline-none w-full bg-transparent text-[15px] font-medium text-white placeholder:text-[#94A3B8]"/></div>
            <p className="text-[13px] font-bold text-[#CBD5E1] mt-3">{headerSearch.trim() ? `${COURSES.filter(c=>(c.title+' '+c.mentor+' '+c.category+' '+c.tech.join(' ')).toLowerCase().includes(headerSearch.trim().toLowerCase())).length} ta kurs topildi` : `${COURSES.length} ta kurs — nomini yozing`}</p>
            <div className="mt-3 space-y-2 max-h-[46vh] overflow-y-auto pr-0.5">
              {(headerSearch.trim() ? COURSES.filter(c=>(c.title+' '+c.mentor+' '+c.category+' '+c.tech.join(' ')).toLowerCase().includes(headerSearch.trim().toLowerCase())) : COURSES.slice(0,8)).map(c=>(
                <button key={c.id} onClick={()=>{ setHeaderSearchOpen(false); setSearch(''); setFilter('Barchasi'); setShowFavOnly(false); openCourse(c); }} className="w-full text-left bg-white/[0.07] border border-white/15 rounded-2xl p-3 hover:bg-white/10 transition flex items-center gap-3"><span className="w-10 h-10 shrink-0 rounded-xl grid place-items-center text-white" style={{background:c.gradient}}>{c.icon}</span><span className="min-w-0 flex-1"><span className="block font-bold text-[15px] text-white leading-snug [overflow-wrap:anywhere]">{c.title}</span><span className="block text-[12px] font-bold text-[#93C5FD] mt-0.5">{c.category} • {c.level} • {c.price}</span></span><span className="text-[#93C5FD] font-extrabold shrink-0">↗</span></button>
              ))}
            </div>
            {headerSearch.trim() && COURSES.filter(c=>(c.title+' '+c.mentor+' '+c.category+' '+c.tech.join(' ')).toLowerCase().includes(headerSearch.trim().toLowerCase())).length===0 && <p className="text-[14px] font-medium text-[#E2E8F0] mt-3">Hech narsa topilmadi. Boshqa nom bilan urinib ko‘ring.</p>}
            <button onClick={()=>{ const q=headerSearch.trim(); setSearch(q); setFilter('Barchasi'); setHeaderSearchOpen(false); goTab('courses'); }} className={`${BTN} w-full mt-4 py-3 text-[15px]`}>Kurslar bo‘limida qidirish →</button>
          </div></div>
        </div>
      )}
      {toast && <div className="fixed left-1/2 -translate-x-1/2 bottom-6 z-[60] bg-[#0F172A] text-white border border-white/15 text-[15px] font-bold px-4 py-3 rounded-full shadow-2xl max-w-[92vw] text-center">{toast}</div>}
      {celebration && (
        <div className="fixed inset-0 z-[90] grid place-items-center pointer-events-none px-4" role="status" aria-live="polite">
          <div className="pointer-events-auto bg-[rgba(8,12,35,0.96)] border border-amber-400/50 rounded-[24px] p-6 sm:p-8 text-center shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_44px_rgba(245,158,11,0.35)] animate-bounce max-w-[420px] w-full">
            <p className="text-[34px] sm:text-[42px] font-extrabold text-white leading-tight [overflow-wrap:anywhere]">{celebration.title}</p>
            <p className="text-[15px] font-bold text-[#E2E8F0] mt-3 [overflow-wrap:anywhere]">{celebration.sub}</p>
            <button onClick={()=>setCelebration(null)} className={`${BTN} mt-5 px-6 py-3 text-[15px]`}>Davom etish →</button>
          </div>
        </div>
      )}
      {pendingPremium && (
        <div className="fixed inset-0 overflow-y-auto z-[80] bg-black/60 backdrop-blur-md pt-[max(1rem,var(--safe-area-inset-top))] pb-6 px-4" role="dialog" aria-modal="true" aria-label="Premiumni tasdiqlash" onClick={()=>{ if(!premiumSaving){ setPendingPremium(null); setPremiumError(''); } }}>
          <div className="min-h-full flex items-center justify-center"><div className={`${GLASS} w-full max-w-[440px] p-6 text-center`} onClick={e=>e.stopPropagation()}>
            <span className="inline-block"><PremiumCrown size={44} /></span>
            <h3 className="text-[22px] font-extrabold text-white mt-3">Premiumni tasdiqlaysizmi?</h3>
            <p className="text-[15px] font-medium text-[#E2E8F0] mt-2 [overflow-wrap:anywhere]">{pendingPremium.title} — {pendingPremium.price} ({pendingPremium.per}). Tasdiqlasangiz Premium faollashadi va avatar ustida toj paydo bo‘ladi.</p>
            {premiumError && <p role="alert" className="mt-3 bg-rose-500/20 border border-rose-400/40 text-rose-100 text-[14px] font-bold rounded-2xl px-4 py-3">{premiumError}</p>}
            <div className="flex gap-2 mt-5"><button onClick={()=>{ setPendingPremium(null); setPremiumError(''); }} disabled={premiumSaving} className="flex-1 px-4 py-3 rounded-full font-bold border border-white/30 text-white bg-white/10 disabled:opacity-60">Yo‘q</button><button onClick={confirmPremium} disabled={premiumSaving} className="flex-1 px-4 py-3 rounded-full font-bold bg-gradient-to-r from-[#F59E0B] via-[#FACC15] to-[#F59E0B] text-slate-900 disabled:opacity-60">{premiumSaving ? 'Faollashtirilmoqda…' : 'Ha, faollashtirish'}</button></div>
          </div></div>
        </div>
      )}
      {profileModal && profile && (
        <div className="fixed inset-0 overflow-y-auto z-[70] bg-black/60 backdrop-blur-md modal-backdrop pt-[max(1rem,var(--safe-area-inset-top))] pb-4 px-4" role="dialog" aria-modal="true" aria-label={profileModal==='edit'?menuT.edit:profileModal==='courses'?menuT.courses:profileModal==='certificates'?menuT.certs:profileModal==='settings'?menuT.settings:profileModal==='favorites'?'Sevimlilarim':profileModal==='notifications'?'Bildirishnomalar':menuT.profile} onClick={()=>setProfileModal(null)}>
          <div className="min-h-full flex items-center justify-center">
            <div className={`${GLASS} modal-panel profile-fit-panel ${profileModal==='profile' ? 'profile-compact' : ''} w-full max-w-[760px] overflow-hidden`} onClick={e=>e.stopPropagation()}>
              <div className="p-5 flex items-start justify-between" style={{background:DARK_GRADIENT}}>
                <div><button onClick={()=>setProfileModal(null)} className="inline-flex items-center gap-1 text-white/90 font-bold text-[13px] bg-white/15 border border-white/25 rounded-full px-3 py-1"><ChevronLeft size={14}/> {menuT.back}</button><span className="bg-white text-slate-900 px-3 py-1 rounded-full text-[13px] font-bold inline-flex items-center gap-1.5 ml-2">{profileModal==='edit'?<Pencil size={13}/>:profileModal==='courses'?<BookOpen size={13}/>:profileModal==='certificates'?<Award size={13}/>:profileModal==='settings'?<Settings size={13}/>:profileModal==='favorites'?<Heart size={13}/>:profileModal==='notifications'?<Bell size={13}/>:<User size={13}/>} {profileModal==='edit'?menuT.edit:profileModal==='courses'?menuT.courses:profileModal==='certificates'?menuT.certs:profileModal==='settings'?menuT.settings:profileModal==='favorites'?'Sevimlilarim':profileModal==='notifications'?'Bildirishnomalar':menuT.profile}</span><h3 className="text-[22px] font-extrabold mt-3 text-white leading-snug">{profileModal==='edit'?'Profil ma’lumotlarini yangilang':profileModal==='courses'?'Boshlagan kurslaringiz':profileModal==='certificates'?'Sertifikatlaringiz':profileModal==='settings'?'Sozlamalar':profileModal==='favorites'?'Sevimli kurslaringiz':profileModal==='notifications'?'Bildirishnomalar':'Profilim'}</h3><p className="text-white text-[14px] font-medium mt-1">{profileModal==='edit'?'Avatar, ism, username va bio ni o‘zgartiring.':profileModal==='courses'?'Davom ettirish uchun kursni tanlang.':profileModal==='certificates'?'Olgan sertifikatlaringiz shu yerda.':profileModal==='settings'?'Til, mavzu, bildirishnomalar va bosh sahifa ko‘rinishi. Saqlash bosilganda saqlanadi.':profileModal==='favorites'?'Yurak bosgan kurslaringiz — yurakni qayta bossangiz o‘chadi.':profileModal==='notifications'?'Yangi xabarlar shu yerda.':'Sizning ballaringiz va taraqqiyotingiz.'}</p></div>
                <button onClick={()=>setProfileModal(null)} className="bg-white text-slate-900 w-9 h-9 rounded-full grid place-items-center shrink-0" aria-label="Yopish"><X/></button>
              </div>
              {profileModal==='edit' && (
              <form onSubmit={e=>{e.preventDefault(); saveEditProfile();}} noValidate className="p-4 sm:p-5 space-y-3">
                <div className="flex items-center gap-3">
                  {(() => { const opt = AVATAR_OPTIONS.find(a=>a.id===editAvatarId) || AVATAR_OPTIONS[0]; const bg = opt.id==='nx' ? avatarColor : opt.bg; return <span className="w-14 h-14 shrink-0 rounded-full text-white text-[20px] font-extrabold grid place-items-center border-2 border-white/70" style={{backgroundColor:bg}}>{opt.emoji ? <span style={{lineHeight:1}}>{opt.emoji}</span> : (editName.trim().split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() || profileInitials)}</span>; })()}
                  <div className="min-w-0"><p className="font-extrabold text-[16px] text-white leading-tight [overflow-wrap:anywhere]">{editName.trim() || displayName}</p><p className="text-[12px] font-medium text-[#CBD5E1] [overflow-wrap:anywhere]">Username: {editLogin.trim() || profile?.login} • {profile?.role || 'Student'}</p><p className="text-[12px] font-medium text-[#CBD5E1] mt-0.5 [overflow-wrap:anywhere]">{editBio || profileBio}</p></div>
                </div>
                <div><p className="text-[13px] font-bold text-white mb-1.5">Avatarni tanlang</p><div className="flex flex-wrap gap-2">{AVATAR_OPTIONS.map(opt=>{ const bg = opt.id==='nx' ? avatarColor : opt.bg; return <button key={opt.id} type="button" onClick={()=>setEditAvatarId(opt.id)} aria-pressed={editAvatarId===opt.id} aria-label={`Avatar: ${opt.label}`} className={`w-11 h-11 rounded-full grid place-items-center border-2 text-[18px] transition ${editAvatarId===opt.id ? 'border-white scale-110 shadow-[0_0_14px_rgba(255,255,255,0.5)]' : 'border-white/25'}`} style={{backgroundColor:bg}}>{opt.emoji || (editName.trim().split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() || profileInitials)}</button>; })}</div><p className="text-[11px] font-medium text-[#CBD5E1] mt-1">Tayyor avatarlar ro‘yxatidan tanlang — fayl yuklash kerak emas.</p></div>
                <div className="grid sm:grid-cols-2 gap-3"><div><label htmlFor="edit-name" className="block text-left text-[13px] font-bold text-white mb-1">Ism</label><input id="edit-name" value={editName} onChange={e=>setEditName(e.target.value)} placeholder="Ismingiz" autoComplete="name" className={INPUT}/></div><div><label htmlFor="edit-login" className="block text-left text-[13px] font-bold text-white mb-1">Username</label><input id="edit-login" value={editLogin} onChange={e=>setEditLogin(e.target.value)} placeholder="Username" autoComplete="username" className={INPUT}/></div></div>
                <div><label htmlFor="edit-bio" className="block text-left text-[13px] font-bold text-white mb-1">Bio</label><textarea id="edit-bio" value={editBio} onChange={e=>setEditBio(e.target.value)} placeholder="O‘zingiz haqida qisqacha yozing…" rows={2} className={`${INPUT} resize-none`} /></div>
                {editError && <p className="bg-rose-500/20 border border-rose-400/40 text-rose-100 text-[13px] font-bold rounded-2xl px-3 py-2">{editError}</p>}
                <div className="flex gap-2"><button type="button" onClick={()=>setProfileModal(null)} className="flex-1 px-4 py-3 rounded-full font-bold border border-white/30 text-white text-[14px] bg-white/10">Bekor qilish</button><button type="submit" disabled={editSaving} className={`${BTN} flex-1 py-3 text-[14px] disabled:opacity-60`}>{editSaving?'Saqlanmoqda…':'Saqlash'}</button></div>
              </form>
              )}
              {profileModal==='profile' && (
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-3"><span className="relative inline-block shrink-0 pt-[14px]">{premiumActive && <span className="absolute top-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none"><PremiumCrown size={28} celebrate={crownCelebrate} /></span>}<span className="w-12 h-12 shrink-0 rounded-full text-white text-[17px] font-extrabold grid place-items-center border-2 border-white/60" style={{backgroundColor: avatarBg, boxShadow: premiumActive ? '0 0 0 2px rgba(250,204,21,.85), 0 0 18px rgba(245,158,11,.6)' : undefined}}>{avatarEmoji ? <span className="text-[22px]" style={{lineHeight:1}}>{avatarEmoji}</span> : profileInitials}</span></span><div className="min-w-0 flex-1"><p className="font-extrabold text-[18px] leading-tight text-white [overflow-wrap:anywhere]">{displayName}</p><p className="text-[12px] font-bold text-[#93C5FD]">Username: {profile?.login} • {profile?.role || 'Student'}</p><p className="text-[12px] font-medium text-[#CBD5E1] mt-0.5 [overflow-wrap:anywhere]">{profileBio}</p></div>{premiumActive && <span className="premium-badge-glow shrink-0 inline-flex items-center gap-1 bg-gradient-to-r from-[#F59E0B] to-[#FACC15] text-slate-900 text-[11px] font-extrabold px-2.5 py-1 rounded-full shadow-[0_0_16px_rgba(245,158,11,.6)]"><PremiumCrown size={14} /> PREMIUM</span>}<span className="shrink-0 bg-amber-300 text-slate-900 text-[11px] font-extrabold px-2.5 py-1 rounded-full">Level 5</span></div>
                <div className="grid gap-3 sm:grid-cols-2 mt-3">
                  <section aria-label="Statistikam" className="rounded-2xl bg-white/[0.06] border border-white/10 p-3">
                    <h4 className="font-extrabold text-[14px] text-white flex items-center gap-1.5"><BarChart3 size={15} className="text-sky-300"/> Statistikam</h4>
                    <div className="grid grid-cols-3 gap-1.5 mt-2 text-center">
                      <div className="rounded-xl bg-gradient-to-b from-[#2563EB] to-[#7C3AED] p-2"><p className="font-extrabold text-white text-[16px] leading-none">{enrolledCourses.length}</p><p className="text-[10px] font-bold text-white/90 mt-1">O‘qilgan kurs</p></div>
                      <div className="rounded-xl bg-white/[0.07] border border-white/10 p-2"><p className="font-extrabold text-white text-[16px] leading-none">{completed.length} / {totalLessons}</p><p className="text-[10px] font-bold text-[#CBD5E1] mt-1">Tugatgan dars</p></div>
                      <div className="rounded-xl bg-white/[0.07] border border-white/10 p-2"><p className="font-extrabold text-white text-[16px] leading-none">{myPoints}</p><p className="text-[10px] font-bold text-[#CBD5E1] mt-1">Umumiy ball</p></div>
                      <div className="rounded-xl bg-amber-300/20 border border-amber-400/40 p-2"><p className="font-extrabold text-amber-200 text-[16px] leading-none">Level 5</p><p className="text-[10px] font-bold text-[#CBD5E1] mt-1">Daraja</p></div>
                      <div className="rounded-xl bg-white/[0.07] border border-white/10 p-2"><p className="font-extrabold text-white text-[16px] leading-none">1240 XP</p><p className="text-[10px] font-bold text-[#CBD5E1] mt-1">XP</p></div>
                      <div className="rounded-xl bg-white/[0.07] border border-white/10 p-2"><p className="font-extrabold text-white text-[16px] leading-none">92</p><p className="text-[10px] font-bold text-[#CBD5E1] mt-1">O‘rtacha ball</p></div>
                    </div>
                  </section>
                  <section aria-label="O'zlashtirishim" className="rounded-2xl bg-white/[0.06] border border-white/10 p-3">
                    <h4 className="font-extrabold text-[14px] text-white flex items-center gap-1.5"><Target size={15} className="text-violet-300"/> O‘zlashtirishim</h4>
                    <div className="mt-2 space-y-1.5">{mastery.map((m,i)=>(<div key={m.n}><div className="flex justify-between text-[12px] font-bold text-white"><span>{m.n}</span><span>{m.p}%</span></div><div className="h-1.5 bg-white/15 rounded-full overflow-hidden mt-0.5"><div className="h-full rounded-full" style={{width:`${m.p}%`, background:['#60A5FA','#38BDF8','#FACC15','#34D399','#C084FC'][i]}}/></div></div>))}</div>
                    <p className="text-[11px] font-medium text-[#CBD5E1] mt-2">Tugatgan dars: <b className="text-white">{completed.length} / {totalLessons}</b> • Umumiy: <b className="text-white">{totalProgress}%</b></p>
                  </section>
                </div>
                <section aria-label="Yutuqlarim" className="rounded-2xl bg-white/[0.06] border border-white/10 p-3 mt-3">
                  <h4 className="font-extrabold text-[14px] text-white flex items-center gap-1.5"><Trophy size={15} className="text-amber-300"/> Yutuqlarim</h4>
                  <div className="grid grid-cols-3 gap-1.5 mt-2">{achievements.map(a=>(
                    <div key={a.id} className={`rounded-xl p-2 text-center border ${a.unlocked?'bg-amber-300/20 border-amber-400/40':'bg-white/[0.04] border-white/10 opacity-70'}`}><p className="text-[18px] leading-none">{a.emoji}</p><p className="font-extrabold text-[11px] text-white mt-1 leading-tight">{a.title}</p><p className="text-[10px] font-bold text-[#CBD5E1] mt-0.5">{a.unlocked?'Ochildi ✓':`${completed.length} / ${a.need} dars`}</p></div>
                  ))}</div>
                </section>
                <button onClick={()=>{ setProfileModal(null); goTab('courses'); }} className={`${BTN} w-full mt-3 py-2.5 text-[13px]`}>O‘qishni davom ettirish →</button>
              </div>
              )}
              {profileModal==='courses' && (
              <div className="p-4 sm:p-5">
                <div className="flex gap-2"><button onClick={()=>setCoursesTab('all')} aria-pressed={coursesTab==='all'} className={`flex-1 px-3 py-2.5 rounded-full text-[13px] font-bold ${coursesTab==='all'?'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white':'bg-white/10 border border-white/15 text-white'}`}>Mening kurslarim</button><button onClick={()=>setCoursesTab('fav')} aria-pressed={coursesTab==='fav'} className={`flex-1 px-3 py-2.5 rounded-full text-[13px] font-bold flex items-center justify-center gap-1.5 ${coursesTab==='fav'?'bg-rose-500 text-white':'bg-white/10 border border-white/15 text-white'}`}><Heart size={14} className={coursesTab==='fav'?'fill-white':''}/> Sevimlilarim ({favorites.length})</button></div>
                <p className="text-[13px] font-medium text-[#E2E8F0] mt-3">{coursesTab==='fav' ? 'Yurakcha bosgan kurslaringiz — shu yerda saqlanadi.' : 'Boshlagan va sevimli kurslaringiz — har birida Davom ettirish tugmasi bor.'}</p>
                {(coursesTab==='fav' && favorites.length===0) && <p className="text-[13px] font-medium text-[#CBD5E1] bg-white/[0.06] border border-white/10 rounded-2xl p-3 mt-3">Hali sevimli kurs yo‘q. Kurs kartasidagi yurakchani bosing — shu yerga tushadi.</p>}
                <div className="grid sm:grid-cols-2 gap-2 mt-3">{(coursesTab==='fav' ? COURSES.filter(c=>favorites.includes(c.id)) : enrolledCourses).slice(0,6).map(c=>{ const done=c.lessons.filter(l=>completed.includes(l.id)).length; const pct=Math.round(done/c.lessons.length*100); const next=c.lessons.find(l=>!completed.includes(l.id))||c.lessons[0]; return (<div key={c.id} className="bg-white/[0.07] border border-white/15 rounded-2xl p-3"><span className="flex items-center justify-between gap-2"><span className="block font-bold text-[14px] text-white leading-snug [overflow-wrap:anywhere]">{c.title}</span><button onClick={()=>toggleFav(c.id)} aria-label="Sevimli" className="shrink-0"><Heart size={16} className={favorites.includes(c.id)?'fill-rose-500 text-rose-500':'text-white/60'}/></button></span><span className="block text-[12px] font-bold text-[#93C5FD] mt-1">{c.category} • {done} / {c.lessons.length} dars • {pct}%</span><span className="block h-1.5 bg-white/15 rounded-full mt-2"><span className="block h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full" style={{width:`${pct}%`}}/></span><span className="block text-[12px] font-medium text-[#CBD5E1] mt-1">Keyingi: {next.title}</span><button onClick={()=>{ setProfileModal(null); openCourse(c); }} className={`${BTN} mt-2 px-4 py-2 text-[13px]`}>Davom ettirish →</button></div>)})}</div>
                <button onClick={()=>{ setProfileModal(null); goTab('courses'); }} className={`${BTN} w-full mt-3 py-3 text-[14px]`}>Barcha kurslarni ko‘rish</button>
              </div>
              )}
              {profileModal==='certificates' && (
              <div className="p-4 sm:p-5">
                <p className="text-[13px] font-medium text-[#E2E8F0]">Egasi: <b className="text-white [overflow-wrap:anywhere]">{displayName}</b> • {myCerts.length} ta sertifikat</p>
                <div className="grid sm:grid-cols-2 gap-2 mt-3">{myCerts.slice(0,4).map(cert=>(
                  <div key={cert.id} className="bg-white/[0.07] border border-white/15 rounded-2xl p-3">
                    <div className="flex items-center gap-2"><span className="w-10 h-10 shrink-0 rounded-xl grid place-items-center text-[18px] text-white" style={{backgroundColor: cert.color}}>{cert.emoji}</span><div className="min-w-0 flex-1"><p className="font-bold text-[13px] text-white leading-snug [overflow-wrap:anywhere]">{cert.title}</p><p className="text-[12px] font-medium text-[#CBD5E1]">{cert.status} • {cert.progress}%</p></div></div>
                    {certViewId===cert.id && <div className="mt-2 bg-[#020617] border border-amber-400/40 rounded-2xl p-3 text-center"><p className="text-[11px] font-extrabold tracking-[0.18em] text-amber-300">IDROK • SERTIFIKAT</p><p className="text-[15px] font-extrabold text-white mt-1 [overflow-wrap:anywhere]">{cert.title}</p><p className="text-[13px] font-medium text-[#E2E8F0] mt-1 [overflow-wrap:anywhere]">Egasi: {displayName}</p><p className="text-[12px] font-medium text-[#CBD5E1]">Holati: {cert.status} • {cert.progress}% • {cert.date}</p></div>}
                    <button onClick={()=>setCertViewId(certViewId===cert.id ? null : cert.id)} className="mt-2 px-4 py-2 rounded-full bg-white text-slate-900 font-bold text-[13px]">{certViewId===cert.id ? 'Yopish' : 'Ko‘rish'}</button>
                  </div>
                ))}</div>
                {certMsg && <p className="mt-3 bg-white/[0.07] border border-white/15 text-white text-[13px] font-bold rounded-2xl px-3 py-2">{certMsg}</p>}
                <button onClick={()=>{ setProfileModal(null); goTab('courses'); }} className={`${BTN} w-full mt-3 py-3 text-[14px]`}>Yangi sertifikat uchun o‘qish</button>
              </div>
              )}
              {profileModal==='favorites' && (
              <div className="p-4 sm:p-5">
                <p className="text-[13px] font-medium text-[#E2E8F0]">Yurak bosgan kurslaringiz — {favorites.length} ta. Yurakni qayta bossangiz sevimlilardan o‘chadi.</p>
                {favorites.length===0 && <p className="text-[13px] font-medium text-[#CBD5E1] bg-white/[0.06] border border-white/10 rounded-2xl p-3 mt-3">Hali sevimli kurs yo‘q. Kurs kartasidagi yurakchani bosing.</p>}
                <div className="grid sm:grid-cols-2 gap-2 mt-3">{COURSES.filter(c=>favorites.includes(c.id)).map(c=>{ const done=c.lessons.filter(l=>completed.includes(l.id)).length; const pct=Math.round(done/c.lessons.length*100); const next=c.lessons.find(l=>!completed.includes(l.id))||c.lessons[0]; return (<div key={c.id} className="bg-white/[0.07] border border-white/15 rounded-2xl p-3"><span className="flex items-center justify-between gap-2"><span className="block font-bold text-[14px] text-white leading-snug [overflow-wrap:anywhere]">{c.title}</span><button onClick={()=>toggleFav(c.id)} aria-label="Sevimlilardan o‘chirish" className="shrink-0"><Heart size={18} className="fill-rose-500 text-rose-500"/></button></span><span className="block text-[12px] font-bold text-[#93C5FD] mt-1">{c.category} • {done} / {c.lessons.length} dars • {pct}%</span><span className="block h-1.5 bg-white/15 rounded-full mt-2"><span className="block h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full" style={{width:`${pct}%`}}/></span><span className="block text-[12px] font-medium text-[#CBD5E1] mt-1">Keyingi: {next.title}</span><button onClick={()=>{ setProfileModal(null); openCourse(c); }} className={`${BTN} mt-2 px-4 py-2 text-[13px]`}>Davom ettirish →</button></div>)})}</div>
                <button onClick={()=>{ setProfileModal(null); goTab('courses'); }} className={`${BTN} w-full mt-3 py-3 text-[14px]`}>Barcha kurslarni ko‘rish</button>
              </div>
              )}
              {profileModal==='notifications' && (
              <div className="p-4 sm:p-5">
                <div className="flex items-center justify-between"><p className="text-[13px] font-medium text-[#E2E8F0]">{unreadCount>0 ? `${unreadCount} ta yangi bildirishnoma` : 'Yangi bildirishnoma yo‘q'}</p>{notifications.length>0 && <button onClick={()=>{ const next=notifications.map(n=>({...n, read:true})); setNotifications(next); persistNotifications(next); }} className="text-[12px] font-bold text-[#93C5FD]">Hammasini o‘qildi deb belgilash</button>}</div>
                <div className="space-y-2 mt-3">{notifications.length===0 && <p className="text-[13px] font-medium text-[#CBD5E1] bg-white/[0.06] border border-white/10 rounded-2xl p-3">Hozircha bildirishnoma yo‘q. Dars tugatsangiz yoki Premium olsangiz shu yerda paydo bo‘ladi.</p>}{notifications.map(n=>(<button key={n.id} onClick={()=>{ const next=notifications.map(x=>x.id===n.id?{...x, read:true}:x); setNotifications(next); persistNotifications(next); }} className={`w-full text-left rounded-2xl p-3 border ${n.read?'bg-white/[0.04] border-white/10':'bg-[#2563EB]/20 border-[#60A5FA]/40'}`}><span className="flex items-center justify-between gap-2"><span className="font-bold text-[14px] text-white [overflow-wrap:anywhere]">{n.title}</span>{!n.read && <span className="w-2 h-2 shrink-0 rounded-full bg-sky-400" />}</span><span className="block text-[13px] font-medium text-[#CBD5E1] mt-1 [overflow-wrap:anywhere]">{n.text}</span></button>))}</div>
              </div>
              )}
              {profileModal==='settings' && (
              <div className="p-4 sm:p-5 space-y-3">
                <div className="bg-white/[0.07] border border-white/15 rounded-2xl p-3 flex items-center gap-3"><span className="w-11 h-11 shrink-0 rounded-full text-white font-extrabold grid place-items-center border-2 border-white/60" style={{backgroundColor: avatarBg}}>{avatarEmoji ? <span className="text-[20px]" style={{lineHeight:1}}>{avatarEmoji}</span> : profileInitials}</span><div className="min-w-0 flex-1"><p className="text-[11px] font-extrabold tracking-[0.14em] text-[#93C5FD]">PROFIL</p><p className="font-extrabold text-[15px] text-white leading-tight [overflow-wrap:anywhere]">{displayName}</p><p className="text-[12px] font-medium text-[#CBD5E1] [overflow-wrap:anywhere]">Username: {profile?.login}</p></div></div>
                <div className="bg-white/[0.07] border border-white/15 rounded-2xl p-3"><p className="flex items-center gap-2 font-bold text-[13px] text-white"><Languages size={15} className="text-sky-300"/> Til</p><div className="grid grid-cols-3 gap-2 mt-2">{([{id:'uz',label:'O‘zbek'},{id:'ru',label:'Rus'},{id:'en',label:'Ingliz'}] as const).map(l=>(<button key={l.id} onClick={()=>{ const next={...settingsDraft, lang:l.id}; setSettingsDraft(next); setProfileSettings(next); }} aria-pressed={settingsDraft.lang===l.id} className={`px-2 py-2 rounded-xl text-[13px] font-bold transition ${settingsDraft.lang===l.id ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white' : 'bg-white/10 border border-white/15 text-white hover:bg-white/15'}`}>{l.label}</button>))}</div><p className="text-[11px] font-medium text-[#CBD5E1] mt-1.5">Hozirgi tanlov: {settingsDraft.lang==='uz'?'O‘zbek':settingsDraft.lang==='ru'?'Rus':'Ingliz'} — darhol qo‘llanadi.</p></div>
                <div className="bg-white/[0.07] border border-white/15 rounded-2xl p-3 flex items-center gap-3"><span className="w-9 h-9 shrink-0 rounded-xl bg-indigo-500/20 border border-indigo-400/40 grid place-items-center">{settingsDraft.dark ? <Moon size={17} className="text-indigo-300"/> : <Sun size={17} className="text-amber-300"/>}</span><div className="flex-1 min-w-0"><p className="font-bold text-[13px] text-white">Tungi rejim</p><p className="text-[11px] font-medium text-[#CBD5E1]">{settingsDraft.dark ? 'Yoqilgan — qorong‘u kosmos foni' : 'O‘chirilgan — yorug‘ ko‘rinish'}</p></div><button onClick={()=>{ const next={...settingsDraft, dark:!settingsDraft.dark}; setSettingsDraft(next); setProfileSettings(next); }} aria-pressed={settingsDraft.dark} aria-label="Tungi rejimni almashtirish" className={`relative w-12 h-7 shrink-0 rounded-full transition ${settingsDraft.dark ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED]' : 'bg-white/20'}`}><span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${settingsDraft.dark ? 'left-6' : 'left-1'}`}/></button></div>
                <div className="bg-white/[0.07] border border-white/15 rounded-2xl p-3 flex items-center gap-3"><span className="w-9 h-9 shrink-0 rounded-xl bg-rose-500/20 border border-rose-400/40 grid place-items-center"><Bell size={17} className="text-rose-300"/></span><div className="flex-1 min-w-0"><p className="font-bold text-[13px] text-white">Ovozli bildirishnomalar</p><p className="text-[11px] font-medium text-[#CBD5E1]">{settingsDraft.notifications ? 'Yoqilgan — ovozli xabarlar' : 'O‘chirilgan'}</p></div><button onClick={()=>{ const next={...settingsDraft, notifications:!settingsDraft.notifications}; setSettingsDraft(next); setProfileSettings(next); }} aria-pressed={settingsDraft.notifications} aria-label="Ovozli bildirishnomalarni almashtirish" className={`relative w-12 h-7 shrink-0 rounded-full transition ${settingsDraft.notifications ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED]' : 'bg-white/20'}`}><span className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-all ${settingsDraft.notifications ? 'left-6' : 'left-1'}`}/></button></div>
                <div className="bg-white/[0.07] border border-white/15 rounded-2xl p-3">
                  <p className="font-bold text-[13px] text-white">Mavzu</p>
                  <div className="grid grid-cols-2 gap-2 mt-2"><button onClick={()=>{ const n={...settingsDraft, dark:true}; setSettingsDraft(n); setProfileSettings(n); }} aria-pressed={settingsDraft.dark} className={`px-3 py-2 rounded-xl text-[13px] font-bold ${settingsDraft.dark?'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white':'bg-white/10 border border-white/15 text-white'}`}>🌙 Tungi</button><button onClick={()=>{ const n={...settingsDraft, dark:false}; setSettingsDraft(n); setProfileSettings(n); }} aria-pressed={!settingsDraft.dark} className={`px-3 py-2 rounded-xl text-[13px] font-bold ${!settingsDraft.dark?'bg-white text-slate-900':'bg-white/10 border border-white/15 text-white'}`}>☀️ Yorug‘</button></div>
                </div>
                <div className="bg-white/[0.07] border border-white/15 rounded-2xl p-3 space-y-3">
                  <p className="font-bold text-[13px] text-white">Bosh sahifa — stiker va kartalar</p>
                  <div><label htmlFor="home-scale" className="flex justify-between text-[12px] font-bold text-white"><span>Kattaligi</span><span>{Math.round(homeDraft.stickerScale*100)}%</span></label><input id="home-scale" type="range" min={0.8} max={1.3} step={0.05} value={homeDraft.stickerScale} onChange={e=>setHomeDraft(s=>({...s, stickerScale:Number(e.target.value)}))} className="w-full accent-[#2563EB]" /></div>
                  <div><label htmlFor="home-speed" className="flex justify-between text-[12px] font-bold text-white"><span>Suzish tezligi</span><span>{homeDraft.floatSpeed.toFixed(1)}×</span></label><input id="home-speed" type="range" min={0.5} max={2} step={0.1} value={homeDraft.floatSpeed} onChange={e=>setHomeDraft(s=>({...s, floatSpeed:Number(e.target.value)}))} className="w-full accent-[#2563EB]" /></div>
                  <div><p className="text-[12px] font-bold text-white mb-1.5">Joylashuvi</p><div className="grid grid-cols-4 gap-1.5">{([{id:'scattered',label:'Tarqoq'},{id:'compact',label:'Yig‘iq'},{id:'center',label:'Markaz'},{id:'right',label:'O‘ng'}] as const).map(l=>(<button key={l.id} onClick={()=>setHomeDraft(s=>({...s, layout:l.id}))} aria-pressed={homeDraft.layout===l.id} className={`px-2 py-2 rounded-xl text-[12px] font-bold ${homeDraft.layout===l.id?'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white':'bg-white/10 border border-white/15 text-white'}`}>{l.label}</button>))}</div></div>
                  <button onClick={resetHomeSettings} className="w-full px-3 py-2 rounded-full bg-white/10 border border-white/15 text-white text-[13px] font-bold">Ideal holatga qaytarish</button>
                </div>
                {settingsSaveMsg && <p className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-100 text-[13px] font-bold rounded-2xl px-3 py-2">{settingsSaveMsg}</p>}
                <div className="flex gap-2"><button type="button" onClick={()=>setProfileModal(null)} className="flex-1 px-4 py-3 rounded-full font-bold border border-white/30 text-white text-[14px] bg-white/10">Bekor qilish</button><button onClick={async()=>{ await saveSettingsFromDraft(); await saveHomeSettings(); }} disabled={settingsSaving || homeSaving} className={`${BTN} flex-1 py-3 text-[14px] disabled:opacity-60`}>{(settingsSaving||homeSaving)?'Saqlanmoqda…':'Saqlash'}</button></div>
              </div>
              )}

            </div>
          </div>
        </div>
      )}
      {loadError && <div className="max-w-[1220px] mx-auto px-4 pt-3"><div className="bg-amber-500/20 border border-amber-400/40 text-amber-100 text-[15px] font-bold rounded-2xl px-4 py-3">{loadError}</div></div>}


      {selectedLesson && selectedCourse ? (
        <main className="max-w-[920px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <button onClick={()=>setSelectedLesson(null)} className="inline-flex items-center gap-1 text-[#93C5FD] font-bold text-[15px] mb-4"><ChevronLeft size={18}/> {selectedCourse.title} — darslar ro‘yxatiga qaytish</button>
          <div className={`${GLASS} overflow-hidden`}>
            <div className="p-5 sm:p-8" style={{background:DARK_GRADIENT}}>
              <span className="inline-flex bg-white text-slate-900 text-[12px] font-bold px-3 py-1 rounded-full">{selectedCourse.category} • {selectedLesson.minutes} daqiqa • {selectedLesson.codeLang}</span>
              <h1 className="text-white text-[26px] sm:text-[34px] leading-tight font-extrabold mt-3 [overflow-wrap:anywhere]">{selectedLesson.title}</h1>
              <p className="text-white text-[15px] font-medium mt-2">{selectedCourse.title} • Mentor: {selectedCourse.mentor}</p>
            </div>
            <div className="p-5 sm:p-8">
              <div className={`flex items-center gap-3 ${GLASS_SOFT} p-3 mb-6`}>
                <div className="flex-1"><div className="flex justify-between text-[13px] font-bold mb-1 text-white"><span>Kursdagi taraqqiyotingiz</span><span>{selectedCourse.lessons.filter(l=>completed.includes(l.id)).length} / {selectedCourse.lessons.length} dars</span></div><div className="h-2 bg-white/15 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full transition-all" style={{width:`${(selectedCourse.lessons.filter(l=>completed.includes(l.id)).length/selectedCourse.lessons.length)*100}%`}}/></div></div>
              </div>
              {selectedLesson.content.map((p,i)=>(<p key={i} className={`text-[16px] leading-[1.85] ${MUTED} font-medium mb-4 [overflow-wrap:anywhere]`}>{p}</p>))}
              <h3 className="font-extrabold text-[19px] text-white mt-7 mb-3 flex items-center gap-2"><Sparkles className="text-amber-300"/> Asosiy fikrlar</h3>
              <ul className="space-y-2">{selectedLesson.points.map((pt,i)=>(<li key={i} className={`flex gap-2 ${GLASS_SOFT} px-4 py-3 text-[15px] font-bold text-white`}><Check className="text-emerald-300 shrink-0 mt-0.5" size={18}/><span className="[overflow-wrap:anywhere]">{pt}</span></li>))}</ul>

              <div className="mt-7 rounded-[20px] overflow-hidden border border-[#020617]">
                <div className="bg-[#020617] px-4 py-3 flex items-center justify-between"><span className="text-[13px] font-extrabold text-[#E2E8F0] tracking-wide">{selectedLesson.codeLang} • KOD NAMUNASI</span><button onClick={()=>copyCode(selectedLesson.code)} className={`${BTN_DARK} inline-flex items-center gap-1.5 text-[13px] px-3 py-1.5`}><Copy size={14}/> Nusxalash</button></div>
                <pre className="bg-[#020617] text-[#A5F3FC] text-[14px] leading-relaxed p-4 sm:p-5 overflow-x-auto font-mono [overflow-wrap:anywhere] whitespace-pre-wrap">{selectedLesson.code}</pre>
              </div>
              <div className="mt-4 bg-amber-500/15 border border-amber-400/30 rounded-2xl p-4 flex gap-3"><Hammer className="text-amber-300 shrink-0"/><div><p className="font-extrabold text-[15px] text-white">Amaliy vazifa</p><p className={`text-[15px] font-medium ${MUTED} leading-relaxed mt-1 [overflow-wrap:anywhere]`}>{selectedLesson.task}</p><button onClick={()=>{goTab('courses');}} className={`${BTN_DARK} mt-3 text-[14px] px-4 py-2 inline-flex items-center gap-1.5`}>Kurslarga qaytish <ArrowRight size={15}/></button></div></div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button onClick={()=>lessonNav(-1)} disabled={selectedCourse.lessons.findIndex(l=>l.id===selectedLesson.id)===0} className="flex-1 inline-flex justify-center items-center gap-2 border-2 border-white/25 bg-white/10 text-white py-3.5 rounded-full font-bold text-[15px] disabled:opacity-40"><ChevronLeft size={18}/> Oldingi dars</button>
                <button onClick={()=>completeLesson(selectedLesson.id)} className={`flex-1 inline-flex justify-center items-center gap-2 py-3.5 rounded-full font-bold text-white text-[15px] ${completed.includes(selectedLesson.id)?'bg-emerald-600':'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:shadow-[0_0_24px_rgba(59,130,246,0.6)]'}`}><CheckCircle2 size={19}/>{completed.includes(selectedLesson.id)?'Dars tugatildi ✓':'Darsni tugatdim'}</button>
                <button onClick={()=>lessonNav(1)} disabled={selectedCourse.lessons.findIndex(l=>l.id===selectedLesson.id)===selectedCourse.lessons.length-1} className="flex-1 inline-flex justify-center items-center gap-2 bg-white text-slate-900 py-3.5 rounded-full font-bold text-[15px] disabled:opacity-40">Keyingi dars <ChevronRight size={18}/></button>
              </div>
              <p className={`text-center text-[14px] font-medium ${MUTED} mt-4`}>Darsni tugatganingiz avtomatik saqlanadi va profil hamda reytingda ko‘rinadi.</p>
            </div>
          </div>
        </main>
      ) : selectedCourse ? (
        <main className="max-w-[1220px] mx-auto px-4 sm:px-6 py-6">
          <button onClick={()=>setSelectedCourse(null)} className="inline-flex items-center gap-1 text-[#93C5FD] font-bold text-[15px] mb-4"><ChevronLeft size={18}/> Barcha kurslarga qaytish</button>
          <div className="grid lg:grid-cols-[1.35fr_1fr] gap-5 items-start">
            <div>
              <div className="rounded-[20px] p-6 sm:p-8 text-white card-shadow border border-[rgba(96,165,250,0.35)]" style={{background:DARK_GRADIENT}}>
                <div className="flex justify-between gap-3"><span className="bg-white text-slate-900 px-3 py-1 rounded-full text-[13px] font-bold">{selectedCourse.category} • {selectedCourse.level}</span><button onClick={()=>toggleFav(selectedCourse.id)} aria-label="Sevimli" className="w-10 h-10 rounded-full bg-white text-slate-900 grid place-items-center"><Heart size={20} className={favorites.includes(selectedCourse.id)?'fill-rose-500 text-rose-500':'text-slate-900'}/></button></div>
                <div className="w-14 h-14 rounded-2xl bg-white text-[#2563EB] grid place-items-center mt-6">{selectedCourse.icon}</div>
                <h1 className="text-[28px] sm:text-[38px] leading-tight font-extrabold mt-4 text-white [overflow-wrap:anywhere]">{selectedCourse.title}</h1>
                <p className="text-white leading-relaxed mt-3 text-[16px] font-medium [overflow-wrap:anywhere]">{selectedCourse.desc}</p>
                <div className="flex flex-wrap gap-2 mt-5">{selectedCourse.tech.map(t=>(<span key={t} className="bg-white text-slate-900 px-3 py-1.5 rounded-full text-[13px] font-bold">{t}</span>))}</div>
                <div className="flex flex-wrap gap-2 mt-3 text-[13px] font-bold"><span className="bg-white text-slate-900 px-3 py-1.5 rounded-full">⭐ {selectedCourse.rating} • {selectedCourse.students.toLocaleString()} o‘quvchi</span><span className="bg-white text-slate-900 px-3 py-1.5 rounded-full">{selectedCourse.duration}</span><span className="bg-white text-slate-900 px-3 py-1.5 rounded-full">{selectedCourse.lessonsCount} dars</span><span className="bg-amber-300 text-slate-900 px-3 py-1.5 rounded-full">{selectedCourse.price}</span></div>
              </div>
              <div className={`${GLASS} p-5 sm:p-6 mt-5`}>
                <h2 className="font-extrabold text-[20px] text-white">Mentor</h2>
                <div className="flex items-center gap-3 mt-4"><div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 grid place-items-center font-extrabold text-white">{selectedCourse.mentor.split(' ').map(w=>w[0]).join('')}</div><div><p className="font-bold text-[16px] text-white">{selectedCourse.mentor}</p><p className={`text-[15px] font-medium ${MUTED}`}>{selectedCourse.mentorRole}</p></div><span className="ml-auto bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-[13px] font-bold px-3 py-1 rounded-full">Onlayn</span></div>
              </div>
            </div>
            <div className={`${GLASS} p-5 sm:p-6`}>
              <div className="flex items-center justify-between"><h2 className="font-extrabold text-[20px] text-white">O‘quv dasturi</h2><span className="text-[13px] font-bold bg-white/10 border border-white/15 text-white px-3 py-1 rounded-full">{selectedCourse.lessons.filter(l=>completed.includes(l.id)).length} / {selectedCourse.lessons.length} tugatildi</span></div>
              <p className={`text-[14px] font-medium ${MUTED} mt-2`}>Kurs dasturidan tanlangan 5 ta dars. Har bir darsda matn, kod namunasi va amaliy vazifa bor.</p>
              <div className="mt-4 space-y-2">{selectedCourse.lessons.map((l,i)=>{ const done=completed.includes(l.id); return (<button key={l.id} onClick={()=>openLesson(selectedCourse,l)} className="w-full flex items-center gap-3 text-left p-3 rounded-2xl hover:bg-white/10 border border-transparent hover:border-white/15 transition"><span className={`w-9 h-9 rounded-full grid place-items-center shrink-0 font-extrabold text-[15px] ${done?'bg-emerald-500 text-white':'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white'}`}>{done?<Check size={18}/>:i+1}</span><span className="flex-1 min-w-0"><span className="block font-bold text-[15px] leading-snug text-white [overflow-wrap:anywhere]">{l.title}</span><span className={`text-[14px] font-medium ${MUTED}`}>{l.minutes} daqiqa • Matn + kod + vazifa</span></span><Play size={18} className="text-[#93C5FD] shrink-0"/></button>)})}</div>
              <button onClick={()=>openLesson(selectedCourse, selectedCourse.lessons.find(l=>!completed.includes(l.id)) || selectedCourse.lessons[0])} className={`${BTN} w-full mt-4 py-3.5 text-[15px]`}>Davom etish →</button>
            </div>
          </div>
          <div className={`${GLASS} p-5 sm:p-6 mt-5`}>
            <h2 className="font-extrabold text-[20px] text-white flex items-center gap-2"><MessageCircle size={20} className="text-sky-300"/> Izohlar va savollar</h2>
            <p className="text-[14px] font-medium text-[#CBD5E1] mt-1">Savolingizni yozing — o‘quvchilar va mentorlar javob beradi. Izohlar saqlanadi.</p>
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <label htmlFor="course-comment" className="sr-only">Kurs haqida izoh yoki savol</label>
              <input id="course-comment" value={commentText} onChange={e=>setCommentText(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter') addCourseComment(selectedCourse.id); }} placeholder="Savolingizni yoki fikringizni yozing…" maxLength={500} className="flex-1 min-w-0 bg-[#020617] border border-white/15 rounded-full px-4 py-3 text-[15px] font-medium text-white placeholder:text-[#64748B] outline-none focus:border-[#60A5FA]" />
              <button onClick={()=>addCourseComment(selectedCourse.id)} disabled={!commentText.trim() || commentSending} className={`${BTN} px-5 py-3 text-[14px] disabled:opacity-50 shrink-0`}>{commentSending?'Yuborilmoqda…':'Izoh qoldirish'}</button>
            </div>
            {commentMsg && <p className="text-[13px] font-bold text-emerald-200 mt-2">{commentMsg}</p>}
            <div className="space-y-3 mt-4">
              {courseComments.filter(c=>c.courseId===selectedCourse.id).length===0 && <p className="text-[14px] font-medium text-[#CBD5E1] bg-white/[0.06] border border-white/10 rounded-2xl p-3">Hali izoh yo‘q — birinchisini siz qoldiring!</p>}
              {courseComments.filter(c=>c.courseId===selectedCourse.id).map(c=>(
                <div key={c.id} className="bg-white/[0.06] border border-white/10 rounded-2xl p-3">
                  <p className="flex flex-wrap gap-2 items-baseline text-[13px] font-bold"><span className="text-white [overflow-wrap:anywhere]">{c.author}</span><span className="text-[#94A3B8] font-medium">{chatTime(c.created_at)}</span></p>
                  <p className="text-[14.5px] font-medium text-white mt-1 leading-relaxed [overflow-wrap:anywhere]">{c.text}</p>
                  {c.replies.map(r=>(
                    <div key={r.id} className="ml-4 mt-2 pl-3 border-l-2 border-[#60A5FA]/50"><p className="text-[12px] font-bold text-[#93C5FD] [overflow-wrap:anywhere]">{r.author} • javob</p><p className="text-[13.5px] font-medium text-[#E2E8F0] mt-0.5 [overflow-wrap:anywhere]">{r.text}</p></div>
                  ))}
                  {replyTo===c.id ? (
                    <div className="flex gap-2 mt-2"><input autoFocus value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder="Javob yozing…" maxLength={400} className="flex-1 min-w-0 bg-[#020617] border border-white/15 rounded-full px-3 py-2 text-[13px] font-medium text-white placeholder:text-[#64748B] outline-none" /><button onClick={()=>addReply(c.id)} disabled={!replyText.trim()} className={`${BTN} px-4 py-2 text-[13px] disabled:opacity-50 shrink-0`}>Yuborish</button><button onClick={()=>{ setReplyTo(null); setReplyText(''); }} className="px-3 py-2 rounded-full bg-white/10 text-white text-[13px] font-bold">Bekor</button></div>
                  ) : (
                    <button onClick={()=>setReplyTo(c.id)} className="text-[13px] font-bold text-[#93C5FD] mt-2">Javob berish →</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      ) : false ? (
        <main className="max-w-[920px] mx-auto px-4 sm:px-6 py-6">
          <button onClick={()=>setSelectedProject(null)} className="inline-flex items-center gap-1 text-[#93C5FD] font-bold text-[15px] mb-4"><ChevronLeft size={18}/> Loyihalarga qaytish</button>
          <div className={`${GLASS} overflow-hidden`}>
            <div className="p-6 sm:p-8" style={{background:DARK_GRADIENT}}><span className="bg-white text-slate-900 px-3 py-1 rounded-full text-[13px] font-bold">{selectedProject.level} • {selectedProject.time}</span><h1 className="text-white text-[28px] sm:text-[36px] font-extrabold leading-tight mt-4 [overflow-wrap:anywhere]">{selectedProject.title}</h1><p className="text-white text-[16px] font-medium leading-relaxed mt-3">{selectedProject.desc}</p><div className="flex flex-wrap gap-2 mt-4">{selectedProject.tech.map(t=>(<span key={t} className="bg-white text-slate-900 px-3 py-1.5 rounded-full text-[13px] font-bold">{t}</span>))}</div></div>
            <div className="p-5 sm:p-8">
              <h2 className="font-extrabold text-[20px] text-white">Bosqichma-bosqich vazifalar</h2>
              <p className={`text-[14px] font-medium ${MUTED} mt-1`}>Har bir vazifani bajarganingizda belgilang — taraqqiyotingiz saqlanadi.</p>
              <div className="space-y-2 mt-4">{selectedProject.tasks.map((t,i)=>{ const key=`${selectedProject.id}-${i}`; const done=projectDone.includes(key); return (<button key={key} onClick={()=>toggleProjectTask(key)} className={`w-full flex items-center gap-3 text-left p-4 rounded-2xl border text-[15px] font-bold transition ${done?'bg-emerald-500/20 border-emerald-400/40 text-emerald-100':'bg-white/[0.07] border-white/15 text-white hover:bg-white/10'}`}><span className={`w-7 h-7 rounded-full grid place-items-center shrink-0 ${done?'bg-emerald-500 text-white':'bg-white text-slate-900'}`}>{done?<Check size={16}/>:i+1}</span><span className="[overflow-wrap:anywhere]">{t}</span></button>)})}</div>
              <div className="bg-white/10 border border-white/20 rounded-2xl p-4 mt-5 flex gap-3"><Trophy className="text-amber-300 shrink-0"/><p className="text-[15px] font-medium text-white"><b>Natija:</b> {selectedProject.result}. Tayyor bo‘lgach, Kod muharririda sinab, keyin nashr qilish kursidagi qadamlarni bajaring.</p></div>
              <button onClick={()=>goTab('courses')} className={`${BTN} w-full mt-5 py-3.5 text-[15px]`}>Kurslarga qaytish →</button>
            </div>
          </div>
        </main>
      ) : (
      <>
      <div className="flow-page">
      <FlowSection id="home" scrollY={scrollY}>
        <main>
          <section className="salom-panel max-w-[1220px] mx-auto px-4 sm:px-6 pt-2" aria-label="Shaxsiy panel">
            <div className="flex items-center justify-between gap-3 flex-wrap mt-1"><h2 className="text-[22px] sm:text-[26px] font-extrabold text-white">Salom, {displayName}! 👋</h2><span className="inline-flex items-center gap-1.5 bg-orange-500/20 border border-orange-400/40 text-orange-200 text-[13px] font-extrabold px-3 py-1.5 rounded-full"><Flame size={15}/> {streakDays} kunlik seriya</span></div>
          </section>
          <section className="hero-compact max-w-[1220px] mx-auto px-4 sm:px-6 pt-3 sm:pt-4 pb-3 relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,580px)] lg:items-start">
            <div className="text-left">
              <span className={`inline-flex items-center gap-1.5 ${GLASS_SOFT} text-white text-[13px] font-extrabold px-3 py-1.5`}><Sparkles size={14} className="text-amber-300"/> Noldan • Amaliyot bilan • Bosqichma-bosqich</span>
              <h1 className="hero-title-polish text-[clamp(32px,4.2vw,46px)] leading-[1.08] font-extrabold tracking-[-0.02em] mt-3 text-white">Dasturlashni o‘rgan,<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#93C5FD] via-[#60A5FA] to-[#C084FC] drop-shadow-[0_6px_28px_rgba(96,165,250,0.45)]">kelajagingni qur</span></h1>
              <p className="text-[16px] sm:text-[17px] text-[#CBD5E1] font-medium leading-relaxed mt-3 max-w-[560px]">Noldan boshlab, amaliyot bilan dasturlashni o‘rganasan.</p>
              <div className="flex flex-wrap justify-start gap-3 mt-4">
                <button onClick={()=>goTab('courses')} className={`${BTN} px-6 py-3.5 text-[15px] inline-flex items-center gap-2`}>Kurslarni ko‘rish <ArrowRight size={18}/></button>
                <button onClick={()=>goTab('premium')} className="bg-gradient-to-r from-[#F59E0B] to-[#FACC15] text-slate-900 px-6 py-3.5 rounded-full font-bold text-[15px] inline-flex items-center gap-2 hover:shadow-[0_0_26px_rgba(245,158,11,0.6)] transition">👑 Premium olish</button>
              </div>
              <div className="hero-stats grid grid-cols-4 gap-1.5 sm:gap-2 mt-5 max-w-[340px] sm:max-w-[360px]">
                {[{v:'25 ta',l:'kurs'},{v:'120+',l:'dars'},{v:'25 ta',l:'real loyiha'},{v:'3400+',l:'o‘quvchi'}].map(s=>(<div key={s.l} className={`${GLASS} min-w-0 px-2 py-2 sm:px-2.5 sm:py-2.5`}><p className="text-[17px] sm:text-[19px] leading-none font-extrabold text-white [overflow-wrap:anywhere]">{s.v}</p><p className={`mt-1 text-[10px] sm:text-[11px] leading-tight font-bold ${MUTED} [overflow-wrap:anywhere]`}>{s.l}</p></div>))}
              </div>
              <div className="flex items-center justify-start gap-3 mt-4"><div className="flex -space-x-2">{['NX','JT','KR','SM'].map((x,i)=>(<span key={x} className="w-9 h-9 rounded-full border-2 border-white/40 text-white text-[11px] font-extrabold grid place-items-center" style={{background:['#2563EB','#92400E','#047857','#9D174D'][i]}}>{x}</span>))}</div><p className={`text-[15px] font-bold ${MUTED}`}><b className="text-white">3400+ o‘quvchi</b> bugun IDROK bilan kod yozmoqda</p></div>
            </div>
            <aside aria-label="Stikerlar va kartalar" className={`hero-stage mx-auto w-full max-w-[620px] select-none relative ${activeNote ? (activeNote.startsWith('card-') ? 'hero-note-card' : 'hero-note-sticker') : ''}`}>
              <div className={`hero-stage-inner flex flex-col gap-4 ${activeNote ? (activeNote.startsWith('card-') ? 'hero-note-card' : 'hero-note-sticker') : ''}`}>
              <div ref={heroRef} className="sticker-grid" aria-label="Dasturlash tillari">
                {[
                    {id:'js', label:'JavaScript', short:'JS', src:jsLogoUrl, text:'JavaScript sahifani jonlantiradi, tugmalar, animatsiyalar va server bilan aloqani boshqaradi, interaktiv saytlar uchun asosiy tildir.', above:false, bg:'#F7DF1E', border:'#F7DF1E', glow:'rgba(247,223,30,.65)', chipBorder:'#F7DF1E'},
                    {id:'python', label:'Python', short:'Py', src:pythonLogoUrl, text:'Python o‘rganishi oson, backend, botlar va ma’lumotlar tahlili uchun ishlatiladigan kuchli va mashhur dasturlash tilidir.', above:false, bg:'linear-gradient(135deg,#3776AB,#FFD43B)', border:'#FFD43B', glow:'rgba(55,118,171,.60)', chipBorder:'#FFD43B'},
                    {id:'html', label:'HTML', short:'HTML', src:htmlLogoUrl, text:'HTML saytning skeletidir, sarlavhalar, matnlar, rasmlar va tugmalarni joylashtirib sahifa tuzilishini yaratadi va brauzerga kontentni ko‘rsatadi.', above:false, bg:'#E34F26', border:'#E34F26', glow:'rgba(227,79,38,.60)', chipBorder:'#E34F26'},
                    {id:'css', label:'CSS', short:'CSS', src:cssLogoUrl, text:'CSS saytga ko‘rinish, shakl va tartib beradi, sahifani har qanday qurilmada chiroyli ko‘rsatishni ta’minlaydi.', above:true, bg:'#1572B6', border:'#1572B6', glow:'rgba(21,114,182,.60)', chipBorder:'#1572B6'},
                    {id:'node', label:'Node.js', short:'Node', src:nodeLogoUrl, text:'Node.js JavaScriptni serverda ishlatishga imkon beradi, tez API va real vaqtda ishlaydigan ilovalar yaratish uchun kerak.', above:true, bg:'#339933', border:'#339933', glow:'rgba(51,153,51,.60)', chipBorder:'#339933'},
                    {id:'git', label:'Git', short:'Git', src:gitLogoUrl, text:'Git kod o‘zgarishlarini saqlaydi, jamoa bilan birga ishlashni osonlashtiradi va xatolarni tez tuzatishga yordam beradi.', above:true, bg:'#F05032', border:'#F05032', glow:'rgba(240,80,50,.60)', chipBorder:'#F05032'},
                  ].map((s, si)=>(
                    <div key={s.id} data-sticker={s.id} className="relative select-none" style={{zIndex: activeNote===s.id ? 60 : 30}}>
                      <button onClick={()=>openNote(s.id)} aria-expanded={activeNote===s.id} aria-label={`${s.label} haqida izoh`} className={`sticker-card sticker-card-${s.id}`} style={{animationDelay:`${si * 0.55}s`, animationDuration:`${5.2 + (si % 3) * 0.7}s`, background:s.bg, borderColor:s.border, boxShadow:`0 0 22px ${s.glow}, 0 14px 26px rgba(0,0,0,.42)`, ['--sticker-bg' as any]:s.bg, ['--sticker-border' as any]:s.border, ['--sticker-glow' as any]:s.glow}}>
                        <span className="sticker-text" style={{color: s.id==='js' ? '#000000' : '#FFFFFF'}}>{s.label}</span>
                      </button>
                      {activeNote===s.id && (
                        <div role="note" className={`absolute z-[80] ${s.above ? 'bottom-[calc(100%+8px)]' : 'top-[calc(100%+8px)]'} ${noteLeaving ? 'note-panel-out' : 'note-panel'} w-[216px] sm:w-[232px] modern-toolbar`} style={{borderColor:s.border, boxShadow:`0 24px 50px rgba(0,0,0,.55), 0 0 26px ${s.glow}, inset 0 1px 0 rgba(255,255,255,.14)`, ['--toolbar-accent' as any]:s.border, ['--toolbar-glow' as any]:s.glow}}>
                          <div className="modern-toolbar-head"><span className="modern-toolbar-icon text-white" style={{background:s.bg, border:`1px solid ${s.border}`}}>{s.short}</span><span className="modern-toolbar-name">{s.label}</span><span className="modern-toolbar-role-wrap"><span className="modern-toolbar-badge" style={{background:'rgba(2,6,23,.45)', borderColor:s.chipBorder, boxShadow:`0 3px 8px ${s.glow}, inset 0 1px 0 rgba(255,255,255,.28)`}}>{toolbarRole(s.id).label}</span><span className="modern-toolbar-role-hint" style={{color:s.chipBorder}}>{toolbarRole(s.id).hint}</span></span></div>
                          <p className="modern-toolbar-text">{s.text}</p>
                          <button onClick={(e)=>{e.stopPropagation(); goToCourseFromNote(s.id);}} className="modern-toolbar-btn" style={{background:s.bg, boxShadow:`0 10px 22px ${s.glow}`}}>{NOTE_CTAS[s.id]?.label}</button>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
              <div className="hero-cards hero-cards-grid grid gap-3">
                <div data-sticker="card-live" className="relative order-1 w-[252px] max-w-full select-none shrink-0" style={{zIndex: activeNote==='card-live' ? 60 : 24, borderRadius:22}}>
                  <div className="floaty-soft" style={{animationDelay:'0.3s', animationDuration:'5.2s'}}>
                    <div onClick={()=>openNote('card-live')} role="button" tabIndex={0} onKeyDown={(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); openNote('card-live');}}} aria-expanded={activeNote==='card-live'} className="cursor-pointer rounded-[22px] border border-white/10 bg-[rgba(10,15,40,0.55)] p-3 backdrop-blur-md" style={{transform:'rotate(-2deg)'}}>
                      <span className="block bg-[rgba(10,15,40,0.78)] backdrop-blur-xl border border-[rgba(96,165,250,0.35)] rounded-[22px] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
                        <span className="flex items-center justify-between gap-2"><span className="text-white font-extrabold text-[17px]">Python Live <span className="text-[#93C5FD]">• Ultra</span></span><span className="flex items-center gap-1.5 text-[12px] font-bold text-rose-300"><span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"/>LIVE</span></span>
                        <span className="block text-[#E2E8F0] text-[14px] font-medium mt-2">Hozir 1.2k tomoshada • 16 kurs</span>
                        <span className="block h-2.5 bg-white/15 rounded-full overflow-hidden mt-3"><span className="block h-full w-[72%] bg-gradient-to-r from-[#2563EB] to-[#C084FC] rounded-full"/></span>
                        <button onClick={(e)=>{e.stopPropagation(); goTab('courses');}} className="block text-[#93C5FD] text-[13px] font-bold mt-2">Kurslarni ko‘rish →</button>
                      </span>
                    </div>
                  </div>
                  {activeNote==='card-live' && (
                    <div role="note" className={`absolute bottom-[calc(100%+8px)] left-0 note-panel ${noteLeaving ? 'note-panel-out' : ''} w-[216px] sm:w-[232px] modern-toolbar`}>
                      <div className="modern-toolbar-head"><span className="modern-toolbar-icon bg-[#FACC15] text-[#2563EB]">Py</span><span className="modern-toolbar-name">Python Live</span><span className="modern-toolbar-role-wrap"><span className="modern-toolbar-badge">AI&amp;Data</span><span className="modern-toolbar-role-hint">Sun’iy intellekt va ma’lumot</span></span></div>
                      <p className="modern-toolbar-text">Python Live jonli darslarda real kod yozishni ko‘rsatadi, savollaringizga darhol javob beradi va amaliyot orqali tez o‘rganishga yordam beradi.</p>
                      <button onClick={(e)=>{e.stopPropagation(); goToCourseFromNote('card-live');}} className="modern-toolbar-btn">{NOTE_CTAS['card-live']?.label}</button>
                    </div>
                  )}
                </div>
                <div data-sticker="card-cert" className="relative order-1 w-[252px] max-w-full select-none shrink-0" style={{zIndex: activeNote==='card-cert' ? 60 : 26, borderRadius:22}}>
                  <div className="floaty-soft" style={{animationDelay:'0.9s', animationDuration:'5.6s'}}>
                    <div onClick={()=>openNote('card-cert')} role="button" tabIndex={0} onKeyDown={(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); openNote('card-cert');}}} aria-expanded={activeNote==='card-cert'} className="cursor-pointer rounded-[22px] border border-white/10 bg-[rgba(10,15,40,0.55)] p-3 backdrop-blur-md" style={{transform:'rotate(2deg)'}}>
                      <span className="block bg-[rgba(10,15,40,0.78)] backdrop-blur-xl border border-[rgba(96,165,250,0.35)] rounded-[22px] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
                        <span className="flex items-center justify-between gap-2"><span className="text-white font-extrabold text-[17px]">Sertifikat</span><span className="inline-flex items-center gap-1 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-[12px] font-bold px-2.5 py-1 rounded-full"><Check size={13}/> Tasdiqlandi</span></span>
                        <span className="block text-white text-[15px] font-bold mt-3 tracking-wide">HTML &amp; CSS Asoslari</span>
                        <span className="block text-[#E2E8F0] text-[14px] font-medium mt-1">{displayName || 'IDROK o‘quvchisi'}</span>
                        <button onClick={(e)=>{e.stopPropagation(); openProfileModal('profile');}} className="block text-[#93C5FD] text-[13px] font-bold mt-2">Profilni ochish →</button>
                      </span>
                    </div>
                  </div>
                  {activeNote==='card-cert' && (
                    <div role="note" className={`absolute bottom-[calc(100%+8px)] right-0 note-panel-left ${noteLeaving ? 'note-panel-out-left' : ''} w-[216px] sm:w-[232px] modern-toolbar`}>
                      <div className="modern-toolbar-head"><span className="modern-toolbar-icon bg-amber-300 text-slate-900">✓</span><span className="modern-toolbar-name">Sertifikat</span><span className="modern-toolbar-role-wrap"><span className="modern-toolbar-badge">Frontend</span><span className="modern-toolbar-role-hint">Interfeys yasash</span></span></div>
                      <p className="modern-toolbar-text">Sertifikat o‘rgangan bilimingizni rasman tasdiqlaydi, portfolioingizni kuchaytiradi va ish beruvchiga tayyorgarligingizni aniq ko‘rsatadi hamda yangi imkoniyatlar eshigini ochadi.</p>
                      <button onClick={(e)=>{e.stopPropagation(); goToCourseFromNote('card-cert');}} className="modern-toolbar-btn">{NOTE_CTAS['card-cert']?.label}</button>
                    </div>
                  )}
                </div>
                <div data-sticker="card-growth" className="relative order-1 w-[252px] max-w-full select-none shrink-0" style={{zIndex: activeNote==='card-growth' ? 60 : 25, borderRadius:22}}>
                  <div className="floaty-soft" style={{animationDelay:'1.4s', animationDuration:'5s'}}>
                    <div onClick={()=>openNote('card-growth')} role="button" tabIndex={0} onKeyDown={(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); openNote('card-growth');}}} aria-expanded={activeNote==='card-growth'} className="cursor-pointer rounded-[22px] border border-white/10 bg-[rgba(10,15,40,0.55)] p-3 backdrop-blur-md" style={{transform:'rotate(-1deg)'}}>
                      <span className="block bg-[rgba(10,15,40,0.78)] backdrop-blur-xl border border-[rgba(96,165,250,0.35)] rounded-[22px] p-5 shadow-[0_20px_45px_rgba(0,0,0,0.45)]">
                        <span className="flex items-center gap-3"><span className="flex -space-x-2"><span className="w-9 h-9 rounded-full bg-[#2563EB] border-2 border-white/50 grid place-items-center text-white text-[12px] font-extrabold">NX</span><span className="w-9 h-9 rounded-full bg-[#7C3AED] border-2 border-white/50 grid place-items-center text-white text-[12px] font-extrabold">JT</span></span><span className="text-white font-extrabold text-[17px]">+32% o‘sish</span><span className="ml-auto bg-amber-300 text-slate-900 text-[12px] font-extrabold px-2.5 py-1 rounded-full">Level 5</span></span>
                        <span className="block text-[#E2E8F0] text-[14px] font-medium mt-2">XP 1240 • Reytingda yuqoriga ko‘tarilmoqda</span>
                        <button onClick={(e)=>{e.stopPropagation(); openProfileModal('profile');}} className="block text-[#93C5FD] text-[13px] font-bold mt-2">Profilni ochish →</button>
                      </span>
                    </div>
                  </div>
                  {activeNote==='card-growth' && (
                    <div role="note" className={`absolute bottom-[calc(100%+8px)] left-0 note-panel ${noteLeaving ? 'note-panel-out' : ''} w-[216px] sm:w-[232px] modern-toolbar`}>
                      <div className="modern-toolbar-head"><span className="modern-toolbar-icon bg-emerald-400 text-slate-900">↗</span><span className="modern-toolbar-name">Rivojlanish</span><span className="modern-toolbar-role-wrap"><span className="modern-toolbar-badge">Backend</span><span className="modern-toolbar-role-hint">Server va baza</span></span></div>
                      <p className="modern-toolbar-text">Bu ko‘rsatkich taraqqiyotingiz o‘sayotganini ko‘rsatadi, muntazam mashq natija berayotganini tasdiqlaydi va oldinga harakatlanishga motivatsiya beradi.</p>
                      <button onClick={(e)=>{e.stopPropagation(); goToCourseFromNote('card-growth');}} className="modern-toolbar-btn">{NOTE_CTAS['card-growth']?.label}</button>
                    </div>
                  )}
                </div>
              </div>
              </div>
            </aside>
          </section>

          <section className="max-w-[1220px] mx-auto px-4 sm:px-6 pb-4 pt-4">
            <p className="text-[13px] font-extrabold tracking-widest text-[#93C5FD]">O‘RGANISH YO‘LI</p>
            <h2 className="text-[26px] sm:text-3xl font-extrabold mt-1 text-white">4 bosqichda — noldan nashrgacha</h2>
            <p className={`text-[15px] font-medium ${MUTED} mt-2 max-w-[640px]`}>Har bir bosqichni bosing — nima o‘rganishingiz, qancha vaqt ketishi va qanday natija chiqishi ko‘rinadi.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
              {ROADMAP.map((s)=>(
                <button key={s.n} onClick={()=>setOpenStage(openStage===s.n?null:s.n)} className={`text-left rounded-[18px] p-5 border transition-all duration-300 hover:-translate-y-1 ${openStage===s.n?'bg-gradient-to-b from-[#2563EB] to-[#7C3AED] text-white border-transparent shadow-[0_0_30px_rgba(59,130,246,0.5)]':GLASS+' text-white hover:border-[#60A5FA]/60'}`}>
                  <span className={`inline-flex w-10 h-10 rounded-full items-center justify-center font-extrabold ${openStage===s.n?'bg-white text-slate-900':'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white'}`}>{s.n}</span>
                  <h3 className="font-extrabold text-[17px] leading-snug mt-4 [overflow-wrap:anywhere] text-white">{s.title}</h3>
                  <p className={`text-[14px] font-medium mt-1 ${openStage===s.n?'text-white':MUTED}`}>{s.subtitle}</p>
                  {openStage===s.n && <div className="mt-4"><p className="text-[14px] font-medium leading-relaxed text-white">{s.desc}</p><div className="flex flex-wrap gap-1.5 mt-3">{s.tech.map(t=>(<span key={t} className="bg-white text-slate-900 px-2.5 py-1 rounded-full text-[12px] font-bold">{t}</span>))}</div><p className="text-[13px] font-bold mt-3 text-amber-200">{s.time} • Natija: {s.result}</p></div>}
                  <span className={`inline-flex items-center gap-1 text-[14px] font-bold mt-4 text-white`}>{openStage===s.n?'Yopish':'Batafsil'} <ChevronDown size={15} className={openStage===s.n?'rotate-180':''}/></span>
                </button>
              ))}
            </div>
          </section>



        </main>
      </FlowSection>
      <FlowSection id="directions" scrollY={scrollY}>
        <main className="max-w-[1220px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flow-sticky"><p className="text-[13px] font-extrabold tracking-widest text-[#93C5FD]">YO‘NALISHLAR</p>
          <h1 className="flow-title text-[28px] sm:text-4xl font-extrabold mt-1 text-white">O‘zingga mos yo‘nalishni tanla</h1></div>
          <p className={`text-[15px] font-medium ${MUTED} mt-2 max-w-[640px]`}>Har bir yo‘nalish kartasini bos — uning vazifasi yozilgan toolbar chiqadi, “Kursga o‘tish” ni bos — shu yo‘nalishning kurslari filtrlangan holda Kurslar bo‘limi ochiladi.</p>
          <div className="direction-scroll mt-6 flex gap-4 overflow-x-auto pb-2 pt-2 px-1 snap-x snap-mandatory lg:grid lg:grid-cols-5 lg:overflow-visible lg:snap-none lg:px-0">{DIRECTIONS.map((d,i)=>{
            const isActive = filter===d.filter;
            const shortDesc = d.id==='frontend' ? 'Ko‘rinadigan qism — interfeyslar.' : d.id==='backend' ? 'Server, baza va API.' : d.id==='python' ? 'Mantiq, botlar, avtomat.' : d.id==='mobil' ? 'iOS va Android ilovalari.' : 'G‘oyadan nashrgacha to‘liq yo‘l.';
            return (
            <div key={d.id} data-direction-card={d.id} onClick={()=>openDirection(d.id)} onKeyDown={(e)=>{if(e.key==='Enter'||e.key===' '){e.preventDefault(); openDirection(d.id);}}} role="button" tabIndex={0} aria-expanded={activeDirection===d.id} aria-pressed={isActive} className={`direction-card ${isActive ? 'direction-card-active' : ''} relative w-[78vw] max-w-[320px] shrink-0 snap-start sm:w-[320px] lg:w-auto lg:max-w-none lg:min-w-0 h-[228px] min-h-[228px] max-h-[228px] px-5 py-5 text-left flex flex-col items-start gap-2.5 backdrop-blur-xl border cursor-pointer`} style={{borderRadius:18, animationDelay:`${i*0.09}s`, borderColor: isActive ? '#60A5FA' : 'rgba(37,99,235,0.12)'}}>
              <span className="flex items-center gap-3 w-full"><span className="direction-icon-wrap w-12 h-12 shrink-0 rounded-[16px] bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white grid place-items-center shadow-[0_8px_18px_rgba(37,99,235,0.45)]"><span className="direction-icon grid place-items-center [&>svg]:w-[24px] [&>svg]:h-[24px]">{d.icon}</span></span><span className="block font-extrabold text-[18px] leading-tight text-white [overflow-wrap:anywhere]">{d.title}</span></span>
              <span className={`block text-[13.5px] font-medium ${MUTED} leading-relaxed [overflow-wrap:anywhere]`}>{shortDesc}</span>
              <span className="block text-[12px] font-bold text-[#93C5FD] bg-white/[0.07] border border-white/10 rounded-full px-3 py-1">{d.courses}</span>
              <span className="direction-cta mt-auto w-full px-4 py-2.5 rounded-full text-[13.5px] font-bold inline-flex items-center justify-center gap-1.5 text-white">Kurslarni ko‘rish <ArrowRight size={15}/></span>
              {activeDirection===d.id && (
                <div role="note" className={`absolute left-2 right-2 top-2 z-[80] ${directionLeaving ? 'note-panel-out' : 'note-panel'} modern-toolbar`} onClick={(e)=>e.stopPropagation()}>
                  <div className="modern-toolbar-head"><span className="modern-toolbar-icon bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white">{d.title.slice(0,2)}</span><span className="modern-toolbar-name">{d.title}</span><span className="modern-toolbar-role-wrap"><span className="modern-toolbar-badge">{DIRECTION_ROLES[d.id]?.label || d.title}</span><span className="modern-toolbar-role-hint">{DIRECTION_ROLES[d.id]?.hint || ''}</span></span></div>
                  <p className="modern-toolbar-text">{d.desc}</p>
                  <button onClick={(e)=>{e.stopPropagation(); goToCourseFromDirection(d);}} className="modern-toolbar-btn">Kursga o‘tish →</button>
                </div>
              )}
            </div>
            );
          })}</div>
        </main>
      </FlowSection>
      <FlowSection id="courses" scrollY={scrollY}>
        <main className="max-w-[1220px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"><div><p className="text-[13px] font-extrabold tracking-[0.22em] text-[#93C5FD]">MASHHUR KURSLAR</p><h1 className="flow-title text-[28px] sm:text-4xl font-extrabold mt-1 text-white">Bugun nimani kodlaymiz?</h1></div><div className="flex flex-wrap items-center gap-2 shrink-0"><label className={`inline-flex items-center gap-2 ${GLASS} px-4 py-2.5 font-bold text-[15px] text-white cursor-pointer`}><input type="checkbox" checked={showFavOnly} onChange={e=>setShowFavOnly(e.target.checked)} className="accent-[#2563EB] w-4 h-4"/><Heart size={16} className="text-rose-400"/> Faqat sevimlilar</label><button onClick={()=>{ setFilter('Barchasi'); setSearch(''); setShowFavOnly(false); setPriceFilter('Barchasi'); }} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 border border-white/20 text-white font-bold text-[15px] hover:bg-white/15 transition">Barchasi <ArrowRight size={16}/></button></div></div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-4 -mx-1 px-1">{CATEGORIES.map(cat=>(<button key={cat} onClick={()=>{ if(cat==='Barchasi'){ setFilter('Barchasi'); setSearch(''); setShowFavOnly(false); } else { setFilter(cat); } }} aria-pressed={filter===cat} className={`whitespace-nowrap px-4 py-2.5 rounded-full text-[15px] font-bold border transition ${filter===cat?'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white border-transparent shadow-[0_0_20px_rgba(59,130,246,0.5)]':'bg-white/10 border-white/20 text-[#E2E8F0] hover:bg-white/15'}`}>{cat}</button>))}</div>
          <div className="flex flex-wrap items-center gap-2 mt-1"><span className="text-[13px] font-extrabold text-[#93C5FD]">Narx:</span>{(['Barchasi','Bepul','Premium'] as const).map(p=>(<button key={p} onClick={()=>setPriceFilter(p)} aria-pressed={priceFilter===p} className={`px-3.5 py-2 rounded-full text-[13px] font-bold border transition ${priceFilter===p?'bg-emerald-400 text-slate-900 border-transparent':'bg-white/10 border-white/20 text-white hover:bg-white/15'}`}>{p==='Barchasi'?'Barchasi':p}</button>))}</div>
          <p className="text-[14px] font-bold text-white mt-3" aria-live="polite">{filter==='Barchasi' && !search && !showFavOnly ? `Barchasi tanlandi — ${COURSES.length} ta kurs ko‘rsatilmoqda` : `${filtered.length} ta kurs ko‘rsatilmoqda`}</p>
          <div className={`flex items-center gap-2 ${GLASS} px-4 py-3 mb-4`}><Search size={18} className="text-[#93C5FD]"/><label htmlFor="courses-search" className="sr-only">Kurs qidiring</label><input id="courses-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Kurs qidiring…" className="outline-none w-full bg-transparent text-[15px] font-medium text-white placeholder:text-[#94A3B8]"/></div>
          {filtered.length===0 ? <div className={`${GLASS} p-10 text-center`}><p className="text-3xl">🔍</p><h3 className="font-extrabold text-[20px] mt-3 text-white">Hech narsa topilmadi</h3><p className={`${MUTED} text-[15px] font-medium mt-1`}>Qidiruv yoki filtrni o‘zgartirib ko‘ring.</p><button onClick={()=>{setSearch(''); setFilter('Barchasi'); setShowFavOnly(false)}} className={`${BTN} mt-4 px-5 py-2.5 text-[15px]`}>Filtrlarni tozalash</button></div> : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">{filtered.map(c=> <CourseCard key={c.id} c={c} fav={favorites.includes(c.id)} onFav={()=>toggleFav(c.id)} onOpen={()=>openCourse(c)} progress={Math.round((c.lessons.filter(l=>completed.includes(l.id)).length/c.lessons.length)*100)}/>)}</div>}
        </main>
      </FlowSection>
      <FlowSection id="premium" scrollY={scrollY}>
        <main className="max-w-[1640px] mx-auto px-4 sm:px-6 py-6 sm:py-8 overflow-x-clip">
          <div className="flow-sticky text-center"><p className="text-[13px] font-extrabold tracking-widest text-[#93C5FD]">PREMIUM</p>
          <h1 className="flow-title text-[28px] sm:text-4xl font-extrabold mt-1 text-white">Premium bilan tezroq o‘rgan</h1></div>
          <p className={`text-[15px] font-medium ${MUTED} mt-2 max-w-[640px] mx-auto text-center`}>Bitta obuna — hamma kurs, mentor va sertifikat.</p>
          <p className="text-[14px] font-bold text-[#CBD5E1] mt-3 max-w-[640px] mx-auto text-center">Kartani bosing — u bo‘rtib chiqadi. Yana bossangiz yoki boshqa joyni bossangiz joyiga qaytadi.</p>
          <div className="premium-deck relative mt-[34px]">
            {([
              {id:'monthly' as const, title:'1 oylik premium', price:'99 000 so‘m', per:'99 000 so‘m / 1 oy', note:'Boshlash uchun qulay tanlov', features:['Barcha kurslarga kirish','Sertifikat olish','Mentor yordami','Yopiq hamjamiyat'], popular:false, badge:'', codeLines:['const premium = true;','if (premium) {','  unlock();','}'], tier:1 as const},
              {id:'yearly' as const, title:'1 yillik premium', price:'799 000 so‘m', per:'66 500 so‘m / oy', note:'Eng yaxshi tanlov — 1 yil to‘liq', features:['Barcha kurslar + Jonli darslar','Shaxsiy mentor yordami','Cheksiz sertifikat','Karyera yo‘l xaritasi','VIP hamjamiyat','Loyihalar tekshiruvi'], popular:true, badge:'Eng yaxshi tanlov', codeLines:['class Premium {','  constructor() {','    this.level = "GOLD";','    this.crown = "👑";','  }','  unlock() {','    return "Barcha kurslar ochiq";','  }','}','new Premium().unlock();','// Premium faollashtirildi ✓'], tier:3 as const},
              {id:'quarterly' as const, title:'3 oylik premium', price:'249 000 so‘m', per:'83 000 so‘m / oy', note:'Eng ommaviy va foydali', features:['Barcha kurslar + Jonli darslar','Mentor yordami','Sertifikat olish','Ishga joylashishda yordam'], popular:false, badge:'17% chegirma', codeLines:['const plan = "3 oy";','function start() {','  const user = loadUser();','  return user.level + 1;','}','start();','// Premium faollashtirildi ✓'], tier:2 as const},
            ]).map((plan, idx)=>{
              const focused = premiumFocus===plan.id;
              const isYearly = plan.popular;
              return (
                <div key={plan.id} data-premium-card={plan.id} className={`premium-deck-item premium-deck-${plan.id} ${focused ? 'premium-deck-active' : ''}`} style={{animationDelay:`${idx*0.7}s`}}>
                  <PremiumCard plan={plan} focused={focused} active={premiumActive && premiumPlanId===plan.id} onFocus={()=>setPremiumFocus(cur=>cur===plan.id ? null : plan.id)} onActivate={()=>{ setPremiumError(''); setPendingPremium({id:plan.id, title:plan.title, price:plan.price, per:plan.per}); }} />
                </div>
              );
            })}
          </div>
          <p className="sr-only">Premium rejasini tanlash uchun kartani bosing.</p>
        </main>
      </FlowSection>
      <FlowSection id="editor" scrollY={scrollY}>
        <main className="max-w-[1220px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="rounded-[20px] p-6 sm:p-8 text-white card-shadow border border-[rgba(96,165,250,0.35)]" style={{background:DARK_GRADIENT}}>
            <span className="bg-white text-slate-900 px-3 py-1 rounded-full text-[13px] font-bold inline-flex items-center gap-1.5"><Code2 size={14}/> KOD MUHARRIRI • JONLI</span>
            <h1 className="text-[28px] sm:text-4xl font-extrabold leading-tight mt-4 text-white">Yozing — darhol ko‘ring</h1>
            <p className="text-white text-[16px] font-medium leading-relaxed mt-2 max-w-[620px]">HTML, CSS va JS ni alohida yozing, “Ishga tushirish” ni bosing. Tayyor namunadan boshlash ham mumkin — kod avtomatik to‘ladi.</p>
            <div className="flex flex-wrap gap-2 mt-5">{EDITOR_TEMPLATES.map(t=>(<button key={t.name} onClick={()=>{setEdHtml(t.html); setEdCss(t.css); setEdJs(t.js); setPreview(null); showToast(`${t.name} namunasi yuklandi`);}} className={`${BTN_DARK} px-4 py-2.5 text-[14px]`}>{t.name}</button>))}</div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 mt-4">
            {[{label:'HTML',val:edHtml,set:setEdHtml,ph:'<h1>Salom</h1>'},{label:'CSS',val:edCss,set:setEdCss,ph:'h1 { color: #2563EB; }'},{label:'JavaScript',val:edJs,set:setEdJs,ph:'console.log("Salom")'}].map(f=>(
              <div key={f.label} className={`${GLASS} overflow-hidden`}>
                <div className="flex items-center justify-between px-4 py-3 bg-white/[0.06] border-b border-white/10"><span className="font-extrabold text-[15px] text-white">{f.label}</span><span className="text-[12px] font-bold bg-white text-slate-900 px-2 py-1 rounded-full">{f.label}</span></div>
                <textarea value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} spellCheck={false} className="w-full h-[240px] bg-[#020617] text-[#A5F3FC] font-mono text-[13px] leading-relaxed p-4 outline-none resize-y placeholder:text-slate-500" aria-label={`${f.label} kodi`}/>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3 mt-4"><button onClick={runEditor} className={`${BTN} px-6 py-3.5 text-[15px] inline-flex items-center gap-2`}><CirclePlay size={18}/> Ishga tushirish</button><button onClick={()=>{setEdHtml(''); setEdCss(''); setEdJs(''); setPreview(null);}} className="bg-white/10 border border-white/25 text-white px-5 py-3.5 rounded-full font-bold text-[15px] hover:bg-white/20 transition">Tozalash</button><p className={`text-[14px] font-medium ${MUTED}`}>Maslahat: avval namunani yuklang, keyin o‘zgarishlarni sinab ko‘ring.</p></div>

          <div className={`${GLASS} overflow-hidden mt-4`}>
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10"><span className="font-extrabold text-[15px] text-white inline-flex items-center gap-2"><Eye size={18} className="text-[#93C5FD]"/> Jonli preview</span><span className="text-[13px] font-bold text-emerald-200 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full">{preview?'Ishga tushdi':'Hali ishga tushirilmadi'}</span></div>
            {previewError && <div className="mx-5 mt-4 bg-rose-500/20 border border-rose-400/40 text-rose-100 text-[14px] font-bold rounded-2xl px-4 py-3">Kodda xato: {previewError}</div>}
            <div className="p-5 sm:p-6 bg-[rgba(10,15,40,0.72)] min-h-[280px] rounded-b-[20px]"><div ref={previewRef} className="min-h-[220px] text-white">{!preview && <div className="h-full min-h-[220px] grid place-items-center text-center"><div><p className="text-[28px]">👀</p><p className="font-bold text-[16px] text-white mt-2">Preview shu yerda ko‘rinadi</p><p className="text-[14px] font-medium text-[#CBD5E1] mt-1">“Ishga tushirish” ni bosing — kodingiz jonli ishlaydi.</p></div></div>}</div></div>
          </div>
        </main>
      </FlowSection>
      <FlowSection id="quiz" scrollY={scrollY}>
        <main className="max-w-[920px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flow-sticky"><p className="text-[13px] font-extrabold tracking-widest text-[#93C5FD]">TESTLAR</p>
          <h1 className="flow-title text-[28px] sm:text-4xl font-extrabold mt-1 text-white">Bilimingizni sinang</h1></div>
          {!quizSubject ? (
            <div className="grid sm:grid-cols-3 gap-4 mt-6">{Object.keys(QUIZZES).map((s,i)=>(
              <button key={s} onClick={()=>startQuiz(s)} className={`text-left ${GLASS} p-5 hover:-translate-y-1 hover:border-[#60A5FA]/60 transition-all duration-300`}>
                <div className="w-12 h-12 rounded-2xl grid place-items-center text-white" style={{background:DARK_GRADIENT}}>{i===0?<FileCode2/>:i===1?<Palette/>:<Code2/>}</div>
                <h3 className="font-extrabold text-[19px] mt-4 text-white">{s}</h3><p className={`text-[15px] font-medium ${MUTED} mt-1`}>5 ta savol • Kodli savollar • Darhol natija</p>
                <p className="text-[15px] font-bold text-[#93C5FD] mt-3">Eng yaxshi natija: {quizBest[s] ? `${quizBest[s]}%` : 'hali yo‘q'} →</p>
              </button>
            ))}
            <div className={`sm:col-span-3 ${GLASS} p-5 flex gap-3`}><Target className="text-[#93C5FD] shrink-0"/><p className="text-[15px] font-medium leading-relaxed text-white"><b>Qanday ishlaydi?</b> Har bir savolda bitta javob tanlang. To‘g‘ri javob yashil, noto‘g‘ri javob qizil bo‘ladi va to‘g‘ri tushuntirish ko‘rinadi. Oxirida foiz va xabar chiqadi.</p></div>
            </div>
          ) : finished ? (
            <div className={`${GLASS} p-6 sm:p-10 text-center mt-6`}>
              <div className="w-24 h-24 mx-auto rounded-full grid place-items-center bg-gradient-to-r from-[#2563EB] to-[#7C3AED] shadow-[0_0_30px_rgba(59,130,246,0.6)]"><span className="text-3xl font-extrabold text-white">{Math.round((score/currentQuiz.length)*100)}%</span></div>
              <h2 className="text-2xl sm:text-3xl font-extrabold mt-4 text-white">{score===5?'Ajoyib! Siz zo‘rsiz! 🏆':score>=3?'Yaxshi natija! Yana ozgina qoldi. 💪':'Tushkunlikka tushmang — darslarni qayta ko‘ring. 📚'}</h2>
              <p className={`${MUTED} text-[15px] font-medium mt-2`}>To‘g‘ri javoblar: <b className="text-white">{score} / {currentQuiz.length}</b> • Fan: {quizSubject}</p>
              <div className="flex flex-wrap justify-center gap-3 mt-6"><button onClick={resetQuiz} className={`${BTN} px-6 py-3 text-[15px] inline-flex items-center gap-2`}><RotateCcw size={17}/> Qayta urinish</button><button onClick={()=>setQuizSubject(null)} className="border-2 border-white/30 bg-white/10 text-white px-6 py-3 rounded-full font-bold text-[15px]">Boshqa fan</button><button onClick={()=>{setQuizSubject(null); goTab('courses')}} className={`${BTN_DARK} px-6 py-3 text-[15px]`}>Kurslarga qaytish</button></div>
            </div>
          ) : (
            <div className="mt-6">
              <div className="flex items-center justify-between gap-3"><button onClick={()=>setQuizSubject(null)} className="inline-flex items-center gap-1 font-bold text-[#93C5FD] text-[15px]"><ChevronLeft size={18}/> Fanlar</button><span className={`text-[15px] font-bold ${GLASS} px-3 py-1.5 text-white`}>{quizSubject} • {quizIndex+1} / {currentQuiz.length}</span></div>
              <div className="h-2.5 bg-white/15 rounded-full overflow-hidden mt-4"><div className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] transition-all" style={{width:`${((quizIndex)/currentQuiz.length)*100}%`}}/></div>
              <div className={`${GLASS} p-5 sm:p-8 mt-4`}>
                <span className="text-[13px] font-extrabold text-[#93C5FD] tracking-widest">{quizIndex+1}-SAVOL</span>
                <h2 className="text-[20px] sm:text-2xl font-extrabold leading-snug mt-2 text-white [overflow-wrap:anywhere]">{currentQ.q}</h2>
                {currentQ.code && <pre className="bg-[#020617] text-[#A5F3FC] text-[14px] leading-relaxed p-4 rounded-2xl overflow-x-auto font-mono mt-4 whitespace-pre-wrap [overflow-wrap:anywhere]">{currentQ.code}</pre>}
                <div className="grid gap-2.5 mt-6">{currentQ.options.map((o,i)=>{
                  const isPicked = picked===i; const isCorrect = i===currentQ.correct;
                  let cls='bg-white/[0.07] border-white/15 text-white';
                  if(picked!==null){ if(isCorrect) cls='bg-emerald-500/25 border-emerald-400 text-emerald-100'; else if(isPicked) cls='bg-rose-500/25 border-rose-400 text-rose-100'; else cls='bg-white/[0.04] border-white/10 text-[#94A3B8] opacity-80'; }
                  return <button key={o} onClick={()=>pickOption(i)} disabled={picked!==null} className={`flex items-center gap-3 text-left w-full border-2 rounded-2xl px-4 py-3.5 font-bold text-[15px] transition ${cls}`}><span className="w-8 h-8 rounded-full bg-white text-slate-900 border border-white/20 grid place-items-center shrink-0 text-[15px] font-extrabold">{['A','B','C','D'][i]}</span><span className="[overflow-wrap:anywhere] flex-1">{o}</span>{picked!==null && isCorrect && <CheckCircle2 className="text-emerald-300 shrink-0"/>}{picked!==null && isPicked && !isCorrect && <X className="text-rose-300 shrink-0"/>}</button>
                })}</div>
                {picked!==null && <div className={`rounded-2xl p-4 mt-4 text-[15px] font-bold leading-relaxed border ${picked===currentQ.correct?'bg-emerald-500/20 text-emerald-100 border-emerald-400/40':'bg-rose-500/20 text-rose-100 border-rose-400/40'}`}><b>{picked===currentQ.correct?'To‘g‘ri! 🎉':'Noto‘g‘ri.'}</b> {currentQ.explain}</div>}
                <div className="flex justify-between mt-6"><span className={`text-[15px] font-bold ${MUTED} self-center`}>Ball: {score}</span><button onClick={nextQuiz} disabled={picked===null} className={`${BTN} disabled:opacity-40 px-6 py-3 text-[15px] inline-flex items-center gap-2`}>{quizIndex+1===currentQuiz.length?'Natijani ko‘rish':'Keyingi savol'} <ChevronRight size={18}/></button></div>
              </div>
            </div>
          )}
        </main>
      </FlowSection>
      <FlowSection id="rating" scrollY={scrollY}>
        <main className="max-w-[920px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flow-sticky flex flex-col sm:flex-row sm:items-end justify-between gap-3"><div><p className="text-[13px] font-extrabold tracking-widest text-[#93C5FD]">REYTING</p><h1 className="flow-title text-[28px] sm:text-4xl font-extrabold mt-1 text-white">Haftaning eng faol dasturchilari</h1></div><span className="bg-amber-300 text-slate-900 text-[13px] font-extrabold px-3 py-1.5 rounded-full self-start sm:self-auto">🏆 Yangilanadi: har dushanba</span></div>
          <div className="grid grid-cols-3 gap-3 mt-6">{LEADERS.slice(0,3).map((l,i)=>(<div key={l.name} className={`rounded-[20px] p-4 text-center border ${i===0?'text-white border-[rgba(96,165,250,0.45)] order-2 shadow-[0_0_30px_rgba(59,130,246,0.45)]':GLASS+' order-1 sm:order-none'} ${i===1?'order-1':''} ${i===2?'order-3':''}`} style={i===0?{background:DARK_GRADIENT}:undefined}><div className="text-2xl">{i===0?'🥇':i===1?'🥈':'🥉'}</div><div className="w-12 h-12 mx-auto mt-2 rounded-full grid place-items-center font-extrabold text-white border border-white/30" style={{background:l.color}}>{l.name.split(' ').map(w=>w[0]).join('')}</div><p className="font-extrabold mt-2 text-[15px] text-white">{l.name}</p><p className={`text-[14px] font-bold ${i===0?'text-white':MUTED}`}>{l.points} ball</p>{i===0 && <span className="inline-block mt-2 bg-white text-slate-900 text-[11px] font-extrabold px-2 py-0.5 rounded-full">SIZNING O‘RNINGIZ</span>}</div>))}</div>
          <div className={`${GLASS} overflow-hidden mt-4`}>
            <div className="overflow-x-auto"><table className="w-full min-w-[560px] text-left text-[15px]"><thead><tr className="bg-white/[0.06] text-[#E2E8F0] text-[13px]"><th className="px-5 py-3 font-bold">O‘rin</th><th className="px-3 py-3 font-bold">Dasturchi</th><th className="px-3 py-3 font-bold">Tugatgan dars</th><th className="px-3 py-3 font-bold">Ball</th><th className="px-3 py-3 font-bold">Medal</th></tr></thead><tbody>
              {LEADERS.map((l,i)=>(<tr key={l.name} className="border-t border-white/10"><td className="px-5 py-4 font-extrabold text-white">{i+1}</td><td className="px-3 py-4"><span className="flex items-center gap-2 font-bold text-white"><span className="w-9 h-9 rounded-full grid place-items-center text-white text-[13px] font-extrabold" style={{background:l.color}}>{l.name.split(' ').map(w=>w[0]).join('')}</span>{l.name}{i===0 && <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-[11px] px-2 py-0.5 rounded-full font-bold">SIZ</span>}</span></td><td className="px-3 py-4 font-bold text-[#E2E8F0]">{l.lessons} ta</td><td className="px-3 py-4 font-extrabold text-[#93C5FD]">{l.points}</td><td className="px-3 py-4">{i===0?'🥇':i===1?'🥈':i===2?'🥉':'—'}</td></tr>))}
              <tr className="bg-amber-500/15 border-t-2 border-amber-400/50"><td className="px-5 py-4 font-extrabold text-white">5</td><td className="px-3 py-4"><span className="flex items-center gap-2 font-bold text-white"><span className="w-9 h-9 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] grid place-items-center text-white text-[13px] font-extrabold">{profileInitials}</span>{displayName} <span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-[11px] px-2 py-0.5 rounded-full font-bold">SIZ</span></span></td><td className="px-3 py-4 font-bold text-[#E2E8F0]">{myLessonsDone} ta</td><td className="px-3 py-4 font-extrabold text-[#93C5FD]">{myPoints}</td><td className="px-3 py-4">⭐</td></tr>
            </tbody></table></div>
          </div>
          <p className={`text-center text-[15px] font-medium ${MUTED} mt-4`}>Har bir tugatgan darsingiz <b className="text-white">+10 ball</b>, har bir loyiha vazifasi <b className="text-white">+5 ball</b> beradi. 4-o‘ringa chiqish uchun yana <b className="text-white">{Math.max(0,2050-myPoints)} ball</b> kerak.</p>
        </main>
      </FlowSection>
      <FlowSection id="profile" scrollY={scrollY}>
        <main className="max-w-[1220px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className={`${GLASS} p-5 sm:p-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center`}>
            <div className="flex items-center gap-4"><div className="w-[72px] h-[72px] rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] grid place-items-center text-white text-2xl font-extrabold shrink-0 shadow-[0_0_26px_rgba(59,130,246,0.55)]">{profileInitials}</div><div><h1 className="text-2xl font-extrabold text-white [overflow-wrap:anywhere]">Salom, {displayName}!</h1><p className={`text-[15px] font-medium ${MUTED} [overflow-wrap:anywhere]`}>{displayName} • {trackLabel} yo‘nalishi • 7 kunlik seriya 🔥 • 1-o‘rin</p><p className="text-[14px] font-bold mt-1"><span className="bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white px-2.5 py-1 rounded-full text-[12px]">{trackLabel} yo‘nalishi</span> <span className="text-emerald-300">{saveState==='saving'?'Saqlanmoqda…':saveState==='saved'?'✓ Taraqqiyot saqlandi':saveState==='error'?'Saqlashda xatolik — qayta urinib ko‘ring':'Taraqqiyotingiz avtomatik saqlanadi'}</span></p></div></div>
            <div className="flex gap-2 ml-auto"><button onClick={()=>goTab('courses')} className={`${BTN} px-4 py-2.5 text-[15px]`}>O‘qishni davom ettirish</button><button onClick={()=>goTab('courses')} className="border border-white/25 bg-white/10 text-white px-4 py-2.5 rounded-full font-bold text-[15px]">Kurslar</button></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-4 mt-4">
            <div className={`${GLASS} p-5 flex items-center gap-4`}>
              <div className="relative w-[110px] h-[110px] shrink-0"><svg viewBox="0 0 120 120" className="w-full h-full -rotate-90"><circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="12"/><circle cx="60" cy="60" r="52" fill="none" stroke="#60A5FA" strokeWidth="12" strokeLinecap="round" strokeDasharray={`${(totalProgress/100)*326.7} 326.7`}/></svg><div className="absolute inset-0 grid place-items-center text-center"><span className="font-extrabold text-[20px] text-white">{totalProgress}%</span></div></div>
              <div><h3 className="font-extrabold text-[18px] leading-tight text-white">Umumiy taraqqiyot</h3><p className={`text-[15px] font-medium ${MUTED} mt-1`}>{completed.length} / {totalLessons} dars tugatildi</p><p className="text-[14px] font-bold text-[#93C5FD] mt-2">{completed.length===0?'Birinchi darsni bugun boshlang →':'Davom eting, zo‘r ketyapsiz!'}</p></div>
            </div>
            <div className={`${GLASS} p-5`}><h3 className="font-extrabold text-[18px] text-white flex items-center gap-2"><BarChart3 className="text-[#93C5FD]"/> Haftalik kod yozish</h3><div className="flex items-end gap-2 h-[90px] mt-4">{WEEK.map((v,i)=>(<div key={i} className="flex-1 flex flex-col items-center gap-1"><div className={`w-full rounded-t-lg ${i===3?'bg-amber-400':'bg-gradient-to-t from-[#2563EB] to-[#7C3AED]'}`} style={{height:`${v*0.75}px`}} title={`${DAYS[i]}: ${v} daqiqa`}></div><span className={`text-[11px] font-bold ${MUTED}`}>{DAYS[i]}</span></div>))}</div><p className={`text-[14px] font-medium ${MUTED} mt-2`}>Bu hafta jami: <b className="text-white">8 soat 30 daqiqa kod</b></p></div>
            <div className="text-white rounded-[20px] card-shadow p-5 border border-[rgba(96,165,250,0.35)]" style={{background:DARK_GRADIENT}}><h3 className="font-extrabold text-[18px] text-white flex items-center gap-2"><Award/> Sertifikatlar</h3><p className="text-white text-[15px] font-medium mt-1 [overflow-wrap:anywhere]">Egasi: {displayName}</p><p className="text-white text-[14px] font-medium mt-1">2 ta sertifikat qo‘lga kiritildi</p><div className="space-y-2 mt-3"><div className="bg-white/10 border border-white/15 rounded-2xl p-3 flex items-center gap-3"><span className="text-2xl">🌐</span><div><p className="font-bold text-[15px] text-white">HTML & CSS Asoslari</p><p className="text-[14px] font-medium text-[#CBD5E1]">{displayName} • Tugatildi • 2026-yil</p></div><span className="ml-auto text-[13px] font-bold bg-amber-300 text-slate-900 px-2 py-1 rounded-full">PDF</span></div><div className="bg-white/10 border border-white/15 rounded-2xl p-3 flex items-center gap-3"><span className="text-2xl">⚡</span><div><p className="font-bold text-[15px] text-white">JavaScript Boshlang‘ich</p><p className="text-[14px] font-medium text-[#CBD5E1]">{displayName} • Tugatildi • 2026-yil</p></div><span className="ml-auto text-[13px] font-bold bg-amber-300 text-slate-900 px-2 py-1 rounded-full">PDF</span></div></div></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 mt-4">
            <div className={`${GLASS} p-5`}>
              <div className="flex justify-between items-center"><h3 className="font-extrabold text-[18px] text-white">Davom ettirish</h3><button onClick={()=>goTab('courses')} className="text-[15px] font-bold text-[#93C5FD]">Barchasi →</button></div>
              <div className="space-y-3 mt-4">{COURSES.filter(c=>c.lessons.some(l=>completed.includes(l.id)) || c.id==='html-css').slice(0,3).map(c=>{ const done=c.lessons.filter(l=>completed.includes(l.id)).length; const pct=Math.round(done/c.lessons.length*100); const next=c.lessons.find(l=>!completed.includes(l.id))||c.lessons[0]; return (<div key={c.id} className={`flex gap-3 items-center ${GLASS_SOFT} p-3`}><div className="w-11 h-11 rounded-xl grid place-items-center text-white shrink-0" style={{background:DARK_GRADIENT}}>{c.icon}</div><div className="flex-1 min-w-0"><p className="font-bold text-[15px] text-white [overflow-wrap:anywhere]">{c.title}</p><div className="h-1.5 bg-white/15 rounded-full mt-1.5"><div className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-full" style={{width:`${pct}%`}}/></div><p className={`text-[14px] font-medium ${MUTED} mt-1`}>Keyingi: {next.title}</p></div><button onClick={()=>openCourse(c)} className="shrink-0 bg-white text-slate-900 px-3 py-2 rounded-full text-[14px] font-bold">Davom →</button></div>)})}
              {completed.length===0 && <p className="text-[15px] font-medium text-amber-100 bg-amber-500/15 border border-amber-400/30 rounded-2xl p-3">Hali dars tugatilmagan. HTML & CSS kursidan boshlashni tavsiya qilamiz — u bepul.</p>}
              </div>
            </div>
            <div className={`${GLASS} p-5`}><h3 className="font-extrabold text-[18px] text-white flex items-center gap-2"><Users className="text-[#93C5FD]"/> Sizning yutuqlaringiz</h3><div className="grid grid-cols-2 gap-3 mt-4">{[{e:'🔥',t:'7 kunlik seriya',d:'Har kuni kod yozish'},{e:'⭐',t:`${myPoints} ball`,d:'Reytingda 1-o‘rin'},{e:'📚',t:`${completed.length} dars`,d:'Shu platformada'},{e:'🏆',t:'2 sertifikat',d:'HTML & CSS va JavaScript'}].map(a=>(<div key={a.t} className={`${GLASS_SOFT} p-4`}><span className="text-2xl">{a.e}</span><p className="font-extrabold text-[15px] mt-2 text-white">{a.t}</p><p className={`text-[14px] font-medium ${MUTED}`}>{a.d}</p></div>))}</div></div>
          </div>
        </main>
      </FlowSection>
      <FlowSection id="hamjamiyat" scrollY={scrollY}>
        <main className="max-w-[1220px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[13px] font-extrabold tracking-widest text-[#93C5FD]">HAMJAMIYAT</p>
              <h2 className="flow-title text-[28px] sm:text-4xl font-extrabold mt-1 text-white">Hamjamiyat chat</h2>
              <p className={`text-[15px] font-medium ${MUTED} mt-2 max-w-[640px]`}>Yolg‘iz o‘rganma — savol ber, loyihangni ko‘rsat va haftalik musobaqada o‘zingni sinab ko‘r.</p>
            </div>
            <span className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-100 text-[13px] font-bold px-3.5 py-2 rounded-full"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />{activeChannel.online} kishi online • {activeChannel.title}</span>
          </div>
          <div className="chat-shell mt-6 grid gap-0 overflow-hidden lg:grid-cols-[280px_1fr]">
            <aside aria-label="Chat kanallari" className="chat-channels flex gap-2 overflow-x-auto p-3 lg:flex-col lg:overflow-visible lg:p-4">
              <p className="hidden lg:block text-[11px] font-extrabold tracking-[0.18em] text-[#93C5FD] px-2 pb-1">KANALLAR</p>
              {CHAT_CHANNELS.map(c=>{
                const active = c.id===chatChannel;
                return (
                  <button key={c.id} onClick={()=>{ setChatChannel(c.id); setChatError(''); }} aria-pressed={active} aria-current={active ? 'true' : undefined} className={`chat-channel-btn min-w-[220px] lg:min-w-0 text-left flex items-center gap-3 rounded-[18px] border p-3 transition ${active ? 'chat-channel-active' : 'bg-white/[0.05] border-white/10 hover:bg-white/10'}`}>
                    <span className="w-11 h-11 shrink-0 rounded-2xl grid place-items-center text-[20px] text-white shadow-[0_8px_18px_rgba(0,0,0,0.35)]" style={{backgroundColor:c.color}} aria-hidden="true">{c.emoji}</span>
                    <span className="min-w-0 flex-1"><span className="block font-extrabold text-[15px] text-white leading-tight [overflow-wrap:anywhere]">{c.title}</span><span className="block text-[12px] font-medium text-[#CBD5E1] leading-snug mt-0.5 [overflow-wrap:anywhere]">{c.desc}</span></span>
                    <span className={`shrink-0 text-[11px] font-extrabold px-2 py-1 rounded-full ${active ? 'bg-white text-slate-900' : 'bg-white/10 text-white'}`}>{chatCountFor(c.id)}</span>
                  </button>
                );
              })}
              <div className="hidden lg:block mt-auto rounded-[18px] bg-white/[0.06] border border-white/10 p-3"><p className="text-[13px] font-bold text-white leading-snug">Xabarlar saqlanadi</p><p className="text-[12px] font-medium text-[#CBD5E1] leading-snug mt-1">Sahifani yangilasangiz ham yozgan xabaringiz shu yerda turadi.</p></div>
            </aside>
            <section aria-label={`${activeChannel.title} chat oynasi`} className="chat-window flex min-h-[540px] flex-col border-t border-white/10 lg:border-t-0 lg:border-l lg:min-h-[560px]">
              <header className="flex items-center gap-3 px-4 sm:px-5 py-3.5 border-b border-white/10">
                <span className="w-11 h-11 shrink-0 rounded-2xl grid place-items-center text-[20px] text-white" style={{backgroundColor:activeChannel.color}} aria-hidden="true">{activeChannel.emoji}</span>
                <div className="min-w-0 flex-1"><h3 className="font-extrabold text-[17px] text-white leading-tight [overflow-wrap:anywhere]">{activeChannel.title}</h3><p className="text-[12.5px] font-medium text-[#CBD5E1] leading-snug [overflow-wrap:anywhere]">{activeChannel.desc}</p></div>
                <span className="hidden sm:inline-flex items-center gap-1.5 shrink-0 bg-emerald-500/20 border border-emerald-400/40 text-emerald-100 text-[12px] font-bold px-2.5 py-1.5 rounded-full"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />{activeChannel.online} online</span>
                <button onClick={reloadChatMessages} className="shrink-0 inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-white text-[12px] font-bold px-3 py-2 rounded-full hover:bg-white/15" aria-label="Xabarlarni yangilash"><RefreshCw size={14}/> Yangilash</button>
              </header>
              <div ref={chatScrollRef} className="chat-messages flex-1 overflow-y-auto px-3 sm:px-5 py-4 space-y-3" aria-live="polite">
                {visibleChatMessages.map(m=>{
                  const mine = m.author === displayName;
                  return (
                    <div key={m.id} className={`chat-msg flex gap-2.5 ${mine ? 'flex-row-reverse' : ''}`}>
                      <span className="w-9 h-9 shrink-0 rounded-full grid place-items-center text-white text-[12px] font-extrabold border border-white/25" style={{backgroundColor: chatAvatarColor(m.author)}} aria-hidden="true">{chatInitials(m.author)}</span>
                      <div className={`min-w-0 max-w-[82%] sm:max-w-[72%] ${mine ? 'items-end text-right' : ''}`}>
                        <p className={`flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-[12px] font-bold ${mine ? 'justify-end' : ''}`}><span className="text-white [overflow-wrap:anywhere]">{m.author}{mine ? ' (siz)' : ''}</span><span className="text-[#94A3B8] font-medium">{chatTime(m.created_at)}</span></p>
                        <div className={`chat-bubble mt-1 px-4 py-2.5 text-[14.5px] font-medium leading-relaxed text-white [overflow-wrap:anywhere] ${mine ? 'chat-bubble-mine' : 'chat-bubble-theirs'}`}>{m.text}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              {chatError && <p role="alert" className="mx-4 mb-2 bg-rose-500/20 border border-rose-400/40 text-rose-100 text-[13px] font-bold rounded-2xl px-4 py-2.5">{chatError}</p>}
              <form onSubmit={sendChatMessage} className="flex items-center gap-2 border-t border-white/10 bg-white/[0.04] px-3 sm:px-4 py-3">
                <label htmlFor="chat-input" className="sr-only">Xabar yozing</label>
                <input id="chat-input" value={chatDraft} onChange={e=>setChatDraft(e.target.value)} placeholder={`${activeChannel.title} ga yozing…`} maxLength={500} autoComplete="off" className="chat-input flex-1 min-w-0 bg-[#020617] border border-white/15 rounded-full px-4 py-3 text-[15px] font-medium text-white placeholder:text-[#64748B] outline-none focus:border-[#60A5FA] focus:ring-2 focus:ring-[#2563EB]/30" />
                <button type="submit" disabled={!chatDraft.trim() || chatSending} className={`${BTN} shrink-0 inline-flex items-center gap-2 px-4 sm:px-5 py-3 text-[14px] disabled:opacity-50 disabled:translate-y-0`}><span className="hidden sm:inline">{chatSending ? 'Yuborilmoqda…' : 'Yuborish'}</span><Send size={16} aria-hidden="true" /></button>
              </form>
            </section>
          </div>
          <p className="text-[13px] font-medium text-[#CBD5E1] mt-3 flex items-center gap-2"><MessageCircle size={15} className="text-[#93C5FD] shrink-0" />Enter ni bossangiz ham xabar yuboriladi. O‘z xabaringiz o‘ngda, boshqalar chapda ko‘rinadi.</p>
        </main>
      </FlowSection>
      </div>

      <footer className="bg-[rgba(2,6,23,0.55)] backdrop-blur-xl text-[#E2E8F0] mt-6 border-t border-white/10">
        <div className="max-w-[1220px] mx-auto px-4 sm:px-6 py-10 grid md:grid-cols-4 gap-8">
          <div><div className="flex items-center gap-2"><img src={idrokLogoUrl} alt="IDROK" className="idrok-logo-footer" /></div><p className="text-[#E2E8F0] text-[15px] font-medium leading-relaxed mt-3">O‘zbekistonlik o‘quvchilar uchun dasturlash va sayt yaratish akademiyasi. Nazariya emas — amaliyot.</p><p className="text-[14px] font-medium text-[#E2E8F0] mt-4">© 2026 IDROK. Barcha huquqlar himoyalangan.</p></div>
          <div><h4 className="font-bold text-[16px] text-white">Platforma</h4><ul className="text-[15px] font-medium text-[#E2E8F0] space-y-2 mt-3">{[{l:'Kurslar',t:'courses'},{l:'Premium',t:'premium'},{l:'Yo‘nalishlar',t:'directions'}].map(x=>(<li key={x.l}><button onClick={()=>goTab(x.t as typeof tab)} className="hover:text-white text-[#E2E8F0]">{x.l}</button></li>))}</ul></div>
          <div><h4 className="font-bold text-[16px] text-white">Texnologiyalar</h4><ul className="text-[15px] font-medium text-[#E2E8F0] space-y-2 mt-3">{['HTML & CSS','JavaScript','React','Node.js','Git & GitHub'].map(x=>(<li key={x}><button onClick={()=>{setFilter('Barchasi'); goTab('courses')}} className="hover:text-white text-[#E2E8F0]">{x}</button></li>))}</ul></div>
          <div><h4 className="font-bold text-[16px] text-white">Aloqa</h4><p className="text-[15px] font-medium text-[#E2E8F0] mt-3 leading-relaxed">Savolingiz bo‘lsa, platformadagi Aloqa formasi orqali yozing.<br/>Dush–Shan: 09:00–19:00</p><button onClick={()=>goTab('courses')} className={`${BTN_DARK} mt-4 px-4 py-2.5 text-[15px]`}>Bepul boshlash →</button></div>
        </div>
      </footer>

      {trialOpen && (
        <div className="fixed inset-0 overflow-y-auto z-[70] bg-black/60 backdrop-blur-sm pt-[max(1rem,var(--safe-area-inset-top))] pb-6 px-4">
          <div className="min-h-full flex items-center justify-center">
            <div className={`${GLASS} w-full max-w-[560px] overflow-hidden`}>
              <div className="p-5 flex justify-between items-start" style={{background:DARK_GRADIENT}}><div className="text-white"><span className="bg-white text-slate-900 px-3 py-1 rounded-full text-[13px] font-bold">BEPUL DARS • SINOV</span><h3 className="text-2xl font-extrabold mt-3 leading-snug text-white">HTML: birinchi sahifangiz</h3><p className="text-white text-[15px] font-medium mt-1">Sarlavha, matn va tugma — 3 daqiqa</p></div><button onClick={()=>setTrialOpen(false)} className="bg-white text-slate-900 w-9 h-9 rounded-full grid place-items-center shrink-0" aria-label="Yopish"><X/></button></div>
              <div className="p-5 sm:p-6"><p className="text-[16px] leading-[1.85] text-[#E2E8F0] font-medium">HTML da sarlavha <b className="text-white">&lt;h1&gt;</b>, matn <b className="text-white">&lt;p&gt;</b>, tugma <b className="text-white">&lt;button&gt;</b> bilan yoziladi. Shu uchta tegning o‘zi birinchi sahifa uchun yetadi.</p><div className="bg-[#020617] text-[#A5F3FC] rounded-2xl p-4 font-mono text-[15px] mt-4">&lt;h1&gt;Salom, men Nurislomman!&lt;/h1&gt;<br/>&lt;p&gt;Bu mening birinchi saytim.&lt;/p&gt;</div><div className="flex gap-3 mt-5"><button onClick={()=>{setTrialOpen(false); openCourse(COURSES[0])}} className={`${BTN} flex-1 py-3.5 text-[15px]`}>To‘liq kursni boshlash</button><button onClick={()=>setTrialOpen(false)} className="px-5 py-3.5 rounded-full font-bold border border-white/30 text-white text-[15px]">Keyinroq</button></div></div>
            </div>
          </div>
        </div>
      )}
        </>
      )}
      </>
      )}
    </div>
  );
}

function courseAnim(category:string){
  if(category==='Frontend') return 'anim-atom';
  if(category==='Backend') return 'anim-cube';
  if(category==="Sun'iy Intellekt" || category==='Python') return 'anim-pulse';
  if(category==='Dizayn') return 'anim-layers';
  if(category==='Mobile' || category==='Mobil') return 'anim-rocket';
  if(category==='DevOps') return 'anim-flash';
  if(category==='Biznes') return 'anim-spark';
  if(category==='Karyera') return 'anim-cap';
  if(category==='Fullstack') return 'anim-cube-2';
  return 'anim-pulse';
}
type PremiumPlan = {id:'monthly'|'yearly'|'quarterly'; title:string; price:string; per:string; note:string; features:string[]; popular:boolean; badge:string; codeLines:string[]; tier:1|2|3};
function codeLineParts(line:string){
  const parts:{text:string; cls:string}[]=[];
  let i=0;
  const push=(text:string,cls:string)=>{ if(text) parts.push({text,cls}); };
  while(i<line.length){
    const rest=line.slice(i);
    if(rest.startsWith('//')){ push(rest,'text-slate-500 italic'); break; }
    if(rest[0]==='"'){ const end=rest.indexOf('"',1); const tok=end===-1?rest:rest.slice(0,end+1); push(tok,'text-emerald-300'); i+=tok.length; continue; }
    const kw=rest.match(/^(const|if|else|true|false|return|class|new|function|this)\b/);
    if(kw){ push(kw[0],'text-sky-400 font-bold'); i+=kw[0].length; continue; }
    const fn=rest.match(/^[A-Za-z_][\w]*(?=\()/);
    if(fn){ push(fn[0],'text-amber-300'); i+=fn[0].length; continue; }
    const word=rest.match(/^[A-Za-z_][\w]*/);
    if(word){ push(word[0],'text-slate-100'); i+=word[0].length; continue; }
    const num=rest.match(/^\d+/);
    if(num){ push(num[0],'text-orange-300'); i+=num[0].length; continue; }
    push(rest[0],'text-slate-300'); i+=1;
  }
  return parts;
}
function renderTypedCode(visible:string, showCursor:boolean){
  const lines=visible.split('\n');
  return lines.map((line,idx)=>(
    <div key={idx} className="premium-code-line min-h-[20px] whitespace-pre-wrap [overflow-wrap:anywhere]">
      {line.length===0 ? ' ' : codeLineParts(line).map((p,j)=>(<span key={j} className={p.cls}>{p.text}</span>))}
      {showCursor && idx===lines.length-1 && <span className="premium-cursor" />}
    </div>
  ));
}
function PremiumCard({plan, focused, active, onFocus, onActivate}:{plan:PremiumPlan; focused:boolean; active?:boolean; onFocus:()=>void; onActivate:(label:string)=>void}){
  const [phase,setPhase] = useState<'typing'|'done'|'erasing'>('typing');
  const [typed,setTyped] = useState(0);
  const [confettiKey,setConfettiKey] = useState(0);
  const fullText = plan.codeLines.join('\n');
  const speed = plan.tier===3 ? 22 : plan.tier===2 ? 28 : 38;
  const donePause = plan.tier===3 ? 2600 : plan.tier===2 ? 2200 : 1800;
  useEffect(()=>{
    if(phase==='typing'){
      if(typed>=fullText.length){ setPhase('done'); setConfettiKey(Date.now()); return; }
      const t = setTimeout(()=>setTyped(v=>Math.min(fullText.length, v+1)), speed);
      return ()=>clearTimeout(t);
    }
    if(phase==='erasing'){
      if(typed<=0){ setPhase('typing'); return; }
      const t = setTimeout(()=>setTyped(v=>Math.max(0, v-3)), 10);
      return ()=>clearTimeout(t);
    }
    const t = setTimeout(()=>{ setPhase('erasing'); }, donePause);
    return ()=>clearTimeout(t);
  },[phase,typed,fullText,speed,donePause]);
  const visible = fullText.slice(0,typed);
  const isYearly = plan.tier===3;
  const isQuarterly = plan.tier===2;
  const confettiColors = isYearly ? ['#F59E0B','#FACC15','#EF4444','#2563EB','#10B981','#EC4899'] : ['#2563EB','#60A5FA','#7C3AED','#38BDF8','#10B981'];
  function activate(){
    if(!focused) onFocus();
    setTyped(0); setPhase('typing');
    onActivate(`${plan.title} tanlandi`);
  }
  return (
    <article data-premium-card={plan.id} onClick={onFocus} aria-pressed={focused} aria-label={`${plan.title} kartasi`} className={`premium-card ${focused ? 'premium-popped' : ''} ${isYearly ? 'premium-yearly' : ''} ${plan.id==='monthly' ? 'premium-side-silver' : plan.id==='quarterly' ? 'premium-side-violet' : ''} ${phase==='erasing' ? 'premium-erasing' : ''} relative cursor-pointer rounded-[18px] border backdrop-blur-xl text-[#E2E8F0] text-left transition-all duration-300 flex flex-col overflow-hidden ${isYearly ? 'w-[min(408px,94vw)] sm:w-[min(408px,52vw)] lg:w-[min(408px,36vw)]' : 'w-[min(372px,94vw)] sm:w-[min(372px,46vw)] lg:w-[min(372px,33vw)]'} ${focused ? 'shadow-[0_0_0_2px_rgba(147,197,253,0.9),0_0_36px_rgba(59,130,246,0.35),0_24px_44px_rgba(0,0,0,0.5)]' : isYearly ? 'shadow-[0_0_0_2px_rgba(245,158,11,0.9),0_0_44px_rgba(245,158,11,0.42),0_28px_52px_rgba(0,0,0,0.58)]' : 'shadow-[0_18px_38px_rgba(0,0,0,0.5),0_0_24px_rgba(96,165,250,0.16)]'}`} style={{minHeight: isYearly ? '556px' : '516px', background: isYearly ? 'linear-gradient(180deg, rgba(120,53,15,0.55), rgba(15,23,42,0.92) 42%, rgba(15,23,42,0.94))' : plan.id==='monthly' ? 'linear-gradient(180deg, rgba(148,163,184,0.24), rgba(15,23,42,0.90) 46%, rgba(15,23,42,0.94))' : 'linear-gradient(180deg, rgba(124,58,237,0.32), rgba(15,23,42,0.90) 46%, rgba(15,23,42,0.94))', borderColor: isYearly ? '#F59E0B' : plan.id==='monthly' ? 'rgba(203,213,225,0.55)' : 'rgba(167,139,250,0.65)', borderWidth: isYearly ? 2 : 1, transform:'none', zIndex: focused ? 40 : isYearly ? 20 : 10}}>
      {isYearly && <span aria-hidden="true" className="premium-shine" />}
      <div className="relative flex flex-col items-center justify-center gap-2 px-5 pt-4 pb-2">
        {isYearly && <span className="premium-gold-badge inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#F59E0B] via-[#FEF08A] to-[#F59E0B] px-4 py-1.5 text-[12px] font-extrabold tracking-[0.12em] text-slate-900 ring-1 ring-white/60 shadow-[0_0_0_1px_rgba(250,204,21,0.65),0_10px_28px_rgba(245,158,11,0.65),inset_0_1px_0_rgba(255,255,255,0.65)]"><span aria-hidden="true">👑</span> Eng yaxshi tanlov</span>}
        {!isYearly && plan.badge && <span className="inline-flex items-center rounded-full bg-white/10 border border-white/25 px-3 py-1 text-[11px] font-extrabold tracking-[0.08em] text-white">{plan.badge}</span>}
        <span className="flex items-center justify-center gap-2">
          {isYearly && <span aria-hidden="true" className="premium-crown inline-block text-[22px] leading-none">👑</span>}
          <span className={isYearly ? "premium-gold-text text-[19px] font-extrabold tracking-[0.02em] text-amber-300" : "text-[17px] font-extrabold tracking-[0.02em] text-white"}>{plan.title}</span>
          {isYearly && <span aria-hidden="true" className="premium-crown inline-block text-[22px] leading-none">👑</span>}
        </span>
        <span className={`text-[12px] font-bold ${isYearly ? 'text-amber-100/90' : 'text-[#CBD5E1]'}`}>{plan.note}</span>
      </div>
      <div className={`relative order-2 w-full overflow-hidden bg-[#050816] border-y border-white/10 text-left ${isYearly ? 'h-[232px] min-h-[232px]' : 'h-[196px] min-h-[196px]'}`} aria-live="polite" aria-label={`${plan.title} animatsiyasi`}>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 z-10 h-7 bg-gradient-to-b from-[#0B0F1E] via-[#0B0F1E]/60 to-transparent pointer-events-none" />
        {isQuarterly && <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(circle at 50% 100%, rgba(37,99,235,0.38) 0%, transparent 62%)'}} />}
        {isYearly && <><div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(circle at 50% 100%, rgba(245,158,11,0.60) 0%, rgba(250,204,21,0.22) 38%, transparent 66%)'}} /><div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(circle at 50% 0%, rgba(245,158,11,0.28) 0%, transparent 55%)'}} /></>}
        {isYearly && phase==='done' && <div aria-hidden="true" className="premium-rays absolute -top-10 -right-10 w-28 h-28 rounded-full" style={{background:'conic-gradient(from 0deg, rgba(245,158,11,.35), transparent 22%, rgba(245,158,11,.35) 44%, transparent 66%, rgba(245,158,11,.35) 88%, transparent)'}} />}
        {phase==='done' && plan.tier>1 && <div key={confettiKey} aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">{Array.from({length: plan.tier===3 ? 22 : 12},(_,i)=>(<span key={i} className="premium-confetti" style={{left:`${(i*37+8)%92}%`, background:confettiColors[i%confettiColors.length], animationDelay:`${(i%6)*0.08}s`}} />))}</div>}
        <div className="relative h-full px-5 pt-2.5 pb-8 flex flex-col justify-center">
          <p className="text-[10px] font-extrabold tracking-[0.24em] text-slate-400">● LIVE ANIMATION</p>
          <p className="premium-phase text-[11px] font-bold text-[#93C5FD] mt-1" aria-live="polite">{phase==='typing' ? '⌨️ Kod harfma-harf yozilmoqda…' : phase==='erasing' ? '⌫ Kod tozalanmoqda…' : '✓ Kod tayyor — loop davom etadi'}</p>
          <div className="font-mono text-[12.5px] leading-[1.65] mt-2.5 [overflow-wrap:anywhere]">{renderTypedCode(visible, phase!=='done')}</div>
          {phase==='done' && (
            <div className={`premium-done-fade mt-2.5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 self-start ${isYearly ? 'premium-done-green bg-amber-100 border border-amber-300' : isQuarterly ? 'premium-done-blue bg-sky-100 border border-sky-200' : 'bg-emerald-100 border border-emerald-200'}`}>
              {isYearly && <span aria-hidden="true" className="premium-crown inline-block text-[20px] leading-none">👑</span>}
              <span className={`font-extrabold leading-tight ${isYearly ? 'premium-gold-text text-[15px] text-amber-600' : isQuarterly ? 'text-[14px] text-sky-700' : 'text-[14px] text-emerald-700'}`}>✓ Premium faollashtirildi</span>
            </div>
          )}
          {phase!=='done' && <span aria-hidden="true" className="absolute right-4 top-3 text-[18px] leading-none opacity-80">✦</span>}
        </div>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center px-3 pb-2 pt-8 bg-gradient-to-t from-[#050816] via-[#050816]/85 to-transparent"><span className="text-[11px] font-extrabold tracking-[0.28em] text-slate-400">IDROK</span></div>
      </div>
      <ul className="relative order-3 mt-3 px-5 space-y-2">{plan.features.map((f,fi)=>(<li key={f} className="premium-feature-item flex items-start gap-2.5 text-[14px] font-bold text-[#E2E8F0]" style={{animationDelay:`${fi*0.09}s`}}><span className="premium-check" aria-hidden="true"><Check size={13}/></span><span className="[overflow-wrap:anywhere]">{f}</span></li>))}</ul>
      <div className="relative order-4 px-5 pt-3">
        <div className="text-center mb-3">
          <p className={`${isYearly ? 'text-[34px] text-amber-300 drop-shadow-[0_0_16px_rgba(245,158,11,0.45)]' : 'text-[28px] text-white'} leading-none font-extrabold tracking-tight [overflow-wrap:anywhere]`}>{plan.price}</p>
          <p className="mt-2 text-[14px] font-semibold text-[#94A3B8] leading-snug [overflow-wrap:anywhere]">{plan.per}</p>
        </div>
        {active && <p className="mb-2 text-center"><span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#F59E0B] to-[#FACC15] text-slate-900 text-[12px] font-extrabold px-3 py-1 rounded-full shadow-[0_0_18px_rgba(245,158,11,.6)]">✓ Faol Premium</span></p>}
        <button onClick={(e)=>{e.stopPropagation(); activate();}} className={`w-full py-3.5 text-[15px] font-bold rounded-full active:scale-[0.98] transition-all duration-200 ${active ? 'bg-emerald-500 text-white' : isYearly ? 'bg-gradient-to-r from-[#F59E0B] via-[#FACC15] to-[#F59E0B] text-slate-900 hover:shadow-[0_0_30px_rgba(245,158,11,0.65)]' : plan.id==='monthly' ? 'bg-gradient-to-r from-[#94A3B8] to-[#64748B] text-white hover:shadow-[0_0_26px_rgba(148,163,184,0.55)]' : 'bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white hover:shadow-[0_0_26px_rgba(124,58,237,0.6)]'}`}>{active ? 'Faol ✓' : 'Premium olish'}</button>
        <p className="mt-2 text-center text-[12px] font-bold text-[#94A3B8]">{focused ? 'Yana bossangiz joyiga qaytadi' : 'Tanlash uchun kartani bosing'}</p>
        <div aria-hidden="true" className="h-1" />
      </div>
    </article>
  );
}
const FEATURED_STYLE: Record<string,{label:string; gradient:string; icon:React.ReactNode}> = {
  'html-css':{label:'Frontend', gradient:'linear-gradient(135deg,#7C3AED,#2563EB)', icon:<Atom size={64}/>},
  'js':{label:'Frontend', gradient:'linear-gradient(135deg,#7C3AED,#2563EB)', icon:<Atom size={64}/>},
  'python':{label:'Sun’iy Intellekt', gradient:'linear-gradient(135deg,#A855F7,#EC4899)', icon:<Brain size={64}/>},
  'react':{label:'Frontend', gradient:'linear-gradient(135deg,#7C3AED,#2563EB)', icon:<Atom size={64}/>},
  'tailwind':{label:'Dizayn', gradient:'linear-gradient(135deg,#EA580C,#FACC15)', icon:<Layers size={64}/>},
  'node':{label:'Backend', gradient:'linear-gradient(135deg,#38BDF8,#2563EB)', icon:<Boxes size={64}/>},
  'git':{label:'DevOps', gradient:'linear-gradient(135deg,#6D28D9,#2563EB)', icon:<ShieldCheck size={64}/>},
  'deploy':{label:'DevOps', gradient:'linear-gradient(135deg,#6D28D9,#2563EB)', icon:<ShieldCheck size={64}/>},
  'ts-next':{label:'Frontend', gradient:'linear-gradient(135deg,#7C3AED,#2563EB)', icon:<Atom size={64}/>},
  'sql-mongo':{label:'Backend', gradient:'linear-gradient(135deg,#38BDF8,#2563EB)', icon:<Boxes size={64}/>},
  'rest-api':{label:'Backend', gradient:'linear-gradient(135deg,#38BDF8,#2563EB)', icon:<Boxes size={64}/>},
  'backend-sec':{label:'DevOps', gradient:'linear-gradient(135deg,#6D28D9,#2563EB)', icon:<ShieldCheck size={64}/>},
  'nestjs':{label:'Backend', gradient:'linear-gradient(135deg,#38BDF8,#2563EB)', icon:<Boxes size={64}/>},
  'py-oop':{label:'Sun’iy Intellekt', gradient:'linear-gradient(135deg,#A855F7,#EC4899)', icon:<Brain size={64}/>},
  'django':{label:'Backend', gradient:'linear-gradient(135deg,#38BDF8,#2563EB)', icon:<Boxes size={64}/>},
  'tg-bot':{label:'Biznes', gradient:'linear-gradient(135deg,#EF4444,#F97316)', icon:<Zap size={64}/>},
  'pandas':{label:'Sun’iy Intellekt', gradient:'linear-gradient(135deg,#A855F7,#EC4899)', icon:<Brain size={64}/>},
  'flutter':{label:'Mobile', gradient:'linear-gradient(135deg,#10B981,#38BDF8)', icon:<Rocket size={64}/>},
  'dart':{label:'Mobile', gradient:'linear-gradient(135deg,#10B981,#38BDF8)', icon:<Rocket size={64}/>},
  'rn':{label:'Mobile', gradient:'linear-gradient(135deg,#10B981,#38BDF8)', icon:<Rocket size={64}/>},
  'mobil-ui':{label:'Dizayn', gradient:'linear-gradient(135deg,#EA580C,#FACC15)', icon:<Layers size={64}/>},
  'market':{label:'Biznes', gradient:'linear-gradient(135deg,#EF4444,#F97316)', icon:<Zap size={64}/>},
  'docker':{label:'DevOps', gradient:'linear-gradient(135deg,#6D28D9,#2563EB)', icon:<ShieldCheck size={64}/>},
  'speed':{label:'Dizayn', gradient:'linear-gradient(135deg,#EA580C,#FACC15)', icon:<Layers size={64}/>},
  'freelance':{label:'Karyera', gradient:'linear-gradient(135deg,#0EA5E9,#1D4ED8)', icon:<GraduationCap size={64}/>},
};
function featuredStyle(c:Course){
  const direct = FEATURED_STYLE[c.id];
  if(direct) return direct;
  if(c.category==='Backend') return {label:'Backend', gradient:'linear-gradient(135deg,#38BDF8,#2563EB)', icon:<Boxes size={64}/>};
  if(c.category==='Python') return {label:'Sun’iy Intellekt', gradient:'linear-gradient(135deg,#A855F7,#EC4899)', icon:<Brain size={64}/>};
  if(c.category==='Mobil') return {label:'Mobile', gradient:'linear-gradient(135deg,#10B981,#38BDF8)', icon:<Rocket size={64}/>};
  if(c.category==='Fullstack') return {label:'DevOps', gradient:'linear-gradient(135deg,#6D28D9,#2563EB)', icon:<ShieldCheck size={64}/>};
  return {label:'Frontend', gradient:'linear-gradient(135deg,#7C3AED,#2563EB)', icon:<Atom size={64}/>};
}
function CourseCard({c,fav,onFav,onOpen,progress}:{c:Course; fav:boolean; onFav:()=>void; onOpen:()=>void; progress:number}){
  const meta = c.meta || `${c.duration} • ${c.lessonsCount} dars`;
  const style = featuredStyle(c);
  return (
    <article className="course-card bg-[#0F172A] backdrop-blur-xl border border-white/10 rounded-[18px] overflow-hidden flex flex-col">
      <div className="course-top relative h-[176px] p-4 text-white shrink-0 flex flex-col" style={{background:style.gradient}}>
        <div className="flex justify-between items-start gap-2">
          <span className="bg-white text-slate-900 px-3 py-1.5 rounded-full text-[12px] font-extrabold leading-none max-w-[62%] [overflow-wrap:anywhere]">{style.label}</span>
          <span className="course-star bg-white text-slate-900 px-3 py-1.5 rounded-full text-[12px] font-extrabold leading-none inline-flex items-center gap-1 shrink-0 shadow-[0_0_16px_rgba(250,204,21,0.55),0_6px_14px_rgba(0,0,0,0.30)] ring-1 ring-amber-200/70"><Star size={12} className="fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.9)]"/> {c.rating.toFixed(1)}</span>
        </div>
        <div className="flex-1 grid place-items-center pointer-events-none" aria-hidden="true">
          <span className={`text-white drop-shadow-[0_10px_18px_rgba(0,0,0,0.35)] ${courseAnim(style.label)}`}>{style.icon}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1 bg-[#050816] min-h-[148px]">
        <button onClick={onOpen} className="text-left"><h3 className="font-extrabold text-[20px] leading-snug text-white [overflow-wrap:anywhere]">{c.title}</h3></button>
        <p className="text-[14px] font-medium text-[#94A3B8] mt-2">{meta}</p>
        {progress>0 && <div className="mt-3"><div className="flex justify-between text-[12px] font-bold mb-1 text-white"><span className="text-[#93C5FD]">Davom etilmoqda</span><span>{progress}%</span></div><div className="h-1.5 bg-white/15 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED]" style={{width:`${progress}%`}}/></div></div>}
        <div className="flex items-center justify-between gap-2 mt-auto pt-4">
          <span className="font-extrabold text-[20px] text-white [overflow-wrap:anywhere]">{c.price}</span>
          <span className="flex items-center gap-2 shrink-0">
            <button onClick={onFav} aria-label={fav ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga qo‘shish'} aria-pressed={fav} className="course-arrow w-10 h-10 rounded-full bg-white/10 border border-white/25 text-[#E2E8F0] grid place-items-center shrink-0 hover:bg-white/20"><Heart size={17} className={fav?'fill-rose-500 text-rose-500':'text-[#E2E8F0]'}/></button>
            <button onClick={onOpen} aria-label={`${c.title} kursiga o‘tish`} className="course-arrow w-10 h-10 rounded-full bg-white text-slate-900 grid place-items-center shrink-0 hover:scale-105"><ArrowRight size={19}/></button>
          </span>
        </div>
      </div>
    </article>
  );
}
