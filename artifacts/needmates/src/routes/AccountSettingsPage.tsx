import { useState } from 'react';
import { AccountShell } from '@/components/account/AccountShell';
import { mockUsers } from '@/data/mockUsers';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Check, ShieldCheck, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const currentUser = mockUsers[0];

function Toggle({ checked, onChange, testId }: { checked: boolean; onChange: (v: boolean) => void; testId?: string }) {
  return (
    <button
      data-testid={testId}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative w-12 h-6 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
        checked ? 'bg-primary' : 'bg-muted-foreground/30'
      )}
    >
      <span className={cn(
        'absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform',
        checked ? 'translate-x-6' : 'translate-x-0.5'
      )} />
    </button>
  );
}

export default function AccountSettingsPage() {
  const [privacy, setPrivacy] = useState({
    showProfile: true,
    showPostcode: true,
    allowBusinessContact: false,
    showActivity: true,
  });

  const [prefs, setPrefs] = useState({
    defaultRadius: '5',
    defaultVisibility: 'public',
    allowJoining: true,
  });

  const [idVerifPending, setIdVerifPending] = useState(false);
  const [addrVerifPending, setAddrVerifPending] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const saveSettings = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AccountShell>
      <div className="p-6 md:p-8 max-w-2xl space-y-6">
        <div className="mb-2">
          <h1 className="text-3xl font-black">Settings</h1>
          <p className="text-muted-foreground font-semibold mt-1">Manage your account preferences</p>
        </div>

        {saved && (
          <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-700 rounded-2xl px-5 py-4 flex items-center gap-2 font-bold">
            <Check className="w-5 h-5" /> Settings saved
          </div>
        )}

        <div className="bg-card border-2 border-border rounded-2xl p-6 space-y-5">
          <h2 className="font-black text-lg border-b-2 border-border pb-3">Privacy</h2>
          {[
            { key: 'showProfile' as const, label: 'Show my profile to other members', desc: 'Members can view your profile and trust signals' },
            { key: 'showPostcode' as const, label: 'Show my postcode area on my profile', desc: 'Your postcode area is visible on your public profile' },
            { key: 'allowBusinessContact' as const, label: 'Allow businesses to contact me', desc: 'Local businesses can send you direct messages' },
            { key: 'showActivity' as const, label: 'Show my activity on the feed', desc: 'Your interactions appear in community activity' },
          ].map(item => (
            <div key={item.key} className="flex items-start justify-between gap-4">
              <div>
                <div className="font-bold text-sm">{item.label}</div>
                <div className="text-xs text-muted-foreground font-semibold mt-0.5">{item.desc}</div>
              </div>
              <Toggle
                checked={privacy[item.key]}
                onChange={v => setPrivacy(p => ({ ...p, [item.key]: v }))}
                testId={`toggle-${item.key}`}
              />
            </div>
          ))}
        </div>

        <div className="bg-card border-2 border-border rounded-2xl p-6 space-y-5">
          <h2 className="font-black text-lg border-b-2 border-border pb-3">Need Preferences</h2>

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-bold text-sm">Default radius for new needs</div>
              <div className="text-xs text-muted-foreground font-semibold mt-0.5">How far your needs show up by default</div>
            </div>
            <select
              value={prefs.defaultRadius}
              onChange={e => setPrefs(p => ({ ...p, defaultRadius: e.target.value }))}
              className="border-2 border-border rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-primary"
              data-testid="select-radius"
            >
              {['1', '2', '5', '10', '20'].map(v => (
                <option key={v} value={v}>{v} km</option>
              ))}
            </select>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-bold text-sm">Default need visibility</div>
              <div className="text-xs text-muted-foreground font-semibold mt-0.5">Who can see your needs by default</div>
            </div>
            <select
              value={prefs.defaultVisibility}
              onChange={e => setPrefs(p => ({ ...p, defaultVisibility: e.target.value }))}
              className="border-2 border-border rounded-xl px-3 py-2 text-sm font-bold focus:outline-none focus:border-primary"
              data-testid="select-visibility"
            >
              <option value="public">Public</option>
              <option value="members">Members only</option>
              <option value="area">Area only</option>
            </select>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-bold text-sm">Allow joining on my group needs by default</div>
              <div className="text-xs text-muted-foreground font-semibold mt-0.5">Others can join your group needs automatically</div>
            </div>
            <Toggle
              checked={prefs.allowJoining}
              onChange={v => setPrefs(p => ({ ...p, allowJoining: v }))}
              testId="toggle-allow-joining"
            />
          </div>
        </div>

        <div className="bg-card border-2 border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-black text-lg border-b-2 border-border pb-3 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" /> Trust & Verification
          </h2>
          <div className="space-y-3 mb-4">
            {currentUser.trustSignals.map(signal => (
              <div key={signal} className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {signal}
                <Badge variant="success" className="ml-auto text-xs">Verified</Badge>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {!idVerifPending ? (
              <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setIdVerifPending(true)} data-testid="btn-request-id-verification">
                Request ID Verification
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-sm font-bold text-orange-600 bg-orange-50 border-2 border-orange-200 rounded-xl px-4 py-2">
                <AlertTriangle className="w-4 h-4" /> ID Verification Pending review
              </div>
            )}
            {!addrVerifPending ? (
              <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setAddrVerifPending(true)} data-testid="btn-request-address-verification">
                Request Address Verification
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-sm font-bold text-orange-600 bg-orange-50 border-2 border-orange-200 rounded-xl px-4 py-2">
                <AlertTriangle className="w-4 h-4" /> Address Verification Pending review
              </div>
            )}
          </div>
        </div>

        <Button onClick={saveSettings} size="lg" className="w-full rounded-2xl" data-testid="btn-save-settings">
          Save Settings
        </Button>

        <div className="bg-card border-2 border-red-200 rounded-2xl p-6 space-y-4">
          <h2 className="font-black text-lg text-destructive border-b-2 border-red-100 pb-3">Danger Zone</h2>

          {!showDeactivateConfirm ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm">Deactivate Account</div>
                <div className="text-xs text-muted-foreground font-semibold">Temporarily hide your profile and needs</div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-red-200 text-red-500 hover:bg-red-50"
                onClick={() => setShowDeactivateConfirm(true)}
                data-testid="btn-deactivate"
              >
                Deactivate
              </Button>
            </div>
          ) : (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <p className="text-sm font-bold text-red-700 mb-3">Are you sure you want to deactivate?</p>
              <div className="flex gap-2">
                <Button size="sm" variant="destructive" className="rounded-xl" onClick={() => setShowDeactivateConfirm(false)} data-testid="btn-confirm-deactivate">Confirm</Button>
                <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setShowDeactivateConfirm(false)}>Cancel</Button>
              </div>
            </div>
          )}

          {!showDeleteConfirm ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm">Delete Account</div>
                <div className="text-xs text-muted-foreground font-semibold">Permanently remove all your data</div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                className="rounded-xl"
                onClick={() => setShowDeleteConfirm(true)}
                data-testid="btn-delete-account"
              >
                Delete Account
              </Button>
            </div>
          ) : (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <p className="text-sm font-bold text-red-700 mb-3">This is permanent. All your data will be erased.</p>
              <div className="flex gap-2">
                <Button size="sm" variant="destructive" className="rounded-xl" onClick={() => setShowDeleteConfirm(false)} data-testid="btn-confirm-delete">Delete Everything</Button>
                <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AccountShell>
  );
}
