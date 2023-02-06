import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ABI_ADDRESS } from "../constants/contract";

const LANGUAGES = [
  { value: 'nepali', label: 'NEPALI' },
  { value: 'english', label: 'ENGLISH' },
];

const PARTIES = [
  "Nepali Congress",
  "Maoist",
  "Emalay",
  "Swatantra"
]

const PROVINCE = [
  { label: "Province 1", value: "province1" },
  { label: "Madhesh Province", value: "province2" },
  { label: "Bagmati Province", value: "province3" },
  { label: "Gandaki Province", value: "province4" },
  { label: "Lumbini Province", value: "province5" },
  { label: "Karnali Province", value: "province6" },
  { label: "Sudurpashchim Province", value: "province7" },
]

const DISTRICT = {
  province1: [
    { label: "Bhojpur", value: "Bhojpur" },
    { label: "Dhankuta", value: "Dhankuta" },
    { label: "Ilam", value: "Ilam" },
    { label: "Jhapa", value: "Jhapa" },
    { label: "Khotang", value: "Khotang" },
    { label: "Morang", value: "Morang" },
    { label: "Okhaldhunga", value: "Okhaldhunga" },
    { label: "Panchthar", value: "Panchthar" },
    { label: "Sankhuwasabha", value: "Sankhuwasabha" },
    { label: "Solukhumbu", value: "Solukhumbu" },
    { label: "Taplejung", value: "Taplejung" },
    { label: "Terhathum", value: "Terhathum" },
    { label: "Udayapur", value: "Udayapur" },
  ],
  province2: [
    { label: "Parsa", value: "Parsa" },
    { label: "Dhanusha", value: "Dhanusha" },
    { label: "Bara", value: "Bara" },
    { label: "Saptari", value: "Saptari" },
    { label: "Rautahat", value: "Rautahat" },
    { label: "Sarlahi", value: "Sarlahi" },
    { label: "Siraha", value: "Siraha" },
    { label: "Mahottari", value: "Mahottari" }
  ],
  province3: [
    { label: "Bhaktapur", value: "Bhaktapur" },
    { label: "Chitwan", value: "Chitwan" },
    { label: "Dhading", value: "Dhading" },
    { label: "Dolakha", value: "Dolakha" },
    { label: "Kathmandu", value: "Kathmandu" },
    { label: "Kavrepalanchok", value: "Kavrepalanchok" },
    { label: "Lalitpur", value: "Lalitpur" },
    { label: "Rasuwa", value: "Rasuwa" },
    { label: "Sindhuli", value: "Sindhuli" },
    { label: "Sindhupalchok", value: "Sindhupalchok" },
    { label: "Ramechhap", value: "Ramechhap" },
    { label: "Nuwakot", value: "Nuwakot" },

  ],
  province4: [
    { label: "Baglung", value: "Baglung" },
    { label: "Gorkha", value: "Gorkha" },
    { label: "Kaski", value: "Kaski" },
    { label: "Lamjung", value: "Lamjung" },
    { label: "Manang", value: "Manang" },
    { label: "Mustang", value: "Mustang" },
    { label: "Myagdi", value: "Myagdi" },
    { label: "Nawalpur", value: "Nawalpur" },
    { label: "Parbat", value: "Parbat" },
    { label: "Syangja", value: "Syangja" },
    { label: "Tanahun", value: "Tanahun" }
  ],
  province5: [
    { label: "Arghakhanchi", value: "Arghakhanchi" },
    { label: "Banke", value: "Banke" },
    { label: "Bardiya", value: "Bardiya" },
    { label: "Dang", value: "Dang" },
    { label: "Eastern Rukum", value: "Eastern Rukum" },
    { label: "Gulmi", value: "Gulmi" },
    { label: "Kapilvastu", value: "Tanahun" },
    { label: "Parasi", value: "Parasi" },
    { label: "Palpa", value: "Palpa" },
    { label: "Pyuthan", value: "Pyuthan" },
    { label: "Rolpa", value: "Rolpa" },
    { label: "Rupandehi", value: "Rupandehi" }
  ],
  province6: [
    { label: "Dolpa", value: "Dolpa" },
    { label: "Mugu", value: "Mugu" },
    { label: "Humla", value: "Humla" },
    { label: "Jumla", value: "Jumla" },
    { label: "Kalikot", value: "Kalikot" },
    { label: "Dailekh", value: "Dailekh" },
    { label: "Jajarkot", value: "Jajarkot" },
    { label: "Rukum", value: "Rukum" },
    { label: "Salyan", value: "Salyan" },
    { label: "Surkhet", value: "Surkhet" }
  ],
  province7: [
    { label: "Achham", value: "Achham" },
    { label: "Baitadi", value: "Baitadi" },
    { label: "Bajhang", value: "Jumla" },
    { label: "Bajura", value: "Bajura" },
    { label: "Dadeldhura", value: "Dadeldhura" },
    { label: "Darchula", value: "Darchula" },
    { label: "Doti", value: "Doti" },
    { label: "Kailali", value: "Kailali" },
    { label: "Kanchanpur", value: "Kanchanpur" }
  ]
}

