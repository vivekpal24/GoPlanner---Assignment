import { Utensils, Mountain, Film, Heart, Palette, Users } from 'lucide-react';

const activityCategories = {
  food: {
    icon: Utensils,
    color: 'from-orange-400 to-red-500',
    activities: [
      { id: 'brunch', name: 'Weekend Brunch', duration: '2h', mood: 'happy', location: 'Local Cafe' },
      { id: 'cooking', name: 'Cook Together', duration: '1.5h', mood: 'relaxed', location: 'Home Kitchen' },
      { id: 'food-tour', name: 'Food Market Tour', duration: '3h', mood: 'energetic', location: 'Downtown Market' },
      { id: 'picnic', name: 'Picnic in Park', duration: '2.5h', mood: 'happy', location: 'Central Park' }
    ]
  },
  outdoor: {
    icon: Mountain,
    color: 'from-green-400 to-blue-500',
    activities: [
      { id: 'hiking', name: 'Nature Hiking', duration: '4h', mood: 'energetic', location: 'Mountain Trail' },
      { id: 'cycling', name: 'City Cycling', duration: '2h', mood: 'energetic', location: 'Bike Path' },
      { id: 'beach', name: 'Beach Day', duration: '5h', mood: 'relaxed', location: 'Seaside Beach' },
      { id: 'gardening', name: 'Garden Time', duration: '1h', mood: 'relaxed', location: 'Home Garden' }
    ]
  },
  entertainment: {
    icon: Film,
    color: 'from-purple-400 to-pink-500',
    activities: [
      { id: 'movie', name: 'Movie Night', duration: '2.5h', mood: 'relaxed', location: 'Home Theater' },
      { id: 'concert', name: 'Live Music', duration: '3h', mood: 'energetic', location: 'Concert Hall' },
      { id: 'gaming', name: 'Board Games', duration: '2h', mood: 'happy', location: 'Living Room' },
      { id: 'museum', name: 'Art Museum', duration: '3h', mood: 'happy', location: 'City Museum' }
    ]
  },
  wellness: {
    icon: Heart,
    color: 'from-pink-400 to-rose-500',
    activities: [
      { id: 'yoga', name: 'Morning Yoga', duration: '1h', mood: 'relaxed', location: 'Home Studio' },
      { id: 'spa', name: 'Spa Day', duration: '4h', mood: 'relaxed', location: 'Day Spa' },
      { id: 'meditation', name: 'Meditation', duration: '30min', mood: 'relaxed', location: 'Quiet Space' },
      { id: 'massage', name: 'Massage', duration: '1.5h', mood: 'relaxed', location: 'Wellness Center' }
    ]
  },
  creative: {
    icon: Palette,
    color: 'from-indigo-400 to-purple-500',
    activities: [
      { id: 'reading', name: 'Reading Time', duration: '2h', mood: 'relaxed', location: 'Cozy Corner' },
      { id: 'painting', name: 'Art & Paint', duration: '3h', mood: 'happy', location: 'Art Studio' },
      { id: 'photography', name: 'Photo Walk', duration: '2.5h', mood: 'energetic', location: 'City Streets' },
      { id: 'writing', name: 'Creative Writing', duration: '1.5h', mood: 'relaxed', location: 'Cafe' }
    ]
  },
  social: {
    icon: Users,
    color: 'from-teal-400 to-cyan-500',
    activities: [
      { id: 'friends', name: 'Friends Hangout', duration: '4h', mood: 'happy', location: 'Home' },
      { id: 'party', name: 'House Party', duration: '5h', mood: 'energetic', location: 'Home' },
      { id: 'dinner-out', name: 'Dinner Date', duration: '2.5h', mood: 'happy', location: 'Restaurant' },
      { id: 'game-night', name: 'Game Night', duration: '3h', mood: 'happy', location: 'Home' }
    ]
  }
};

export default activityCategories;
