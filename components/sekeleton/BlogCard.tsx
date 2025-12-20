export const BlogCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      
      {/* Image */}
      <div className="h-56 w-full bg-gray-200 animate-pulse" />

      {/* Content */}
      <div className="p-5 space-y-4">
        
        {/* Title */}
        <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-5 w-5/6 bg-gray-200 rounded animate-pulse" />

        {/* Excerpt */}
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse" />

        {/* Published date */}
        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse mt-4" />
      </div>
    </div>
  );
};