const MUNICIPALITY = {
  "Bhojpur": [
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
  ],
  "Dhankuta": [
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
  ],
  "Ilam": [
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
  ],
  "Jhapa": [
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
    { label: "", value: "" },
  ],
  "Khotang": [
    { label: "Sakela Rural Municipality", value: "Sakela Rural Municipality" },
    { label: "Khotehang Rural Municipality", value: "Khotehang Rural Municipality" },
    { label: "Barahapokhari Rural Municipality", value: "Barahapokhari Rural Municipality" },
    { label: "Ainselukhark Rural Municipality", value: "Ainselukhark Rural Municipality" },
    { label: "Rawa Besi Rural Municipality", value: "Rawa Besi Rural Municipality" },
    { label: "Kepilasagadhi Rural Municipality", value: "Kepilasagadhi Rural Municipality" },
    { label: "Jantedhunga Rural Municipality", value: "Jantedhunga Rural Municipality" },
    { label: "Diprung Chuichumma Rural Municipality", value: "Diprung Chuichumma Rural Municipality" },
    { label: "Halesi Tuwachung Municipality", value: "Halesi Tuwachung Municipality" },
    { label: "Diktel Rupakot Majhuwagadhi Municipality", value: "Diktel Rupakot Majhuwagadhi Municipality" }
  ],
  "Morang": [
    { label: "Jahada Rural Municipality", value: "Jahada Rural Municipality" },
    { label: "Katahari Rural Municipality", value: "Katahari Rural Municipality" },
    { label: "Gramthan Rural Municipality", value: "Gramthan Rural Municipality" },
    { label: "Dhanpalthan Rural Municipality", value: "Dhanpalthan Rural Municipality" },
    { label: "Kerabari Rural Municipality", value: "Kerabari Rural Municipality" },
    { label: "Budhiganga Rural Municipality", value: "Budhiganga Rural Municipality" },
    { label: "Kanepokhari Rural Municipality", value: "Kanepokhari Rural Municipality" },
    { label: "Miklajung Rural Municipality", value: "Miklajung Rural Municipality" },
    { label: "Letang Municipality", value: "Letang Municipality" },
    { label: "Sunwarshi Municipality", value: "Sunwarshi Municipality" },
    { label: "Rangeli Municipality", value: "Rangeli Municipality" },
    { label: "Patahrishanishchare Municipality", value: "Patahrishanishchare Municipality" },
    { label: "Biratnagar Metropolitian City", value: "Biratnagar Metropolitian City" },
    { label: "Uralabari Municipality", value: "Uralabari Municipality" },
    { label: "Belbari Municipality", value: "Belbari Municipality" },
    { label: "Sundarharaicha Municipality", value: "Sundarharaicha Municipality" },
    { label: "Ratuwamai Municipality", value: "Ratuwamai Municipality" }
  ],
  "Okhaldhunga": [
    { label: "Likhu Rural Municipality", value: "Likhu Rural Municipality" },
    { label: "Molung Rural Municipality", value: "Molung Rural Municipality" },
    { label: "Sunkoshi Rural Municipality", value: "Sunkoshi Rural Municipality" },
    { label: "Champadevi Rural Municipality", value: "Champadevi Rural Municipality" },
    { label: "Chisankhugadhi Rural Municipality", value: "Chisankhugadhi Rural Municipality" },
    { label: "Khijidemba Rural Municipality", value: "Khijidemba Rural Municipality" },
    { label: "Manebhanjyang Rural Municipality", value: "Manebhanjyang Rural Municipality" },
    { label: "Siddhicharan Municipality", value: "Siddhicharan Municipality" }
  ],
  "Panchthar": [
    { label: "Yangwarak Rural Municipality", value: "Yangwarak Rural Municipality" },
    { label: "Hilihang Rural Municipality", value: "Hilihang Rural Municipality" },
    { label: "Falelung Rural Municipality", value: "Falelung Rural Municipality" },
    { label: "Tumbewa Rural Municipality", value: "Tumbewa Rural Municipality" },
    { label: "Kummayak Rural Municipality", value: "Kummayak Rural Municipality" },
    { label: "Miklajung Rural Municipality", value: "Miklajung Rural Municipality" },
    { label: "Falgunanda Rural Municipality", value: "Falgunanda Rural Municipality" },
    { label: "Phidim Municipality", value: "Phidim Municipality" }
  ],
  "Sankhuwasabha": [
    { label: "Makalu Rural Municipality", value: "Makalu Rural Municipality" },
    { label: "Chichila Rural Municipality", value: "Chichila Rural Municipality" },
    { label: "Silichong Rural Municipality", value: "Silichong Rural Municipality" },
    { label: "Bhotkhola Rural Municipality", value: "Bhotkhola Rural Municipality" },
    { label: "Sabhapokhari Rural Municipality", value: "Sabhapokhari Rural Municipality" },
    { label: "Dharmadevi Municipality", value: "Dharmadevi Municipality" },
    { label: "Madi Municipality", value: "Madi Municipality" },
    { label: "Panchakhapan Municipality", value: "Panchakhapan Municipality" },
    { label: "Chainpur Municipality", value: "Chainpur Municipality" },
    { label: "Khandbari Municipality", value: "Khandbari Municipality" }
  ],
  "Solukhumbu": [
    { label: "Sotang Rural Municipality", value: "Sotang Rural Municipality" },
    { label: "Mahakulung Rural Municipality", value: "Mahakulung Rural Municipality" },
    { label: "Likhupike Rural Municipality", value: "Likhupike Rural Municipality" },
    { label: "Nechasalyan Rural Municipality", value: "Nechasalyan Rural Municipality" },
    { label: "Thulung Dudhkoshi Rural Municipality", value: "Thulung Dudhkoshi Rural Municipality" },
    { label: "Maapya Dudhkoshi Rural Municipality", value: "Maapya Dudhkoshi Rural Municipality" },
    { label: "Khumbupasanglahmu Rural Municipality", value: "Khumbupasanglahmu Rural Municipality" },
    { label: "Solududhakunda Municipality", value: "Solududhakunda Municipality" }
  ],
  "Taplejung": [
    { label: "Sidingba Rural Municipality", value: "Sidingba Rural Municipality" },
    { label: "Meringden Rural Municipality", value: "Meringden Rural Municipality" },
    { label: "Maiwakhola Rural Municipality", value: "Maiwakhola Rural Municipality" },
    { label: "Phaktanglung Rural Municipality", value: "Phaktanglung Rural Municipality" },
    { label: "Sirijangha Rural Municipality", value: "Sirijangha Rural Municipality" },
    { label: "Mikwakhola Rural Municipality", value: "Mikwakhola Rural Municipality" },
    { label: "Aathrai Tribeni Rural Municipality", value: "Aathrai Tribeni Rural Municipality" },
    { label: "Pathivara Yangwarak Rural Municipality", value: "Pathivara Yangwarak Rural Municipality" },
    { label: "Phungling Municipality", value: "Phungling Municipality" }
  ],
  "Terhathum": [
    { label: "Chhathar Rural Municipality", value: "Chhathar Rural Municipality" },
    { label: "Phedap Rural Municipality", value: "Phedap Rural Municipality" },
    { label: "Aathrai Rural Municipality", value: "Aathrai Rural Municipality" },
    { label: "Menchayam Rural Municipality", value: "Menchayam Rural Municipality" },
    { label: "Laligurans Municipality", value: "Laligurans Municipality" },
    { label: "Myanglung Municipality", value: "Myanglung Municipality" }
  ],
  "Udayapur": [
    { label: "Katari municipality", value: "Katari municipality" },
    { label: "Chaudandigadhi municipality", value: "Chaudandigadhi municipality" },
    { label: "Belaka municipality", value: "Belaka municipality" },
    { label: "Udayapurgadhi gaunpalika", value: "Udayapurgadhi gaunpalika" },
    { label: "Rautamai gaunpalika", value: "Rautamai gaunpalika" },
    { label: "Limchungbung", value: "Limchungbung" }
  ],

  "Parsa": [
    { label: "Birgunj Metropolitan", value: "Birgunj Metropolitan" },
    { label: "Bahudarmai Municipality", value: "Bahudarmai Municipality" },
    { label: "Parsagadhi Municipality", value: "Parsagadhi Municipality" },
    { label: "Pokhariya Municipality", value: "Pokhariya Municipality" },
    { label: "Bindabasini Rural Municipality", value: "Bindabasini Rural Municipality" },
    { label: "Dhobini Rural Municipality", value: "Dhobini Rural Municipality" },
    { label: "Chhipaharmai Rural Municipality", value: "Chhipaharmai Rural Municipality" },
    { label: "Jagarnathpur Rural Municipality", value: "Jagarnathpur Rural Municipality" },
    { label: "Jirabhawani Rural Municipality", value: "Jirabhawani Rural Municipality" },
    { label: "Kalikamai Rural Municipality", value: "Kalikamai Rural Municipality" },
    { label: "Pakaha Mainpur Rural Municipality", value: "Pakaha Mainpur Rural Municipality" },
    { label: "Paterwa Sugauli Rural Municipality", value: "Paterwa Sugauli Rural Municipality" },
    { label: "Sakhuwa Prasauni Rural Municipality", value: "Sakhuwa Prasauni Rural Municipality" },
    { label: "Thori Rural Municipality", value: "Thori Rural Municipality" },
  ],
  "Dhanusha": [
    { label: "Janakpur Sub Metropolitan City", value: "Janakpur Sub Metropolitan City" },
    { label: "Chhireshwarnath Municipality", value: "Chhireshwarnath Municipality" },
    { label: "Ganeshman Charanath", value: "Ganeshman Charanath" },
    { label: "Dhanusadham Municipality", value: "Dhanusadham Municipality" },
    { label: "Nagarain Municipality", value: "Nagarain Municipality" },
    { label: "Bideha Municipality", value: "Bideha Municipality" },
    { label: "Mithila Municipality", value: "Mithila Municipality" },
    { label: "Sahidnagar Municipality", value: "Sahidnagar Municipality" },
    { label: "Sabaila Municipality", value: "Sabaila Municipality" },
    { label: "Kamala Municipality", value: "Kamala Municipality" },
    { label: "Hansapur Municipality", value: "Hansapur Municipality" },
    { label: "Janaknandani Rural Municipality", value: "Janaknandani Rural Municipality" },
    { label: "Bateshwar Rural Municipality", value: "Bateshwar Rural Municipality" },
    { label: "Mukhiyapatti Musharniya Rural Municipality", value: "Mukhiyapatti Musharniya Rural Municipality" },
    { label: "Lakshminya Rural Municipality", value: "Lakshminya Rural Municipality" },
    { label: "Aurahi Rural Municipality", value: "Aurahi Rural Municipality" },
    { label: "Dhanauji Rural Municipality", value: "Dhanauji Rural Municipality" }
  ],
  "Bara": [
    { label: "Kalaiya Sub– Metropolitan City", value: "Kalaiya Sub– Metropolitan City" },
    { label: "Jeetpur Simara Sub– Metropolitan City", value: "Jeetpur Simara Sub– Metropolitan City" },
    { label: "Kolhabi Municipality", value: "Kolhabi Municipality" },
    { label: "Nijgadh Municipality", value: "Nijgadh Municipality" },
    { label: "Mahagadhimai Municipality", value: "Mahagadhimai Municipality" },
    { label: "Simraungadh Municipality", value: "Simraungadh Municipality" },
    { label: "Pacharauta Municipality", value: "Pacharauta Municipality" },
    { label: "Pheta Rural Municipality", value: "Pheta Rural Municipality" },
    { label: "Bishrampur Rural Municipality", value: "Bishrampur Rural Municipality" },
    { label: "Prasauni Rural Municipality", value: "Prasauni Rural Municipality" },
    { label: "Adarsh Kotwal Rural Municipality", value: "Adarsh Kotwal Rural Municipality" },
    { label: "Karaiyamai Rural Municipality", value: "Karaiyamai Rural Municipality" },
    { label: "Devtal Rural Municipality", value: "Devtal Rural Municipality" },
    { label: "Parwanipur Rural Municipality", value: "Parwanipur Rural Municipality" },
    { label: "Baragadhi Rural Municipality", value: "Baragadhi Rural Municipality" },
    { label: "Suwarna Rural Municipality", value: "Suwarna Rural Municipality" }
  ],
  "Saptari": [
    { label: "Bodebarsain Municipality", value: "Bodebarsain Municipality" },
    { label: "Dakneshwori Municipality", value: "Dakneshwori Municipality" },
    { label: "Hanumannagar Kankalini Municipality", value: "Hanumannagar Kankalini Municipality" },
    { label: "Kanchanrup Municipality", value: "Kanchanrup Municipality" },
    { label: "Khadak Municipality", value: "Khadak Municipality" },
    { label: "Sambhunath Municipality", value: "Sambhunath Municipality" },
    { label: "Saptakoshi Municipality", value: "Saptakoshi Municipality" },
    { label: "Surunga Municipality", value: "Surunga Municipality" },
    { label: "Rajbiraj Municipality", value: "Rajbiraj Municipality" },
    { label: "Agnisaira Krishnasavaran Rural Municipality", value: "Agnisaira Krishnasavaran Rural Municipality" },
    { label: "Balan-Bihul Rural Municipality", value: "Balan-Bihul Rural Municipality" },
    { label: "Rajgadh Rural Municipality", value: "Rajgadh Rural Municipality" },
    { label: "Rajgadh Rural Municipality", value: "Rajgadh Rural Municipality" },
    { label: "Bishnupur Rural Municipality", value: "Bishnupur Rural Municipality" },
    { label: "Chhinnamasta Rural Municipality", value: "Chhinnamasta Rural Municipality" },
    { label: "Mahadeva Rural Municipality", value: "Mahadeva Rural Municipality" },
    { label: "Rupani Rural Municipality", value: "Rupani Rural Municipality" },
    { label: "Tilathi Koiladi Rural Municipality", value: "Tilathi Koiladi Rural Municipality" },
    { label: "Tirhut Rural Municipality", value: "Tirhut Rural Municipality" }
  ],
  "Rautahat": [
    { label: "Baudhimai Municipality", value: "Baudhimai Municipality" },
    { label: "Brindaban Municipality", value: "Brindaban Municipality" },
    { label: "Chandrapur Municipality", value: "Chandrapur Municipality" },
    { label: "Dewahi Gonahi Municipality", value: "Dewahi Gonahi Municipality" },
    { label: "Gadhimai Municipality", value: "Gadhimai Municipality" },
    { label: "Garuda Municipality", value: "Garuda Municipality" },
    { label: "Gaur Municipality", value: "Gaur Municipality" },
    { label: "Gujara Municipality", value: "Gujara Municipality" },
    { label: "Ishanath Municipality", value: "Ishanath Municipality" },
    { label: "Katahariya Municipality", value: "Katahariya Municipality" },
    { label: "Madhav Narayan Municipality", value: "Madhav Narayan Municipality" },
    { label: "Maulapur Municipality", value: "Maulapur Municipality" },
    { label: "Paroha Municipality", value: "Paroha Municipality" },
    { label: "Phatuwa Bijayapur Municipality", value: "Phatuwa Bijayapur Municipality" },
    { label: "Rajdevi Municipality", value: "Rajdevi Municipality" },
    { label: "Rajpur Municipality", value: "Rajpur Municipality" },
    { label: "Durga Bhagwati Rural Municipality", value: "Durga Bhagwati Rural Municipality" },
    { label: "Yamunamai Rural Municipality", value: "Yamunamai Rural Municipality" }
  ],
  "Sarlahi": [
    { label: "Bagmati Municipality", value: "Bagmati Municipality" },
    { label: "Balara Municipality", value: "Balara Municipality" },
    { label: "Barahathwa Municipality", value: "Barahathwa Municipality" },
    { label: "Godaita Municipality", value: "Godaita Municipality" },
    { label: "Harion Municipality", value: "Harion Municipality" },
    { label: "Haripur Municipality", value: "Haripur Municipality" },
    { label: "Haripurwa Municipality", value: "Haripurwa Municipality" },
    { label: "Ishworpur Municipality", value: "Ishworpur Municipality" },
    { label: "Kabilasi Municipality", value: "Kabilasi Municipality" },
    { label: "Lalbandi Municipality", value: "Lalbandi Municipality" },
    { label: "Malangwa Municipality", value: "Malangwa Municipality" },
    { label: "Basbariya Rural Municipality", value: "Basbariya Rural Municipality" },
    { label: "Bishnu Rural Municipality", value: "Bishnu Rural Municipality" },
    { label: "Brahampuri Rural Municipality", value: "Brahampuri Rural Municipality" },
    { label: "Chakraghatta Rural Municipality", value: "Chakraghatta Rural Municipality" },
    { label: "Chandranagar Rural Municipality", value: "Chandranagar Rural Municipality" },
    { label: "Dhankaul Rural Municipality", value: "Dhankaul Rural Municipality" },
    { label: "Kaudena Rural Municipality", value: "Kaudena Rural Municipality" },
    { label: "Parsa Rural Municipality", value: "Parsa Rural Municipality" },
    { label: "Ramnagar Rural Municipality", value: "Ramnagar Rural Municipality" }
  ],
}

