interface Props {
  description?: string;
  icon: string;
}

export default function TaskDescription({ description, icon }: Props) {
  return (
    <div className="mt-3 text-left">
      <div className="flex gap-[8px] items-center">
        <p className="text-[14px]">Task Description</p>
        <img src={icon} className="h-[16px] w-[16px]" />
      </div>

      <div className="flex flex-1 bg-gray-100 p-4 text-[#909090] min-h-[166px] mt-1">
        {description || "No description provided."}
      </div>
    </div>
  );
}