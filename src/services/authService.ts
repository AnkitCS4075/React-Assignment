interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  createdAt: Date;
}

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private users: User[] = [];

  private constructor() {
    // Load saved users from localStorage
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }
  }

  static getInstance() {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async signUp(name: string, email: string, password: string): Promise<User> {
    // Mock sign-up
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        if (this.users.some(user => user.email === email)) {
          reject(new Error('User already exists'));
          return;
        }

        const user: User = {
          id: crypto.randomUUID(),
          email,
          name,
          createdAt: new Date(),
        };

        this.users.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
        
        this.currentUser = user;
        localStorage.setItem('user', JSON.stringify(user));
        
        resolve(user);
      }, 1000);
    });
  }

  async signIn(email: string, password: string): Promise<User> {
    // Mock authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.email === email);
        if (user) {
          this.currentUser = user;
          localStorage.setItem('user', JSON.stringify(user));
          resolve(user);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  }

  async googleSignIn(): Promise<User> {
    // Mock Google authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: crypto.randomUUID(),
          email: 'user@example.com',
          name: 'Demo User',
          photoURL: 'https://via.placeholder.com/150',
          createdAt: new Date(),
        };
        
        if (!this.users.some(u => u.email === user.email)) {
          this.users.push(user);
          localStorage.setItem('users', JSON.stringify(this.users));
        }
        
        this.currentUser = user;
        localStorage.setItem('user', JSON.stringify(user));
        resolve(user);
      }, 1000);
    });
  }

  async signOut(): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.currentUser = null;
        localStorage.removeItem('user');
        resolve();
      }, 500);
    });
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  // Helper method to get user activity data
  getUserActivityData(): { labels: string[], data: number[] } {
    const user = this.getCurrentUser();
    if (!user) return { labels: [], data: [] };

    // Mock activity data - in a real app, this would come from a backend
    const today = new Date();
    const labels = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(today);
      date.setMonth(today.getMonth() - (5 - i));
      return date.toLocaleString('default', { month: 'short' });
    });

    const data = Array.from({ length: 6 }, () => Math.floor(Math.random() * 100));

    return { labels, data };
  }
}

export const authService = AuthService.getInstance();
export type { User }; 