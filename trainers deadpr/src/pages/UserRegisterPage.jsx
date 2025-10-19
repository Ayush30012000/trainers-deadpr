import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Upload, UserPlus, CheckCircle, Award } from 'lucide-react';

const UserRegisterPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    gender: '',
    dateOfBirth: '',
    address: '',
    profilePictureName: '',
    profilePictureFile: null,
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profilePictureName: file.name,
        profilePictureFile: file,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.username) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    try {
      const body = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key]) {
          body.append(key, formData[key]);
        }
      });

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/userRegistration`, {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Registration failed");

      toast({
        title: "Registration Successful! 🎉",
        description: data.message || "Your user profile has been created successfully.",
        duration: 5000,
      });

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        gender: '',
        dateOfBirth: '',
        address: '',
        profilePictureName: '',
        profilePictureFile: null,
      });
    } catch (err) {
      toast({
        title: "Registration Failed",
        description: err.message || "Something went wrong while submitting your profile.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>User Registration - Join FitConnect</title>
        <meta name="description" content="Create your FitConnect user profile to start your fitness journey today." />
      </Helmet>

      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Card className="glass-effect border-white/10">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full">
                    <UserPlus className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-white">User Registration</CardTitle>
                <p className="text-white/70 mt-2">Join FitConnect and start your fitness journey today!</p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-400" />
                      Personal Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName" className="text-white">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="glass-effect border-white/20 text-white placeholder:text-white/50"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-white">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="glass-effect border-white/20 text-white placeholder:text-white/50"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone" className="text-white">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="glass-effect border-white/20 text-white placeholder:text-white/50"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      <div>
                        <Label htmlFor="gender" className="text-white">Gender</Label>
                        <Select onValueChange={(val) => handleInputChange('gender', val)}>
                          <SelectTrigger className="glass-effect border-white/20 text-white">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 text-white border-white/20">
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="username" className="text-white">Username *</Label>
                        <Input
                          id="username"
                          value={formData.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          className="glass-effect border-white/20 text-white placeholder:text-white/50"
                          placeholder="Choose a username"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="password" className="text-white">Password *</Label>
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="glass-effect border-white/20 text-white placeholder:text-white/50"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="dateOfBirth" className="text-white">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="glass-effect border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-white">Address</Label>
                      <Textarea
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        className="glass-effect border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                        placeholder="Street, City, State"
                      />
                    </div>

                    <div>
                      <Label htmlFor="profilePicture" className="text-white">Profile Picture</Label>
                      <div className="mt-2">
                        <label
                          htmlFor="profilePicture"
                          className="flex items-center justify-center w-full h-32 border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:border-white/50 transition-colors glass-effect"
                        >
                          <div className="text-center">
                            <Upload className="h-8 w-8 text-white/60 mx-auto mb-2" />
                            <p className="text-white/60 text-sm">
                              {formData.profilePictureName || 'Click to upload profile picture'}
                            </p>
                          </div>
                        </label>
                        <input
                          id="profilePicture"
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0 py-3 text-lg"
                    >
                      Create Account
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default UserRegisterPage;
