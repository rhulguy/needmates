import { useState } from 'react';
import { AdminShell } from '@/components/admin/AdminShell';
import { mockCategories } from '@/data/mockCategories';
import { Category } from '@/types';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Plus, X, Check, Pencil } from 'lucide-react';

const colourOptions = [
  { label: 'Orange', value: 'bg-orange-500' },
  { label: 'Blue', value: 'bg-blue-500' },
  { label: 'Purple', value: 'bg-purple-500' },
  { label: 'Pink', value: 'bg-pink-500' },
  { label: 'Emerald', value: 'bg-emerald-500' },
  { label: 'Red', value: 'bg-red-500' },
  { label: 'Yellow', value: 'bg-yellow-500' },
  { label: 'Teal', value: 'bg-teal-500' },
  { label: 'Violet', value: 'bg-violet-500' },
  { label: 'Cyan', value: 'bg-cyan-500' },
];

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ label: '', colour: '' });
  const [confirmRemove, setConfirmRemove] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ label: '', colour: 'bg-primary' });

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditForm({ label: cat.label, colour: cat.colour });
  };

  const saveEdit = (id: string) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, label: editForm.label, colour: editForm.colour } : c));
    setEditingId(null);
  };

  const removeCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    setConfirmRemove(null);
  };

  const addCategory = () => {
    if (!addForm.label.trim()) return;
    setCategories(prev => [...prev, {
      id: `cat-new-${Date.now()}`,
      label: addForm.label,
      icon: 'Tag',
      colour: addForm.colour,
      count: 0,
    }]);
    setAddForm({ label: '', colour: 'bg-primary' });
    setShowAdd(false);
  };

  return (
    <AdminShell pageTitle="Categories">
      <div className="space-y-5 max-w-2xl">
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground font-semibold">{categories.length} categories</p>
          <Button className="rounded-full gap-2" onClick={() => setShowAdd(v => !v)} data-testid="btn-add-category">
            <Plus className="w-4 h-4" /> Add Category
          </Button>
        </div>

        {showAdd && (
          <div className="bg-card border-2 border-border rounded-2xl p-5">
            <h3 className="font-black text-lg mb-4">Add New Category</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold mb-1">Label *</label>
                <input
                  className="w-full border-2 border-border rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary"
                  value={addForm.label}
                  onChange={e => setAddForm(p => ({ ...p, label: e.target.value }))}
                  placeholder="e.g. Finance & Legal"
                  data-testid="input-category-label"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-2">Colour</label>
                <div className="flex flex-wrap gap-2">
                  {colourOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setAddForm(p => ({ ...p, colour: opt.value }))}
                      className={cn('w-8 h-8 rounded-lg transition-all', opt.value, addForm.colour === opt.value && 'ring-2 ring-offset-2 ring-foreground scale-110')}
                      title={opt.label}
                      data-testid={`colour-option-${opt.label.toLowerCase()}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="rounded-xl" onClick={addCategory} data-testid="btn-submit-category">Add</Button>
                <Button variant="outline" className="rounded-xl" onClick={() => setShowAdd(false)}><X className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {categories.map(cat => (
            <div key={cat.id} className="bg-card border-2 border-border rounded-2xl p-5" data-testid={`category-card-${cat.id}`}>
              {editingId === cat.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">Label</label>
                    <input
                      className="w-full border-2 border-border rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus:border-primary"
                      value={editForm.label}
                      onChange={e => setEditForm(p => ({ ...p, label: e.target.value }))}
                      data-testid="input-edit-label"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2">Colour</label>
                    <div className="flex flex-wrap gap-2">
                      {colourOptions.map(opt => (
                        <button
                          key={opt.value}
                          onClick={() => setEditForm(p => ({ ...p, colour: opt.value }))}
                          className={cn('w-8 h-8 rounded-lg transition-all', opt.value, editForm.colour === opt.value && 'ring-2 ring-offset-2 ring-foreground scale-110')}
                          title={opt.label}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="rounded-xl gap-1" onClick={() => saveEdit(cat.id)} data-testid={`btn-save-edit-${cat.id}`}>
                      <Check className="w-3 h-3" /> Save
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm', cat.colour)}>
                    {cat.label.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-base">{cat.label}</div>
                    <div className="text-sm text-muted-foreground font-semibold">{cat.count} needs</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" variant="outline" className="rounded-xl gap-1" onClick={() => startEdit(cat)} data-testid={`btn-edit-${cat.id}`}>
                      <Pencil className="w-3 h-3" /> Edit
                    </Button>
                    {confirmRemove === cat.id ? (
                      <div className="flex gap-1">
                        <Button size="sm" variant="destructive" className="rounded-xl" onClick={() => removeCategory(cat.id)} data-testid={`btn-confirm-remove-cat-${cat.id}`}>Delete</Button>
                        <Button size="sm" variant="outline" className="rounded-xl" onClick={() => setConfirmRemove(null)}>Cancel</Button>
                      </div>
                    ) : (
                      <Button size="sm" variant="outline" className="rounded-xl border-red-200 text-red-500 hover:bg-red-50" onClick={() => setConfirmRemove(cat.id)} data-testid={`btn-remove-cat-${cat.id}`}>
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}
