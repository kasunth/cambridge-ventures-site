import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { useContent } from '../../hooks/useContent';
import { contentService } from '../../services/api';
import { VentureContent } from '../../types/content';
import EditorWrapper, { TextField, SectionCard } from '../components/EditorWrapper';
import ImageUpload from '../components/ImageUpload';

export default function VentureEditor() {
  const { data } = useContent<VentureContent>('venture');
  const [form, setForm] = useState<VentureContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setForm(JSON.parse(JSON.stringify(data)));
  }, [data]);

  if (!form) return <p>Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await contentService.update('venture', form);
      toast.success('Venture Capital page saved!');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const updateTicketItem = (index: number, value: string) => {
    const items = [...form.ticketSizes.items];
    items[index] = value;
    setForm({ ...form, ticketSizes: { ...form.ticketSizes, items } });
  };

  const addTicketItem = () => {
    setForm({ ...form, ticketSizes: { ...form.ticketSizes, items: [...form.ticketSizes.items, ''] } });
  };

  const removeTicketItem = (index: number) => {
    const items = form.ticketSizes.items.filter((_, i) => i !== index);
    setForm({ ...form, ticketSizes: { ...form.ticketSizes, items } });
  };

  const updateCard = (index: number, field: string, value: string) => {
    const cards = [...form.philosophy.cards];
    cards[index] = { ...cards[index], [field]: value };
    setForm({ ...form, philosophy: { ...form.philosophy, cards } });
  };

  return (
    <EditorWrapper title="Venture Capital Page" saving={saving} onSave={save}>
      <SectionCard title="Hero Section">
        <ImageUpload
          label="Background Image"
          value={form.hero.backgroundImage}
          onChange={v => setForm({ ...form, hero: { ...form.hero, backgroundImage: v } })}
          category="heroes"
        />
        <TextField label="Title" value={form.hero.title} onChange={v => setForm({ ...form, hero: { ...form.hero, title: v } })} />
        <TextField label="Title Bold" value={form.hero.titleBold} onChange={v => setForm({ ...form, hero: { ...form.hero, titleBold: v } })} />
        <TextField label="Subtitle" value={form.hero.subtitle} onChange={v => setForm({ ...form, hero: { ...form.hero, subtitle: v } })} multiline />
        <TextField label="CTA Text" value={form.hero.ctaText} onChange={v => setForm({ ...form, hero: { ...form.hero, ctaText: v } })} />
      </SectionCard>

      <SectionCard title="What We Do">
        <TextField label="Section Label" value={form.whatWeDo.sectionLabel} onChange={v => setForm({ ...form, whatWeDo: { ...form.whatWeDo, sectionLabel: v } })} />
        <TextField label="Heading" value={form.whatWeDo.heading} onChange={v => setForm({ ...form, whatWeDo: { ...form.whatWeDo, heading: v } })} />
        <TextField label="Body" value={form.whatWeDo.body} onChange={v => setForm({ ...form, whatWeDo: { ...form.whatWeDo, body: v } })} multiline />
      </SectionCard>

      <SectionCard title="Ticket Sizes & Investment Stages">
        <TextField label="Heading" value={form.ticketSizes.heading} onChange={v => setForm({ ...form, ticketSizes: { ...form.ticketSizes, heading: v } })} />
        <TextField label="Description" value={form.ticketSizes.description} onChange={v => setForm({ ...form, ticketSizes: { ...form.ticketSizes, description: v } })} multiline />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Items</label>
          {form.ticketSizes.items.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={e => updateTicketItem(i, e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold-400"
              />
              <button onClick={() => removeTicketItem(i)} className="text-red-500 hover:text-red-700 px-2">
                <FiTrash2 />
              </button>
            </div>
          ))}
          <button onClick={addTicketItem} className="flex items-center gap-1 text-sm text-gold-400 hover:text-gold-500">
            <FiPlus /> Add Item
          </button>
        </div>
      </SectionCard>

      <SectionCard title="Investment Philosophy">
        <TextField label="Heading" value={form.philosophy.heading} onChange={v => setForm({ ...form, philosophy: { ...form.philosophy, heading: v } })} />
        {form.philosophy.cards.map((card, i) => (
          <div key={card.id} className="bg-gray-50 p-4 rounded space-y-3">
            <TextField label={`Card ${i + 1} Title`} value={card.title} onChange={v => updateCard(i, 'title', v)} />
            <TextField label="Description" value={card.description} onChange={v => updateCard(i, 'description', v)} multiline />
          </div>
        ))}
      </SectionCard>

      <SectionCard title="Partner CTA">
        <TextField label="Heading" value={form.partnerCta.heading} onChange={v => setForm({ ...form, partnerCta: { ...form.partnerCta, heading: v } })} />
        <TextField label="Body" value={form.partnerCta.body} onChange={v => setForm({ ...form, partnerCta: { ...form.partnerCta, body: v } })} multiline />
        <TextField label="Body Bold" value={form.partnerCta.bodyBold} onChange={v => setForm({ ...form, partnerCta: { ...form.partnerCta, bodyBold: v } })} multiline />
        <TextField label="Quote" value={form.partnerCta.quote} onChange={v => setForm({ ...form, partnerCta: { ...form.partnerCta, quote: v } })} multiline />
      </SectionCard>
    </EditorWrapper>
  );
}
