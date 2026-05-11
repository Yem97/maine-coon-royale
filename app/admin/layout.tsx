import AdminSidebar from '@/components/admin/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-navy-light flex">
      <AdminSidebar />
      <main className="flex-1 md:ml-64 p-6 min-h-screen">{children}</main>
    </div>
  );
}