const WARD_NO = [
  { label: 1, value: 1 }, { label: 2, value: 2 },
  { label: 3, value: 3 }, { label: 4, value: 4 },
  { label: 5, value: 5 }, { label: 6, value: 6 },
  { label: 7, value: 7 }, { label: 8, value: 8 },
  { label: 9, value: 9 }, { label: 10, value: 10 },
  { label: 11, value: 11 }, { label: 12, value: 12 }
]

const VOTES = {
  "Province 1": [{
    party: "Nepal Congress",
    name: "Sher Bahadur Deuba",
    votes: 13861,
  }, {
    party: "Emaly",
    name: "K.P Sharma Oli",
    votes: 15861,
  }, {
    party: "Maoist",
    name: "Prachandey",
    votes: 12861,
  }],
  "Province 2": [{
    party: "Nepal Congress",
    name: "Balendra Shah",
    votes: 32861,
  }, {
    party: "Emaly",
    name: "Sunita Dangol",
    votes: 19861,
  }, {
    party: "Maoist",
    name: "Prem Ale Magar",
    votes: 18861,
  }],
  "Province 3": [{
    party: "Nepal Congress",
    name: "Gagan kumar Thapa",
    votes: 22861,
  }, {
    party: "Emaly",
    name: "Srijana Jhakri",
    votes: 14861,
  }, {
    party: "Maoist",
    name: "Madhav kumar Nepal",
    votes: 19861,
  }],
  "Province 4": [{
    party: "Nepal Congress",
    name: "Gagan kumar Thapa",
    votes: 54861,
  }, {
    party: "Emaly",
    name: "Srijana Jhakri",
    votes: 66861,
  }, {
    party: "Maoist",
    name: "Madhav kumar Nepal",
    votes: 33861,
  }],
  "Province 5": [{
    party: "Nepal Congress",
    name: "Gagan kumar Thapa",
    votes: 54861,
  }, {
    party: "Emaly",
    name: "Srijana Jhakri",
    votes: 99861,
  }, {
    party: "Maoist",
    name: "Madhav kumar Nepal",
    votes: 65861,
  }],
  "Province 6": [{
    party: "Nepal Congress",
    name: "Gagan kumar Thapa",
    votes: 13861,
  }, {
    party: "Emaly",
    name: "Srijana Jhakri",
    votes: 11861,
  }, {
    party: "Maoist",
    name: "Madhav kumar Nepal",
    votes: 32861,
  }]
}

