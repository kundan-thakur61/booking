/**
 * Generate missing Indian state/city pages and service data files.
 * Run: node scripts/generate-missing-cities.cjs
 */
const fs = require('fs');
const path = require('path');

const stateDir = path.join(__dirname, '..', 'src', 'state');
const dataDir = path.join(__dirname, '..', 'src', 'data');

// All Indian states/UTs with major cities, coordinates, pin codes, and areas
const ALL_STATES = {
  "Chhattisgarh": [
    { name: "Raipur", lat: 21.25, lng: 81.63, pin: "492001", areas: ["Raipur City", "Shankar Nagar", "Telibandha", "Devendra Nagar", "Mowa", "Tatibandh", "Pandri", "Civil Lines"] },
    { name: "Bhilai", lat: 21.21, lng: 81.38, pin: "490001", areas: ["Bhilai Township", "Supela", "Nehru Nagar", "Junwani", "Sector 1", "Sector 6", "Charoda", "Durg"] },
    { name: "Bilaspur", lat: 22.08, lng: 82.15, pin: "495001", areas: ["Bilaspur City", "Vyapar Vihar", "Sarkanda", "Torwa", "Mangla", "Uslapur", "Nehru Chowk", "Link Road"] },
    { name: "Korba", lat: 22.35, lng: 82.68, pin: "495677", areas: ["Korba Town", "NTPC Township", "Kusmunda", "Balco Nagar", "Darri", "Manikpur", "Urga", "Banki Mongra"] },
    { name: "Durg", lat: 21.19, lng: 81.28, pin: "491001", areas: ["Durg City", "Padmanabhpur", "Mohan Nagar", "Station Road", "Pulgaon", "Indira Market", "Malviya Nagar", "Power House"] },
    { name: "Rajnandgaon", lat: 21.10, lng: 81.03, pin: "491441", areas: ["Rajnandgaon City", "Ganj Mandi", "Khamardih", "Digvijay Nagar", "Bus Stand Area", "Purani Basti", "Station Road", "Nehru Chowk"] }
  ],
  "Goa": [
    { name: "Panaji", lat: 15.49, lng: 73.83, pin: "403001", areas: ["Panaji City", "Miramar", "Dona Paula", "Caranzalem", "Altinho", "Fontainhas", "Campal", "Taleigao"] },
    { name: "Margao", lat: 15.28, lng: 73.96, pin: "403601", areas: ["Margao City", "Fatorda", "Comba", "Aquem", "Borda", "Monte Hill", "Rawanfond", "Davorlim"] },
    { name: "Vasco", lat: 15.40, lng: 73.81, pin: "403802", areas: ["Vasco City", "Mangor Hill", "Baina", "Sada", "Dabolim", "Bogmalo", "Chicalim", "Headland Sada"] },
    { name: "Mapusa", lat: 15.59, lng: 73.81, pin: "403507", areas: ["Mapusa Town", "Peddem", "Cunchelim", "Bastora", "Guirim", "Moira", "Anjuna", "Calangute"] },
    { name: "Ponda", lat: 15.40, lng: 74.01, pin: "403401", areas: ["Ponda Town", "Curti", "Bandora", "Farmagudi", "Priol", "Khandepar", "Borim", "Shiroda"] },
    { name: "Calangute", lat: 15.54, lng: 73.76, pin: "403516", areas: ["Calangute Beach", "Baga", "Candolim", "Sinquerim", "Arpora", "Saligao", "Pilerne", "Sangolda"] }
  ],
  "Haryana": [
    { name: "Gurgaon", lat: 28.46, lng: 77.03, pin: "122001", areas: ["Gurgaon City", "DLF Phase 1", "Sohna Road", "MG Road", "Golf Course Road", "Cyber City", "Sector 29", "Udyog Vihar"] },
    { name: "Faridabad", lat: 28.41, lng: 77.31, pin: "121001", areas: ["Faridabad City", "NIT", "Sector 15", "Sector 21", "Ballabhgarh", "Surajkund", "Old Faridabad", "Greater Faridabad"] },
    { name: "Panipat", lat: 29.39, lng: 76.97, pin: "132103", areas: ["Panipat City", "Model Town", "Sector 25", "GT Road", "Samalkha", "Assandh", "Siwah", "Risalu"] },
    { name: "Ambala", lat: 30.38, lng: 76.77, pin: "134003", areas: ["Ambala City", "Ambala Cantt", "Sadar Bazar", "Mahesh Nagar", "Prem Nagar", "Baldev Nagar", "Ram Nagar", "Model Town"] },
    { name: "Karnal", lat: 29.69, lng: 76.98, pin: "132001", areas: ["Karnal City", "Model Town", "Sector 6", "NDRI Area", "Kunjpura Road", "GT Road", "Anand Colony", "Mughal Canal"] },
    { name: "Hisar", lat: 29.15, lng: 75.72, pin: "125001", areas: ["Hisar City", "Urban Estate", "Sector 14", "Model Town", "Red Square Market", "Railway Road", "Rajguru Market", "Industrial Area"] },
    { name: "Rohtak", lat: 28.89, lng: 76.59, pin: "124001", areas: ["Rohtak City", "Model Town", "Sector 1", "Civil Lines", "Subhash Nagar", "Asthal Bohar", "Delhi Road", "Bhiwani Stand"] },
    { name: "Sonipat", lat: 28.99, lng: 77.02, pin: "131001", areas: ["Sonipat City", "Sector 14", "Model Town", "Atlas Road", "Murthal Road", "Railway Road", "Gohana Road", "Kundli"] }
  ],
  "Himachal Pradesh": [
    { name: "Shimla", lat: 31.10, lng: 77.17, pin: "171001", areas: ["Shimla City", "Mall Road", "Lakkar Bazaar", "Kufri", "Mashobra", "Sanjauli", "Chhota Shimla", "Boileauganj"] },
    { name: "Manali", lat: 32.24, lng: 77.19, pin: "175131", areas: ["Manali Town", "Old Manali", "Mall Road", "Vashisht", "Solang Valley", "Aleo", "Model Town", "Hadimba Road"] },
    { name: "Dharamshala", lat: 32.22, lng: 76.32, pin: "176215", areas: ["Dharamshala City", "McLeod Ganj", "Bhagsu", "Naddi", "Dharamkot", "Forsyth Ganj", "Kotwali Bazaar", "Sidhbari"] },
    { name: "Solan", lat: 30.91, lng: 77.10, pin: "173212", areas: ["Solan City", "Mall Road", "Rajgarh", "The Ridge", "Chambaghat", "Salogra", "Nahan", "Baddi"] },
    { name: "Mandi", lat: 31.71, lng: 76.93, pin: "175001", areas: ["Mandi Town", "Indira Market", "Sundernagar", "Rewalsar", "Paddal", "Tarna Hill", "Bhuli", "Nagchala"] },
    { name: "Kullu", lat: 31.96, lng: 77.11, pin: "175101", areas: ["Kullu Town", "Akhara Bazaar", "Dhalpur", "Manikaran", "Bhuntar", "Naggar", "Raison", "Katrain"] }
  ],
  "Jammu and Kashmir": [
    { name: "Srinagar", lat: 34.08, lng: 74.79, pin: "190001", areas: ["Srinagar City", "Dal Gate", "Lal Chowk", "Rajbagh", "Hazratbal", "Nishat", "Shalimar", "Gogji Bagh"] },
    { name: "Jammu", lat: 32.73, lng: 74.87, pin: "180001", areas: ["Jammu City", "Gandhi Nagar", "Residency Road", "Pacca Danga", "Nanak Nagar", "Trikuta Nagar", "Channi Himmat", "Rehari"] },
    { name: "Anantnag", lat: 33.73, lng: 75.15, pin: "192101", areas: ["Anantnag Town", "KP Road", "Janglat Mandi", "Lal Chowk", "Achabal", "Pahalgam", "Kokernag", "Shangus"] },
    { name: "Baramulla", lat: 34.20, lng: 74.34, pin: "193101", areas: ["Baramulla Town", "Dewan Bagh", "Kanispora", "Sopore", "Pattan", "Tangmarg", "Boniyar", "Uri"] },
    { name: "Udhampur", lat: 32.92, lng: 75.14, pin: "182101", areas: ["Udhampur City", "Shiv Nagar", "Jib", "Tikri", "Ramnagar", "Dhar Road", "Domel Chowk", "Sunal"] }
  ],
  "Jharkhand": [
    { name: "Ranchi", lat: 23.34, lng: 85.31, pin: "834001", areas: ["Ranchi City", "Main Road", "Doranda", "Morabadi", "Lalpur", "Bariatu", "Kanke", "Ratu Road"] },
    { name: "Jamshedpur", lat: 22.80, lng: 86.18, pin: "831001", areas: ["Jamshedpur City", "Bistupur", "Sakchi", "Telco", "Sonari", "Kadma", "Golmuri", "Mango"] },
    { name: "Dhanbad", lat: 23.80, lng: 86.43, pin: "826001", areas: ["Dhanbad City", "Bank More", "Hirapur", "Saraidhela", "Jharia", "Katras", "Govindpur", "Putki"] },
    { name: "Bokaro", lat: 23.67, lng: 86.15, pin: "827001", areas: ["Bokaro Steel City", "Sector 1", "Sector 4", "City Centre", "Chas", "Bermo", "Phusro", "Balidih"] },
    { name: "Hazaribagh", lat: 23.99, lng: 85.36, pin: "825301", areas: ["Hazaribagh Town", "Court Road", "Circular Road", "Canary Hill", "Matwari", "Keredari", "Sadanand Chowk", "Boddam"] },
    { name: "Deoghar", lat: 24.49, lng: 86.70, pin: "814112", areas: ["Deoghar City", "Tower Chowk", "Kachahri Road", "Baidyanath Dham", "Jasidih", "Rohini", "Liluah", "Madhupur"] },
    { name: "Giridih", lat: 24.19, lng: 86.30, pin: "815301", areas: ["Giridih Town", "Station Road", "Court Road", "Jhumri Tilaiya", "Tundi", "Bengabad", "Deori", "Bagodar"] }
  ],
  "Kerala": [
    { name: "Thiruvananthapuram", lat: 8.52, lng: 76.94, pin: "695001", areas: ["Trivandrum City", "MG Road", "Kowdiar", "Vazhuthacaud", "Pattom", "Kazhakkoottam", "Sreekaryam", "Thampanoor"] },
    { name: "Kochi", lat: 9.93, lng: 76.27, pin: "682001", areas: ["Kochi City", "MG Road", "Marine Drive", "Kakkanad", "Edappally", "Fort Kochi", "Vyttila", "Palarivattom"] },
    { name: "Kozhikode", lat: 11.25, lng: 75.77, pin: "673001", areas: ["Kozhikode City", "SM Street", "Mavoor Road", "Beach Road", "Palayam", "Nadakkavu", "Mananchira", "Vellimadukunnu"] },
    { name: "Thrissur", lat: 10.53, lng: 76.21, pin: "680001", areas: ["Thrissur City", "Round East", "Round South", "Swaraj Round", "Punkunnam", "Ayyanthole", "Kokkalai", "Ollur"] },
    { name: "Kollam", lat: 8.89, lng: 76.60, pin: "691001", areas: ["Kollam City", "Chinnakada", "Polayathode", "Kottamukku", "Asramam", "Mundakkal", "Kilikollur", "Kadappakada"] },
    { name: "Kannur", lat: 11.87, lng: 75.37, pin: "670001", areas: ["Kannur City", "South Bazaar", "Fort Road", "Thavakkara", "Thalassery", "Burnassery", "Caltex", "Pallikkunnu"] },
    { name: "Alappuzha", lat: 9.49, lng: 76.34, pin: "688001", areas: ["Alappuzha Town", "Beach Road", "CCSB Road", "Punnamada", "Cherthala", "Mannancherry", "Mararikulam", "Thathampally"] }
  ],
  "Madhya Pradesh": [
    { name: "Bhopal", lat: 23.26, lng: 77.41, pin: "462001", areas: ["Bhopal City", "MP Nagar", "Arera Colony", "New Market", "TT Nagar", "Habibganj", "Kolar Road", "Hoshangabad Road"] },
    { name: "Indore", lat: 22.72, lng: 75.86, pin: "452001", areas: ["Indore City", "Vijay Nagar", "Palasia", "MG Road", "Sapna Sangeeta", "AB Road", "Bhawarkua", "South Tukoganj"] },
    { name: "Jabalpur", lat: 23.18, lng: 79.95, pin: "482001", areas: ["Jabalpur City", "Wright Town", "Napier Town", "Civil Lines", "Madan Mahal", "Adhartal", "Vijay Nagar", "Gol Bazar"] },
    { name: "Gwalior", lat: 26.22, lng: 78.18, pin: "474001", areas: ["Gwalior City", "Lashkar", "Morar", "City Centre", "Thatipur", "Bahodapur", "Hazira", "Jayendraganj"] },
    { name: "Ujjain", lat: 23.18, lng: 75.77, pin: "456001", areas: ["Ujjain City", "Freeganj", "Mahakaleshwar", "Tower Chowk", "Nagziri", "Dewas Gate", "Agar Road", "Nanakheda"] },
    { name: "Sagar", lat: 23.84, lng: 78.74, pin: "470001", areas: ["Sagar City", "Civil Lines", "Cantt Area", "Tili", "Makronia", "Gopalganj", "University Road", "Shivaji Ward"] },
    { name: "Satna", lat: 24.58, lng: 80.83, pin: "485001", areas: ["Satna City", "Rewa Road", "Birla Nagar", "Raghuraj Nagar", "Civil Lines", "Venkatesh", "Panna Road", "Station Road"] }
  ],
  "Manipur": [
    { name: "Imphal", lat: 24.82, lng: 93.95, pin: "795001", areas: ["Imphal City", "Thangal Bazaar", "Paona Bazaar", "Sagolband", "Singjamei", "Uripok", "Keishampat", "Lamphelpat"] },
    { name: "Thoubal", lat: 24.63, lng: 94.02, pin: "795138", areas: ["Thoubal Town", "Thoubal Bazar", "Wangjing", "Kakching", "Lilong", "Yairipok", "Mayang Imphal", "Heirok"] },
    { name: "Bishnupur", lat: 24.63, lng: 93.78, pin: "795126", areas: ["Bishnupur Town", "Nambol", "Moirang", "Ningthoukhong", "Kwakta", "Oinam", "Kumbi", "Khoijuman"] }
  ],
  "Meghalaya": [
    { name: "Shillong", lat: 25.57, lng: 91.88, pin: "793001", areas: ["Shillong City", "Police Bazaar", "Laitumkhrah", "Lachumiere", "Nongthymmai", "Mawkhar", "Laban", "Nongrim Hills"] },
    { name: "Tura", lat: 25.51, lng: 90.22, pin: "794001", areas: ["Tura Town", "Chandmari", "Hawakhana", "Dakopgre", "Araimile", "Tura Bazaar", "Dikkimgre", "Compara"] },
    { name: "Jowai", lat: 25.45, lng: 92.20, pin: "793150", areas: ["Jowai Town", "Iawmusiang", "Mynthong", "Ladthalaboh", "Tuber", "Shangpung", "Syndai", "Nartiang"] }
  ],
  "Mizoram": [
    { name: "Aizawl", lat: 23.73, lng: 92.72, pin: "796001", areas: ["Aizawl City", "Bara Bazaar", "Dawrpui", "Chanmari", "Zarkawt", "Chaltlang", "Bawngkawn", "Khatla"] },
    { name: "Lunglei", lat: 22.88, lng: 92.73, pin: "796701", areas: ["Lunglei Town", "Bazaar Veng", "Chanmari", "Zotlang", "Salem Veng", "Rahsi Veng", "Ramhlun", "Serkawn"] },
    { name: "Champhai", lat: 23.47, lng: 93.33, pin: "796321", areas: ["Champhai Town", "Zotlang", "Vengthlang", "Kahrawt", "Bungkawn", "Bethel", "Electric Veng", "Tlangsam"] }
  ],
  "Nagaland": [
    { name: "Kohima", lat: 25.67, lng: 94.11, pin: "797001", areas: ["Kohima Town", "Main Town", "High School Area", "Midland", "Razhu Point", "PRH Colony", "Phesama", "Tsiesema"] },
    { name: "Dimapur", lat: 25.90, lng: 93.73, pin: "797112", areas: ["Dimapur City", "Midland", "Duncan", "Purana Bazaar", "Super Market", "Burma Camp", "Walford", "Signal Basti"] },
    { name: "Mokokchung", lat: 26.32, lng: 94.52, pin: "798601", areas: ["Mokokchung Town", "Ward 6", "Arkong", "Alempang", "Yisemyong", "Town Square", "Imkongmeren", "Sangtemla"] }
  ],
  "Odisha": [
    { name: "Bhubaneswar", lat: 20.30, lng: 85.82, pin: "751001", areas: ["Bhubaneswar City", "Saheed Nagar", "Jaydev Vihar", "Patia", "Chandrasekharpur", "Nayapalli", "Unit 1", "Khandagiri"] },
    { name: "Cuttack", lat: 20.46, lng: 85.88, pin: "753001", areas: ["Cuttack City", "Buxi Bazaar", "College Square", "Badambadi", "Cantonment Road", "Link Road", "Bidanasi", "Markat Nagar"] },
    { name: "Rourkela", lat: 22.26, lng: 84.85, pin: "769001", areas: ["Rourkela City", "Sector 1", "Civil Township", "Udit Nagar", "Chhend", "Basanti Colony", "Panposh", "Koel Nagar"] },
    { name: "Berhampur", lat: 19.31, lng: 84.79, pin: "760001", areas: ["Berhampur City", "Gandhi Nagar", "Ambapua", "Tumb", "Engineering School", "Court Road", "Giri Road", "Lanjipalli"] },
    { name: "Sambalpur", lat: 21.47, lng: 83.97, pin: "768001", areas: ["Sambalpur City", "Khetrajpur", "Ainthapali", "Budharaja", "Dhanupali", "Modipara", "Bareipali", "Nayapara"] },
    { name: "Puri", lat: 19.81, lng: 85.83, pin: "752001", areas: ["Puri Town", "Grand Road", "CT Road", "VIP Road", "Marine Drive", "Chakratirtha", "Baliapanda", "Penthakata"] }
  ],
  "Punjab": [
    { name: "Ludhiana", lat: 30.90, lng: 75.86, pin: "141001", areas: ["Ludhiana City", "Model Town", "Civil Lines", "Sarabha Nagar", "BRS Nagar", "Dugri", "Ferozepur Road", "Pakhowal Road"] },
    { name: "Amritsar", lat: 31.63, lng: 74.87, pin: "143001", areas: ["Amritsar City", "Lawrence Road", "Ranjit Avenue", "Mall Road", "Hall Bazaar", "White Avenue", "Green Avenue", "GT Road"] },
    { name: "Jalandhar", lat: 31.33, lng: 75.58, pin: "144001", areas: ["Jalandhar City", "Model Town", "Green Model Town", "Civil Lines", "BMC Chowk", "Lajpat Nagar", "Maqsudan", "Garha"] },
    { name: "Patiala", lat: 30.34, lng: 76.39, pin: "147001", areas: ["Patiala City", "Model Town", "Urban Estate", "Phulkian Enclave", "Rajpura Road", "Leela Bhawan", "Sheranwala Gate", "Sirhind Road"] },
    { name: "Bathinda", lat: 30.21, lng: 74.95, pin: "151001", areas: ["Bathinda City", "Model Town", "Civil Lines", "Bibi Wala Road", "Goniana Road", "Amrik Singh Road", "Thermal Colony", "Rose Garden"] },
    { name: "Mohali", lat: 30.70, lng: 76.72, pin: "160062", areas: ["Mohali City", "Phase 1", "Phase 5", "Phase 7", "Phase 8", "Sector 68", "IT City", "Aerocity"] }
  ],
  "Rajasthan": [
    { name: "Jaipur", lat: 26.91, lng: 75.79, pin: "302001", areas: ["Jaipur City", "MI Road", "C Scheme", "Malviya Nagar", "Vaishali Nagar", "Mansarovar", "Tonk Road", "Raja Park"] },
    { name: "Jodhpur", lat: 26.29, lng: 73.02, pin: "342001", areas: ["Jodhpur City", "Ratanada", "Sardarpura", "Paota", "Shastri Nagar", "Chopasni Road", "Pal Road", "Mandore"] },
    { name: "Udaipur", lat: 24.59, lng: 73.71, pin: "313001", areas: ["Udaipur City", "Fateh Sagar", "Hiran Magri", "Sukhadia Circle", "Chetak Circle", "University Road", "Ambamata", "Shobhagpura"] },
    { name: "Kota", lat: 25.18, lng: 75.86, pin: "324001", areas: ["Kota City", "Vigyan Nagar", "Talwandi", "Kunhari", "Gumanpura", "Shopping Centre", "Nayapura", "Mahaveer Nagar"] },
    { name: "Ajmer", lat: 26.45, lng: 74.64, pin: "305001", areas: ["Ajmer City", "Naya Bazaar", "Vaishali Nagar", "Madar Gate", "Civil Lines", "Foy Sagar", "Pushkar Road", "Beawar Road"] },
    { name: "Bikaner", lat: 28.02, lng: 73.31, pin: "334001", areas: ["Bikaner City", "Station Road", "Jai Narayan Vyas Colony", "Kote Gate", "Gangashahar", "PBM Hospital Road", "Sadul Colony", "Ambedkar Circle"] },
    { name: "Sikar", lat: 27.62, lng: 75.14, pin: "332001", areas: ["Sikar City", "Piprali Road", "Fatehpur Road", "Hospital Road", "Station Road", "Govind Nagar", "Laxmangarh Road", "Bus Stand Area"] }
  ],
  "Sikkim": [
    { name: "Gangtok", lat: 27.33, lng: 88.62, pin: "737101", areas: ["Gangtok City", "MG Marg", "Deorali", "Tadong", "Tathangchen", "Arithang", "Tibet Road", "Namnang"] },
    { name: "Namchi", lat: 27.17, lng: 88.35, pin: "737126", areas: ["Namchi Town", "Central Park", "Damthang", "Ravangla", "Jorethang", "Temi", "Melli", "Singithang"] },
    { name: "Gyalshing", lat: 27.29, lng: 88.26, pin: "737111", areas: ["Gyalshing Town", "Pelling", "Yuksom", "Dentam", "Soreng", "Rinchenpong", "Tikjuk", "Tashiding"] }
  ],
  "Telangana": [
    { name: "Hyderabad", lat: 17.38, lng: 78.49, pin: "500001", areas: ["Hyderabad City", "Banjara Hills", "Jubilee Hills", "HITEC City", "Madhapur", "Gachibowli", "Secunderabad", "Ameerpet"] },
    { name: "Warangal", lat: 17.98, lng: 79.60, pin: "506001", areas: ["Warangal City", "Hanamkonda", "Kazipet", "Hunter Road", "JPN Road", "Mulugu Road", "Subedari", "Balasamudram"] },
    { name: "Nizamabad", lat: 18.67, lng: 78.09, pin: "503001", areas: ["Nizamabad City", "Sarangapur", "Vinayak Nagar", "Dichpally", "Bodhan Road", "Pragati Nagar", "Station Road", "Gandhi Chowk"] },
    { name: "Karimnagar", lat: 18.44, lng: 79.13, pin: "505001", areas: ["Karimnagar City", "Mankammathota", "Jyothi Nagar", "Kothirampur", "Vidyanagar", "Sai Nagar", "Chaitanyapuri", "Vavilalapally"] },
    { name: "Khammam", lat: 17.25, lng: 80.15, pin: "507001", areas: ["Khammam City", "Ballepalli", "Wyra Road", "Rotary Nagar", "Gandhi Chowk", "Khanapuram", "Tekulapalli", "Raghunadhapalem"] }
  ],
  "Tripura": [
    { name: "Agartala", lat: 23.83, lng: 91.28, pin: "799001", areas: ["Agartala City", "Battala", "Gol Bazar", "Motor Stand", "Krishnanagar", "Banamalipur", "Kaman Chowmuhani", "Durjoynagar"] },
    { name: "Udaipur", lat: 23.53, lng: 91.49, pin: "799120", areas: ["Udaipur Town", "Matabari", "Radhakishorepur", "Tepania", "Amarpur", "Kakraban", "Melaghar", "Sonamura"] },
    { name: "Dharmanagar", lat: 24.38, lng: 92.17, pin: "799250", areas: ["Dharmanagar Town", "Kailashahar", "Kumarghat", "Panisagar", "Churaibari", "Kadamtala", "Halflong", "Pecharthal"] }
  ],
  "Uttarakhand": [
    { name: "Dehradun", lat: 30.32, lng: 78.03, pin: "248001", areas: ["Dehradun City", "Rajpur Road", "Clock Tower", "Paltan Bazaar", "Race Course", "ISBT", "Clement Town", "Mussoorie Road"] },
    { name: "Haridwar", lat: 29.95, lng: 78.16, pin: "249401", areas: ["Haridwar City", "Har Ki Pauri", "Railway Road", "Jwalapur", "Kankhal", "Ranipur", "Bhel", "Shivalik Nagar"] },
    { name: "Rishikesh", lat: 30.09, lng: 78.27, pin: "249201", areas: ["Rishikesh City", "Ram Jhula", "Lakshman Jhula", "Tapovan", "Muni Ki Reti", "Ghat Road", "Swargashram", "Jonk"] },
    { name: "Nainital", lat: 29.38, lng: 79.45, pin: "263001", areas: ["Nainital City", "Mall Road", "Tallital", "Mallital", "Bara Bazaar", "Snow View", "Ayarpatta", "Sher Ka Danda"] },
    { name: "Roorkee", lat: 29.87, lng: 77.89, pin: "247667", areas: ["Roorkee City", "Civil Lines", "Station Road", "Haridwar Road", "Solani Nagar", "Ganeshpur", "Bhagirath Puram", "Patel Nagar"] },
    { name: "Haldwani", lat: 29.22, lng: 79.51, pin: "263139", areas: ["Haldwani City", "Nainital Road", "Banbhoolpura", "Kaladhungi Road", "Bhotia Parao", "Mukhani", "Gaulapar", "Lamachaur"] }
  ],
  "Chandigarh": [
    { name: "Chandigarh", lat: 30.73, lng: 76.78, pin: "160001", areas: ["Sector 17", "Sector 22", "Sector 35", "Sector 43", "Industrial Area Phase 1", "Manimajra", "Panchkula", "Zirakpur"] }
  ],
  "Puducherry": [
    { name: "Puducherry", lat: 11.93, lng: 79.83, pin: "605001", areas: ["Puducherry City", "White Town", "MG Road", "Mission Street", "Lawspet", "Muthialpet", "Villianur", "Ariyankuppam"] },
    { name: "Karaikal", lat: 10.92, lng: 79.84, pin: "609602", areas: ["Karaikal Town", "Thirunallar", "Kottucherry", "Neravy", "Ambagarathur", "Varichikudy", "TR Pattinam", "Polagam"] }
  ],
  "Ladakh": [
    { name: "Leh", lat: 34.15, lng: 77.58, pin: "194101", areas: ["Leh City", "Main Bazaar", "Fort Road", "Changspa", "Skara", "Karzoo", "Upper Tukcha", "Sankar"] },
    { name: "Kargil", lat: 34.55, lng: 76.13, pin: "194103", areas: ["Kargil Town", "Main Bazaar", "Baroo", "Poyen", "Drass", "Sankoo", "Leh Road", "Hunderman"] }
  ]
};

