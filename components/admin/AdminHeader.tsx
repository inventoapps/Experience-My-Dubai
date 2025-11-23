"use client"
export default function AdminHeader() {
  
  const handleLogOut =  ()=>{
     localStorage.removeItem('isAdmin');
  }
  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between ">
      <h2 className="text-sm font-semibold">Admin Panel</h2>
      <button onClick={handleLogOut} className="text-xs border rounded px-3 py-1">Logout</button>
    </header>
  );
}
