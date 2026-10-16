import React from 'react';

export interface SelectionPillProps<T extends string | number> {
  options: { value: T; label: string; icon?: React.ReactNode; hint?: string }[];
  value: T;
  onChange: (val: T) => void;
  label?: string;
  size?: 'sm' | 'md';
}

export function SelectionPill<T extends string | number>({
  options,
  value,
  onChange,
  label,
  size = 'md',
}: SelectionPillProps<T>) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold uppercase tracking-wider text-slate">{label}</label>}
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label || 'Select option'}>
        {options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={String(opt.value)}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(opt.value)}
              className={`inline-flex items-center justify-center font-medium rounded-md transition-colors duration-150 select-none ${
                size === 'sm' ? 'px-3 py-1.5 text-xs min-h-[36px] gap-1.5' : 'px-4 py-2 text-sm min-h-[44px] gap-2'
              } ${
                isSelected
                  ? 'bg-primary text-white border border-primary shadow-subtle'
                  : 'bg-white text-charcoal border border-border-subtle hover:border-slate-muted hover:bg-cream-surface'
              }`}
            >
              {opt.icon && <span aria-hidden="true">{opt.icon}</span>}
              <span>{opt.label}</span>
              {opt.hint && (
                <span className={`text-xs ml-1 ${isSelected ? 'text-white/80' : 'text-slate'}`}>
                  ({opt.hint})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
