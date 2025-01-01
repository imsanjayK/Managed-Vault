export interface Account {
  id?: string
  accountName: string;
  accountType: AccountType;
  link: string;
  customDatas: Array<CustomData>;
  credentials: Array<Credential>;
}

export interface Credential {
  username: string;
  password: string;
}

export interface CustomData {
  key: string;
  value: string;
}
export enum AccountType {
  Investment = 'Investment',
  Banking = 'Banking',
  SocialMedia = 'Social Media',
  Career = 'Career',
  JobSeek = 'Job Seek',
  Email = 'Email',
  Travelling = 'Travelling',
  Finance = 'Finance',
  Other = 'Other'
}