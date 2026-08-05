interface CategoryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  listId?: string;
}

// Free-text with autocomplete from already-loaded distinct category values —
// no dedicated categories table/query, matching the site's existing
// slugify-on-read pattern.
export default function CategoryCombobox({ value, onChange, suggestions, listId = "category-suggestions" }: CategoryComboboxProps) {
  return (
    <label className="block">
      <span className="block font-label-caps text-label-caps text-secondary mb-1.5">Category</span>
      <input
        list={listId}
        type="text"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
      />
      <datalist id={listId}>
        {suggestions.map((category) => (
          <option key={category} value={category} />
        ))}
      </datalist>
    </label>
  );
}
