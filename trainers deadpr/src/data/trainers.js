export const trainersData = [
  {
    id: 1,
    name: "Sarah Johnson",
    category: "Yoga Instructor",
    description: "Certified Hatha and Vinyasa yoga instructor with 8 years of experience.",
    bio: "Sarah is a passionate yoga instructor who discovered her love for yoga during college. She completed her 200-hour teacher training in Rishikesh, India, and has since helped hundreds of students find balance and peace through yoga. Her classes focus on mindful movement, breath awareness, and creating a safe space for all levels.",
    experience: "8 years",
    location: "Los Angeles, CA",
    specialties: ["Hatha Yoga", "Vinyasa Flow", "Meditation", "Prenatal Yoga"],
    certifications: ["RYT-200", "Prenatal Yoga Certified", "Meditation Teacher Training"],
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    status: "approved"
  },
  {
    id: 2,
    name: "Mike Rodriguez",
    category: "Personal Trainer",
    description: "NASM certified personal trainer specializing in strength training and weight loss.",
    bio: "Mike has been transforming lives through fitness for over 10 years. As a former college athlete, he understands the importance of proper training techniques and nutrition. He specializes in creating personalized workout plans that help clients achieve their fitness goals safely and effectively.",
    experience: "10 years",
    location: "Miami, FL",
    specialties: ["Strength Training", "Weight Loss", "HIIT", "Sports Performance"],
    certifications: ["NASM-CPT", "Corrective Exercise Specialist", "Nutrition Coach"],
    email: "mike.rodriguez@email.com",
    phone: "(555) 234-5678",
    status: "approved"
  },
  {
    id: 3,
    name: "Emma Chen",
    category: "Yoga Instructor",
    description: "Yin and restorative yoga specialist focused on stress relief and flexibility.",
    bio: "Emma brings a gentle and nurturing approach to yoga, specializing in slower-paced practices that promote deep relaxation and healing. With a background in physical therapy, she combines her knowledge of anatomy with ancient yoga wisdom to help students recover from stress and injury.",
    experience: "6 years",
    location: "San Francisco, CA",
    specialties: ["Yin Yoga", "Restorative Yoga", "Stress Relief", "Flexibility"],
    certifications: ["RYT-500", "Yin Yoga Certified", "Trauma-Informed Yoga"],
    email: "emma.chen@email.com",
    phone: "(555) 345-6789",
    status: "approved"
  },
  {
    id: 4,
    name: "David Thompson",
    category: "Personal Trainer",
    description: "Functional fitness expert helping clients build real-world strength.",
    bio: "David believes fitness should translate to everyday life. His functional training approach focuses on movements that improve daily activities and prevent injury. With a background in physical therapy, he works with clients of all ages to build strength, mobility, and confidence.",
    experience: "12 years",
    location: "Austin, TX",
    specialties: ["Functional Training", "Mobility", "Injury Prevention", "Senior Fitness"],
    certifications: ["ACSM-CPT", "FMS Level 2", "TRX Certified"],
    email: "david.thompson@email.com",
    phone: "(555) 456-7890",
    status: "approved"
  },
  {
    id: 5,
    name: "Lisa Park",
    category: "Yoga Instructor",
    description: "Power yoga and hot yoga instructor with competitive yoga background.",
    bio: "Lisa brings intensity and precision to her yoga practice. As a former competitive athlete, she understands the mental and physical challenges of pushing boundaries. Her power yoga classes are designed to build strength, endurance, and mental resilience while maintaining the spiritual essence of yoga.",
    experience: "7 years",
    location: "Denver, CO",
    specialties: ["Power Yoga", "Hot Yoga", "Athletic Yoga", "Arm Balances"],
    certifications: ["RYT-200", "Hot Yoga Certified", "Advanced Arm Balance Training"],
    email: "lisa.park@email.com",
    phone: "(555) 567-8901",
    status: "approved"
  },
  {
    id: 6,
    name: "James Wilson",
    category: "Personal Trainer",
    description: "Bodybuilding and physique coach with competition experience.",
    bio: "James is a competitive bodybuilder turned coach who helps clients achieve their physique goals. Whether you're looking to build muscle, compete, or simply feel confident in your own skin, James provides the expertise and motivation needed to succeed. His approach combines scientific training methods with practical nutrition guidance.",
    experience: "9 years",
    location: "Las Vegas, NV",
    specialties: ["Bodybuilding", "Physique Coaching", "Contest Prep", "Muscle Building"],
    certifications: ["IFBB Pro Card", "NASM-CPT", "Precision Nutrition Level 1"],
    email: "james.wilson@email.com",
    phone: "(555) 678-9012",
    status: "approved"
  }
];

if (!localStorage.getItem('trainers')) {
  localStorage.setItem('trainers', JSON.stringify(trainersData));
}