import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useContent } from '../../hooks/useContent';
import { contentService } from '../../services/api';
import { HomeContent } from '../../types/content';
import EditorWrapper, { TextField, SectionCard } from '../components/EditorWrapper';
import ImageUpload from '../components/ImageUpload';

export default function HomeEditor() {
  const { data } = useContent<HomeContent>('home');
  const [form, setForm] = useState<HomeContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setForm(JSON.parse(JSON.stringify(data)));
  }, [data]);

  if (!form) return <p>Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await contentService.update('home', form);
      toast.success('Home page saved!');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  return (
    <EditorWrapper title="Home Page" saving={saving} onSave={save}>
      <SectionCard title="Hero Section">
        <ImageUpload
          label="Background Image"
          value={form.hero.backgroundImage}
          onChange={v => setForm({ ...form, hero: { ...form.hero, backgroundImage: v } })}
          category="heroes"
        />
        <TextField label="Title" value={form.hero.title} onChange={v => setForm({ ...form, hero: { ...form.hero, title: v } })} />
        <TextField label="Title (Bold)" value={form.hero.titleBold} onChange={v => setForm({ ...form, hero: { ...form.hero, titleBold: v } })} />
        <TextField label="Subtitle" value={form.hero.subtitle} onChange={v => setForm({ ...form, hero: { ...form.hero, subtitle: v } })} />
      </SectionCard>

      <SectionCard title="Divisions Banner">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Venture Capital</h4>
            <TextField label="Title" value={form.divisions.ventureCapital.title} onChange={v => setForm({ ...form, divisions: { ...form.divisions, ventureCapital: { ...form.divisions.ventureCapital, title: v } } })} />
            <TextField label="Subtitle" value={form.divisions.ventureCapital.subtitle} onChange={v => setForm({ ...form, divisions: { ...form.divisions, ventureCapital: { ...form.divisions.ventureCapital, subtitle: v } } })} />
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Real Estate</h4>
            <TextField label="Title" value={form.divisions.realEstate.title} onChange={v => setForm({ ...form, divisions: { ...form.divisions, realEstate: { ...form.divisions.realEstate, title: v } } })} />
            <TextField label="Subtitle" value={form.divisions.realEstate.subtitle} onChange={v => setForm({ ...form, divisions: { ...form.divisions, realEstate: { ...form.divisions.realEstate, subtitle: v } } })} />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Who We Are">
        <TextField label="Section Label" value={form.whoWeAre.sectionLabel} onChange={v => setForm({ ...form, whoWeAre: { ...form.whoWeAre, sectionLabel: v } })} />
        <TextField label="Heading" value={form.whoWeAre.heading} onChange={v => setForm({ ...form, whoWeAre: { ...form.whoWeAre, heading: v } })} />
        <TextField label="Description" value={form.whoWeAre.description} onChange={v => setForm({ ...form, whoWeAre: { ...form.whoWeAre, description: v } })} multiline />
        <TextField label="Venture Capital Text" value={form.whoWeAre.ventureCapital} onChange={v => setForm({ ...form, whoWeAre: { ...form.whoWeAre, ventureCapital: v } })} multiline />
        <TextField label="Real Estate Text" value={form.whoWeAre.realEstate} onChange={v => setForm({ ...form, whoWeAre: { ...form.whoWeAre, realEstate: v } })} multiline />
        <TextField label="Closing Text" value={form.whoWeAre.closing} onChange={v => setForm({ ...form, whoWeAre: { ...form.whoWeAre, closing: v } })} multiline />
      </SectionCard>
    </EditorWrapper>
  );
}
