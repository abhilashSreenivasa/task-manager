interface Props {
  icon: string;
  text: string;
}

export default function UrgentBadge({ icon, text }: Props) {
  return (
    <div className="flex gap-2 bg-[#D53C32] text-white pl-2 pr-2 items-center rounded">
      <img src={icon} className="w-3 h-3" />
      <p>{text}</p>
    </div>
  );
}