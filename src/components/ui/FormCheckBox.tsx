interface Props {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function FormCheckBox({ label, checked, onChange }: Props) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}