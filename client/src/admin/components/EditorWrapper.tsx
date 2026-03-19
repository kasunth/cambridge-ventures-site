import { ReactNode } from 'react';
import { FiSave } from 'react-icons/fi';

interface EditorWrapperProps {
  title: string;
  saving: boolean;
  onSave: () => void;
  children: ReactNode;
}

export default function EditorWrapper({ title, saving, onSave, children }: EditorWrapperProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading font-semibold">{title}</h1>
        <button
          onClick={onSave}
          disabled={saving}
          className="flex items-center gap-2 bg-gold-400 text-white px-6 py-2 rounded text-sm font-medium hover:bg-gold-500 transition-colors disabled:opacity-50"
        >
          <FiSave />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      <div className="space-y-6">
        {children}
      </div>
    </div>
  );
}

// Reusable form field components
export function TextField({ label, value, onChange, multiline = false, placeholder = '' }: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  multiline?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold-400 resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold-400"
        />
      )}
    </div>
  );
}

export function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4 pb-2 border-b">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
