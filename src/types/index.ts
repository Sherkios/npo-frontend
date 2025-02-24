export interface IUser {
  id: number;
  login: string;
  tabel: string;
}

export interface IUserRow extends IUser {
  img?: string;
}

export interface IAccessToken {
  access_token: string;
  id: number;
}
