import React from "react";
function Sidebar({originCLick,destinationClick,findClick}) {
  return (
    <div className="flex flex-col w-[30%]">
      <button onClick={originCLick} className="px-6 py-2 min-w-[120px] text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
        Origin
      </button>
      <button onClick={destinationClick} className="px-6 py-2 min-w-[120px] text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
        Destination
      </button>
      <button onClick={findClick} className="px-6 py-2 min-w-[120px] text-center text-violet-600 border border-violet-600 rounded hover:bg-violet-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring">
        Find
      </button>
    </div>
  );
}

export default Sidebar;
