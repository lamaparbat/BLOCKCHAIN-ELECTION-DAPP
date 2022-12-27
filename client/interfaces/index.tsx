
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
  partyName: string,
  totalMembers: number,
  agenda: string,
  logo: string
 }
}

interface UserDetails {
 citizenshipNumber: string,
 fullName: string,
 name: string,
 dob: string,
 profile: string
 education: string,
 district: string,
 address: string,
 contact: string,
 email: string
}

interface CandidateDetails extends UserDetails {
 party: string,
 votes: number
}

interface VoterDetails extends UserDetails { };

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
 type: string
}

export type {
 AvatarProps,
 LanguageStruct,
 LiveCounterCardStruct,
 CandidateCardStruct,
 UserCardStruct,
 PartyStruct
};