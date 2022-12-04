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
const responsive = "lg:w-[1100px] w-full max-[1100px]:px-5 ";
const sub_navbar_style = "sub__navbar text-slate-200 text-sm font-medium flex justify-between items-center px-3";
const sub_navbar_items_style = "text-start w-full pl-4 hover:text-red-500";


const aboutItems = [
 { label: "Constitutional Provision", value: '/about/constitutional-provision' },
 { label: 'Privacy Policy', value: '/about/privacy-policy' },
 { label: 'Former Election Commissioners', value: '/about/voter-registration' }]
const electoralItems = [
 { label: "Electoral Framework Overview", value: '/electoral-framework/overview' },
 { label: 'Election Related Laws', value: '/electoral-framework/laws' },
 { label: 'Election Legislation', value: '/electoral-framework/legislation' }]
const politicalItems = [
 { label: "Party Registration Guide", value: '/political/party-registration-guide' },
 { label: 'Register Party Form', value: '/political/party-registration-form' }]
const electionResultTypes = [
 { label: "Federal Parliament Election", value: '/election-result/parliament' },
 { label: 'Province Election', value: '/election-result/province' },
 { label: 'Local Election', value: '/election-result/local' }]
const voterItems = [
 { label: 'Voter Eligibility', value: '/voter-education/voter-eligibility' },
 { label: 'Voter Roll', value: '/voter-education/voter-roll' },
 { label: 'Voter Registration', value: '/voter-education/voter-registration' },
 { label: 'FAQs on Voter Registration', value: '/voter-education/voter-faqs' }]

const sub_navbar_items = {
 aboutItems, electoralItems, voterItems, politicalItems, electionResultTypes
}


export {
 LANGUAGES,
 PARTIES, VOTES,
 responsive, BTM_BORDER_STYLE,
 sub_navbar_style, sub_navbar_items_style, sub_navbar_items,
 PROVINCE, DISTRICT
};