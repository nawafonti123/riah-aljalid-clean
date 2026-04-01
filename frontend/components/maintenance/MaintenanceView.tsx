'use client';

type MaintenanceViewProps = {
  message?: string;
};

export default function MaintenanceView({
  message = 'نعمل حاليًا على تحسين الموقع وسنعود إليكم قريبًا.',
}: MaintenanceViewProps) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-6 text-center">
      <div className="max-w-2xl rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          الموقع تحت الصيانة
        </h1>

        <p className="mt-4 text-base sm:text-lg leading-8 text-slate-600">
          {message}
        </p>
      </div>
    </main>
  );
}