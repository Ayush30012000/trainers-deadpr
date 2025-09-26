import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { Shield } from 'lucide-react';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();
    const { toast } = useToast();

    const handleLogin = (e) => {
        e.preventDefault();
        const success = login(username, password);
        if (success) {
            toast({
                title: "Login Successful",
                description: "Welcome, Admin!",
            });
            navigate('/admin/dashboard');
        } else {
            toast({
                title: "Login Failed",
                description: "Invalid username or password.",
                variant: "destructive",
            });
        }
    };

    return (
        <>
            <Helmet>
                <title>Admin Login | FitConnect</title>
                <meta name="description" content="Secure login for FitConnect administrators." />
            </Helmet>
            <div className="min-h-screen flex items-center justify-center p-4">
            
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Card className="w-full max-w-md glass-effect border-white/10">
                        <CardHeader className="text-center">
                            <div className="flex justify-center mb-4">
                                <div className="p-3 bg-gradient-to-r from-red-500 to-orange-600 rounded-full">
                                    <Shield className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <CardTitle className="text-3xl font-bold text-white">Admin Panel</CardTitle>
                            <CardDescription className="text-white/70 mt-2">
                                Please enter your credentials to proceed.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-white">Username</Label>
                                    <Input
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="admin"
                                        className="glass-effect border-white/20 text-white placeholder:text-white/50"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-white">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="password"
                                        className="glass-effect border-white/20 text-white placeholder:text-white/50"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0 py-3 text-lg"
                                >
                                    Login
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </>
    );
};

export default AdminLogin;