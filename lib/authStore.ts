import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: string;
  role?: 'USER' | 'ADMIN' | 'LEAD' | 'TEACHER';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  initialized: boolean;
  
  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  initialize: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      loading: false,
      initialized: false,

      login: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isAdmin: user.role === 'ADMIN' || user.email === 'admin@skillsprint.com',
          loading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isAdmin: false,
          loading: false,
        });
      },

      setLoading: (loading: boolean) => {
        set({ loading });
      },

      initialize: () => {
        set({ initialized: true });
      },

      checkAuth: async () => {
        const { token } = get();
        if (!token) {
          set({ initialized: true });
          return;
        }

        try {
          set({ loading: true });
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}/graphql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              query: `
                query {
                  me {
                    id
                    email
                    name
                    avatar
                    createdAt
                    role
                  }
                }
              `
            }),
          });

          if (!response.ok) {
            // Only clear auth on explicit unauthorized
            if (response.status === 401 || response.status === 403) {
              set({ user: null, token: null, isAuthenticated: false, isAdmin: false, loading: false, initialized: true });
            } else {
              set({ loading: false, initialized: true });
            }
            return;
          }

          const data = await response.json();
          if (data.data?.me) {
            const user = data.data.me as User;
            set({
              user,
              isAuthenticated: true,
              isAdmin: user.role === 'ADMIN' || user.email === 'admin@skillsprint.com',
              loading: false,
              initialized: true,
            });
          } else {
            // Do not wipe on schema or other errors; only mark initialized
            set({ loading: false, initialized: true });
          }
        } catch (error) {
          console.error('Auth check failed:', error);
          // Network/other errors: do not wipe auth
          set({ loading: false, initialized: true });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
      }),
    }
  )
);
