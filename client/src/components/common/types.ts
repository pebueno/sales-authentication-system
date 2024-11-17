export interface Agent {
  agentCode: string;
  agentName: string;
  workingArea: string;
  commission: string;
  phoneNo: string;
  country: string;
}

export interface DashboardProps {
  agents: Agent[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'guest' | 'agent' | 'customer';
  createAt: string;
  updateAt: string;
  deletedAt: string | null;
}

export type RegisterUserData = Omit<
  User,
  'id' | 'createAt' | 'updateAt' | 'deletedAt'
> & {
  password: string;
};

export type AuthContextType = {
  auth: {
    token: string | null;
    user: User | null;
  };
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterUserData) => Promise<void>;
};
