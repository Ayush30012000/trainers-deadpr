import React, { useState, useMemo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import TrainerCard from '@/components/TrainerCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Filter, Search } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [allTrainers, setAllTrainers] = useState([]);

  useEffect(() => {
    loadData(); 
  }, []);

   const loadData = async () => {
    try {
      
      const trainersRes=await  fetch(`${API_BASE}/api/trainersData`);
      const trainersData = await trainersRes.json();
      setAllTrainers(trainersData?.trainers || []);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error loading data",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  const approvedTrainers = useMemo(() => {
    return allTrainers.filter(trainer => trainer.status === 'approved');
  }, [allTrainers]);
  
  const filteredTrainers = useMemo(() => {
    if (selectedCategory === 'all') {
      return approvedTrainers;
    }
    return approvedTrainers.filter(trainer => trainer.category === selectedCategory);
  }, [selectedCategory, approvedTrainers]);

  const categories = [
    { value: 'all', label: 'All Trainers' },
    { value: 'Yoga Instructor', label: 'Yoga Instructors' },
    { value: 'Personal Trainer', label: 'Personal Trainers' }
  ];

  return (
    <>
      <Helmet>
        <title>FitConnect - Find Your Perfect Fitness Trainer</title>
        <meta name="description" content="Connect with certified yoga instructors and personal trainers. Find the perfect fitness professional to help you achieve your health and wellness goals." />
        <meta property="og:title" content="FitConnect - Find Your Perfect Fitness Trainer" />
        <meta property="og:description" content="Connect with certified yoga instructors and personal trainers. Find the perfect fitness professional to help you achieve your health and wellness goals." />
      </Helmet>

      <div className="min-h-screen">
        <Header />
        
        <section className="relative py-20 px-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-6xl font-bold gradient-text">
                Find Your Perfect
                <br />
                Fitness Trainer
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto">
                Connect with certified yoga instructors and personal trainers who will help you achieve your health and wellness goals.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-4 pb-8">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8"
            >
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-purple-400" />
                <span className="text-white font-medium">Filter by Category:</span>
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px] glass-effect border-white/20 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-white/20">
                  {categories.map((category) => (
                    <SelectItem 
                      key={category.value} 
                      value={category.value}
                      className="text-white hover:bg-white/10"
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-6"
            >
              <p className="text-white/70">
                Showing {filteredTrainers.length} {filteredTrainers.length === 1 ? 'trainer' : 'trainers'}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrainers.map((trainer, index) => (
                <TrainerCard 
                  key={trainer._id} 
                  trainer={trainer} 
                  index={index}
                />
              ))}
            </div>
            
            {filteredTrainers.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Search className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/70 text-lg">
                  No trainers found in this category.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;