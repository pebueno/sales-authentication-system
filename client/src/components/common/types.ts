import { types } from 'util';

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

export interface Customer {
  custCode: string;
  custName: string;
  custCity: string;
  workingArea: string;
  custCountry: string;
  grade: number;
  openingAmt: number;
  receiveAmt: number;
  paymentAmt: number;
  outstandingAmt: number;
  phoneNo: string;
  agent: Agent;
}

export interface CustomerFormProps {
  onSubmit: (formData: Partial<Customer>) => void;
  customerData?: Partial<Customer>;
  onCancel: () => void;
  availableAgents: Agent[];
  isEditMode: boolean;
}

export interface Order {
  ordNum: number;
  ordAmount: number;
  advanceAmount: number;
  ordDate: string;
  ordDescription: string;
  customer: Customer;
  agent: Agent;
}

export interface OrderFormProps {
  onSubmit: (formData: Partial<Order>) => void;
  orderData?: Partial<Order>;
  availableAgents: Agent[];
  availableCustomers: Customer[];
  onCancel: () => void;
  isEditMode: boolean;
}

export type AgentListProps = {
  agents: any[];
  onEdit: (agent: any) => void;
  onDelete: (agentCode: string) => void;
  onPageChange: (event: any, page: number) => void;
  rowChange: (event: any) => void;
  rowsPerPage: number;
  page: number;
};
