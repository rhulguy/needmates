import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AccountShell } from '@/components/account/AccountShell';
import { mockUsers } from '@/data/mockUsers';
import { Button } from '@/components/ui/Button';
import { Check, X } from 'lucide-react';

const currentUser = mockUsers[0];

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().max(300, 'Bio must be under 300 characters'),
  locationLabel: z.string().min(2, 'Location is required'),
  postcodeArea: z.string().min(2, 'Postcode area is required'),
  skillsInput: z.string(),
  canLendInput: z.string(),
  companiesInput: z.string(),
});

type FormData = z.infer<typeof schema>;

function PillList({ items, onRemove }: { items: string[]; onRemove: (i: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {items.map(item => (
        <span key={item} className="inline-flex items-center gap-1 bg-primary/10 text-primary rounded-full px-3 py-1 text-sm font-bold">
          {item}
          <button type="button" onClick={() => onRemove(item)} className="hover:text-destructive transition-colors" data-testid={`remove-pill-${item}`}>
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
    </div>
  );
}

export default function AccountEditProfilePage() {
  const [skills, setSkills] = useState<string[]>(currentUser.skills);
  const [canLend, setCanLend] = useState<string[]>(currentUser.canLend);
  const [companies, setCompanies] = useState<string[]>(currentUser.formerCompanies);
  const [saved, setSaved] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: currentUser.name,
      bio: currentUser.bio,
      locationLabel: currentUser.locationLabel,
      postcodeArea: currentUser.postcodeArea,
      skillsInput: '',
      canLendInput: '',
      companiesInput: '',
    },
  });

  const addPills = (input: string, setter: (fn: (p: string[]) => string[]) => void) => {
    const items = input.split(',').map(s => s.trim()).filter(Boolean);
    setter(prev => [...new Set([...prev, ...items])]);
  };

  const onSubmit = (_data: FormData) => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <AccountShell>
      <div className="p-6 md:p-8 max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-black">Edit Profile</h1>
          <p className="text-muted-foreground font-semibold mt-1">Update your public profile information</p>
        </div>

        {saved && (
          <div className="bg-emerald-50 border-2 border-emerald-200 text-emerald-700 rounded-2xl px-5 py-4 flex items-center gap-2 font-bold mb-6">
            <Check className="w-5 h-5" /> Profile updated successfully
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-card border-2 border-border rounded-2xl p-6 space-y-5">
            <h2 className="font-black text-lg border-b-2 border-border pb-3">Basic Info</h2>

            <div>
              <label className="block text-sm font-bold mb-1">Display Name *</label>
              <input
                {...register('name')}
                className="w-full border-2 border-border rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary transition-colors"
                data-testid="input-name"
              />
              {errors.name && <p className="text-destructive text-xs font-bold mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Bio</label>
              <textarea
                {...register('bio')}
                className="w-full border-2 border-border rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary transition-colors min-h-[100px] resize-none"
                placeholder="Tell the community a bit about yourself..."
                data-testid="input-bio"
              />
              {errors.bio && <p className="text-destructive text-xs font-bold mt-1">{errors.bio.message}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-1">Location *</label>
                <input
                  {...register('locationLabel')}
                  className="w-full border-2 border-border rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary transition-colors"
                  data-testid="input-location"
                />
                {errors.locationLabel && <p className="text-destructive text-xs font-bold mt-1">{errors.locationLabel.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Postcode Area *</label>
                <input
                  {...register('postcodeArea')}
                  className="w-full border-2 border-border rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. RG40"
                  data-testid="input-postcode"
                />
                {errors.postcodeArea && <p className="text-destructive text-xs font-bold mt-1">{errors.postcodeArea.message}</p>}
              </div>
            </div>
          </div>

          <div className="bg-card border-2 border-border rounded-2xl p-6 space-y-5">
            <h2 className="font-black text-lg border-b-2 border-border pb-3">Skills & Abilities</h2>

            <div>
              <label className="block text-sm font-bold mb-1">Skills (comma-separated to add)</label>
              <div className="flex gap-2">
                <input
                  {...register('skillsInput')}
                  className="flex-1 border-2 border-border rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. Tutoring, Baking"
                  data-testid="input-skills"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl shrink-0"
                  onClick={() => {
                    const el = document.querySelector('[data-testid="input-skills"]') as HTMLInputElement;
                    addPills(el?.value ?? '', setSkills);
                    if (el) el.value = '';
                  }}
                  data-testid="btn-add-skills"
                >Add</Button>
              </div>
              <PillList items={skills} onRemove={s => setSkills(prev => prev.filter(x => x !== s))} />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Things I can lend</label>
              <div className="flex gap-2">
                <input
                  {...register('canLendInput')}
                  className="flex-1 border-2 border-border rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. Carpet cleaner, Drill"
                  data-testid="input-can-lend"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl shrink-0"
                  onClick={() => {
                    const el = document.querySelector('[data-testid="input-can-lend"]') as HTMLInputElement;
                    addPills(el?.value ?? '', setCanLend);
                    if (el) el.value = '';
                  }}
                  data-testid="btn-add-lend"
                >Add</Button>
              </div>
              <PillList items={canLend} onRemove={s => setCanLend(prev => prev.filter(x => x !== s))} />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Former companies / communities</label>
              <div className="flex gap-2">
                <input
                  {...register('companiesInput')}
                  className="flex-1 border-2 border-border rounded-xl px-4 py-3 font-medium focus:outline-none focus:border-primary transition-colors"
                  placeholder="e.g. Vodafone, NHS"
                  data-testid="input-companies"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl shrink-0"
                  onClick={() => {
                    const el = document.querySelector('[data-testid="input-companies"]') as HTMLInputElement;
                    addPills(el?.value ?? '', setCompanies);
                    if (el) el.value = '';
                  }}
                  data-testid="btn-add-companies"
                >Add</Button>
              </div>
              <PillList items={companies} onRemove={s => setCompanies(prev => prev.filter(x => x !== s))} />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full rounded-2xl" data-testid="btn-save-profile">
            Save Profile
          </Button>
        </form>
      </div>
    </AccountShell>
  );
}