// Existing states in src/state/ - skip these
function getExistingStates() {
  try {
    return fs.readdirSync(stateDir).filter(f =>
      fs.statSync(path.join(stateDir, f)).isDirectory()
    );
  } catch { return []; }
}

function getExistingCities(state) {
  const dir = path.join(stateDir, state);
  try {
    return fs.readdirSync(dir)
      .filter(f => f.endsWith('.jsx'))
      .map(f => f.replace('.jsx', ''));
  } catch { return []; }
}

function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-');
}

function camelCase(name) {
  return name.replace(/\s+/g, '');
}

function getStateCode(state) {
  const codes = {
    "Andaman and Nicobar": "AN", "Andhra Pradesh": "AP", "Arunachal Pradesh": "AR",
    "Assam": "AS", "Bihar": "BR", "Chandigarh": "CH", "Chhattisgarh": "CT",
    "Delhi": "DL", "Goa": "GA", "Gujarat": "GJ", "Haryana": "HR",
    "Himachal Pradesh": "HP", "Jammu and Kashmir": "JK", "Jharkhand": "JH",
    "Karnataka": "KA", "Kerala": "KL", "Ladakh": "LA", "Madhya Pradesh": "MP",
    "Maharashtra": "MH", "Manipur": "MN", "Meghalaya": "ML", "Mizoram": "MZ",
    "Mumbai": "MH", "Nagaland": "NL", "Odisha": "OR", "Puducherry": "PY",
    "Punjab": "PB", "Rajasthan": "RJ", "Sikkim": "SK", "Tamil Nadu": "TN",
    "Telangana": "TG", "Tripura": "TR", "Uttar Pradesh": "UP",
    "Uttarakhand": "UK", "West Bengal": "WB"
  };
  return codes[state] || "IN";
}

