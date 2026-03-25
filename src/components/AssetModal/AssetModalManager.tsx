import { useState } from 'react';
import { Maximize2, Minimize2, X, LayoutDashboard, Bookmark } from 'lucide-react';
import { useLibraryStore } from '../../store/useLibraryStore';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';

export function AssetModalManager() {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedAsset = useLibraryStore((state) => state.selectedAsset);
  const setSelectedAsset = useLibraryStore((state) => state.setSelectedAsset);
  
  if (!selectedAsset) return null;

  const handleClose = () => {
    setIsExpanded(false);
    setSelectedAsset(null);
  };
  
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <Modal 
      isOpen={!!selectedAsset} 
      onClose={handleClose} 
      className={isExpanded ? "w-[95vw] max-w-none h-[95vh] max-h-[95vh] px-0 py-0" : "max-w-2xl px-0 py-0"} 
      hideCloseButton
    >
      <div className={`p-4 sm:p-8 pb-5 flex flex-col items-center relative text-center ${isExpanded ? "h-full" : ""}`}>
        
        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex space-x-3 text-slate-400">
           <button onClick={toggleExpand} className="hover:text-slate-600">
             {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-3.5 h-3.5" />}
           </button>
           <button onClick={handleClose} className="hover:text-slate-600"><X className="w-4 h-4" /></button>
        </div>

        <div className="w-10 h-10 shrink-0 rounded border border-[#eef0f3] bg-[#f8fafc] flex items-center justify-center mb-4 mt-2 shadow-xs">
           <LayoutDashboard className="w-5 h-5 text-slate-300 stroke-[1.5]" />
        </div>

        <div className="flex items-center space-x-2 mb-1 pl-2 shrink-0">
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight uppercase">{selectedAsset.title}</h2>
          <Badge className="bg-[#eef2ff] text-blue-500 font-bold px-1.5 py-0 text-[8px] uppercase rounded">
            {selectedAsset.type}
          </Badge>
        </div>

        <p className="text-[9px] text-slate-300 mb-6 font-medium shrink-0">Description Name of the {selectedAsset.type}</p>

        <p className="text-[11px] text-slate-800 max-w-sm mx-auto leading-relaxed mb-4 font-medium shrink-0 line-clamp-3">
          {selectedAsset.description}
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-6 shrink-0">
           {selectedAsset.tags.map(tag => (
             <span key={tag} className="px-2 py-0.5 border border-[#eef0f3] text-slate-500 text-[9px] font-bold rounded">
               #{tag}
             </span>
           ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-sm mx-auto mb-6 px-1 shrink-0">
           <div className="flex flex-col items-center">
             <span className="text-xs font-extrabold text-slate-900">{selectedAsset.usedCount}</span>
             <span className="text-[8px] text-slate-400 font-medium">Used ()</span>
           </div>
           <div className="flex flex-col items-center">
             <span className="text-xs font-extrabold text-slate-900">{selectedAsset.universalType}</span>
             <span className="text-[8px] text-slate-400 font-medium">Type</span>
           </div>
           <div className="flex flex-col items-center">
             <span className="text-xs font-extrabold text-slate-900">{selectedAsset.pagesCount}</span>
             <span className="text-[8px] text-slate-400 font-medium">Pages No. Q</span>
           </div>
           <div className="flex flex-col items-center">
             <span className="text-xs font-extrabold text-slate-900">
               {new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(new Date(selectedAsset.updatedAt))}
             </span>
             <span className="text-[8px] text-slate-400 font-medium">Last Updated</span>
           </div>
        </div>

        <div className={`w-full bg-[#f6f8fa] rounded-lg mb-6 shadow-inset shadow-xs border border-slate-50 min-h-48 ${isExpanded ? "grow" : "h-48 shrink-0"}`}></div>

        <div className="w-full text-left mb-4 shrink-0">
          <h3 className="text-[11px] font-extrabold text-slate-900 mb-3 ml-1">Business Questions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {selectedAsset.businessQuestions.map((q, idx) => (
              <div key={idx} className="bg-[#f6f8fa] rounded border border-slate-50 p-2.5">
                 <h4 className="text-[9px] font-bold text-slate-900 mb-0.5">{q.title}</h4>
                 <p className="text-[9px] text-slate-400 leading-tight font-medium line-clamp-2">{q.text}</p>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full shrink-0 bg-[#111827] text-white rounded-md py-2.5 mt-2 flex items-center justify-center space-x-1.5 text-[10px] font-semibold hover:bg-black transition-colors">
           <Bookmark className="w-3 h-3 fill-white" />
           <span>Favorite Item</span>
        </button>
      </div>
    </Modal>
  );
}
