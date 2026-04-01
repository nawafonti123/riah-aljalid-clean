import type { Metadata } from 'next';
import MaintenanceView from '../../../components/maintenance/MaintenanceView';
export const metadata: Metadata = {
  title: 'الموقع تحت الصيانة',
  description: 'الموقع تحت الصيانة حاليًا، سنعود قريبًا.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MaintenancePage() {
  return <MaintenanceView />;
}