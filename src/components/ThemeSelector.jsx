import React from 'react';
import { Sparkles } from 'lucide-react';

const ThemeSelector = ({ weekendThemesState, selectedTheme, setSelectedTheme, setShowCustomModal }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-black">
      <Sparkles className="w-6 h-6 text-purple-500" />Choose Your Weekend Vibe
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Object.entries(weekendThemesState).map(([key, theme]) => {
        const Icon = theme.icon;
        return (
          <button key={key} onClick={() => setSelectedTheme(key)}
            className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${selectedTheme===key ? `bg-gradient-to-r ${theme.color} text-white shadow-lg` : "bg-white hover:shadow-md border-2 border-gray-200 text-black"}`}
          >
            <Icon className="w-8 h-8 mx-auto mb-2" />
            <div className="font-semibold text-black">{theme.name}</div>
            <div className="text-sm opacity-75 text-black">{theme.description}</div>
          </button>
        );
      })}
      <button onClick={() => setShowCustomModal(true)}
        className="p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-500 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-gray-700 hover:text-purple-500"
      >
        <span className="text-3xl mb-2">➕</span>
        <div className="font-semibold">Custom</div>
        <div className="text-sm opacity-70 text-center">Create your own vibe</div>
      </button>
    </div>
  </div>
);

export default ThemeSelector;
