import React from 'react';
import { Search, Share2 } from 'lucide-react';

const ActionButtons = ({ selectedTheme, weekendThemes, setShowDiscoverModal, setShowExportModal }) => {
  const themeColor = weekendThemes?.[selectedTheme]?.color || 'from-gray-400 to-gray-500';

  return (
    <div className="flex justify-end gap-2 mb-4">
      <button 
        onClick={() => setShowDiscoverModal(true)}
        className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${themeColor} text-white rounded-lg text-sm hover:shadow-lg transition-all`}
      >
        <Search className="w-4 h-4"/>Discover
      </button>

      <button 
        onClick={() => setShowExportModal(true)}
        className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${themeColor} text-white rounded-lg hover:shadow-lg transition-all`}
      >
        <Share2 className="w-4 h-4"/>Export Plan
      </button>
    </div>
  );
};

export default ActionButtons;
