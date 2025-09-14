import React from 'react';
import { X, Search, MapPin, Star, Clock, Utensils, ExternalLink } from 'lucide-react';

const DiscoverModal = ({
  themes, selectedTheme,
  discoverType, setDiscoverType,
  searchQuery, setSearchQuery,
  isLoading, discoveredItems,
  setShowDiscoverModal, addDiscoveredActivity, openInMaps,
  holidayDays
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${themes[selectedTheme].color} text-white p-6`}>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold flex items-center">
              <Search className="w-6 h-6 mr-2" />
              Discover Local Activities
            </h3>
            <button 
              onClick={() => setShowDiscoverModal(false)}
              className="p-2 bg-black text-white hover:bg-opacity-20 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-4">
            {[
              { key: 'events', label: 'Events', icon: Clock },
              { key: 'restaurants', label: 'Restaurants', icon: Utensils },
              { key: 'places', label: 'Places', icon: MapPin }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setDiscoverType(key)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  discoverType === key ? 'bg-white text-gray-800' : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${discoverType}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Results */}
        <div className="p-6 overflow-y-auto max-h-96">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-600">
                Discovering amazing {discoverType} near you...
              </p>
            </div>
          ) : discoveredItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <p>No {discoverType} found. Try adjusting your search!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {discoveredItems.map((item) => (
                <div key={item.id} className="border rounded-lg p-4 hover:shadow-md">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg flex items-center">
                        <span className="text-2xl mr-2">{item.image}</span>
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          {item.rating}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {item.distance}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => openInMaps(item.location)}
                      className="p-2 text-gray-400 hover:text-blue-600"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-gray-700 text-sm mb-3">{item.description}</p>

                  {/* ✅ Dynamic day buttons using index */}
                  <div className="flex flex-wrap gap-2">
                    {holidayDays.map((day, index) => (
                      <button
                        key={day.dayName}
                        onClick={() => {
                          addDiscoveredActivity(item, index);
                          setShowDiscoverModal(false);
                        }}
                        className="flex-1 px-3 py-2 bg-blue-500 text-white rounded text-sm"
                      >
                        Add to {day.dayName}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DiscoverModal;