// custom style
const BTM_BORDER_STYLE = "border-r-0 border-l-0 border-b-2 border-slate-100";
const responsive = "lg:w-[1100px] w-full max-[1100px]:px-5";
const sub_navbar_style = "sub__navbar text-slate-200 text-sm font-medium flex justify-between items-center px-3";
const sub_navbar_items_style = "text-start w-full pl-4 hover:text-red-500";


const aboutItems = [
  { label: "Constitutional Provision", value: '/about/constitutional-provision' },
  { label: 'Election Offices', value: '/about/election-office' },
  { label: 'Privacy Policy', value: '/about/privacy-policy' },
]

const electoralItems = [
  { label: "Electoral Framework Overview", value: '/electoral-framework/overview' },
  { label: 'Election Related Laws', value: '/electoral-framework/laws' },
  { label: 'Election Legislation', value: '/electoral-framework/legislation' }]

const politicalItems = [
  { label: "Party Registration Guide", value: '/party/party-registration-guide' },
  { label: 'Register Party Form', value: '/party/party-registration' },
  { label: 'Register Candidate', value: '/party/candidate-registration' },
  { label: 'Candidate Lists', value: '/party/candidate-roll' },
  { label: 'Party Lists', value: '/party/party-list' },
]

const electionResultTypes = [
  { label: "Federal Parliament Election", value: '/election-result/parliament' },
  { label: 'Province Election', value: '/election-result/province' },
  { label: 'Local Election', value: '/election-result/local' }
]

