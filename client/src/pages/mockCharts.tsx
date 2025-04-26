export  function Line() {
  return (
    <div className="relative w-full h-full flex items-end">
      <div className="absolute inset-0 flex flex-col justify-between">
        <div className="border-b border-gray-200"></div>
        <div className="border-b border-gray-200"></div>
        <div className="border-b border-gray-200"></div>
        <div className="border-b border-gray-200"></div>
        <div className="border-b border-gray-200"></div>
      </div>
      
      {/* Mock line chart - would be replaced with actual chart library */}
      <div className="relative z-10 w-full h-full flex items-end">
        <div className="w-full h-full flex items-end">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
              <div 
                className="w-full max-w-[12px] rounded-t bg-blue-500" 
                style={{ 
                  height: `${Math.floor(30 + Math.random() * 70)}%`,
                  opacity: i % 2 === 0 ? 0.8 : 1
                }}
              ></div>
              <span className="text-xs text-gray-500 mt-2">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
 