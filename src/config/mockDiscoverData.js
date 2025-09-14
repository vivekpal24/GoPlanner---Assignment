const mockDiscoverData = {
  events: [
    {
      id: 'event1',
      name: 'Himachal Mountain Festival',
      description: 'Annual celebration of mountain culture with local music, food, and crafts',
      location: 'Shimla, Himachal Pradesh',
      time: 'Saturday 10:00 AM - 8:00 PM',
      rating: 4.6,
      category: 'Cultural',
      price: 'Free',
      distance: '45 km',
      image: '🎪'
    },
    {
      id: 'event2',
      name: 'Organic Farmers Market',
      description: 'Fresh local produce, homemade goods, and artisanal crafts',
      location: 'Dharamshala Town Center',
      time: 'Sunday 8:00 AM - 2:00 PM',
      rating: 4.3,
      category: 'Market',
      price: 'Free entry',
      distance: '32 km',
      image: '🥕'
    },
    {
      id: 'event3',
      name: 'Sunset Yoga Session',
      description: 'Outdoor yoga with panoramic mountain views',
      location: 'McLeod Ganj',
      time: 'Both days 6:00 PM - 7:30 PM',
      rating: 4.8,
      category: 'Wellness',
      price: '₹300',
      distance: '28 km',
      image: '🧘‍♀️'
    }
  ],
  restaurants: [
    {
      id: 'rest1',
      name: 'Mountain View Cafe',
      description: 'Traditional Himachali cuisine with stunning valley views',
      location: 'Near Una Bus Stand',
      cuisine: 'Himachali, Indian',
      rating: 4.4,
      price: '₹₹',
      distance: '2.5 km',
      hours: '9:00 AM - 10:00 PM',
      image: '🏔️'
    },
    {
      id: 'rest2',
      name: 'The Riverside Dhaba',
      description: 'Authentic Punjabi dhaba experience by the river',
      location: 'Amb Road',
      cuisine: 'Punjabi, North Indian',
      rating: 4.2,
      price: '₹',
      distance: '8 km',
      hours: '11:00 AM - 11:00 PM',
      image: '🌊'
    },
    {
      id: 'rest3',
      name: 'Himalayan Brew House',
      description: 'Craft beer and continental food with live music',
      location: 'Gagret',
      cuisine: 'Continental, Bar',
      rating: 4.5,
      price: '₹₹₹',
      distance: '12 km',
      hours: '4:00 PM - 12:00 AM',
      image: '🍺'
    }
  ],
  places: [
    {
      id: 'place1',
      name: 'Chintpurni Temple',
      description: 'Sacred Hindu temple dedicated to Goddess Chintpurni',
      location: 'Una District',
      type: 'Religious Site',
      rating: 4.7,
      distance: '18 km',
      visitTime: '1-2 hours',
      bestTime: 'Early morning or evening',
      image: '🛕'
    },
    {
      id: 'place2',
      name: 'Dera Baba Barbhag Singh',
      description: 'Peaceful gurudwara with beautiful architecture',
      location: 'Una',
      type: 'Religious Site',
      rating: 4.5,
      distance: '5 km',
      visitTime: '1 hour',
      bestTime: 'Any time',
      image: '🏛️'
    },
    {
      id: 'place3',
      name: 'Swan River Bank',
      description: 'Scenic riverside spot perfect for picnics and nature walks',
      location: 'Near Una',
      type: 'Nature',
      rating: 4.3,
      distance: '7 km',
      visitTime: '2-3 hours',
      bestTime: 'Sunset',
      image: '🌊'
    }
  ]
};

export default mockDiscoverData;
