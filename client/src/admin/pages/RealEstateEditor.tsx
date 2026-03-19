import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useContent } from '../../hooks/useContent';
import { contentService } from '../../services/api';
import { RealEstateContent } from '../../types/content';
import EditorWrapper, { TextField, SectionCard } from '../components/EditorWrapper';
import ImageUpload from '../components/ImageUpload';

export default function RealEstateEditor() {
  const { data } = useContent<RealEstateContent>('realestate');
  const [form, setForm] = useState<RealEstateContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setForm(JSON.parse(JSON.stringify(data)));
  }, [data]);

  if (!form) return <p>Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await contentService.update('realestate', form);
      toast.success('Real Estate page saved!');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const updateValueItem = (index: number, field: string, value: string) => {
    const items = [...form.whatWeDo.valueAddition.items];
    items[index] = { ...items[index], [field]: value };
    setForm({
      ...form,
      whatWeDo: { ...form.whatWeDo, valueAddition: { ...form.whatWeDo.valueAddition, items } }
    });
  };

  const addValueItem = () => {
    const items = [...form.whatWeDo.valueAddition.items, { id: uuidv4(), title: '', description: '' }];
    setForm({
      ...form,
      whatWeDo: { ...form.whatWeDo, valueAddition: { ...form.whatWeDo.valueAddition, items } }
    });
  };

  const removeValueItem = (index: number) => {
    const items = form.whatWeDo.valueAddition.items.filter((_, i) => i !== index);
    setForm({
      ...form,
      whatWeDo: { ...form.whatWeDo, valueAddition: { ...form.whatWeDo.valueAddition, items } }
    });
  };

  const updateRequirement = (index: number, value: string) => {
    const reqs = [...form.sellYourLand.requirements];
    reqs[index] = value;
    setForm({ ...form, sellYourLand: { ...form.sellYourLand, requirements: reqs } });
  };

  const addRequirement = () => {
    setForm({
      ...form,
      sellYourLand: { ...form.sellYourLand, requirements: [...form.sellYourLand.requirements, ''] }
    });
  };

  const removeRequirement = (index: number) => {
    const reqs = form.sellYourLand.requirements.filter((_, i) => i !== index);
    setForm({ ...form, sellYourLand: { ...form.sellYourLand, requirements: reqs } });
  };

  return (
    <EditorWrapper title="Real Estate Page" saving={saving} onSave={save}>
      <SectionCard title="Hero Section">
        <ImageUpload
          label="Background Image"
          value={form.hero.backgroundImage}
          onChange={v => setForm({ ...form, hero: { ...form.hero, backgroundImage: v } })}
          category="heroes"
        />
        <TextField label="Title" value={form.hero.title} onChange={v => setForm({ ...form, hero: { ...form.hero, title: v } })} />
        <TextField label="Subtitle" value={form.hero.subtitle} onChange={v => setForm({ ...form, hero: { ...form.hero, subtitle: v } })} />
        <TextField label="Subtitle Bold" value={form.hero.subtitleBold} onChange={v => setForm({ ...form, hero: { ...form.hero, subtitleBold: v } })} />
      </SectionCard>

      <SectionCard title="What We Do">
        <TextField label="Section Label" value={form.whatWeDo.sectionLabel} onChange={v => setForm({ ...form, whatWeDo: { ...form.whatWeDo, sectionLabel: v } })} />
        <TextField label="Heading" value={form.whatWeDo.heading} onChange={v => setForm({ ...form, whatWeDo: { ...form.whatWeDo, heading: v } })} />
        <TextField label="Body" value={form.whatWeDo.body} onChange={v => setForm({ ...form, whatWeDo: { ...form.whatWeDo, body: v } })} multiline />
      </SectionCard>

      <SectionCard title="Value Addition Activities">
        <TextField label="Heading" value={form.whatWeDo.valueAddition.heading} onChange={v => setForm({ ...form, whatWeDo: { ...form.whatWeDo, valueAddition: { ...form.whatWeDo.valueAddition, heading: v } } })} />
        {form.whatWeDo.valueAddition.items.map((item, i) => (
          <div key={item.id} className="bg-gray-50 p-4 rounded space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Activity {i + 1}</span>
              <button onClick={() => removeValueItem(i)} className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
            </div>
            <TextField label="Title" value={item.title} onChange={v => updateValueItem(i, 'title', v)} />
            <TextField label="Description" value={item.description} onChange={v => updateValueItem(i, 'description', v)} multiline />
          </div>
        ))}
        <button onClick={addValueItem} className="flex items-center gap-1 text-sm text-gold-400 hover:text-gold-500">
          <FiPlus /> Add Activity
        </button>
      </SectionCard>

      <SectionCard title="Sell Your Land">
        <TextField label="Section Label" value={form.sellYourLand.sectionLabel} onChange={v => setForm({ ...form, sellYourLand: { ...form.sellYourLand, sectionLabel: v } })} />
        <TextField label="Heading" value={form.sellYourLand.heading} onChange={v => setForm({ ...form, sellYourLand: { ...form.sellYourLand, heading: v } })} />
        <TextField label="Description" value={form.sellYourLand.description} onChange={v => setForm({ ...form, sellYourLand: { ...form.sellYourLand, description: v } })} />
        <TextField label="Suburbs" value={form.sellYourLand.suburbs} onChange={v => setForm({ ...form, sellYourLand: { ...form.sellYourLand, suburbs: v } })} multiline />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Requirements</label>
          {form.sellYourLand.requirements.map((req, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={req}
                onChange={e => updateRequirement(i, e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold-400"
              />
              <button onClick={() => removeRequirement(i)} className="text-red-500 hover:text-red-700 px-2"><FiTrash2 /></button>
            </div>
          ))}
          <button onClick={addRequirement} className="flex items-center gap-1 text-sm text-gold-400 hover:text-gold-500">
            <FiPlus /> Add Requirement
          </button>
        </div>
        <TextField label="Payment Note" value={form.sellYourLand.paymentNote} onChange={v => setForm({ ...form, sellYourLand: { ...form.sellYourLand, paymentNote: v } })} />
      </SectionCard>
    </EditorWrapper>
  );
}
