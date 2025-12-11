interface PreviewCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function PreviewCard({ title, children, className = '' }: PreviewCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 mb-4 ${className}`}>
      <h3 className="text-xl font-semibold mb-4 border-b pb-2">{title}</h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}
