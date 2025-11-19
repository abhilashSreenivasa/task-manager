interface Props {
  avatar: string;
  name: string;
  role: string;
  accentColor?: string;
}

export default function OwnerCard({ avatar, name, role, accentColor = "#BCA105" }: Props) {
  return (
    <div className="flex items-center gap-2 bg-white p-2 rounded">
      <img
        src={avatar}
        className="h-8 w-8 rounded-full"
      />
      <div className="text-left">
        <p className="font-medium" style={{ color: accentColor }}>{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  );
}