export interface Admin {
  first_name: string;
  last_name: string;
  password: string; // Note: Passwords should be hashed
  github: string;
  email: string;
  linkedin: string;
  about_me: string;
}