import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminDashboardPage() {
  return (
    <section aria-labelledby="dashboard-heading">

      <AdminHeader/>
      <h1 id="dashboard-heading" className="text-3xl font-bold mb-3">
        Dashboard
      </h1>

      <p className="text-muted-foreground">
        Welcome to the admin panel. Choose an option from the sidebar.
      </p>
    </section>
  );
}
