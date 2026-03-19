import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useContent } from '../../hooks/useContent';
import { contentService } from '../../services/api';
import { ProjectsContent, Project } from '../../types/content';
import EditorWrapper, { TextField, SectionCard } from '../components/EditorWrapper';
import ImageUpload from '../components/ImageUpload';

export default function ProjectsEditor() {
  const { data } = useContent<ProjectsContent>('projects');
  const [form, setForm] = useState<ProjectsContent | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setForm(JSON.parse(JSON.stringify(data)));
  }, [data]);

  if (!form) return <p>Loading...</p>;

  const save = async () => {
    setSaving(true);
    try {
      await contentService.update('projects', form);
      toast.success('Projects saved!');
    } catch {
      toast.error('Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const updateProject = (index: number, field: keyof Project, value: unknown) => {
    const items = [...form.items];
    items[index] = { ...items[index], [field]: value };
    setForm({ ...form, items });
  };

  const addProject = () => {
    setForm({
      ...form,
      items: [...form.items, {
        id: uuidv4(), title: '', location: '', images: [], description: ''
      }]
    });
  };

  const removeProject = (index: number) => {
    setForm({ ...form, items: form.items.filter((_, i) => i !== index) });
  };

  const addProjectImage = (projectIndex: number, path: string) => {
    const items = [...form.items];
    items[projectIndex] = { ...items[projectIndex], images: [...items[projectIndex].images, path] };
    setForm({ ...form, items });
  };

  const removeProjectImage = (projectIndex: number, imgIndex: number) => {
    const items = [...form.items];
    items[projectIndex] = {
      ...items[projectIndex],
      images: items[projectIndex].images.filter((_, i) => i !== imgIndex)
    };
    setForm({ ...form, items });
  };

  return (
    <EditorWrapper title="Projects" saving={saving} onSave={save}>
      <SectionCard title="Section Settings">
        <TextField label="Section Label" value={form.sectionLabel} onChange={v => setForm({ ...form, sectionLabel: v })} />
        <TextField label="Heading" value={form.heading} onChange={v => setForm({ ...form, heading: v })} />
      </SectionCard>

      {form.items.map((project, i) => (
        <SectionCard key={project.id} title={project.title || `Project ${i + 1}`}>
          <div className="flex justify-end">
            <button onClick={() => removeProject(i)} className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1">
              <FiTrash2 /> Remove
            </button>
          </div>
          <TextField label="Title" value={project.title} onChange={v => updateProject(i, 'title', v)} />
          <TextField label="Location" value={project.location} onChange={v => updateProject(i, 'location', v)} />
          <TextField label="Description" value={project.description} onChange={v => updateProject(i, 'description', v)} multiline />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
            <div className="flex flex-wrap gap-3 mb-3">
              {project.images.map((img, imgIdx) => (
                <div key={imgIdx} className="relative">
                  <img src={img} alt="" className="h-24 w-auto rounded border object-cover" />
                  <button
                    onClick={() => removeProjectImage(i, imgIdx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <ImageUpload
              value=""
              onChange={path => addProjectImage(i, path)}
              category="projects"
            />
          </div>
        </SectionCard>
      ))}

      <button onClick={addProject} className="flex items-center gap-2 bg-gold-400 text-white px-4 py-2 rounded text-sm hover:bg-gold-500">
        <FiPlus /> Add Project
      </button>
    </EditorWrapper>
  );
}
