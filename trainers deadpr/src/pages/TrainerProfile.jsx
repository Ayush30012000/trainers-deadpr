import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, MapPin, Clock, Mail, Phone, Award, Star } from 'lucide-react';
import { useLocation } from 'react-router-dom';
const TrainerProfile = () => {
  const { toast } = useToast();
   const location = useLocation();
   const trainer=location.state?.trainer;

  // useEffect(() => {
  //   const trainers = JSON.parse(localStorage.getItem('trainers') || '[]');
  //   const foundTrainer = trainers.find(t => t.id === parseInt(id));
  //   setTrainer(foundTrainer);
  // }, [id]);

  if (!trainer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Trainer Not Found</h1>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleGetQuote = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! We are working on it! 🚀",
      duration: 4000,
    });
  };

  return (
    <>
      <Helmet>
        <title>{trainer?.fullName} - {trainer?.category} | FitConnect</title>
        <meta name="description" content={`Book a session with ${trainer?.fullName}, a certified ${trainer?.category.toLowerCase()} with ${trainer?.experience} of experience. ${trainer?.description}`} />
        <meta property="og:title" content={`${trainer?.fullName} - ${trainer?.category} | FitConnect`} />
        <meta property="og:description" content={`Book a session with ${trainer?.fullName}, a certified ${trainer?.category.toLowerCase()} with ${trainer?.experience} of experience. ${trainer?.description}`} />
      </Helmet>

      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-6">
          <Link to="/">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Trainers
            </Button>
          </Link>
        </div>

        <section className="px-4 pb-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glass-effect rounded-2xl p-8 mb-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-1">
                  <img  
                    className="w-full max-w-sm mx-auto rounded-2xl shadow-2xl" 
                    alt={`${trainer?.fullName} - Professional ${trainer?.category}`}
                   src="https://images.unsplash.com/photo-1618355281346-66ac1663917d" />
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold text-white mb-2">{trainer?.fullName}</h1>
                    <Badge className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white border-0 text-sm px-3 py-1">
                      {trainer.category}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-purple-400 mr-2" />
                      {trainer.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-purple-400 mr-2" />
                      {trainer.experience} experience
                    </div>
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-purple-400 mr-2" />
                      {trainer.email}
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-purple-400 mr-2" />
                      {trainer.phone}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-yellow-400">
                      <Star className="h-5 w-5 mr-1 fill-current" />
                      <Star className="h-5 w-5 mr-1 fill-current" />
                      <Star className="h-5 w-5 mr-1 fill-current" />
                      <Star className="h-5 w-5 mr-1 fill-current" />
                      <Star className="h-5 w-5 mr-1 fill-current" />
                      <span className="text-white ml-2">4.9 (127 reviews)</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleGetQuote}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 px-8 py-3 text-lg"
                  >
                    Get Quote
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2"
              >
                <Card className="glass-effect border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-2xl">About {trainer?.fullName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-white/80 leading-relaxed text-lg">
                      {trainer.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <Card className="glass-effect border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-white/80">
                      <p><strong>Specialties:</strong> {trainer.specialties ? trainer.specialties.join(', ') : 'Not available'}</p>
                      <p><strong>Certifications:</strong> {trainer.certifications ? trainer.certifications.join(', ') : 'Not available'}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-effect border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Ready to Start?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-white/70 text-sm">
                      Get a personalized quote and start your fitness journey today!
                    </p>
                    <Button 
                      onClick={handleGetQuote}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0"
                    >
                      Get Quote
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TrainerProfile;