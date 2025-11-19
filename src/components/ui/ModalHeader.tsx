import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  title: string;
  icon: React.ReactNode;
  onClose: () => void;
}

export default function ModalHeader({ title, icon, onClose }: Props) {
  return (
    <div className="bg-[#918563] px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 text-white">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <button onClick={onClose}>
        <XMarkIcon className="h-5 w-5 text-white" />
      </button>
    </div>
  );
}