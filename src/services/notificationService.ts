import {Notification} from '@/types/layout';
import {ODataQueryParams, ODataResponse, User, UserRole, UserStatus} from "@/types/user";

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Booking Request',
    message: 'Conference Room A has been requested for tomorrow at 2 PM',
    type: 'info',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: false,
    link: '/bookings'
  },
  {
    id: '2',
    title: 'User Registration',
    message: 'New user Emma Williams has registered',
    type: 'success',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    read: false,
    link: '/users'
  },
  {
    id: '3',
    title: 'Resource Maintenance',
    message: 'Meeting Room B will be under maintenance next Monday',
    type: 'warning',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true
  },
  {
    id: '4',
    title: 'System Update',
    message: 'System will be updated tonight at 11 PM',
    type: 'info',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: true
  }
];

export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    return [...mockNotifications];
  },

  async markAsRead(id: string): Promise<void> {
    const notification = mockNotifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
    }
  },

  async markAllAsRead(): Promise<void> {
    mockNotifications.forEach(n => n.read = true);
  },

  getUnreadCount(): number {
    return mockNotifications.filter(n => !n.read).length;
  }
};


// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@smartbooking.com',
    firstName: 'Admin',
    lastName: 'User',
    role: UserRole.ADMIN,
    department: 'IT',
    status: UserStatus.ACTIVE,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-11-10'),
    phone: '+1234567890',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=667eea&color=fff'
  },
  {
    id: '2',
    username: 'jdoe',
    email: 'john.doe@smartbooking.com',
    firstName: 'John',
    lastName: 'Doe',
    role: UserRole.MANAGER,
    department: 'Operations',
    status: UserStatus.ACTIVE,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-11-12'),
    phone: '+1234567891',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=764ba2&color=fff'
  },
  {
    id: '3',
    username: 'asmith',
    email: 'alice.smith@smartbooking.com',
    firstName: 'Alice',
    lastName: 'Smith',
    role: UserRole.USER,
    department: 'Marketing',
    status: UserStatus.ACTIVE,
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-11-13'),
    phone: '+1234567892',
    avatar: 'https://ui-avatars.com/api/?name=Alice+Smith&background=3b82f6&color=fff'
  },
  {
    id: '4',
    username: 'bwilson',
    email: 'bob.wilson@smartbooking.com',
    firstName: 'Bob',
    lastName: 'Wilson',
    role: UserRole.USER,
    department: 'Sales',
    status: UserStatus.ACTIVE,
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-11-11'),
    phone: '+1234567893',
    avatar: 'https://ui-avatars.com/api/?name=Bob+Wilson&background=8b5cf6&color=fff'
  },
  {
    id: '5',
    username: 'cjohnson',
    email: 'carol.johnson@smartbooking.com',
    firstName: 'Carol',
    lastName: 'Johnson',
    role: UserRole.MANAGER,
    department: 'HR',
    status: UserStatus.ACTIVE,
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-11-14'),
    phone: '+1234567894',
    avatar: 'https://ui-avatars.com/api/?name=Carol+Johnson&background=10b981&color=fff'
  },
  {
    id: '6',
    username: 'dmiller',
    email: 'david.miller@smartbooking.com',
    firstName: 'David',
    lastName: 'Miller',
    role: UserRole.USER,
    department: 'IT',
    status: UserStatus.INACTIVE,
    createdAt: new Date('2024-06-20'),
    updatedAt: new Date('2024-10-20'),
    phone: '+1234567895',
    avatar: 'https://ui-avatars.com/api/?name=David+Miller&background=f59e0b&color=fff'
  },
  {
    id: '7',
    username: 'ewilliams',
    email: 'emma.williams@smartbooking.com',
    firstName: 'Emma',
    lastName: 'Williams',
    role: UserRole.USER,
    department: 'Finance',
    status: UserStatus.ACTIVE,
    createdAt: new Date('2024-07-10'),
    updatedAt: new Date('2024-11-13'),
    phone: '+1234567896',
    avatar: 'https://ui-avatars.com/api/?name=Emma+Williams&background=ef4444&color=fff'
  },
  {
    id: '8',
    username: 'fbrown',
    email: 'frank.brown@smartbooking.com',
    firstName: 'Frank',
    lastName: 'Brown',
    role: UserRole.USER,
    department: 'External',
    status: UserStatus.ACTIVE,
    createdAt: new Date('2024-08-25'),
    updatedAt: new Date('2024-11-10'),
    phone: '+1234567897',
    avatar: 'https://ui-avatars.com/api/?name=Frank+Brown&background=6366f1&color=fff'
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const userService = {
  // Get users with OData query parameters
  async getUsers(params?: ODataQueryParams): Promise<ODataResponse<User>> {
    await delay(500); // Simulate network delay

    let filteredUsers = [...mockUsers];

    // Apply filter
    if (params?.$filter) {
      const filterLower = params.$filter.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.username.toLowerCase().includes(filterLower) ||
        user.email.toLowerCase().includes(filterLower) ||
        user.firstName.toLowerCase().includes(filterLower) ||
        user.lastName.toLowerCase().includes(filterLower) ||
        user.department.toLowerCase().includes(filterLower)
      );
    }

    // Apply sorting
      if (params?.$orderby) {
          const [field, order] = params.$orderby.split(' ');

          filteredUsers.sort((a, b) => {
              const aValue = a[field as keyof User] ?? "";
              const bValue = b[field as keyof User] ?? "";

              if (aValue < bValue) return order === 'desc' ? 1 : -1;
              if (aValue > bValue) return order === 'desc' ? -1 : 1;
              return 0;
          });
      }

    const total = filteredUsers.length;

    // Apply pagination
    const skip = params?.$skip || 0;
    const top = params?.$top || 10;
    filteredUsers = filteredUsers.slice(skip, skip + top);

    return {
      value: filteredUsers,
      '@odata.count': total
    };
  },

  // Get user by ID
  async getUserById(id: string): Promise<User | null> {
    await delay(300);
    return mockUsers.find(user => user.id === id) || null;
  },

  // Create new user
  async createUser(userData: Partial<User>): Promise<User> {
    await delay(500);
    
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      username: userData.username || '',
      email: userData.email || '',
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      role: userData.role || UserRole.USER,
      department: userData.department || '',
      status: userData.status || UserStatus.ACTIVE,
      phone: userData.phone,
      avatar: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=667eea&color=fff`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    mockUsers.push(newUser);
    return newUser;
  },

  // Update user
  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    await delay(500);
    
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    mockUsers[index] = {
      ...mockUsers[index],
      ...userData,
      updatedAt: new Date()
    };

    return mockUsers[index];
  },

  // Delete user
  async deleteUser(id: string): Promise<void> {
    await delay(300);
    
    const index = mockUsers.findIndex(user => user.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }

    mockUsers.splice(index, 1);
  },

  // Bulk delete users
  async deleteUsers(ids: string[]): Promise<void> {
    await delay(500);
    
    ids.forEach(id => {
      const index = mockUsers.findIndex(user => user.id === id);
      if (index !== -1) {
        mockUsers.splice(index, 1);
      }
    });
  }
};

