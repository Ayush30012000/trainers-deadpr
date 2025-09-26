import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star } from 'lucide-react';
import { useState } from 'react';

const TrainerCard = ({ trainer, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="h-full"
    >
      <Link to={`/trainer/${trainer._id}`} state={{trainer}}>
        <Card className="trainer-card h-full overflow-hidden cursor-pointer">
          <div className="relative">
            <img  
              className="w-full h-48 object-cover" 
              alt={`${trainer.fullName} - ${trainer.category}`}
             src="https://images.unsplash.com/photo-1597460832848-d9e03d287ace" />
            <div className="absolute top-4 right-4">
              <Badge 
                variant="secondary" 
                className="bg-white/20 text-white border-white/30 backdrop-blur-sm"
              >
                {trainer.category}
              </Badge>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-white">{trainer?.fullName}</h3>
              
              <div className="flex items-center text-purple-300 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {trainer.location}
              </div>
              
              <p className="text-white/70 text-sm line-clamp-2">
                {trainer.description}
              </p>
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center text-yellow-400">
                  <Star className="h-4 w-4 mr-1 fill-current" />
                  <span className="text-sm">4.9</span>
                </div>
                <span className="text-purple-300 text-sm font-medium">
                  {trainer.experience} experience
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default TrainerCard;