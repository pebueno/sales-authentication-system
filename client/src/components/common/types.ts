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

export type AuthContextType = {
  isAuthenticated: boolean;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

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
