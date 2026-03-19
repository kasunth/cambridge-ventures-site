import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useContent } from '../../hooks/useContent';
import { contentService } from '../../services/api';
import { TeamContent, TeamMember } from '../../types/content';
import EditorWrapper, { TextField, SectionCard } from '../components/EditorWrapper';
import ImageUpload from '../components/ImageUpload';

export default function TeamEditor() {
  const { data } = useContent<TeamContent>('team');
  const [form, setForm] = useState<TeamContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setForm(JSON.parse(JSON.stringify(data)));
  }, [data]);

  if (!form) return <p>Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await contentService.update('team', form);
      toast.success('Team saved!');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    const members = [...form.members];
    members[index] = { ...members[index], [field]: value };
    setForm({ ...form, members });
  };

  const addMember = () => {
    setForm({
      ...form,
      members: [...form.members, {
        id: uuidv4(), name: '', title: '', role: '',
        committee: '', photo: '', bio: '', readMoreLink: ''
      }]
    });
  };

  const removeMember = (index: number) => {
    setForm({ ...form, members: form.members.filter((_, i) => i !== index) });
  };

  return (
    <EditorWrapper title="Team Members" saving={saving} onSave={save}>
      <SectionCard title="Section Settings">
        <TextField label="Section Label" value={form.sectionLabel} onChange={v => setForm({ ...form, sectionLabel: v })} />
        <TextField label="Heading" value={form.heading} onChange={v => setForm({ ...form, heading: v })} />
      </SectionCard>

      {form.members.map((member, i) => (
        <SectionCard key={member.id} title={member.name || `Member ${i + 1}`}>
          <div className="flex justify-end">
            <button onClick={() => removeMember(i)} className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1">
              <FiTrash2 /> Remove
            </button>
          </div>
          <ImageUpload
            label="Photo"
            value={member.photo}
            onChange={v => updateMember(i, 'photo', v)}
            category="team"
          />
          <TextField label="Name" value={member.name} onChange={v => updateMember(i, 'name', v)} />
          <TextField label="Title" value={member.title} onChange={v => updateMember(i, 'title', v)} />
          <TextField label="Role" value={member.role} onChange={v => updateMember(i, 'role', v)} />
          <TextField label="Committee" value={member.committee} onChange={v => updateMember(i, 'committee', v)} />
          <TextField label="Bio" value={member.bio} onChange={v => updateMember(i, 'bio', v)} multiline />
          <TextField label="Read More Link" value={member.readMoreLink} onChange={v => updateMember(i, 'readMoreLink', v)} />
        </SectionCard>
      ))}

      <button onClick={addMember} className="flex items-center gap-2 bg-gold-400 text-white px-4 py-2 rounded text-sm hover:bg-gold-500">
        <FiPlus /> Add Team Member
      </button>
    </EditorWrapper>
  );
}
