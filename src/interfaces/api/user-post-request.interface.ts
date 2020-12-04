export interface UserPostRequest {
  id: number;
  role: string;
  nickname: string;
  email: string;
  lastsName?: string;
  firsName?: string;
  serviceIds?: number[];
  cityId?: number;
  phone?: string;
  gender?: string;
  birthday?: string;
  avatar?: string;
  infoYourself?: string;
}
