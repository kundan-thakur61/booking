  /**
   * fix-all.js
   * One-time script to fix all 5 issues found across src/data and src/serviceCarDetails.
   * Run with: node fix-scripts/fix-all.js
   *
   * @format
   */

  const fs = require("fs");
  const path = require("path");

  const SRC = path.join(__dirname, "..", "src");
  const DATA_DIR = path.join(SRC, "data");
  const DETAILS_DIR = path.join(SRC, "serviceCarDetails");

  /* ─────────────────────────────────────────────────────────────
    HELPERS
  ───────────────────────────────────────────────────────────── */

  function toSlug(name) {
    return name
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase();
  }

  function toLabel(name) {
    // CamelCase → "Camel Case"
    return name.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Get all direct subdirectories of a directory
  function getSubDirs(dir) {
    return fs.readdirSync(dir).filter((f) => {
      try {
        return fs.statSync(path.join(dir, f)).isDirectory();
      } catch {
        return false;
      }
    });
  }

  // City → placeOfService local areas lookup (best-effort, generic fallback)
  const cityLocals = {
    // Andaman & Nicobar
    "andaman-islands": "port blair,havelock island,neil island",
    "nicobar-islands": "car nicobar,great nicobar,little nicobar",
    // Andhra Pradesh
    adoni: "adoni,kurnool,guntakal",
    anakapalli: "anakapalli,visakhapatnam,bheemunipatnam",
    anantapur: "anantapur,guntakal,hindupur",
    bhimavaram: "bhimavaram,tanuku,eluru",
    chirala: "chirala,bapatla,narasaraopet",
    chittoor: "chittoor,tirupati,madanapalle",
    dharmavaram: "dharmavaram,anantapur,guntakal",
    eluru: "eluru,bhimavaram,rajahmundry",
    guntakal: "guntakal,adoni,kurnool",
    guntur: "guntur,narasaraopet,tenali",
    hindupur: "hindupur,anantapur,dharmavaram",
    kadapa: "kadapa,proddatur,rajampet",
    kakinada: "kakinada,rajahmundry,amalapuram",
    kurnool: "kurnool,adoni,nandyal",
    machilipatnam: "machilipatnam,vijayawada,eluru",
    madanapalle: "madanapalle,chittoor,tirupati",
    nandyal: "nandyal,kurnool,atmakur",
    narasaraopet: "narasaraopet,guntur,chirala",
    nellore: "nellore,kavali,gudur",
    ongole: "ongole,chirala,bapatla",
    proddatur: "proddatur,kadapa,jammalamadugu",
    rajahmundry: "rajahmundry,kakinada,eluru",
    srikakulam: "srikakulam,narasannapeta,palasa",
    tadepallegudem: "tadepallegudem,bhimavaram,eluru",
    tadpatri: "tadpatri,anantapur,guntakal",
    tenali: "tenali,guntur,bapatla",
    tirupati: "tirupati,chittoor,srikalahasti",
    vijayawada: "vijayawada,guntur,machilipatnam",
    visakhapatnam: "visakhapatnam,vizianagaram,bheemunipatnam",
    vizianagaram: "vizianagaram,visakhapatnam,srikakulam",
    // Bihar
    araria: "araria,purnea,kishanganj",
    arrah: "arrah,bhojpur,buxar",
    aurangabad: "aurangabad,gaya,sasaram",
    banka: "banka,bhagalpur,munger",
    begusarai: "begusarai,samastipur,darbhanga",
    bettiah: "bettiah,motihari,sitamarhi",
    bhagalpur: "bhagalpur,banka,munger",
    bhojpur: "bhojpur,arrah,buxar",
    "bihar-sharif": "bihar sharif,nalanda,rajgir",
    buxar: "buxar,arrah,bhojpur",
    chhapra: "chhapra,saran,gopalganj",
    darbhanga: "darbhanga,samastipur,madhubani",
    gaya: "gaya,bodh gaya,aurangabad",
    gopalganj: "gopalganj,chhapra,siwan",
    hajipur: "hajipur,patna,vaishali",
    jamui: "jamui,banka,munger",
    katihar: "katihar,purnea,araria",
    madhubani: "madhubani,darbhanga,sitamarhi",
    munger: "munger,bhagalpur,jamui",
    muzaffarpur: "muzaffarpur,sitamarhi,vaishali",
    nalanda: "nalanda,bihar sharif,rajgir",
    patna: "patna,hajipur,danapur",
    purnia: "purnia,katihar,araria",
    rohtas: "rohtas,sasaram,dehri",
    saharsa: "saharsa,supaul,madhepura",
    samastipur: "samastipur,darbhanga,begusarai",
    saran: "saran,chhapra,gopalganj",
    sasaram: "sasaram,rohtas,dehri",
    sitamarhi: "sitamarhi,muzaffarpur,madhubani",
    siwan: "siwan,gopalganj,chhapra",
    supaul: "supaul,saharsa,madhepura",
    vaishali: "vaishali,hajipur,muzaffarpur",
    // Chandigarh
    chandigarh: "chandigarh,mohali,panchkula",
    // Chhattisgarh
    bhilai: "bhilai,durg,raipur",
    bilaspur: "bilaspur,korba,raigarh",
    durg: "durg,bhilai,rajnandgaon",
    korba: "korba,bilaspur,raigarh",
    raipur: "raipur,bhilai,durg",
    rajnandgaon: "rajnandgaon,durg,kawardha",
    // Delhi
    "connaught-place": "connaught place,karol bagh,paharganj",
    dwarka: "dwarka,janakpuri,uttam nagar",
    "lajpat-nagar": "lajpat nagar,defence colony,greater kailash",
    rohini: "rohini,pitampura,shalimar bagh",
    saket: "saket,malviya nagar,hauz khas",
    // Goa
    calangute: "calangute,baga,candolim",
    mapusa: "mapusa,panjim,calangute",
    margao: "margao,vasco,panaji",
    panaji: "panaji,mapusa,calangute",
    ponda: "ponda,margao,panaji",
    vasco: "vasco,margao,cortalim",
    // Gujarat
    ahmedabad: "ahmedabad,gandhinagar,anand",
    gandhinagar: "gandhinagar,ahmedabad,kalol",
    rajkot: "rajkot,morbi,gondal",
    surat: "surat,navsari,bardoli",
    vadodara: "vadodara,anand,bharuch",
    // Haryana
    ambala: "ambala,panchkula,kurukshetra",
    faridabad: "faridabad,ballabhgarh,palwal",
    gurgaon: "gurgaon,manesar,sohna",
    hisar: "hisar,sirsa,fatehabad",
    karnal: "karnal,panipat,kurukshetra",
    panipat: "panipat,karnal,sonipat",
    rohtak: "rohtak,bahadurgarh,jhajjar",
    sonipat: "sonipat,bahadurgarh,rohtak",
    // Himachal Pradesh
    dharamshala: "dharamshala,mcleodganj,palampur",
    kullu: "kullu,manali,banjar",
    manali: "manali,solang valley,rohtang",
    mandi: "mandi,rewalsar,pandoh",
    shimla: "shimla,solan,kasumpti",
    solan: "solan,shimla,baddi",
    // J&K
    anantnag: "anantnag,pahalgam,shopian",
    baramulla: "baramulla,sopore,uri",
    jammu: "jammu,samba,kathua",
    srinagar: "srinagar,dal lake,lal chowk",
    udhampur: "udhampur,reasi,ramnagar",
    // Jharkhand
    bokaro: "bokaro,chas,sector 4",
    deoghar: "deoghar,jasidih,dumka",
    dhanbad: "dhanbad,jharia,sindri",
    giridih: "giridih,parasnath,hazaribag",
    hazaribagh: "hazaribagh,ramgarh,koderma",
    jamshedpur: "jamshedpur,sakchi,bistupur",
    ranchi: "ranchi,morabadi,kanke",
    // Karnataka
    bangalore: "bangalore,whitefield,electronic city",
    mangalore: "mangalore,udupi,bantwal",
    mysore: "mysore,nanjangud,mandya",
    // Kerala
    alappuzha: "alappuzha,cherthala,kayamkulam",
    kannur: "kannur,thalassery,payyannur",
    kochi: "kochi,ernakulam,fort kochi",
    kollam: "kollam,paravur,kottarakkara",
    kozhikode: "kozhikode,calicut,feroke",
    thiruvananthapuram: "thiruvananthapuram,trivandrum,kovalam",
    thrissur: "thrissur,guruvayur,chalakudy",
    // Ladakh
    kargil: "kargil,zanskar,drass",
    leh: "leh,nubra,pangong",
    // Madhya Pradesh
    bhopal: "bhopal,hoshangabad,sehore",
    gwalior: "gwalior,morena,datia",
    indore: "indore,ujjain,dewas",
    jabalpur: "jabalpur,katni,narsinghpur",
    sagar: "sagar,damoh,chhatarpur",
    satna: "satna,rewa,maihar",
    ujjain: "ujjain,indore,dewas",
    // Maharashtra
    mumbai: "mumbai,andheri,bandra",
    nagpur: "nagpur,amravati,wardha",
    nashik: "nashik,ozar,igatpuri",
    pune: "pune,pimpri chinchwad,hinjawadi",
    // Manipur
    bishnupur: "bishnupur,thoubal,imphal",
    imphal: "imphal,bishnupur,churachandpur",
    thoubal: "thoubal,imphal,bishnupur",
    // Meghalaya
    jowai: "jowai,shillong,nongstoin",
    shillong: "shillong,cherrapunji,tura",
    tura: "tura,williamnagar,ampati",
    // Mizoram
    aizawl: "aizawl,lunglei,champhai",
    champhai: "champhai,aizawl,serchhip",
    lunglei: "lunglei,aizawl,saiha",
    // Mumbai (separate folder)
    // Nagaland
    dimapur: "dimapur,kohima,zubza",
    kohima: "kohima,dimapur,pfutsero",
    mokokchung: "mokokchung,wokha,zunheboto",
    // Odisha
    bhubaneswar: "bhubaneswar,cuttack,puri",
    cuttack: "cuttack,bhubaneswar,dhenkanal",
    puri: "puri,konark,bhubaneswar",
    rourkela: "rourkela,sundargarh,jharsuguda",
    sambalpur: "sambalpur,burla,hirakud",
    // Puducherry
    karaikal: "karaikal,nagapattinam,thanjavur",
    puducherry: "puducherry,ariyankuppam,ozhukarai",
    // Punjab
    amritsar: "amritsar,tarn taran,gurdaspur",
    bathinda: "bathinda,mansa,muktsar",
    jalandhar: "jalandhar,phagwara,nawanshahr",
    ludhiana: "ludhiana,moga,khanna",
    mohali: "mohali,chandigarh,ropar",
    patiala: "patiala,rajpura,fatehgarh sahib",
    // Rajasthan
    ajmer: "ajmer,kishangarh,pushkar",
    alwar: "alwar,bhiwadi,tijara",
    bikaner: "bikaner,nokha,lunkaransar",
    jaipur: "jaipur,ajmer,sikar",
    jodhpur: "jodhpur,barmer,pali",
    kota: "kota,bundi,baran",
    udaipur: "udaipur,chittorgarh,rajsamand",
    // Sikkim
    gangtok: "gangtok,rangpo,singtam",
    gyalshing: "gyalshing,pelling,geyzing",
    mangan: "mangan,chungthang,lachen",
    // Tamil Nadu
    chennai: "chennai,tambaram,porur",
    coimbatore: "coimbatore,tiruppur,erode",
    madurai: "madurai,dindigul,virudhunagar",
    salem: "salem,namakkal,erode",
    tiruchirappalli: "tiruchirappalli,karur,thanjavur",
    tirunelveli: "tirunelveli,thoothukudi,nagercoil",
    vellore: "vellore,ranipet,kanchipuram",
    // Telangana
    hyderabad: "hyderabad,secunderabad,kukatpally",
    karimnagar: "karimnagar,jagtial,peddapalli",
    khammam: "khammam,kothagudem,bhadrachalam",
    nizamabad: "nizamabad,kamareddy,bodhan",
    warangal: "warangal,hanamkonda,kazipet",
    // Tripura
    agartala: "agartala,udaipur,belonia",
    dharmanagar: "dharmanagar,kumarghat,panisagar",
    udaipur: "udaipur,agartala,sabroom",
    // Uttar Pradesh
    agra: "agra,firozabad,mathura",
    aligarh: "aligarh,hathras,kasganj",
    allahabad: "allahabad,phaphamau,naini",
    bareilly: "bareilly,pilibhit,rampur",
    gorakhpur: "gorakhpur,deoria,kushinagar",
    kanpur: "kanpur,unnao,lucknow",
    lucknow: "lucknow,kanpur,barabanki",
    mathura: "mathura,agra,vrindavan",
    meerut: "meerut,ghaziabad,baghpat",
    moradabad: "moradabad,rampur,amroha",
    noida: "noida,greater noida,ghaziabad",
    varanasi: "varanasi,mirzapur,chandauli",
    // Uttarakhand
    dehradun: "dehradun,rishikesh,mussoorie",
    haridwar: "haridwar,roorkee,rishikesh",
    nainital: "nainital,haldwani,bhimtal",
    rishikesh: "rishikesh,dehradun,haridwar",
    // West Bengal
    asansol: "asansol,durgapur,raniganj",
    durgapur: "durgapur,asansol,raniganj",
    howrah: "howrah,kolkata,uluberia",
    kolkata: "kolkata,howrah,salt lake",
    siliguri: "siliguri,darjeeling,jalpaiguri",
  };

  function getLocals(citySlug) {
    return (
      cityLocals[citySlug] ||
      `${citySlug.replace(/-/g, " ")},city centre,main market`
    );
  }

  /* ─────────────────────────────────────────────────────────────
    SERVICE TEMPLATES (6 per city)
  ───────────────────────────────────────────────────────────── */
  function buildServicesFile(citySlug, cityLabel) {
    const slug = citySlug;
    const locals = getLocals(slug);
    return `export const services = [
    {
      id: "${slug}-001",
      name: "Body Massage Service",
      description: "Relaxing therapeutic massage services with premium companionship in ${cityLabel}.",
      image: "https://picsum.photos/seed/${slug}massage/400/500",
      images: [
        "https://picsum.photos/seed/${slug}1/400/500",
        "https://picsum.photos/seed/${slug}2/400/500",
        "https://picsum.photos/seed/${slug}3/400/500",
        "https://picsum.photos/seed/${slug}4/400/500",
      ],
      availability: "24/7 Available",
      age: "21",
      location: "${cityLabel.toLowerCase()}",
      aboutme: "I am a professional massage therapist with years of experience in therapeutic and relaxation techniques, serving ${cityLabel}.",
      tag: "massage,spa,body massage",
      service: "Full Body,Swedish,Deep Tissue",
      attentionTo: "men,women,couples",
      placeOfService: "${locals}",
    },
    {
      id: "${slug}-002",
      name: "VIP Companion Service",
      description: "Premium VIP escort and companion service for elite clientele in ${cityLabel}.",
      image: "https://picsum.photos/seed/${slug}vip/400/500",
      images: [
        "https://picsum.photos/seed/${slug}vip1/400/500",
        "https://picsum.photos/seed/${slug}vip2/400/500",
        "https://picsum.photos/seed/${slug}vip3/400/500",
      ],
      availability: "By Appointment",
      age: "23",
      location: "${cityLabel.toLowerCase()}",
      aboutme: "Sophisticated, well-educated companion available for social events, dinners, and private meetings across ${cityLabel}.",
      tag: "vip,companion,elite",
      service: "Social Events,Dinner Date,Travel Companion",
      attentionTo: "men,couples",
      placeOfService: "${locals}",
    },
    {
      id: "${slug}-003",
      name: "Relaxation Spa Service",
      description: "Complete spa and relaxation experience with trained professionals in ${cityLabel}.",
      image: "https://picsum.photos/seed/${slug}spa/400/500",
      images: [
        "https://picsum.photos/seed/${slug}spa1/400/500",
        "https://picsum.photos/seed/${slug}spa2/400/500",
      ],
      availability: "10 AM – 10 PM",
      age: "22",
      location: "${cityLabel.toLowerCase()}",
      aboutme: "Certified spa therapist offering a full range of relaxation and wellness treatments in ${cityLabel}.",
      tag: "spa,relaxation,wellness",
      service: "Aromatherapy,Hot Stone,Head Massage",
      attentionTo: "men,women",
      placeOfService: "${locals}",
    },
    {
      id: "${slug}-004",
      name: "Travel Companion Service",
      description: "Charming travel companions for business trips and leisure tours across ${cityLabel}.",
      image: "https://picsum.photos/seed/${slug}travel/400/500",
      images: [
        "https://picsum.photos/seed/${slug}travel1/400/500",
        "https://picsum.photos/seed/${slug}travel2/400/500",
      ],
      availability: "24/7 Available",
      age: "24",
      location: "${cityLabel.toLowerCase()}",
      aboutme: "Adventurous and fun travel companion with great knowledge of ${cityLabel} and nearby areas.",
      tag: "travel,companion,tours",
      service: "Business Travel,Leisure Tours,Hotel Companion",
      attentionTo: "men,women,couples",
      placeOfService: "${locals}",
    },
    {
      id: "${slug}-005",
      name: "Verified Escort Service",
      description: "100% verified escort services with complete discretion and professionalism in ${cityLabel}.",
      image: "https://picsum.photos/seed/${slug}escort/400/500",
      images: [
        "https://picsum.photos/seed/${slug}escort1/400/500",
        "https://picsum.photos/seed/${slug}escort2/400/500",
        "https://picsum.photos/seed/${slug}escort3/400/500",
      ],
      availability: "24/7 Available",
      age: "22",
      location: "${cityLabel.toLowerCase()}",
      aboutme: "Professional, discreet and verified escort in ${cityLabel}. Your privacy and safety is my priority.",
      tag: "verified,escort,discreet",
      service: "In-Call,Out-Call,Overnight",
      attentionTo: "men",
      placeOfService: "${locals}",
    },
    {
      id: "${slug}-006",
      name: "Premium Night Service",
      description: "Exclusive premium overnight companion service in ${cityLabel}.",
      image: "https://picsum.photos/seed/${slug}night/400/500",
      images: [
        "https://picsum.photos/seed/${slug}night1/400/500",
        "https://picsum.photos/seed/${slug}night2/400/500",
      ],
      availability: "Evening & Night",
      age: "25",
      location: "${cityLabel.toLowerCase()}",
      aboutme: "Elegant, charming and discreet companion for an unforgettable premium evening experience in ${cityLabel}.",
      tag: "premium,night,companion",
      service: "Dinner Date,Night Companion,Overnight",
      attentionTo: "men",
      placeOfService: "${locals}",
    },
  ];
  `;
  }

  /* ─────────────────────────────────────────────────────────────
    JSX CITY PAGE TEMPLATE (CityName.jsx)
  ───────────────────────────────────────────────────────────── */
  function buildCityPageJsx(
    stateDir,
    cityFile,
    stateLabel,
    cityLabel,
    stateSlug,
    citySlug,
  ) {
    const componentName = `${cityFile}Page`;
    const dataImport = `../../data/${stateDir}/${cityFile}services`;
    const cityPath = `/${stateSlug}/${citySlug}`;
    const serviceBasePath = `${cityPath}/service`;

    return `import React, { useState, useMemo } from 'react';
  import { Link } from 'react-router-dom';
  import { services } from '${dataImport}';
  import Header from '../../components/Header';

  const ${componentName} = () => {
    const [search, setSearch] = useState('');

    const filtered = useMemo(() => {
      if (!search.trim()) return services;
      const q = search.toLowerCase();
      return services.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          (s.tag && s.tag.toLowerCase().includes(q))
      );
    }, [search]);

    return (
      <div className="min-h-screen bg-neutral-50">
        <Header title="${cityLabel} Services" />

        {/* Hero */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-500 text-white py-10 px-4">
          <div className="container mx-auto">
            <nav className="text-xs text-pink-200 mb-2 flex items-center gap-1 flex-wrap">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>›</span>
              <Link to="/${stateSlug}" className="hover:text-white transition-colors">${stateLabel}</Link>
              <span>›</span>
              <span className="text-white font-medium">${cityLabel}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Escort Services in ${cityLabel}
            </h1>
            <p className="text-pink-100 text-sm max-w-xl">
              Browse verified companion and escort services in ${cityLabel}, ${stateLabel}. Discreet, professional, and available 24/7.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="w-full px-0 py-8 sm:px-6">
          <input
            type="text"
            placeholder="Search services in ${cityLabel}…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md border border-neutral-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Cards */}
        <div className="w-full px-0 py-8 sm:px-6 pb-12">
          {filtered.length === 0 ? (
            <p className="text-neutral-500 text-center py-16">No services found for "{search}".</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((s) => (
                <Link
                  key={s.id}
                  to={\`${serviceBasePath}/\${s.id}\`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.name}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      Age {s.age}+
                    </span>
                    <span className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                      {s.availability}
                    </span>
                  </div>
                  <div className="p-5">
                    <h2 className="text-lg font-bold text-neutral-900 mb-1 group-hover:text-pink-600 transition-colors line-clamp-3">
                      {s.description}
                    </h2>
                    // <p className="text-neutral-600 text-sm line-clamp-2">{s.description}</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-neutral-500">
                      <span>📍 {s.location}</span>
                    </div>
                    <div className="mt-4">
                      <span className="inline-block bg-pink-600 text-white text-xs font-semibold px-4 py-2 rounded-full">
                        View Profile →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  export default ${componentName};
  `;
  }

  /* ─────────────────────────────────────────────────────────────
    JSX SERVICE DETAIL TEMPLATE (CityNameservicesDetails.jsx)
  ───────────────────────────────────────────────────────────── */
  function buildServiceDetailJsx(
    stateDir,
    cityFile,
    stateLabel,
    cityLabel,
    stateSlug,
    citySlug,
  ) {
    const componentName = `${cityFile}`;
    const dataImport = `../../data/${stateDir}/${cityFile}services`;
    const cityPath = `/${stateSlug}/${citySlug}`;

    return `import React, { useState, useMemo } from 'react';
  import { useParams, Link, useNavigate } from 'react-router-dom';
  import { useBooking } from '../../context/BookingContext';
  import { services } from '${dataImport}';
  import Header from '../../components/Header';
  import { trackEvent } from '../../utils/analytics';

  const phone = "9324881345";

  function parseList(str) {
    if (!str) return [];
    return str.split(',').map((s) => s.trim()).filter(Boolean);
  }

  function CheckIcon() {
    return (
      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    );
  }

  const ${componentName} = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { startBooking } = useBooking();

    const service = useMemo(
      () => services.find((s) => String(s.id) === String(id)),
      [id]
    );

    const allImages = useMemo(() => {
      if (!service) return [];
      return [service.image, ...(service.images || [])];
    }, [service]);

    const [activeImg, setActiveImg] = useState(0);

    if (!service) {
      return (
        <div className="min-h-screen bg-neutral-50">
          <Header showBack title="Service Not Found" />
          <div className="w-full px-0  sm:px-6 py-16 text-center">
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">Service Not Found</h1>
            <p className="text-neutral-600 mb-8">
              The service you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="${cityPath}"
              className="bg-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-pink-700 transition-colors"
            >
              ← Back to ${cityLabel}
            </Link>
          </div>
        </div>
      );
    }

    const serviceTypes  = parseList(service.service);
    const attentionList = parseList(service.attentionTo);
    const placesList    = parseList(service.placeOfService);
    const tags          = parseList(service.tag);

    const handleBookNow = () => {
      startBooking(service, { id: service.id, name: service.name });
      trackEvent('begin_checkout', {
        service_id: service.id,
        service_name: service.name,
        city: '${cityLabel}',
        state: '${stateLabel}',
      });
      navigate('/booking');
    };

    const relatedServices = services
      .filter((s) => String(s.id) !== String(id))
      .slice(0, 3);

    return (
      <div className="min-h-screen bg-neutral-50 pb-24">
        <Header showBack title={service.name} />

        {/* Breadcrumb */}
        <div className="w-full px-0  sm:px-4 pt-4">
          <nav className="text-sm text-neutral-500 mb-4 flex items-center gap-1 flex-wrap">
            <Link to="/" className="hover:text-pink-600 transition-colors">Home</Link>
            <span>›</span>
            <Link to="/${stateSlug}" className="hover:text-pink-600 transition-colors">${stateLabel}</Link>
            <span>›</span>
            <Link to="${cityPath}" className="hover:text-pink-600 transition-colors">${cityLabel}</Link>
            <span>›</span>
            <span className="text-neutral-900 font-medium">{service.name}</span>
          </nav>
        </div>

        <div className="w-full px-1 py-8 sm:px-6 sm:py-12">
          {/* Main Card */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md">
            <div className="md:flex">

              {/* Left: Image Gallery */}
              <div className="md:w-1/2 flex flex-col">
                <div className="relative overflow-hidden bg-neutral-900" style={{ minHeight: 320 }}>
                  <img
                    key={activeImg}
                    src={allImages[activeImg]}
                    alt={\`\${service.name} — view \${activeImg + 1}\`}
                    className="w-full h-80 md:h-96 object-cover transition-all duration-300"
                    style={{ display: 'block' }}
                  />
                  <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    Age {service.age}+
                  </span>
                  <span className="absolute top-3 right-3 bg-black/70 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
                    {service.availability}
                  </span>
                  {allImages.length > 1 && (
                    <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      {activeImg + 1} / {allImages.length}
                    </span>
                  )}
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setActiveImg((p) => (p - 1 + allImages.length) % allImages.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Previous image"
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => setActiveImg((p) => (p + 1) % allImages.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        aria-label="Next image"
                      >
                        ›
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail strip */}
                {allImages.length > 1 && (
                  <div className="flex gap-1 p-2 bg-neutral-900">
                    {allImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        onMouseEnter={() => setActiveImg(i)}
                        aria-label={\`View image \${i + 1}\`}
                        className={\`flex-1 aspect-square overflow-hidden rounded transition-all duration-200 focus:outline-none \${
                          i === activeImg
                            ? 'ring-2 ring-pink-500 opacity-100 scale-105'
                            : 'opacity-40 hover:opacity-70'
                        }\`}
                      >
                        <img
                          src={img}
                          alt={\`Thumbnail \${i + 1}\`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Details */}
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col gap-4">

                <div className="flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                    ✓ {service.availability}
                  </span>
                  <span className="bg-pink-100 text-pink-700 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                    📍 {service.location}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 leading-tight">
                  {service.description}
                  <span className="text-pink-600"> in ${cityLabel}</span>
                </h1>

             

                {service.aboutme && (
                  <div className="bg-pink-50 rounded-xl p-4 border border-pink-100">
                    <p className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1">About Me</p>
                    <p className="text-neutral-700 text-lg leading-relaxed">{service.aboutme}</p>
                  </div>
                )}

                <hr className="border-neutral-100" />

                <dl className="grid grid-cols-1 gap-3 text-sm">
                  {serviceTypes.length > 0 && (
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1.5">Services Offered</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {serviceTypes.map((s) => (
                          <span key={s} className="bg-neutral-100 text-neutral-700 text-xs px-2.5 py-1 rounded-full font-medium">
                            {s}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                  {attentionList.length > 0 && (
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1.5">Available For</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {attentionList.map((a) => (
                          <span key={a} className="bg-pink-50 text-pink-700 text-xs px-2.5 py-1 rounded-full font-medium capitalize">
                            {a}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                  {placesList.length > 0 && (
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1.5">Serves In</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {placesList.map((p) => (
                          <span key={p} className="bg-green-50 text-green-700 text-xs px-2.5 py-1 rounded-full font-medium capitalize">
                            📍 {p}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                  {tags.length > 0 && (
                    <div>
                      <dt className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-1.5">Tags</dt>
                      <dd className="flex flex-wrap gap-1.5">
                        {tags.map((t) => (
                          <span key={t} className="text-[11px] bg-neutral-50 border border-neutral-200 text-neutral-500 px-2.5 py-0.5 rounded-full capitalize">
                            #{t}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}
                </dl>

                <hr className="border-neutral-100" />

                <div className="grid grid-cols-2 gap-2 text-sm text-neutral-700">
                  {['100% Verified Profile', 'Complete Privacy', '24/7 Support', 'Safe & Secure Booking'].map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <CheckIcon />
                      <span className="text-xs">{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-2 pt-2">
                  <button
                    onClick={handleBookNow}
                    className="w-full bg-pink-600 text-white py-3.5 rounded-xl font-semibold hover:bg-pink-700 active:scale-95 transition-all text-center"
                  >
                    Book Now
                  </button>
                  <div className="flex gap-2">
                    <a
                      href={\`tel:+91\${phone}\`}
                      className="flex-1 border-2 border-pink-600 text-pink-600 py-3 rounded-xl font-semibold hover:bg-pink-50 transition-colors text-center inline-flex items-center justify-center gap-2 text-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Now
                    </a>
                    <a
                      href={\`https://wa.me/91\${phone}\`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-colors text-center inline-flex items-center justify-center gap-2 text-sm"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          {(service.images || []).length > 0 && (
            <section className="mt-8">
              <h2 className="text-xl font-bold text-neutral-900 mb-4">Photo Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[service.image, ...(service.images || [])].map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={\`relative overflow-hidden rounded-xl aspect-square focus:outline-none transition-all duration-200 \${
                      i === activeImg ? 'ring-4 ring-pink-500 shadow-lg scale-105' : 'hover:scale-105 hover:shadow-md'
                    }\`}
                  >
                    <img
                      src={img}
                      alt={\`\${service.name} photo \${i + 1}\`}
                      className="w-full h-full object-cover"
                    />
                    {i === 0 && (
                      <span className="absolute top-2 left-2 bg-pink-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Main
                      </span>
                    )}
                    {i === activeImg && (
                      <div className="absolute inset-0 bg-pink-600/20 flex items-center justify-center">
                        <span className="text-white text-xs font-bold bg-pink-600 px-2 py-0.5 rounded-full">Active</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-neutral-900 mb-5">More Services in ${cityLabel}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedServices.map((s) => (
                  <Link
                    key={s.id}
                    to={\`${cityPath}/service/\${s.id}\`}
                    className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute bottom-3 right-3">
                        <span className="bg-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                          View Profiles
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-neutral-900 mb-1 group-hover:text-pink-600 transition-colors line-clamp-3">
                        {s.description}
                      </h3>
      
                      <div className="flex items-center gap-2 mt-3 text-xs text-neutral-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {s.availability}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sticky Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-3 z-50 md:hidden">
          <div className="flex gap-2">
            <button
              onClick={handleBookNow}
              className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-pink-700 transition-colors text-sm"
            >
              Book Now
            </button>
            <a
              href={\`https://wa.me/91\${phone}\`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-green-600 transition-colors text-sm"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  };

  export default ${componentName};
  `;
  }

  /* ─────────────────────────────────────────────────────────────
    SLUGIFY helper for state/city dir names → URL slugs
    e.g. "AndamanandNicobar" → "andaman-and-nicobar"
          "Tamil Nadu" → "tamil-nadu"
          "ConnaughtPlace" → "connaught-place"
  ───────────────────────────────────────────────────────────── */
  function dirToSlug(name) {
    return (
      name
        // insert hyphen between lower→upper transitions
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        // replace spaces with hyphens
        .replace(/\s+/g, "-")
        .toLowerCase()
    );
  }

  function dirToLabel(name) {
    // "AndamanandNicobar" → "Andaman and Nicobar"
    // "ConnaughtPlace"    → "Connaught Place"
    return name.replace(/([a-z])([A-Z])/g, "$1 $2");
  }

  /* ─────────────────────────────────────────────────────────────
    MAIN: scan and rewrite all files
  ───────────────────────────────────────────────────────────── */

  let dataFixed = 0;
  let jsxFixed = 0;
  let skipped = 0;

  const stateDirs = getSubDirs(DATA_DIR);

for (const stateDir of stateDirs) {
  const stateLabel = dirToLabel(stateDir);
  const stateSlug = dirToSlug(stateDir);
  const dataStateDir = path.join(DATA_DIR, stateDir);
  const detailStateDir = path.join(DETAILS_DIR, stateDir);

  // Create the state folder if it doesn't exist
  if (!fs.existsSync(detailStateDir)) {
    fs.mkdirSync(detailStateDir, { recursive: true });
    console.log(`  [CREATED] serviceCarDetails dir for state: ${stateDir}`);
  }

  // Get all city service .js files in data/<State>/
  const dataFiles = fs
    .readdirSync(dataStateDir)
    .filter((f) => f.endsWith("services.js"));

  for (const dataFile of dataFiles) {
    const cityFile = dataFile.replace("services.js", "");
    const cityLabel = dirToLabel(cityFile);
    const citySlug = dirToSlug(cityFile);

    const detailPagePath = path.join(detailStateDir, `${cityFile}.jsx`);

    // Generate JSX content
    const newDetailJsx = buildServiceDetailJsx(
      stateDir,
      cityFile,
      stateLabel,
      cityLabel,
      stateSlug,
      citySlug
    );

    // Create or overwrite the JSX file
    fs.writeFileSync(detailPagePath, newDetailJsx, "utf8");
    console.log(`[CREATED/UPDATED] ${detailPagePath}`);
    jsxFixed++;

    // const dataFilePath = path.join(dataStateDir, dataFile);
    // const newDataContent = buildServicesFile(citySlug, cityLabel);
    // fs.writeFileSync(dataFilePath, newDataContent, 'utf8');
    // console.log(`  [DATA] Fixed: data/${stateDir}/${dataFile}`);
    // dataFixed++;
  }
}

console.log("\n════════════════════════════════════");
console.log(`✅ Done!`);
console.log(`   JSX files fixed  : ${jsxFixed}`);
console.log("════════════════════════════════════\n");