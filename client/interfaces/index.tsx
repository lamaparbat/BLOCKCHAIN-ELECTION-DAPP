import { ReactElement } from "react";

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

interface CandidateDetails {
 party: string,
 candidateName: string,
 profile: string,
 count: number
}
interface LiveCounterCardStruct {
 type: string,
 data: Array<CandidateDetails>
}

interface CandidateCardStruct {
 details: CandidateDetails,
 border: string,
 ishighlighted: boolean
}

export type {
 AvatarProps,
 LanguageStruct,
 LiveCounterCardStruct,
 CandidateCardStruct
};