// Generate services data file
function generateServicesFile(city, state) {
  const citySlug = slugify(city.name);
  return `export const services = [
  {
    id: "${citySlug}-001",
    name: "VIP Escort Service",
    description: "Premium escort service for high-profile clients in ${city.name}. Discreet and professional companionship for any occasion.",
    image: "https://picsum.photos/seed/${citySlug}vip/400/500",
    availability: "24/7 Available"
  },
  {
    id: "${citySlug}-002",
    name: "Premium Companion",
    description: "Elegant and sophisticated companions for corporate events, dinners, and social gatherings in ${city.name} area.",
    image: "https://picsum.photos/seed/${citySlug}premium/400/500",
    availability: "Available Today"
  },
  {
    id: "${citySlug}-003",
    name: "Body Massage Service",
    description: "Relaxing therapeutic massage services with premium companionship. Full body massage experience in ${city.name}.",
    image: "https://picsum.photos/seed/${citySlug}massage/400/500",
    availability: "24/7 Available"
  },
  {
    id: "${citySlug}-004",
    name: "Dinner Date Companion",
    description: "Charming companions for dinner dates, romantic evenings, and special occasions throughout ${city.name}.",
    image: "https://picsum.photos/seed/${citySlug}dinner/400/500",
    availability: "Evenings Available"
  },
  {
    id: "${citySlug}-005",
    name: "GFE (Girlfriend Experience)",
    description: "Authentic girlfriend experience with genuine emotional connection and companionship in ${city.name}.",
    image: "https://picsum.photos/seed/${citySlug}gfe/400/500",
    availability: "Available Today"
  },
  {
    id: "${citySlug}-006",
    name: "Travel Companion",
    description: "Professional travel companions for business trips, vacations, and weekend getaways departing from ${city.name}.",
    image: "https://picsum.photos/seed/${citySlug}travel/400/500",
    availability: "24/7 Available"
  }
];
`;
}

