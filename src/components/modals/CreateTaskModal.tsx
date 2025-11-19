import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { clients } from "../../constants/clients";
import { owners } from "../../constants/owners";
import { taskTypes } from "../../constants/taskTypes";
import ModalHeader from "../ui/ModalHeader";
import FormListBox from "../ui/FormListBox";
import FormTextArea from "../ui/FormTextArea";
import FormCheckBox from "../ui/FormCheckBox";

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
    onCreate({
      PersonId: selectedClient.id,
      clientName: selectedClient.name,
      OwnerId: selectedOwner.id,
      ownerName: selectedOwner.name,
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
              <ModalHeader
                title="Create New Task"
                icon={<PlusIcon className="h-5 w-5" />}
                onClose={onClose}
              />

              {/* CONTENT */}
              <div className="p-6 space-y-6">

                {/* 3 fields in a row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  
                  {/* CLIENT */}
                  <FormListBox
                    label="Client"
                    value={selectedClient}
                    onChange={setSelectedClient}
                    options={clients}
                    displayValue={(client) => client.name}
                  />

                  {/* TASK OWNER */}
                  <FormListBox
                    label="Task Owner"
                    value={selectedOwner}
                    onChange={setSelectedOwner}
                    options={owners}
                    displayValue={(owner) => owner.name}
                  />

                  {/* TASK TYPE */}
                  <FormListBox
                    label="Task Type"
                    value={selectedTaskType}
                    onChange={setSelectedTaskType}
                    options={taskTypes}
                    displayValue={(type) => type}
                  />

                </div>

                {/* DESCRIPTION */}
                <FormTextArea
                  label="Task Description"
                  value={description}
                  onChange={setDescription}
                  placeholder="Please add all details for administration to complete the task"
                />

                {/* CHECKBOXES */}
                <div className="flex items-center gap-6">
                  <FormCheckBox
                    label="Mark as Urgent"
                    checked={urgent}
                    onChange={setUrgent}
                  />
                  <FormCheckBox
                    label="Assign to Queue"
                    checked={assignQueue}
                    onChange={setAssignQueue}
                  />
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