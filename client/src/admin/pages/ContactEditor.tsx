import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useContent } from '../../hooks/useContent';
import { contentService } from '../../services/api';
import { ContactContent } from '../../types/content';
import EditorWrapper, { TextField, SectionCard } from '../components/EditorWrapper';

export default function ContactEditor() {
  const { data } = useContent<ContactContent>('contact');
  const [form, setForm] = useState<ContactContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setForm(JSON.parse(JSON.stringify(data)));
  }, [data]);

  if (!form) return <p>Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await contentService.update('contact', form);
      toast.success('Contact info saved!');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const updatePhone = (index: number, value: string) => {
    const phones = [...form.phones];
    phones[index] = value;
    setForm({ ...form, phones });
  };

  const addPhone = () => setForm({ ...form, phones: [...form.phones, ''] });
  const removePhone = (index: number) => setForm({ ...form, phones: form.phones.filter((_, i) => i !== index) });

  return (
    <EditorWrapper title="Contact Information" saving={saving} onSave={save}>
      <SectionCard title="General">
        <TextField label="Section Label" value={form.sectionLabel} onChange={v => setForm({ ...form, sectionLabel: v })} />
        <TextField label="Heading" value={form.heading} onChange={v => setForm({ ...form, heading: v })} />
        <TextField label="Address" value={form.address} onChange={v => setForm({ ...form, address: v })} multiline />
        <TextField label="Email" value={form.email} onChange={v => setForm({ ...form, email: v })} />
      </SectionCard>

      <SectionCard title="Phone Numbers">
        {form.phones.map((phone, i) => (
          <div key={i} className="flex gap-2">
            <input
              type="text"
              value={phone}
              onChange={e => updatePhone(i, e.target.value)}
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold-400"
            />
            <button onClick={() => removePhone(i)} className="text-red-500 hover:text-red-700 px-2"><FiTrash2 /></button>
          </div>
        ))}
        <button onClick={addPhone} className="flex items-center gap-1 text-sm text-gold-400 hover:text-gold-500">
          <FiPlus /> Add Phone
        </button>
      </SectionCard>

      <SectionCard title="WhatsApp">
        <TextField label="WhatsApp Number" value={form.whatsapp} onChange={v => setForm({ ...form, whatsapp: v })} />
        <TextField label="Display Text" value={form.whatsappDisplay} onChange={v => setForm({ ...form, whatsappDisplay: v })} />
      </SectionCard>

      <SectionCard title="Social Links">
        <TextField label="LinkedIn URL" value={form.socialLinks.linkedin} onChange={v => setForm({ ...form, socialLinks: { ...form.socialLinks, linkedin: v } })} />
        <TextField label="WhatsApp URL" value={form.socialLinks.whatsapp} onChange={v => setForm({ ...form, socialLinks: { ...form.socialLinks, whatsapp: v } })} />
      </SectionCard>

      <SectionCard title="Footer">
        <TextField label="Copyright Text" value={form.footer.copyright} onChange={v => setForm({ ...form, footer: { ...form.footer, copyright: v } })} />
      </SectionCard>
    </EditorWrapper>
  );
}