// Generate city JSX component
function generateCityJSX(city, state, siblingCities) {
  const componentName = camelCase(city.name);
  const citySlug = slugify(city.name);
  const stateSlug = slugify(state);
  const stateCode = getStateCode(state);
  const serviceFileName = camelCase(city.name) + 'services';
  const profileCount = 50 + Math.floor(Math.random() * 80);
  const areasStr = city.areas.map(a => `"${a}"`).join(', ');
  const areasFirstFour = city.areas.slice(0, 4).join(', ');
  const areasFirstTwo = city.areas.slice(0, 2).join(' & ');

  // Related cities (siblings in same state, excluding self)
  const relatedCities = siblingCities
    .filter(c => c.name !== city.name)
    .slice(0, 8)
    .map((c, i) => `              { name: "${c.name}", slug: "${slugify(c.name)}", count: ${50 + (i * 15)} }`)
    .join(',\n');

  return `import React from 'react';
import SEO from '../../components/SEO';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import LazyImage from '../../components/LazyImage';
import { services } from '../../data/${state}/${serviceFileName}';

import {
  buildEnhancedOrganizationSchema,
  buildProductSchema,
  buildReviewSchema
} from '../../utils/schema';

import { LocalBusinessSchemaGenerator } from '../../seo/local-business-schema';

const phone = "07633807420";

const ${componentName} = () => {
  const cityServices = services.slice(0, 6);

  const cityData = {
    name: "${city.name}",
    city: "${city.name}",
    state: "${state}",
    pinCodes: ["${city.pin}"],
    coordinates: {
      latitude: ${city.lat},
      longitude: ${city.lng}
    },
    areas: [${areasStr}],
    services: [
      "Verified Escorts", "Companion Services", "Massage Services",
      "VIP Escorts", "Travel Companions", "Social Event Companions"
    ]
  };

  const enhancedOrgSchema = buildEnhancedOrganizationSchema();

  const schemaGenerator = new LocalBusinessSchemaGenerator();
  const schemaPackage = schemaGenerator.generateCompleteCitySchema({
    city: cityData.name,
    state: cityData.state,
    slug: "${citySlug}",
    coordinates: cityData.coordinates,
    areas: cityData.areas,
    services: cityData.services,
    primaryPinCode: cityData.pinCodes[0]
  });

  const localBusinessSchema = schemaPackage.localBusiness;
  const breadcrumbSchema = schemaPackage.breadcrumb;

  const productSchemas = cityServices.slice(0, 3).map(service => {
    const sampleReviews = [
      { author: "${city.name} Client", rating: 5, text: "Excellent service in ${city.name}, highly professional and discreet.", date: "2026-01-15" },
      { author: "Verified User", rating: 5, text: "Verified profile, safe and trustworthy experience in ${city.areas[0]}.", date: "2026-01-12" }
    ];
    return buildProductSchema(service, sampleReviews);
  });

  const reviewSchemas = [
    buildReviewSchema({
      author: "Satisfied ${city.name} Client",
      rating: 5,
      text: "Outstanding service from BookEase in ${city.name}. Verified companions, safe booking, and professional experience.",
      date: "2026-01-16"
    }, "BookEase ${city.name} Escort Services"),
    buildReviewSchema({
      author: "Premium Member",
      rating: 5,
      text: "Best platform for verified escorts in ${city.name}. 24/7 availability and complete discretion guaranteed.",
      date: "2026-01-14"
    }, "BookEase ${city.name} Escort Services")
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Are the escorts verified in ${city.name}?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all escorts serving ${city.name} area are thoroughly verified with ID proof and authentic photos. We conduct background checks to ensure safety and authenticity."
        }
      },
      {
        "@type": "Question",
        "name": "What areas in ${city.name} do you cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We cover all major areas of ${city.name} including ${areasFirstFour}. Our companions are available across the entire ${city.name} region 24/7."
        }
      },
      {
        "@type": "Question",
        "name": "How do I book an escort in ${city.name}?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Browse our verified ${city.name} escort profiles, select your preferred companion, and contact us via phone or WhatsApp. Our team will help you complete the process securely and discreetly."
        }
      },
      {
        "@type": "Question",
        "name": "Is the service discreet in ${city.name}?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Your privacy is our top priority in ${city.name}. All bookings are handled with complete confidentiality."
        }
      },
      {
        "@type": "Question",
        "name": "What are the typical rates in ${city.name}?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rates in ${city.name} typically range from \\u20b95,000-\\u20b915,000 per hour, \\u20b98,000-\\u20b925,000 for 2 hours, and \\u20b920,000-\\u20b950,000+ for full night services."
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <SEO
        title="${city.name} Escorts 2026 \\u2014 ${profileCount}+ Verified Profiles | BookEase ${state}"
        description="\\u2713 ${profileCount}+ verified ${city.name} escorts \\u2713 ${areasFirstTwo} \\u2713 Available tonight \\u2713 24/7 service. Book premium companions in ${city.name}. 18+ only."
        canonical="https://www.escortmumbaii.in/${stateSlug}/${citySlug}"
        image="https://www.escortmumbaii.in/${citySlug}-og.jpg"
        entityType="localBusiness"
        lang="en-IN"
        jsonLd={[enhancedOrgSchema, localBusinessSchema, ...productSchemas, ...reviewSchemas]}
        faqSchema={faqSchema}
        breadcrumbSchema={breadcrumbSchema}
        meta={[
          { name: 'keywords', content: '${city.name} escorts 2026, escorts in ${city.name}, verified ${city.name} escorts, ${city.areas[0]} escorts, available tonight' },
          { name: 'geo.position', content: \`\${cityData.coordinates.latitude};\${cityData.coordinates.longitude}\` },
          { name: 'geo.placename', content: '${city.name}, ${state}' },
          { name: 'geo.region', content: 'IN-${stateCode}' }
        ]}
        city="${state}"
        area="${city.name}"
        serviceName="Verified Escort Services"
      />

      <Header showBack title="${city.name} Escorts" />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white py-12">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4 opacity-90">
            <Link to="/" className="hover:underline">Home</Link>
            <span className="mx-2">\\u203a</span>
            <Link to="/find-all-city" className="hover:underline">${state}</Link>
            <span className="mx-2">\\u203a</span>
            <span>${city.name}</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ${city.name} Escorts 2026 \\u2014 ${profileCount}+ Verified Companions in ${areasFirstTwo}
          </h1>
          <p className="text-xl mb-6 max-w-3xl">
            Browse ${profileCount}+ verified profiles of premium escorts and independent companions
            available 24/7 across all areas of ${city.name} including ${areasFirstFour}.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={\`tel:+91\${phone}\`}
              className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
            <a
              href={\`https://wa.me/91\${phone}\`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        {/* Areas Coverage */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Areas Covered in ${city.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cityData.areas.map((area) => (
              <div key={area} className="bg-white rounded-xl p-4 hover:shadow-lg transition-shadow border border-neutral-200">
                <h3 className="font-bold text-neutral-900">{area}</h3>
                <p className="text-sm text-neutral-600 mt-1">Service available 24/7</p>
              </div>
            ))}
          </div>
        </section>

        {/* Services */}
        <section className="py-12 px-4 bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                <Link to={\`/${stateSlug}/${citySlug}/service/\${service.id}\`} className="block h-full">
                  <div className="relative overflow-hidden">
                    <LazyImage src={service.image} alt={service.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute bottom-4 right-4">
                      <span className="bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">View Profiles</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-pink-600 transition-colors">{service.name}</h3>
                    <p className="text-neutral-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div className="flex items-center gap-2 text-sm text-neutral-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {service.availability}
                      </div>
                      <div className="text-pink-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">View Options \\u2192</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="prose prose-lg max-w-none mb-12 bg-white rounded-2xl p-8">
          <h2>About Escort Services in ${city.name}, ${state}</h2>
          <p>
            ${city.name} is a prominent area in ${state}, known for its vibrant community and bustling lifestyle.
            Our platform connects you with verified, professional escorts and companions specifically serving the ${city.name} region,
            including ${areasFirstFour}, and surrounding areas.
          </p>

          <h3>Why Choose BookEase ${city.name} Services?</h3>
          <ul>
            <li><strong>${city.name}-Focused Verification:</strong> All companions undergo specific background checks and area familiarity training</li>
            <li><strong>24/7 ${city.name} Availability:</strong> Services available round the clock across all ${city.name} areas</li>
            <li><strong>Local Discretion:</strong> Confidential booking processes designed for ${city.name} residents and visitors</li>
            <li><strong>Safe Platform:</strong> Companions trained in ${city.name} area safety protocols</li>
            <li><strong>Extensive Selection:</strong> ${profileCount}+ verified profiles available in ${city.name}</li>
            <li><strong>Area Expertise:</strong> Experienced companions familiar with ${city.name}'s layout and venues</li>
          </ul>

          <h3>${city.name} Coverage Areas</h3>
          <ul>
            {cityData.areas.map(area => (
              <li key={area}><strong>{area}:</strong> Full service coverage with verified companions available 24/7</li>
            ))}
          </ul>

          <h3>${city.name} Pricing</h3>
          <ul>
            <li>1 Hour: \\u20b95,000 - \\u20b915,000</li>
            <li>2 Hours: \\u20b98,000 - \\u20b925,000</li>
            <li>Full Night: \\u20b920,000 - \\u20b950,000+</li>
            <li>VIP/Premium: Custom rates</li>
          </ul>

          <h3>Contact ${city.name} Services</h3>
          <p>
            \\ud83d\\udcde Phone: <a href={\`tel:+91\${phone}\`}>+91-{phone}</a><br />
            \\ud83d\\udcac WhatsApp: <a href={\`https://wa.me/91\${phone}\`} target="_blank" rel="noopener noreferrer">+91-{phone}</a>
          </p>

          <p className="text-sm text-neutral-600 bg-yellow-50 p-4 rounded-lg">
            <strong>Note:</strong> This service is restricted to adults aged 18 and above only.
            We strictly comply with all applicable laws and regulations in ${city.name}, ${state}.
          </p>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Frequently Asked Questions About ${city.name} Services
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Are the escorts verified in ${city.name}?</h3>
              <p className="text-neutral-600">Yes, all escorts serving ${city.name} undergo verification including ID proof, authentic photos, and background checks.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">What areas in ${city.name} do you cover?</h3>
              <p className="text-neutral-600">We cover ${areasFirstFour} and all surrounding areas. Companions are positioned across ${city.name} for quick response.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">How do I book in ${city.name}?</h3>
              <p className="text-neutral-600">Browse our ${city.name} profiles, select your preferred companion, and contact us via phone or WhatsApp.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">Is the service discreet?</h3>
              <p className="text-neutral-600">Absolutely. All ${city.name} bookings are handled with complete confidentiality and professional discretion.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">What payment methods are accepted?</h3>
              <p className="text-neutral-600">We accept cash payments. All rates are confirmed at the time of booking with transparent pricing.</p>
            </div>
          </div>
        </section>

        {/* Related Areas */}
        <section className="bg-neutral-100 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-neutral-900 mb-6">
            Explore Other ${state} Areas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
${relatedCities}
            ].map((area) => (
              <Link
                key={area.slug}
                to={\`/${stateSlug}/\${area.slug}\`}
                className="bg-white rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
              >
                <span className="font-semibold text-neutral-900">{area.name}</span>
                <span className="block text-sm text-neutral-600">{area.count} profiles</span>
              </Link>
            ))}
          </div>
        </section>

      </div>

      {/* Sticky Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 safe-bottom z-50 md:hidden">
        <div className="flex gap-3">
          <a href={\`tel:+91\${phone}\`} className="flex-1 bg-pink-600 text-white py-3 rounded-xl font-semibold text-center hover:bg-pink-700 transition-colors">
            Call Now
          </a>
          <a href={\`https://wa.me/91\${phone}\`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold text-center hover:bg-green-600 transition-colors">
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

// Main execution
function main() {
  const existingStates = getExistingStates();
  let createdFiles = 0;
  let skippedFiles = 0;

  for (const [state, cities] of Object.entries(ALL_STATES)) {
    const existingCities = getExistingCities(state);

    for (const city of cities) {
      const cityFileName = camelCase(city.name);
      const serviceFileName = camelCase(city.name) + 'services';

      // Check if city JSX already exists
      if (existingCities.includes(cityFileName)) {
        skippedFiles++;
        continue;
      }

      // Create state directory if needed
      const stateDirPath = path.join(stateDir, state);
      if (!fs.existsSync(stateDirPath)) {
        fs.mkdirSync(stateDirPath, { recursive: true });
      }

      // Create data directory if needed
      const dataDirPath = path.join(dataDir, state);
      if (!fs.existsSync(dataDirPath)) {
        fs.mkdirSync(dataDirPath, { recursive: true });
      }

      // Write services data file
      const servicesPath = path.join(dataDirPath, `${serviceFileName}.js`);
      if (!fs.existsSync(servicesPath)) {
        fs.writeFileSync(servicesPath, generateServicesFile(city, state), 'utf8');
      }

      // Write city JSX component
      const jsxPath = path.join(stateDirPath, `${cityFileName}.jsx`);
      fs.writeFileSync(jsxPath, generateCityJSX(city, state, cities), 'utf8');
      createdFiles++;
      console.log(`  ✓ ${state}/${cityFileName}`);
    }
  }

  console.log(`\nDone! Created ${createdFiles} city pages, skipped ${skippedFiles} existing.`);
}

main();
