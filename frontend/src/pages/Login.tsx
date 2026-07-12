import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Button } from '../shared/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../shared/components/Card';
import api from '../services/api';
import { Leaf } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);

  const [email, setEmail] = React.useState('admin@ecosphere.local');
  const [password, setPassword] = React.useState('password123');

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;
      
      if (data.success) {
        login(data.data.user, data.data.token);
        navigate('/');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error: any) {
      alert(error.response?.data?.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Leaf className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Welcome to EcoSphere</CardTitle>
          <p className="text-sm text-textSecondary mt-2">Sign in to your account</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-textSecondary">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-white/10 bg-surface/50 px-3 py-2 text-textPrimary shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-textSecondary">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-white/10 bg-surface/50 px-3 py-2 text-textPrimary shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" 
              />
            </div>
            <Button className="w-full" onClick={handleLogin} isLoading={isLoading}>
              Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
