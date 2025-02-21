export interface IUser {
  id: number;
  login: string;
  tabel: string;
}

export interface IUserRow extends IUser {
  img?: string;
}
