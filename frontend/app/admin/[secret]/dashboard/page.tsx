// frontend/app/admin/[secret]/dashboard/page.tsx (إذا كان هناك أي تداخل، تأكد من أنه لا يحتوي على عناوين زائدة)
'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaSnowflake } from 'react-icons/fa';
import { projectsApi, servicesApi, usersApi } from '@/lib/api';
import { toast } from 'react-hot-toast';

interface StatCardProps {
  title: string;
  value: number | string;
  loading?: boolean;
}

function StatCard({ title, value, loading }: StatCardProps) {
  return (
    <div className="glass-card p-6 rounded-xl border border-white/10 bg-gray-800">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      {loading ? (
        <div className="h-8 w-16 bg-gray-700 animate-pulse rounded mt-2"></div>
      ) : (
        <p className="text-4xl font-bold text-white mt-2">{value}</p>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const params = useParams();
  const secret = params.secret as string;
  const { data: session, status } = useSession();
  const [projectsCount, setProjectsCount] = useState<number>(0);
  const [servicesCount, setServicesCount] = useState<number>(0);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  if (status === 'loading') return <p className="text-center text-white py-10">جاري التحميل...</p>;
  if (!session) redirect(`/admin/${secret}/login`);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [projects, services, users] = await Promise.all([
          projectsApi.getAll(),
          servicesApi.getAll(),
          usersApi.getAll(),
        ]);
        setProjectsCount(projects.length);
        setServicesCount(services.length);
        setUsersCount(users.length);
      } catch (error) {
        toast.error('فشل في تحميل الإحصائيات');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <FaSnowflake className="text-[#00c6ff]" />
        لوحة التحكم
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="عدد المشاريع" value={projectsCount} loading={loading} />
        <StatCard title="عدد الخدمات" value={servicesCount} loading={loading} />
        <StatCard title="عدد المستخدمين" value={usersCount} loading={loading} />
      </div>
    </motion.div>
  );
}