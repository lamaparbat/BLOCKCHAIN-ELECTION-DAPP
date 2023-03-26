import Web3 from "web3";
import { CONTRACT_ABI, CONTRACT_ABI_ADDRESS } from "./contract";

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

const GENDER_OPTIONS = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
  { label: "Others", value: "OTHERS" },
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
    { label: "Rukum", value: "Rukum" },
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


const WARD_NO = [
  { label: 1, value: 1 }, { label: 2, value: 2 },
  { label: 3, value: 3 }, { label: 4, value: 4 },
  { label: 5, value: 5 }, { label: 6, value: 6 },
  { label: 7, value: 7 }, { label: 8, value: 8 },
  { label: 9, value: 9 }, { label: 10, value: 10 },
  { label: 11, value: 11 }, { label: 12, value: 12 }
]

// custom style
const BTM_BORDER_STYLE = "border-r-0 border-l-0 border-b-2 border-slate-100";
const responsive = "lg:w-[1100px]";
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
  { label: 'Register Party Form', value: '/party/party-registration' },
  { label: 'Register Candidate', value: '/party/candidate-registration' },
  { label: 'Candidate Lists', value: '/party/candidate-roll' },
  { label: 'Party Lists', value: '/party/party-list' },
]

const electionResultTypes = [
  { label: "Parliament Election", value: '/election/province' },
  { label: 'District Election', value: '/election/district' },
  { label: 'Local Election', value: '/election/local' }
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

const METAMASK_EXT_LINK = "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en";

const ADMIN_ROUTES = ["/party/party-registration"];

export {
  LANGUAGES,
  PARTIES,
  responsive, BTM_BORDER_STYLE, ELECTION_TYPE, GENDER_OPTIONS,
  sub_navbar_style, sub_navbar_items_style, sub_navbar_items,
  PROVINCE, DISTRICT, MUNICIPALITY, WARD_NO, StateProvinceOffices, DistrictOffices,
  web3, SmartContract, METAMASK_EXT_LINK,
  ADMIN_ROUTES
};




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
    { label: "Sakela Rural", value: "Sakela Rural" },
    { label: "Khotehang Rural", value: "Khotehang Rural" },
    { label: "Barahapokhari Rural", value: "Barahapokhari Rural" },
    { label: "Ainselukhark Rural", value: "Ainselukhark Rural" },
    { label: "Rawa Besi Rural", value: "Rawa Besi Rural" },
    { label: "Kepilasagadhi Rural", value: "Kepilasagadhi Rural" },
    { label: "Jantedhunga Rural", value: "Jantedhunga Rural" },
    { label: "Diprung Chuichumma Rural", value: "Diprung Chuichumma Rural" },
    { label: "Halesi Tuwachung", value: "Halesi Tuwachung" },
    { label: "Diktel Rupakot Majhuwagadhi", value: "Diktel Rupakot Majhuwagadhi" }
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

  "Siraha": [
    { label: "Lahan", value: "Lahan" },
    { label: "Dhangadhimai", value: "Dhangadhimai" },
    { label: "Siraha", value: "Siraha" },
    { label: "Golbazar", value: "Golbazar" },
    { label: "Mirchaiya", value: "Mirchaiya" },
    { label: "Kalyanpur", value: "Kalyanpur" },
    { label: "Karjanha", value: "Karjanha" },
    { label: "Sukhipur", value: "Sukhipur" },
    { label: "Bhagwanpur Rural", value: "Bhagwanpur Rural" },
    { label: "Aurahi Rural", value: "Aurahi Rural" },
    { label: "Bishnupur Rural", value: "Bishnupur Rural" },
    { label: "Bariyarpatti Rural", value: "Bariyarpatti Rural" },
    { label: "Lakshmipur Patari Rural", value: "Lakshmipur Patari Rural" },
    { label: "Naraha Rural", value: "Naraha Rural" },
    { label: "Sakhuwanankar Katti Rural", value: "Sakhuwanankar Katti Rural" },
    { label: "Arnama Rural", value: "Arnama Rural" },
    { label: "Navarajpur Rural", value: "Navarajpur Rural" },
  ],
  "Mahottari": [
    { label: "Aurahi", value: "Aurahi" },
    { label: "Balawa", value: "Balawa" },
    { label: "Bardibas", value: "Bardibas" },
    { label: "Bhangaha", value: "Bhangaha" },
    { label: "Gaushala", value: "Gaushala" },
    { label: "Jaleshwor", value: "Jaleshwor" },
    { label: "Loharpatti", value: "Loharpatti" },
    { label: "ManaraShiswa", value: "ManaraShiswa" },
    { label: "Matihani", value: "Matihani" },
    { label: "Ramgopalpur", value: "Ramgopalpur" },
    { label: "Ekdara Rural", value: "Ekdara Rural" },
    { label: "Mahottari Rural", value: "Mahottari Rural" },
    { label: "Pipara Rural", value: "Pipara Rural" },
    { label: "Samsi Rural", value: "Samsi Rural" },
    { label: "Sonama Rural", value: "Sonama Rural" }
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

  "Sindhuli": [
    { label: "Kamalamai", value: "Kamalamai" },
    { label: "Dudhauli", value: "Dudhauli" },
    { label: "Sunkoshi Rural", value: "Sunkoshi Rural" },
    { label: "Hariharpur Gadhi Rural", value: "Hariharpur Gadhi Rural" },
    { label: "Tinpatan Rural", value: "Tinpatan Rural" },
    { label: "Marin Rural", value: "Marin Rural" },
    { label: "Golanjor Rural", value: "Golanjor Rural" },
    { label: "Phikkal Rural", value: "Phikkal Rural" },
    { label: "Ghyanglekh Rural", value: "Ghyanglekh Rural" },
  ],
  "Ramechhap": [
    { label: "Manthali Urban", value: "Manthali Urban" },
    { label: "Ramechhap Urban", value: "Ramechhap Urban" },
    { label: "Likhu Rural", value: "Likhu Rural" },
    { label: "Gokulganga Rural", value: "Gokulganga Rural" },
    { label: "Khadadevi Rural", value: "Khadadevi Rural" },
    { label: "Umakund Rural", value: "Umakund Rural" },
    { label: "Sunapati Rural", value: "Sunapati Rural" },
    { label: "Doramba Rural", value: "Doramba Rural" },
  ],
  "Dolakha": [
    { label: "Bhimeswor", value: "Bhimeswor" },
    { label: "Jiri", value: "Jiri" },
    { label: "Kalinchok Rural", value: "Kalinchok Rural" },
    { label: "Melung Rural", value: "Melung Rural" },
    { label: "Bigu Rural", value: "Bigu Rural" },
    { label: "Gaurishankar Rural", value: "Gaurishankar Rural" },
    { label: "Baiteshwor Rural", value: "Baiteshwor Rural" },
    { label: "Sailung Rural", value: "Sailung Rural" },
    { label: "Tamakoshi Rural", value: "Tamakoshi Rural" },
  ],
  "Bhaktapur": [
    { label: "Changunarayan Urban", value: "Changunarayan Urban" },
    { label: "Suryabinayak Urban", value: "Suryabinayak Urban" },
    { label: "Bhaktapur Urban", value: "Bhaktapur Urban" },
    { label: "Madhyapur Thimi Urban", value: "Madhyapur Thimi Urban" },
  ],
  "Lalitpur": [
    { label: "Lalitpur Metropolitan", value: "Lalitpur Metropolitan" },
    { label: "Mahalaxmi", value: "Mahalaxmi" },
    { label: "Godawari", value: "Godawari" },
    { label: "Konjyoson Rural", value: "Konjyoson Rural" },
    { label: "Bagmati Rural", value: "Bagmati Rural" },
    { label: "Mahankal Rural", value: "Mahankal Rural" },
  ],
  "Dhading": [
    { label: "Nilkantha Urban", value: "Nilkantha Urban" },
    { label: "Thakre Rural", value: "Thakre Rural" },
    { label: "Dhunibesi Urban", value: "Dhunibesi Urban" },
    { label: "Gangajamuna Rural", value: "Gangajamuna Rural" },
    { label: "Galchi Rural", value: "Galchi Rural" },
    { label: "Tripurasundari Rural", value: "Tripurasundari Rural" },
    { label: "Siddhalek Rural", value: "Siddhalek Rural" },
    { label: "Jwalamukhi Rural", value: "Jwalamukhi Rural" },
    { label: "Benighat Rorang Rural", value: "Benighat Rorang Rural" },
    { label: "Gujuri Rural", value: "Gujuri Rural" },
    { label: "Netrawati Rural", value: "Netrawati Rural" },
    { label: "Khaniyabas Rural", value: "Khaniyabas Rural" },
    { label: "Rubi valley Rural", value: "Rubi valley Rural" },
  ],
  "Kathmandu": [
    { label: "Shankharapur Urban", value: "Shankharapur Urban" },
    { label: "Tarkeshwor Urban", value: "Tarkeshwor Urban" },
    { label: "Chandragiri Urban", value: "Chandragiri Urban" },
    { label: "Nagarjun Urban", value: "Nagarjun Urban" },
    { label: "Dakshinkali Urban", value: "Dakshinkali Urban" },
    { label: "Gokarneshwor Urban", value: "Gokarneshwor Urban" },
    { label: "Kathmandu Metropolitan", value: "Kathmandu Metropolitan" },
    { label: "Kageshwori Manahara Urban", value: "Kageshwori Manahara Urban" },
    { label: "Budhanilkantha Urban", value: "Budhanilkantha Urban" },
    { label: "Kirtipur Urban", value: "Kirtipur Urban" },
    { label: "Tokha Urban", value: "Tokha Urban" },
  ],
  "Kavrepalanchok": [
    { label: "Dhulikhel", value: "Dhulikhel" },
    { label: "Banepa", value: "Banepa" },
    { label: "Panauti", value: "Panauti" },
    { label: "Panchkhal", value: "Panchkhal" },
    { label: "Namobuddha", value: "Namobuddha" },
    { label: "Mandandeupur", value: "Mandandeupur" },
    { label: "Khani Khola Rural", value: "Khani Khola Rural" },
    { label: "Chauri Deurali Rural", value: "Chauri Deurali Rural" },
    { label: "Temal Rural", value: "Temal Rural" },
    { label: "Bethanchok Rural", value: "Bethanchok Rural" },
    { label: "Bhumlu Rural", value: "Bhumlu Rural" },
    { label: "Mahabharat Rural", value: "Mahabharat Rural" },
    { label: "Roshi Rural", value: "Roshi Rural" },
  ],
  "Nuwakot": [
    { label: "Bidur Urban", value: "Bidur Urban" },
    { label: "Belkotgadhi Urban", value: "Belkotgadhi Urban" },
    { label: "Kakani Rural", value: "Kakani Rural" },
    { label: "Shivapuri Rural", value: "Shivapuri Rural" },
    { label: "Dupcheswor Rural", value: "Dupcheswor Rural" },
    { label: "Suryagadhi Rural", value: "Suryagadhi Rural" },
    { label: "Likhu Rural", value: "Likhu Rural" },
    { label: "Kispang Rural", value: "Kispang Rural" },
    { label: "Meghang Rural", value: "Meghang Rural" },
    { label: "Tarkeshwor Rural", value: "Tarkeshwor Rural" },
    { label: "Taadi Rural", value: "Taadi Rural" },
    { label: "Panchakanya Rural", value: "Panchakanya Rural" },
  ],
  "Rasuwa": [
    { label: "Naukunda Rural", value: "Naukunda Rural" },
    { label: "Kalika Rural", value: "Kalika Rural" },
    { label: "Uttargaya Rural", value: "Uttargaya Rural" },
    { label: "Parbatikunda Rural", value: "Parbatikunda Rural" },
    { label: "Gosaikunda Rural", value: "Gosaikunda Rural" },
  ],
  "Sindhupalchok": [
    { label: "Chautara Sangachokgadhi ", value: "Chautara Sangachokgadhi " },
    { label: "Barhabise", value: "Barhabise" },
    { label: "Melamchi", value: "Melamchi" },
    { label: "Indrawati Rural", value: "Indrawati Rural" },
    { label: "Jugali Rural", value: "Jugali Rural" },
    { label: "PanchaPokhari Rural", value: "PanchaPokhari Rural" },
    { label: "Balephi Rural", value: "Balephi Rural" },
    { label: "Bhotekoshi Rural", value: "Bhotekoshi Rural" },
    { label: "Lishankhu Pakhar Rural", value: "Lishankhu Pakhar Rural" },
    { label: "Sunkoshi Rural", value: "Sunkoshi Rural" },
    { label: "Helambu Rural", value: "Helambu Rural" },
    { label: "TripuraSundari Rural", value: "TripuraSundari Rural" },
  ],
  "Makwanpur": [
    { label: "Hetauda Sub-Metropolitan", value: "Hetauda Sub-Metropolitan" },
    { label: "Thaha Municipality", value: "Thaha Municipality" },
    { label: "Bhimphedi Rural", value: "Bhimphedi Rural" },
    { label: "Makawanpurgadhi Rural", value: "Makawanpurgadhi Rural" },
    { label: "Manahari Rural", value: "Manahari Rural" },
    { label: "Raksirang Rural", value: "Raksirang Rural" },
    { label: "Bakaiya Rural", value: "Bakaiya Rural" },
    { label: "Bagmati Rural", value: "Bagmati Rural" },
    { label: "Kailash Rural", value: "Kailash Rural" },
    { label: "Indrasarowar Rural", value: "Indrasarowar Rural" },
  ],
  "Chitwan": [
    { label: "Bharatpur Metropolitan City", value: "Bharatpur Metropolitan City" },
    { label: "Kalika", value: "Kalika" },
    { label: "Khairahani", value: "Khairahani" },
    { label: "Madi", value: "Madi" },
    { label: "Ratnanagar", value: "Ratnanagar" },
    { label: "Rapti", value: "Rapti" },
    { label: "Ichchhakamana Rural", value: "Ichchhakamana Rural" },
  ],


  "Baglung": [
    { label: "Jaimini Urban", value: "Jaimini Urban" },
    { label: "Baglung Urban", value: "Baglung Urban" },
    { label: "Galkot Urban", value: "Galkot Urban" },
    { label: "Kathekhola Rural", value: "Kathekhola Rural" },
    { label: "1wadigaun Rural", value: "1wadigaun Rural" },
    { label: "Bareng Rural", value: "Bareng Rural" },
    { label: "Tarakhola Rural", value: "Tarakhola Rural" },
    { label: "Dhorpatan Urban", value: "Dhorpatan Urban" },
    { label: "Tamankhola Rural", value: "Tamankhola Rural" },
    { label: "Nisikhola Rural", value: "Nisikhola Rural" },
  ],
  "Gorkha": [
    { label: "Gorkha", value: "Gorkha" },
    { label: "Palungtar", value: "Palungtar" },
    { label: "Sulikot Rural", value: "Sulikot Rural" },
    { label: "Siranchowk Rural", value: "Siranchowk Rural" },
    { label: "Ajirkot Rural", value: "Ajirkot Rural" },
    { label: "Tsum Nubri Rural", value: "Tsum Nubri Rural" },
    { label: "Dharche Rural", value: "Dharche Rural" },
    { label: "Bhimsen Thapa Rural", value: "Bhimsen Thapa Rural" },
    { label: "Sahid Lakhan Rural", value: "Sahid Lakhan Rural" },
    { label: "Aarughat Rural", value: "Aarughat Rural" },
    { label: "Gandaki Rural", value: "Gandaki Rural" },
  ],
  "Kaski": [
    { label: "Pokhara Metropolitan City", value: "Pokhara Metropolitan City" },
    { label: "Annapurna Rural Municipality", value: "Annapurna Rural Municipality" },
    { label: "Machhapuchchhre Rural Municipality", value: "Machhapuchchhre Rural Municipality" },
    { label: "Madi Rural Municipality", value: "Madi Rural Municipality" },
    { label: "Rupa Rural Municipality", value: "Rupa Rural Municipality" },
  ],
  "Lamjung": [
    { label: "Besisahar", value: "Besisahar" },
    { label: "Dordi Rural", value: "Dordi Rural" },
    { label: "Dudhpokhari Rural", value: "Dudhpokhari Rural" },
    { label: "Kwhlosothar Rural", value: "Kwhlosothar Rural" },
    { label: "Madhya Nepal", value: "Madhya Nepal" },
    { label: "Marsyandi Rural", value: "Marsyandi Rural" },
    { label: "Rainas", value: "Rainas" },
    { label: "Sundarbazar", value: "Sundarbazar" },
  ],
  "Manang": [
    { label: "Bhakra", value: "Bhakra" },
    { label: "Chame", value: "Chame" },
    { label: "Dharapani", value: "Dharapani" },
    { label: "Ghyaru", value: "Ghyaru" },
    { label: "Khangsar", value: "Khangsar" },
    { label: "Manang", value: "Manang" },
    { label: "Nar", value: "Nar" },
    { label: "Ngawal", value: "Ngawal" },
    { label: "Phu", value: "Phu" },
    { label: "Pisang", value: "Pisang" },
    { label: "Tachi Bagarchhap", value: "Tachi Bagarchhap" },
    { label: "Tanki Manang", value: "Tanki Manang" },
    { label: "Thoche", value: "Thoche" },
  ],
  "Mustang": [
    { label: "Gharpajhong Rural", value: "Gharpajhong Rural" },
    { label: "Lo-Ghekar Damodarkunda Rural", value: "Lo-Ghekar Damodarkunda Rural" },
    { label: "Lomanthang Rural", value: "Lomanthang Rural" },
    { label: "Thasang Rural", value: "Thasang Rural" },
    { label: "Varagung Muktichhetra Rural", value: "Varagung Muktichhetra Rural" },
  ],
  "Myagdi": [
    { label: "Beni Nagarpalika Urban ", value: "Beni Nagarpalika Urban " },
    { label: "Mangala Rural ", value: "Mangala Rural " },
    { label: "Raghuganga Rural ", value: "Raghuganga Rural " },
    { label: "Anapurna Rural ", value: "Anapurna Rural " },
    { label: "Dhaulagiri Rural ", value: "Dhaulagiri Rural " },
    { label: "Malika Rural", value: "Malika Rural" },
  ],
  "Nawalpur": [
    { label: "Bulingtar Rural", value: "Bulingtar Rural" },
    { label: "Devchuli Urban", value: "Devchuli Urban" },
    { label: "Hupsekot Rural", value: "Hupsekot Rural" },
    { label: "Madhyabindu Urban", value: "Madhyabindu Urban" },
    { label: "Bungdikali Rural", value: "Bungdikali Rural" },
    { label: "Binai Rural", value: "Binai Rural" },
    { label: "Gaidakot Urban", value: "Gaidakot Urban" },
    { label: "Bardaghat Urban", value: "Bardaghat Urban" },
    { label: "Palhinandan Rural", value: "Palhinandan Rural" },
    { label: "Pratappur Rural", value: "Pratappur Rural" },
    { label: "Sarawal Rural", value: "Sarawal Rural" },
    { label: "Kawasoti Urban", value: "Kawasoti Urban" },
    { label: "Sunwal Urban", value: "Sunwal Urban" },
    { label: "Trivenisusta Rural", value: "Trivenisusta Rural" },
    { label: "Ramgram Urban", value: "Ramgram Urban" },
  ],


  "Kapilvastu": [
    { label: "Kapilvastu", value: "Kapilvastu" },
    { label: "Banganga", value: "Banganga" },
    { label: "Buddhabhumi", value: "Buddhabhumi" },
    { label: "Shivaraj", value: "Shivaraj" },
    { label: "Krishnanagar", value: "Krishnanagar" },
    { label: "Maharajgunj", value: "Maharajgunj" },
    { label: "Mayadevi Rural", value: "Mayadevi Rural" },
    { label: "Yashodhara Rural", value: "Yashodhara Rural" },
    { label: "Suddhodhan Rural", value: "Suddhodhan Rural" },
    { label: "Bijaynagar Rural", value: "Bijaynagar Rural" },
  ],
  "Parasi": [
    { label: "Bulingtar Rural", value: "Bulingtar Rural" },
    { label: "Devchuli Urban", value: "Devchuli Urban" },
    { label: "Hupsekot Rural", value: "Hupsekot Rural" },
    { label: "Madhyabindu Urban", value: "Madhyabindu Urban" },
    { label: "Bungdikali Rural", value: "Bungdikali Rural" },
    { label: "Binai Rural", value: "Binai Rural" },
    { label: "Gaidakot Urban", value: "Gaidakot Urban" },
    { label: "Bardaghat Urban", value: "Bardaghat Urban" },
    { label: "Palhinandan Rural", value: "Palhinandan Rural" },
    { label: "Pratappur Rural", value: "Pratappur Rural" },
    { label: "Sarawal Rural", value: "Sarawal Rural" },
    { label: "Kawasoti Urban", value: "Kawasoti Urban" },
    { label: "Sunwal Urban", value: "Sunwal Urban" },
    { label: "Trivenisusta Rural", value: "Trivenisusta Rural" },
    { label: "Ramgram Urban", value: "Ramgram Urban" },
  ],
  "Rupandehi": [
    { label: "Butwal	Sub-Metropolitan", value: "Butwal	Sub-Metropolitan" },
    { label: "Devdaha", value: "Devdaha" },
    { label: "Lumbini Sanskritik", value: "Lumbini Sanskritik" },
    { label: "Sainamaina", value: "Sainamaina" },
    { label: "Siddharthanagar", value: "Siddharthanagar" },
    { label: "Tilottama", value: "Tilottama" },
    { label: "Gaidahawa	Rural", value: "Gaidahawa	Rural" },
    { label: "Kanchan	Rural", value: "Kanchan	Rural" },
    { label: "Kotahimai	Rural", value: "Kotahimai	Rural" },
    { label: "Marchawari	Rural", value: "Marchawari	Rural" },
    { label: "Mayadevi	Rural", value: "Mayadevi	Rural" },
    { label: "Omsatiya	Rural", value: "Omsatiya	Rural" },
    { label: "Rohini	Rural", value: "Rohini	Rural" },
    { label: "Sammarimai	Rural", value: "Sammarimai	Rural" },
    { label: "Siyari	Rural", value: "Siyari	Rural" },
    { label: "Suddodhan", value: "Suddodhan" },
  ],
  "Arghakhanchi": [
    { label: "Malarani Rural", value: "Malarani Rural" },
    { label: "Chatradev Rural", value: "Chatradev Rural" },
    { label: "Sitganga Urban", value: "Sitganga Urban" },
    { label: "Bhumikikasthan Urban", value: "Bhumikikasthan Urban" },
    { label: "Parini Rural", value: "Parini Rural" },
    { label: "Sandikharka Urban", value: "Sandikharka Urban" },
  ],
  "Gulmi": [
    { label: "Kaligandaki Rural", value: "Kaligandaki Rural" },
    { label: "Musikot Urban", value: "Musikot Urban" },
    { label: "Dhurkot Rural", value: "Dhurkot Rural" },
    { label: "Satyawati Rural", value: "Satyawati Rural" },
    { label: "Resunga Urban", value: "Resunga Urban" },
    { label: "Ruru Rural", value: "Ruru Rural" },
    { label: "Madane Rural", value: "Madane Rural" },
    { label: "Chhatrakot Rural", value: "Chhatrakot Rural" },
    { label: "Gulmidarbar Rural", value: "Gulmidarbar Rural" },
    { label: "Chandrakot Rural", value: "Chandrakot Rural" },
    { label: "Isma Rural", value: "Isma Rural" },
    { label: "Malika Rural", value: "Malika Rural" },
  ],
  "Palpa": [
  ],
  "Dang": [
  ],
  "Pyuthan": [
  ],
  "Rolpa": [
  ],
  "Rukum": [
  ],
  "Banke": [
  ],
  "Bardiya": [
  ],


  "Eastern": [
  ]
}




















































































