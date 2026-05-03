import { useState } from 'react';
import { AdminShell } from '@/components/admin/AdminShell';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatTimeAgo, cn } from '@/lib/utils';
import { Flag, CheckCircle, X, AlertTriangle, ShieldAlert } from 'lucide-react';

type ReportStatus = 'open' | 'resolved';
type ReportType = 'content' | 'message' | 'business' | 'user';

interface Report {
  id: string;
  type: ReportType;
  description: string;
  targetLabel: string;
  reportedBy: string;
  createdAt: string;
  status: ReportStatus;
}

const initialReports: Report[] = [
  {
    id: 'rep-1',
    type: 'content',
    description: 'Spam content — repeated promotional links in need description',
    targetLabel: 'Need: "I can help local small businesses improve their website"',
    reportedBy: 'Priya Patel',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'open',
  },
  {
    id: 'rep-2',
    type: 'message',
    description: 'Inappropriate message — aggressive and threatening language',
    targetLabel: 'Response r-2 to carpet cleaner need',
    reportedBy: 'Emma Richardson',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: 'open',
  },
  {
    id: 'rep-3',
    type: 'business',
    description: 'Fake business listing — no verifiable trading address',
    targetLabel: 'Business: "Achieve Tutoring Centre"',
    reportedBy: 'Marcus Webb',
    createdAt: new Date(Date.now() - 18000000).toISOString(),
    status: 'open',
  },
  {
    id: 'rep-4',
    type: 'user',
    description: 'Suspicious user behaviour — offering services outside platform without completing verification',
    targetLabel: 'User: Raj Sharma',
    reportedBy: 'Sarah Chen',
    createdAt: new Date(Date.now() - 10800000).toISOString(),
    status: 'open',
  },
];

const typeConfig: Record<ReportType, { label: string; variant: 'warning' | 'destructive' | 'info' | 'purple'; icon: typeof Flag }> = {
  content: { label: 'Content', variant: 'warning', icon: Flag },
  message: { label: 'Message', variant: 'destructive', icon: AlertTriangle },
  business: { label: 'Business', variant: 'info', icon: ShieldAlert },
  user: { label: 'User', variant: 'purple', icon: ShieldAlert },
};

type ActionFilter = 'all' | 'open' | 'resolved';

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [filter, setFilter] = useState<ActionFilter>('all');
  const [actionMenuId, setActionMenuId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const resolve = (id: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'resolved' } : r));
    showToast('Report marked as resolved.');
  };

  const dismiss = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    showToast('Report dismissed.');
  };

  const takeAction = (id: string, action: string) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status: 'resolved' } : r));
    setActionMenuId(null);
    showToast(`Action taken: ${action}`);
  };

  const filtered = reports.filter(r => filter === 'all' || r.status === filter);
  const openCount = reports.filter(r => r.status === 'open').length;

  return (
    <AdminShell pageTitle="Reports & Flags">
      <div className="space-y-5 max-w-3xl">
        {toast && (
          <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-700 rounded-2xl px-5 py-3 flex items-center gap-2 font-bold">
            <CheckCircle className="w-4 h-4" /> {toast}
          </div>
        )}

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex flex-wrap items-center gap-3 text-sm font-bold">
            <span className="text-destructive">{openCount} open</span>
            <span className="text-muted-foreground">{reports.length - openCount} resolved</span>
          </div>
          <div className="flex gap-1 bg-muted border-2 border-border rounded-xl p-1">
            {(['all', 'open', 'resolved'] as ActionFilter[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'px-4 py-1.5 rounded-lg text-sm font-bold transition-all capitalize',
                  filter === f ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                )}
                data-testid={`filter-${f}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed border-border rounded-2xl">
            <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <p className="text-lg font-black">All clear!</p>
            <p className="text-muted-foreground font-semibold text-sm mt-1">No reports to review.</p>
          </div>
        )}

        <div className="space-y-4">
          {filtered.map(report => {
            const cfg = typeConfig[report.type];
            return (
              <div
                key={report.id}
                className={cn(
                  'bg-card border-2 rounded-2xl p-5',
                  report.status === 'open' ? 'border-orange-200' : 'border-border opacity-60'
                )}
                data-testid={`report-card-${report.id}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={cfg.variant as 'warning' | 'destructive' | 'info' | 'purple'}>{cfg.label}</Badge>
                    <Badge variant={report.status === 'open' ? 'warning' : 'success'} className="capitalize">
                      {report.status}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground font-semibold">{formatTimeAgo(report.createdAt)}</span>
                </div>

                <p className="font-bold mb-1">{report.description}</p>
                <p className="text-sm text-primary font-semibold mb-1">{report.targetLabel}</p>
                <p className="text-xs text-muted-foreground font-semibold mb-4">Reported by {report.reportedBy}</p>

                {report.status === 'open' && (
                  <div className="flex flex-wrap gap-2 relative">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl border-emerald-200 text-emerald-600 hover:bg-emerald-50 gap-1"
                      onClick={() => resolve(report.id)}
                      data-testid={`btn-resolve-${report.id}`}
                    >
                      <CheckCircle className="w-3 h-3" /> Resolve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl gap-1"
                      onClick={() => dismiss(report.id)}
                      data-testid={`btn-dismiss-${report.id}`}
                    >
                      <X className="w-3 h-3" /> Dismiss
                    </Button>
                    <div className="relative">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl border-orange-200 text-orange-600 hover:bg-orange-50 gap-1"
                        onClick={() => setActionMenuId(prev => prev === report.id ? null : report.id)}
                        data-testid={`btn-take-action-${report.id}`}
                      >
                        <Flag className="w-3 h-3" /> Take Action
                      </Button>
                      {actionMenuId === report.id && (
                        <div className="absolute top-full left-0 mt-1 bg-card border-2 border-border rounded-xl shadow-lg z-10 min-w-[180px] overflow-hidden">
                          {['Warn User', 'Remove Content', 'Suspend User'].map(action => (
                            <button
                              key={action}
                              className="w-full text-left px-4 py-2.5 text-sm font-bold hover:bg-muted transition-colors"
                              onClick={() => takeAction(report.id, action)}
                              data-testid={`action-${action.toLowerCase().replace(/\s+/g, '-')}-${report.id}`}
                            >
                              {action}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </AdminShell>
  );
}
