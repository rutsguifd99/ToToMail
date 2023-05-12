export interface IUser {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    id: string;
    isActivated: boolean;
  };
  isAuth?: boolean;
  // hasAddedEmail?: boolean;
}
