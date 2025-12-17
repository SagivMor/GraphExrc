import { Select } from "@components/inputs/Select";
import type { AttackPathListItemDTO } from "@models/graph";
import "./AttackPathSelect.scss";

type Props = {
  attackPaths: AttackPathListItemDTO[];
  value?: string;
  onChange: (attackPathId: string) => void;
};

export function AttackPathSelect({ attackPaths, value, onChange }: Props) {
  return (
    <div className="attack-path-select-wrapper">
      <Select
        placeholder="Select attack path"
        options={attackPaths.map((p) => ({
          value: p.id,
          label: `${p.name} (${p.severity})`,
        }))}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