const voterItems = [
  { label: 'Voter Eligibility', value: '/voter-education/voter-eligibility' },
  { label: 'Voter Roll', value: '/voter-education/voter-roll' },
  { label: 'Voter Registration', value: '/voter-education/voter-registration' },
  { label: 'FAQs on Voter Registration', value: '/voter-education/voter-faqs' }]

const StateProvinceOffices = [
  "Sudurpaschim Province",
  "Province 1",
  "Province 2",
  "Bagmati Province",
  "Gandaki Province",
  "Lumbini Province",
  "Karnali Province"
]

const ELECTION_TYPE = [
  { label: "Province", value: "Province" },
  { label: "District", value: "District" },
  { label: "Municipaliy", value: "Municipaliy" },
  { label: "Ward", value: "Ward" },
]

let DistrictOffices = [];
Object.entries(DISTRICT).forEach((d) => {
  let filter = d[1].map(d => d.label)
  DistrictOffices = [...DistrictOffices, ...filter]
});

const sub_navbar_items = {
  aboutItems, electoralItems, voterItems, politicalItems, electionResultTypes
}

const web3 = new Web3(Web3.givenProvider);
const SmartContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ABI_ADDRESS);

export {
  LANGUAGES,
  PARTIES, VOTES,
  responsive, BTM_BORDER_STYLE, ELECTION_TYPE,
  sub_navbar_style, sub_navbar_items_style, sub_navbar_items,
  PROVINCE, DISTRICT, MUNICIPALITY, WARD_NO, StateProvinceOffices, DistrictOffices,
  web3, SmartContract
};