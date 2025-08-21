// Login page for UXi Education LMS
import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/lib/auth';
import { School, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { login, isAuthenticated } = useAuth();

  const slideshowImages = [
    '/lovable-uploads/james-lee-3o7oeVnG5uc-unsplash.jpg',
    '/lovable-uploads/ptti-edu-k9Dc5zT1Gq0-unsplash.jpg',
    '/lovable-uploads/septian-setiawan-iaeCoxlkwS0-unsplash.jpg',
    '/lovable-uploads/simone-impei-eZaKj3xAzTE-unsplash.jpg',
    '/lovable-uploads/todd-cravens-I8Z9EJUUYE0-unsplash.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(email, password);
      if (!result.success) {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: 'student' | 'admin') => {
    setLoading(true);
    setError('');
    
    const demoCredentials = {
      student: { email: 'macy.fisher@example.com', password: 'password123' },
      admin: { email: 'phillip@uxieducation.com', password: 'password123' }
    };

    const { email: demoEmail, password: demoPassword } = demoCredentials[role];
    
    try {
      const result = await login(demoEmail, demoPassword);
      if (!result.success) {
        setError(result.error || 'Demo login failed');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Slideshow and Content */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-slate-800">
        {/* Slideshow Background */}
        <div className="absolute inset-0">
          {slideshowImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="absolute inset-0 bg-slate-800/70 z-10"></div>
              <img
                src={image}
                alt={`UXi Education Training ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        <div className="relative z-20 flex flex-col justify-center items-start p-12 text-white max-w-lg">
          <h1 className="text-5xl font-bold mb-8 leading-tight">
            Your future is<br />
            <span className="text-yellow-300">Artisan Trades</span>
          </h1>
          <div className="space-y-4 text-lg">
            <p className="opacity-95">
              We are confident that you are the future.
            </p>
            <p className="opacity-95">
              It begins with us today.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8" 
           style={{ backgroundColor: '#1e293b' }}>
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Login</h2>
            <p className="text-yellow-300 text-lg">
              Prepare for your accredited future
            </p>
          </div>

          {/* Demo Login Buttons */}
          <div className="space-y-3 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
            <p className="text-sm text-center text-slate-300 mb-3">Demo Logins:</p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('student')}
                disabled={loading}
                className="bg-slate-600 text-white border-slate-500 hover:bg-slate-500"
              >
                Student (Macy)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDemoLogin('admin')}
                disabled={loading}
                className="bg-slate-600 text-white border-slate-500 hover:bg-slate-500"
              >
                 
                
              </Button>
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 text-sm text-red-200 bg-red-900/30 border border-red-500/50 rounded-lg">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="h-14 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                />
              </div>

              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Pas*****"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="h-14 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400"
                />
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(!!checked)}
                  className="border-slate-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label htmlFor="remember" className="text-slate-300 text-sm">
                  remember me
                </Label>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full h-14 text-lg font-semibold text-slate-900 bg-yellow-400 hover:bg-yellow-500 hover:scale-105 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/30"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <div className="text-center">
                <Link 
                  to="/forgot-password" 
                  className="text-slate-300 hover:text-white transition-colors underline"
                >
                  Forgot password? click here
                </Link>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="text-center space-y-4 pt-8">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-slate-400">
              <Link to="/about" className="hover:text-white transition-colors">About us</Link>
              <Link to="/partners" className="hover:text-white transition-colors">Partners</Link>
              <Link to="/news" className="hover:text-white transition-colors">News</Link>
              <Link to="/support" className="hover:text-white transition-colors">Support</Link>
              <Link to="/campuses" className="hover:text-white transition-colors">Campuses</Link>
            </div>
            
            <div className="flex justify-center space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}