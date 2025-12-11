// src/components/PreviewCard.tsx
"use client";

interface PreviewCardProps {
  title: string;
  children: React.ReactNode;
}

export default function PreviewCard({ title, children }: PreviewCardProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <div>{children}</div>
    </div>
  );
}
