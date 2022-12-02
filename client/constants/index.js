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
 BTM_BORDER_STYLE,
 PARTIES,
 VOTES,
 responsive,
 sub_navbar_style,
 sub_navbar_items_style,
 sub_navbar_items
};