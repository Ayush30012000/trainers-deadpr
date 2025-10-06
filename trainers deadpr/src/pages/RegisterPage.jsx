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

const RegisterPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    category: '',
    experience: '',
    location: '',
    bio: '',
    profilePictureName: ''
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
        profilePictureName: file.name
      }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.fullName || !formData.email || !formData.category) {
    toast({
      title: "Please fill in all required fields",
      variant: "destructive",
      duration: 4000,
    });
    return;
  }

  try {
    // create FormData for file + fields
    const body = new FormData();
    body.append("fullName", formData.fullName);
    body.append("email", formData.email);
    if (formData.phone) body.append("phone", formData.phone);
    body.append("category", formData.category);
    if (formData.experience) body.append("experience", formData.experience);
    if (formData.location) body.append("location", formData.location);
    if (formData.bio) body.append("bio", formData.bio);
    if (formData.profilePictureFile) {
      body.append("profilePicture", formData.profilePictureFile);
    }

    const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/trainers`, {
      method: "POST",
      body,
      // don't set Content-Type, browser sets it for multipart/form-data
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Registration failed");
    }

    toast({
      title: "Registration Successful! 🎉",
      description: data.message || "Your trainer profile has been submitted for review.",
      duration: 5000,
    });

    // reset form
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      category: "",
      experience: "",
      location: "",
      bio: "",
      profilePictureName: "",
      profilePictureFile: null,
    });
  } catch (err) {
    console.error(err);
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
        <title>Register as Instructor - Join FitConnect</title>
        <meta name="description" content="Join FitConnect as a certified fitness instructor. Register your profile and start connecting with clients looking for yoga instruction or personal training." />
        <meta property="og:title" content="Register as Instructor - Join FitConnect" />
        <meta property="og:description" content="Join FitConnect as a certified fitness instructor. Register your profile and start connecting with clients looking for yoga instruction or personal training." />
      </Helmet>

      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10 mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card className="glass-effect border-white/10">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full">
                    <UserPlus className="h-8 w-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-3xl font-bold text-white">Register as Instructor</CardTitle>
                <p className="text-white/70 mt-2">
                  Join our community of fitness professionals and start connecting with clients
                </p>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        <Label htmlFor="email" className="text-white">Email Address *</Label>
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
                        <Label htmlFor="phone" className="text-white">Phone Number</Label>
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
                        <Label htmlFor="location" className="text-white">City/Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="glass-effect border-white/20 text-white placeholder:text-white/50"
                          placeholder="City, State"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <Award className="h-5 w-5 mr-2 text-yellow-400" />
                      Professional Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category" className="text-white">Category *</Label>
                        <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                          <SelectTrigger className="glass-effect border-white/20 text-white">
                            <SelectValue placeholder="Select your specialty" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-800 border-white/20">
                            <SelectItem value="Yoga Instructor" className="text-white hover:bg-white/10">
                              Yoga Instructor
                            </SelectItem>
                            <SelectItem value="Personal Trainer" className="text-white hover:bg-white/10">
                              Personal Trainer
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="experience" className="text-white">Years of Experience</Label>
                        <Input
                          id="experience"
                          value={formData.experience}
                          onChange={(e) => handleInputChange('experience', e.target.value)}
                          className="glass-effect border-white/20 text-white placeholder:text-white/50"
                          placeholder="e.g., 5 years"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="bio" className="text-white">Bio/Description</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        className="glass-effect border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
                        placeholder="Tell us about your experience, training philosophy, and what makes you unique..."
                      />
                    </div>

                    <div>
                      <Label htmlFor="profilePicture" className="text-white">Profile Picture</Label>
                      <div className="mt-2">
                        <label htmlFor="profilePicture" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-white/30 rounded-lg cursor-pointer hover:border-white/50 transition-colors glass-effect">
                          <div className="text-center">
                            <Upload className="h-8 w-8 text-white/60 mx-auto mb-2" />
                            <p className="text-white/60 text-sm">
                              {formData.profilePictureName ? formData.profilePictureName : 'Click to upload profile picture'}
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
                      Submit Registration
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

export default RegisterPage;