export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className="px-4 py-4 border-b">
        <h1 className="text-base font-bold">ExperienceMyDubai Admin</h1>
        <p className="text-[11px] text-gray-500">Manage tours, blogs & enquiries</p>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        <p className="px-2 text-[10px] uppercase tracking-wide text-gray-500 mb-1">
          General
        </p>
        <a href="/admin/dashboard" className="block px-3 py-2 rounded hover:bg-gray-100">Dashboard</a>

        <p className="px-2 text-[10px] uppercase tracking-wide text-gray-500 mt-4 mb-1">
          Tour Packages
        </p>

        <a href="/admin/package/add" className="block px-3 py-2 rounded  ">
          Add Tour Package
        </a>
        <a href="/admin/package/view" className="block px-3 py-2 rounded hover:bg-gray-100">
          View Tour Packages
        </a>
        <a href="/admin/package/edit" className="block px-3 py-2 rounded hover:bg-gray-100">
          Edit Tour Packages
        </a>


        <p className="px-2 text-[10px] uppercase tracking-wide text-gray-500 mt-4 mb-1">
          Blog
        </p>

        <a href="/admin/blogs/add" className="block px-3 py-2 rounded hover:bg-gray-100">Add Blog Article</a>
        <a href="/admin/blogs/view" className="block px-3 py-2 rounded hover:bg-gray-100">View Blog Articles</a>
        <a href="/admin/blogs/edit" className="block px-3 py-2 rounded hover:bg-gray-100">Edit Blog Articles</a>

        <p className="px-2 text-[10px] uppercase tracking-wide text-gray-500 mt-4 mb-1">
          Activity
        </p>

        <a href="/admin/activity/add" className="block px-3 py-2 rounded hover:bg-gray-100">Add Activity Package</a>
        <a href="/admin/activity/view" className="block px-3 py-2 rounded hover:bg-gray-100">View Activity Package</a>
        <a href="/admin/activity/edit" className="block px-3 py-2 rounded hover:bg-gray-100">Edit Activity Package</a>



        <p className="px-2 text-[10px] uppercase tracking-wide text-gray-500 mt-4 mb-1">
          Enquiries
        </p>



        <a href="/admin/enquiry/view" className="block px-3 py-2 rounded hover:bg-gray-100">View Enquiries</a>
      </nav>

      <div className="px-4 py-3 border-t text-xs text-gray-500">
        Logged in as Admin
      </div>
    </aside>
  );
}
