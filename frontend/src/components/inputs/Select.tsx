import "./Select.scss"

type Option<T extends string | number> = {
  value: T;
  label: string;
};

type Props<T extends string | number> = {
  value?: T;
  placeholder?: string;
  options: Option<T>[];
  onChange: (value: T | "") => void;
};

export function Select<T extends string | number>({
  value,
  placeholder = "Select",
  options,
  onChange,
}: Props<T>) {
  return (
    <select
      className="select-input"
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value as T | "")}
    >
      <option value="">{placeholder}</option>

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
