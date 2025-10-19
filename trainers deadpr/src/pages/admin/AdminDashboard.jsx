import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Users, UserCheck, UserX, Clock, LogOut } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
  const [trainers, setTrainers] = useState([]);
  const [blacklistedTrainers, setBlacklistedTrainers] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [trainersRes, blacklistRes] = await Promise.allSettled([
        fetch(`${API_BASE}/api/trainersData`),
        fetch(`${API_BASE}/api/blacklist`)
      ]);

      //console.log(trainersRes.json())
      const trainersData = await trainersRes.value.json();
      const blacklistData = await blacklistRes.value.json() || [];

      setTrainers(trainersData?.trainers || []);
      setBlacklistedTrainers(blacklistData?.trainers || []);
    } catch (err) {
      console.error(err);
      toast({
        title: "Error loading data",
        description: err.message,
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleRequest = async (id, newStatus) => {
  try {
    const res = await fetch(`${API_BASE}/api/trainers/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus })
    });

    if (!res.ok) throw new Error("Failed to update trainer");

    await loadData(); // refresh trainer list
    toast({
      title: `Request ${newStatus}`,
      description: `The trainer has been ${newStatus}.`,
    });
  } catch (err) {
    toast({
      title: "Update Failed",
      description: err.message,
      variant: "destructive",
    });
  }
};


  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/trainers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete trainer");

      await loadData();
      toast({
        title: `Trainer Deleted`,
        description: `The trainer has been permanently deleted.`,
      });
    } catch (err) {
      toast({
        title: "Delete Failed",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const handleBlacklist = async (trainer) => {
    try {
      const res = await fetch(`${API_BASE}/api/${trainer._id}/blacklist`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trainer),
      });

      if (!res.ok) throw new Error("Failed to blacklist trainer");

      // Optionally also delete from trainers list
      await fetch(`${API_BASE}/api/trainers/${trainer._id}`, { method: "DELETE" });

      await loadData();
      toast({
        title: `Trainer Blacklisted`,
        description: `${trainer.name} has been blacklisted.`,
        variant: "destructive",
      });
    } catch (err) {
      toast({
        title: "Blacklist Failed",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const stats = useMemo(() => ({
    total: trainers.length,
    pending: trainers.filter(t => t.status === 'pending').length,
    approved: trainers.filter(t => t.status === 'approved').length,
    rejected: trainers.filter(t => t.status === 'rejected').length,
    blacklisted: blacklistedTrainers.length
  }), [trainers, blacklistedTrainers]);

  const pendingRequests = useMemo(() => trainers.filter(t => t.status === 'pending'), [trainers]);
  const approvedTrainersList = useMemo(() => trainers.filter(t => t.status === 'approved'), [trainers]);

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | FitConnect</title>
      </Helmet>
      <div className="min-h-screen p-4 md:p-8">
        <div className="container mx-auto">
          <header className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold gradient-text">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline" className="text-white hover:bg-white/10 hover:text-white">
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </header>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <StatCard icon={<Users />} title="Total Trainers" value={stats.total} />
            <StatCard icon={<Clock />} title="Pending Requests" value={stats.pending} color="text-yellow-400" />
            <StatCard icon={<UserCheck />} title="Approved Trainers" value={stats.approved} color="text-green-400" />
            <StatCard icon={<UserX />} title="Blacklisted Trainers" value={stats.blacklisted} color="text-red-400" />
          </motion.div>
          
          {/* Pending */}
          <TrainerSection title="Pending Requests">
            {pendingRequests.length > 0 ? pendingRequests.map(trainer => (
              <TrainerRequestCard 
                key={trainer._id} 
                trainer={trainer} 
                onApprove={() => handleRequest(trainer._id, 'approved')} 
                onReject={() => handleRequest(trainer._id, 'rejected')} 
              />
            )) : <p className="text-white/70">No pending requests.</p>}
          </TrainerSection>

          {/* Approved */}
          <TrainerSection title="Approved Trainers">
            {approvedTrainersList.length > 0 ? approvedTrainersList.map(trainer => (
              <ApprovedTrainerCard 
                key={trainer._id} 
                trainer={trainer} 
                onDelete={() => handleDelete(trainer._id)} 
                onBlacklist={() => handleBlacklist(trainer)} 
              />
            )) : <p className="text-white/70">No approved trainers.</p>}
          </TrainerSection>

          {/* Blacklisted */}
          <TrainerSection title="Blacklisted Trainers">
            {blacklistedTrainers.length > 0 ? blacklistedTrainers.map(trainer => (
              <BlacklistedTrainerCard key={trainer._id} trainer={trainer} />
            )) : <p className="text-white/70">No blacklisted trainers.</p>}
          </TrainerSection>

        </div>
      </div>
    </>
  );
};

/* --- Reusable Components (same as before) --- */
const StatCard = ({ icon, title, value, color = "text-purple-400" }) => (
  <motion.div initial={{y: 20, opacity: 0}} animate={{y: 0, opacity: 1}}>
    <Card className="glass-effect border-white/10">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-white/80">{title}</CardTitle>
        <div className={color}>{React.cloneElement(icon, { className: "h-5 w-5" })}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
      </CardContent>
    </Card>
  </motion.div>
);

const TrainerSection = ({ title, children }) => (
  <motion.div className="mb-8" initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.2}}>
    <h2 className="text-2xl font-semibold text-white mb-4">{title}</h2>
    <div className="space-y-4">
      {children}
    </div>
  </motion.div>
);

const TrainerRequestCard = ({ trainer, onApprove, onReject }) => (
  <Card className="glass-effect border-white/10 p-4">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <p className="font-bold text-lg text-white">{trainer.name}</p>
        <p className="text-sm text-white/70">{trainer.email} | {trainer.category}</p>
        <p className="text-sm text-white/50 mt-1">{trainer.bio}</p>
      </div>
      <div className="flex items-center space-x-2 shrink-0">
        <Button onClick={onApprove} size="sm" className="bg-green-600 hover:bg-green-700">Approve</Button>
        <Button onClick={onReject} size="sm" variant="destructive">Reject</Button>
      </div>
    </div>
  </Card>
);

const ApprovedTrainerCard = ({ trainer, onDelete, onBlacklist }) => (
  <Card className="glass-effect border-white/10 p-4">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <p className="font-bold text-lg text-white">{trainer.name}</p>
        <p className="text-sm text-white/70">{trainer.email} | {trainer.category}</p>
      </div>
      <div className="flex items-center space-x-2 shrink-0">
        <Button onClick={onDelete} size="sm" variant="outline" className="text-white hover:bg-white/10">Delete</Button>
        <Button onClick={onBlacklist} size="sm" variant="destructive">Blacklist</Button>
      </div>
    </div>
  </Card>
);

const BlacklistedTrainerCard = ({ trainer }) => (
  <Card className="glass-effect border-red-500/30 p-4">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <p className="font-bold text-lg text-white">{trainer?.fullName}</p>
        <p className="text-sm text-white/70">{trainer.email} | {trainer.phone}</p>
      </div>
       <Badge variant="destructive">Blacklisted</Badge>
    </div>
  </Card>
);

export default AdminDashboard;
