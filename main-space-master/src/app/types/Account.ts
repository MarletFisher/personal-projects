export interface Account {
  username?: string;
  password?: string;
  email?: string;
  personalInfo?: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
  };
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
  };
  notes?: string;
  status?: string;
}
