export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles: string[];
  badge?: string | number;
  items?: MenuItem[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  link?: string;
}


