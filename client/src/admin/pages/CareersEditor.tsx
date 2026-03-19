import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useContent } from '../../hooks/useContent';
import { contentService } from '../../services/api';
import { CareersContent, Job } from '../../types/content';
import EditorWrapper, { TextField, SectionCard } from '../components/EditorWrapper';
import ImageUpload from '../components/ImageUpload';

export default function CareersEditor() {
  const { data } = useContent<CareersContent>('careers');
  const [form, setForm] = useState<CareersContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setForm(JSON.parse(JSON.stringify(data)));
  }, [data]);

  if (!form) return <p>Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await contentService.update('careers', form);
      toast.success('Careers page saved!');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const updateJob = (index: number, field: keyof Job, value: unknown) => {
    const jobs = [...form.jobs];
    jobs[index] = { ...jobs[index], [field]: value };
    setForm({ ...form, jobs });
  };

  const addJob = () => {
    setForm({
      ...form,
      jobs: [...form.jobs, {
        id: uuidv4(),
        title: '',
        department: '',
        role: '',
        experience: '',
        qualifications: '',
        requirements: [],
        applyLink: ''
      }]
    });
  };

  const removeJob = (index: number) => {
    setForm({ ...form, jobs: form.jobs.filter((_, i) => i !== index) });
  };

  const updateRequirement = (jobIndex: number, reqIndex: number, value: string) => {
    const jobs = [...form.jobs];
    const reqs = [...jobs[jobIndex].requirements];
    reqs[reqIndex] = value;
    jobs[jobIndex] = { ...jobs[jobIndex], requirements: reqs };
    setForm({ ...form, jobs });
  };

  const addRequirement = (jobIndex: number) => {
    const jobs = [...form.jobs];
    jobs[jobIndex] = { ...jobs[jobIndex], requirements: [...jobs[jobIndex].requirements, ''] };
    setForm({ ...form, jobs });
  };

  const removeRequirement = (jobIndex: number, reqIndex: number) => {
    const jobs = [...form.jobs];
    jobs[jobIndex] = { ...jobs[jobIndex], requirements: jobs[jobIndex].requirements.filter((_, i) => i !== reqIndex) };
    setForm({ ...form, jobs });
  };

  return (
    <EditorWrapper title="Careers Page" saving={saving} onSave={save}>
      <SectionCard title="Hero Section">
        <ImageUpload
          label="Background Image"
          value={form.hero.backgroundImage}
          onChange={v => setForm({ ...form, hero: { ...form.hero, backgroundImage: v } })}
          category="heroes"
        />
        <TextField label="Title" value={form.hero.title} onChange={v => setForm({ ...form, hero: { ...form.hero, title: v } })} />
        <TextField label="Title Bold" value={form.hero.titleBold} onChange={v => setForm({ ...form, hero: { ...form.hero, titleBold: v } })} />
        <TextField label="Subtitle" value={form.hero.subtitle} onChange={v => setForm({ ...form, hero: { ...form.hero, subtitle: v } })} />
        <TextField label="Highlight Text" value={form.hero.highlightText} onChange={v => setForm({ ...form, hero: { ...form.hero, highlightText: v } })} />
        <TextField label="Closing" value={form.hero.closing} onChange={v => setForm({ ...form, hero: { ...form.hero, closing: v } })} />
      </SectionCard>

      <SectionCard title="Job Listings">
        <TextField label="Section Heading" value={form.sectionHeading} onChange={v => setForm({ ...form, sectionHeading: v })} />
        {form.jobs.map((job, i) => (
          <div key={job.id} className="bg-gray-50 p-4 rounded space-y-3 border-l-4 border-gold-400">
            <div className="flex justify-between items-center">
              <span className="font-medium">{job.title || `Job ${i + 1}`}</span>
              <button onClick={() => removeJob(i)} className="text-red-500 hover:text-red-700"><FiTrash2 /></button>
            </div>
            <TextField label="Title" value={job.title} onChange={v => updateJob(i, 'title', v)} />
            <TextField label="Department" value={job.department} onChange={v => updateJob(i, 'department', v)} />
            <TextField label="Role Description" value={job.role || ''} onChange={v => updateJob(i, 'role', v)} multiline />
            <TextField label="Experience" value={job.experience || ''} onChange={v => updateJob(i, 'experience', v)} multiline />
            <TextField label="Qualifications" value={job.qualifications || ''} onChange={v => updateJob(i, 'qualifications', v)} multiline />
            <TextField label="Apply Link" value={job.applyLink} onChange={v => updateJob(i, 'applyLink', v)} />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Requirements</label>
              {job.requirements.map((req, ri) => (
                <div key={ri} className="flex gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={e => updateRequirement(i, ri, e.target.value)}
                    className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold-400"
                  />
                  <button onClick={() => removeRequirement(i, ri)} className="text-red-500 hover:text-red-700 px-2"><FiTrash2 /></button>
                </div>
              ))}
              <button onClick={() => addRequirement(i)} className="flex items-center gap-1 text-sm text-gold-400 hover:text-gold-500">
                <FiPlus /> Add Requirement
              </button>
            </div>
          </div>
        ))}
        <button onClick={addJob} className="flex items-center gap-2 bg-gold-400 text-white px-4 py-2 rounded text-sm hover:bg-gold-500">
          <FiPlus /> Add Job
        </button>
      </SectionCard>
    </EditorWrapper>
  );
}
