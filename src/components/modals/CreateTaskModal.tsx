import { Dialog,DialogPanel, Transition, TransitionChild, Listbox,ListboxButton,ListboxOption,ListboxOptions } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ChevronUpDownIcon, CheckIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import { clients } from "../../constants/clients";
import { owners } from "../../constants/owners";
import { taskTypes } from "../../constants/taskTypes";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: any) => void;
}



export default function CreateTaskModal({ isOpen, onClose, onCreate }: Props) {
  const [selectedClient, setSelectedClient] = useState(clients[0]);
  const [selectedOwner, setSelectedOwner] = useState(owners[0]);
  const [selectedTaskType, setSelectedTaskType] = useState(taskTypes[0]);
  const [description, setDescription] = useState("");
  const [urgent, setUrgent] = useState(false);
  const [assignQueue, setAssignQueue] = useState(false);

  const handleSubmit = () => {
    if (!selectedClient || !selectedOwner || !selectedTaskType) return;

    onCreate({
      PersonId: selectedClient.id,
      OwnerId: selectedOwner.id,
      TaskType: selectedTaskType,
      Description: description,
      IsUrgent: urgent,
      IsAssignedToQueue: assignQueue,
    });

    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        
        {/* BACKDROP */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        {/* MODAL */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-3xl rounded-lg bg-white shadow-lg overflow-hidden">

              {/* HEADER */}
              <div className="bg-[#918563] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <PlusIcon className="h-5 w-5" />
                  <span className="font-medium">Create New Task</span>
                </div>
                <button onClick={onClose}>
                  <XMarkIcon className="h-5 w-5 text-white" />
                </button>
              </div>

              {/* CONTENT */}
              <div className="p-6 space-y-6">

                {/* 3 fields in a row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* CLIENT */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Client</label>
                    <Listbox value={selectedClient} onChange={setSelectedClient}>
                      <div className="relative">
                        <ListboxButton className="w-full border rounded px-3 py-2 flex justify-between items-center text-left">
                          <span>{selectedClient.name}</span>
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-500" />
                        </ListboxButton>
                        <ListboxOptions className="absolute z-10 mt-1 w-full bg-white rounded border shadow">
                          {clients.map((client) => (
                            <ListboxOption
                              key={client.id}
                              value={client}
                              className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
                            >
                              {({ selected }) => (
                                <>
                                  <span>{client.name}</span>
                                  {selected && <CheckIcon className="h-4 w-4 text-green-600" />}
                                </>
                              )}
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </div>
                    </Listbox>
                  </div>

                  {/* TASK OWNER */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Task Owner</label>
                    <Listbox value={selectedOwner} onChange={setSelectedOwner}>
                      <div className="relative">
                        <ListboxButton className="w-full border rounded px-3 py-2 flex justify-between items-center text-left">
                          <span>{selectedOwner.name}</span>
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-500" />
                        </ListboxButton>
                        <ListboxOptions className="absolute z-10 mt-1 w-full bg-white rounded border shadow">
                          {owners.map((owner) => (
                            <ListboxOption
                              key={owner.id}
                              value={owner}
                              className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
                            >
                              {({ selected }) => (
                                <>
                                  <span>{owner.name}</span>
                                  {selected && <CheckIcon className="h-4 w-4 text-green-600" />}
                                </>
                              )}
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </div>
                    </Listbox>
                  </div>

                  {/* TASK TYPE */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Task Type</label>
                    <Listbox value={selectedTaskType} onChange={setSelectedTaskType}>
                      <div className="relative">
                        <ListboxButton className="w-full border rounded px-3 py-2 flex justify-between items-center text-left">
                          <span>{selectedTaskType}</span>
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-500" />
                        </ListboxButton>
                        <ListboxOptions className="absolute z-10 mt-1 w-full bg-white rounded border shadow max-h-60 overflow-y-auto">
                          {taskTypes.map((type) => (
                            <ListboxOption
                              key={type}
                              value={type}
                              className="cursor-pointer px-3 py-2 hover:bg-gray-100 flex items-center justify-between"
                            >
                              {({ selected }) => (
                                <>
                                  <span>{type}</span>
                                  {selected && <CheckIcon className="h-4 w-4 text-green-600" />}
                                </>
                              )}
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </div>
                    </Listbox>
                  </div>

                </div>

                {/* DESCRIPTION */}
                <div>
                  <label className="block text-sm font-medium mb-1">Task Description</label>
                  <textarea
                    className="w-full border rounded p-3 min-h-[120px]"
                    placeholder="Please add all details for administration to complete the task"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                {/* CHECKBOXES */}
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={urgent}
                      onChange={(e) => setUrgent(e.target.checked)}
                    />
                    <span>Mark as Urgent</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={assignQueue}
                      onChange={(e) => setAssignQueue(e.target.checked)}
                    />
                    <span>Assign to Queue</span>
                  </label>
                </div>

                {/* FOOTER */}
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    className="px-4 py-2 border rounded"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-5 py-2 bg-green-900 text-white rounded"
                    onClick={handleSubmit}
                  >
                    Create Task
                  </button>
                </div>

              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
