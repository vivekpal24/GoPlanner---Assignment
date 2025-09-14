import { Moon, Zap, Sun, Users } from 'lucide-react';

const weekendThemes = {
  lazy: {
    name: 'Lazy Weekend',
    icon: Moon,
    color: 'from-blue-400 to-indigo-500',
    description: 'Slow, relaxing activities',
    suggestedMoods: ['relaxed']
  },
  adventurous: {
    name: 'Adventure Weekend',
    icon: Zap,
    color: 'from-yellow-400 to-orange-500',
    description: 'High-energy, exciting activities',
    suggestedMoods: ['energetic']
  },
  balanced: {
    name: 'Balanced Weekend',
    icon: Sun,
    color: 'from-green-400 to-teal-500',
    description: 'Mix of relaxation and activity',
    suggestedMoods: ['relaxed', 'happy', 'energetic']
  },
  social: {
    name: 'Social Weekend',
    icon: Users,
    color: 'from-pink-400 to-purple-500',
    description: 'Time with friends and family',
    suggestedMoods: ['happy', 'energetic']
  }
};

export default weekendThemes;
