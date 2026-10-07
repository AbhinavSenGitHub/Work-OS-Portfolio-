import { featureStatusLabel, type FeatureStatus } from "@/lib/features";

export function StatusTag({ status, className = "" }: { status: FeatureStatus; className?: string }) {
  return (
    <span className={`pill-tag ${className}`} data-tone={status === "available" ? "ok" : "soon"}>
      {featureStatusLabel[status]}
    </span>
  );
}
