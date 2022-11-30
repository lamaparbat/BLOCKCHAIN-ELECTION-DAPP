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
  candidateName: "Sher Bahadur Deuba",
  count: 13861,
 }, {
  party: "Emaly",
  candidateName: "K.P Sharma Oli",
  count: 15861,
 }, {
  party: "Maoist",
  candidateName: "Prachandey",
  count: 12861,
 }],
 "Province 2": [{
  party: "Nepal Congress",
  candidateName: "Balendra Shah",
  count: 32861,
 }, {
  party: "Emaly",
  candidateName: "Sunita Dangol",
  count: 19861,
 }, {
  party: "Maoist",
  candidateName: "Prem Ale Magar",
  count: 18861,
 }],
 "Province 3": [{
  party: "Nepal Congress",
  candidateName: "Gagan kumar Thapa",
  count: 22861,
 }, {
  party: "Emaly",
  candidateName: "Srijana Jhakri",
  count: 14861,
 }, {
  party: "Maoist",
  candidateName: "Madhav kumar Nepal",
  count: 19861,
 }],
 "Province 4": [{
  party: "Nepal Congress",
  candidateName: "Gagan kumar Thapa",
  count: 54861,
 }, {
  party: "Emaly",
  candidateName: "Srijana Jhakri",
  count: 66861,
 }, {
  party: "Maoist",
  candidateName: "Madhav kumar Nepal",
  count: 33861,
 }],
 "Province 5": [{
  party: "Nepal Congress",
  candidateName: "Gagan kumar Thapa",
  count: 54861,
 }, {
  party: "Emaly",
  candidateName: "Srijana Jhakri",
  count: 99861,
 }, {
  party: "Maoist",
  candidateName: "Madhav kumar Nepal",
  count: 65861,
 }],
 "Province 6": [{
  party: "Nepal Congress",
  candidateName: "Gagan kumar Thapa",
  count: 13861,
 }, {
  party: "Emaly",
  candidateName: "Srijana Jhakri",
  count: 11861,
 }, {
  party: "Maoist",
  candidateName: "Madhav kumar Nepal",
  count: 32861,
 }]
}

// custom style
const BTM_BORDER_STYLE = "border-r-0 border-l-0 border-b-2 border-slate-100";
const responsive = "lg:w-[1100px] w-full max-[1100px]:px-5 ";
const sub_navbar_style = "sub__navbar text-slate-200 text-sm font-medium flex justify-between items-center px-3";
const sub_navbar_items_style = "text-start w-full pl-4 hover:text-red-500";

export {
 LANGUAGES,
 BTM_BORDER_STYLE,
 PARTIES,
 VOTES,
 responsive,
 sub_navbar_style,
 sub_navbar_items_style
};