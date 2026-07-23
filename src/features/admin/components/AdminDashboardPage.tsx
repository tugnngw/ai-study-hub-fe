// src/features/admin/components/AdminDashboardPage.tsx
import React from "react";
import {
  Users,
  FileStack,
  Download,
  UserPlus,
  Upload,
  Flag,
  Trash,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useAdminStats, useAdminActivity } from "../hooks";
import type { ActivityType } from "../types/admin.types";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

const activityIcon: Record<ActivityType, React.ReactNode> = {
  USER_REGISTER: <UserPlus className="h-4 w-4" />,
  USER_UPGRADE: <UserPlus className="h-4 w-4" />,
  DOCUMENT_UPLOAD: <Upload className="h-4 w-4" />,
  DOCUMENT_DELETE: <Trash className="h-4 w-4" />,
  DOCUMENT_DOWNLOAD: <Download className="h-4 w-4" />,
  DOCUMENT_RESTORE: <Upload className="h-4 w-4" />,
  PAYMENT_SUCCESS: <Flag className="h-4 w-4" />,
  PAYMENT_FAILED: <Flag className="h-4 w-4" />,
};

const activityTone: Record<ActivityType, string> = {
  USER_REGISTER: "bg-primary/10 text-primary",
  USER_UPGRADE: "bg-primary/10 text-primary",
  DOCUMENT_UPLOAD: "bg-emerald-500/10 text-emerald-600",
  DOCUMENT_DELETE: "bg-destructive/10 text-destructive",
  DOCUMENT_DOWNLOAD: "bg-amber-500/10 text-amber-600",
  DOCUMENT_RESTORE: "bg-emerald-500/10 text-emerald-600",
  PAYMENT_SUCCESS: "bg-emerald-500/10 text-emerald-600",
  PAYMENT_FAILED: "bg-destructive/10 text-destructive",
};

function calculateTrend(lastWeek: number, prevWeek: number): number {
  if (prevWeek === 0) return lastWeek > 0 ? 100 : 0;
  return Math.round(((lastWeek - prevWeek) / prevWeek) * 100);
}

function StatCard({
  label,
  value,
  trend,
  icon,
  tone,
}: {
  label: string;
  value: string;
  trend?: number;
  icon: React.ReactNode;
  tone: string;
}) {
  const up = (trend ?? 0) >= 0;
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "h-11 w-11 rounded-xl flex items-center justify-center",
              tone,
            )}
          >
            {icon}
          </div>
          {trend !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full",
                up
                  ? "bg-emerald-500/10 text-emerald-600"
                  : "bg-destructive/10 text-destructive",
              )}
            >
              {up ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              {Math.abs(trend)}%
            </span>
          )}
        </div>
        <p className="text-muted-foreground text-sm font-medium mt-4">
          {label}
        </p>
        <h3 className="text-3xl font-bold tracking-tight mt-1 font-display">
          {value}
        </h3>
      </CardContent>
    </Card>
  );
}

export const AdminDashboardPage: React.FC = () => {
  const { data: stats, isLoading: statsLoading, error: statsError } = useAdminStats();
  const { data: activity = [], isLoading: activityLoading, error: activityError } = useAdminActivity();

  if (statsError || activityError) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-destructive">Không thể tải dữ liệu dashboard</p>
      </div>
    );
  }

  const usersTrend = stats ? calculateTrend(stats.usersLastWeek, stats.usersPrevWeek) : undefined;
  const docsTrend = stats ? calculateTrend(stats.docsLastWeek, stats.docsPrevWeek) : undefined;
  const downloadsTrend = stats ? calculateTrend(stats.downloadsLastWeek, stats.downloadsPrevWeek) : undefined;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-display">
          Dashboard
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Tổng quan hoạt động hệ thống
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Tổng Users"
          value={stats?.totalUsers.toLocaleString("vi-VN") ?? "—"}
          trend={usersTrend}
          icon={<Users className="h-5 w-5" />}
          tone="bg-primary/10 text-primary"
        />
        <StatCard
          label="Tổng Tài liệu"
          value={stats?.totalDocs.toLocaleString("vi-VN") ?? "—"}
          trend={docsTrend}
          icon={<FileStack className="h-5 w-5" />}
          tone="bg-emerald-500/10 text-emerald-600"
        />
        <StatCard
          label="Download"
          value={stats?.totalDownloads.toLocaleString("vi-VN") ?? "—"}
          trend={downloadsTrend}
          icon={<Download className="h-5 w-5" />}
          tone="bg-amber-500/10 text-amber-600"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Hoạt động gần đây</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {activity?.map((item, i) => ( 
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-4 px-6 py-3.5 hover:bg-muted/40 transition-colors",
                i !== activity.length - 1 && "border-b border-border",
              )}
            >
              <div
                className={cn(
                  "h-9 w-9 rounded-lg flex items-center justify-center shrink-0",
                  activityTone[item.type],
                )}
              >
                {activityIcon[item.type]}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-muted">
                  {item.actor.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm truncate">{item.title}</p>
                <p className="text-muted-foreground text-xs truncate">
                  {item.actor}
                </p>
              </div>
              <span className="text-muted-foreground text-xs shrink-0">
                {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: vi })}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
