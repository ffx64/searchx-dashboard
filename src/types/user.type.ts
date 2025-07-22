export type User = {
  id: string;
  username: string;
  full_name: string;
  email: string;
  role: string;
  is_active: boolean;
  created_at: string;
  last_login: string;
};

export type UserCache = {
    username: string;
    last_login: string;
}