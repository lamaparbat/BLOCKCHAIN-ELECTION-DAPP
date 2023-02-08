
interface AvatarProps {
  src: string,
  className: string,
  alt: string,
  size: string,
  border: number
}

interface LanguageStruct {
  label: string,
  value: string
};

interface PartyStruct {
  lists: {
    name: string,
    totalMember: number,
    agenda: string,
    logoUrl: string
  },
  openAgendaPreview: (details: Object) => void
}

interface UserDetails {
  citizenshipNumber: string,
  fullName: string,
  name: string,
  age: string,
  dob: string,
  profile: string
  education: string,
  province: string,
  district: string,
  municipality: string,
  ward: string,
  contact: string,
  email: string
}

interface CandidateDetails extends UserDetails {
  party: string,
  agenda: string,
  votes: number
}

interface VoterDetails extends UserDetails {
  voted: boolean
};

interface LiveCounterCardStruct {
  type: string,
  data: Array<CandidateDetails>,
  electionStatus: string
}

interface CandidateCardStruct {
  details: CandidateDetails,
  border: string,
  ishighlighted: boolean
}

interface UserCardStruct {
  details: VoterDetails | CandidateDetails,
  type: string,
  onCandidateSelected: (checked: boolean, details: CandidateDetails) => void,
  currentElection: Array<Object>
}

export type {
  AvatarProps,
  LanguageStruct,
  LiveCounterCardStruct,
  CandidateCardStruct,
  UserCardStruct,
  PartyStruct
};