import { Button, Description, Dialog, DialogPanel, DialogTitle} from "@headlessui/react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;   
    description: string;
    title: string;
    subtitle: string;
}

const Modal = ({isOpen, setIsOpen, title, subtitle, description}: Props) => {
    return ( 
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none text-[var(--text-color)]" onClose={() => setIsOpen(false)}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                        {/* Title */}
                        <DialogTitle as="h3" className="text-base/7 font-medium ">{title} </DialogTitle>
                        {/* Subtitle */}
                        <p className="text-sm/6 text-[var(--text-color)]/50"> {subtitle}</p>
                        {/* Description */}
                        <Description className="mt-2">{description}</Description>
                        <div className="mt-4">
                        <Button
                            className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                            onClick={() => setIsOpen(false)}
                        >
                            Got it, thanks!
                        </Button>
                        </div>
                    </DialogPanel>
                    </div>
                </div>
            </Dialog>
            );
}
 
export default Modal;

//==========================================================================
//========================  Reusable Dialog Component ======================
//==========================================================================

{/* <Dialog open={isDialogOpen} as="div" className="dialog" onClose={() => setIsDialogOpen(false)}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel className="dialog-panel">
                <DialogTitle as="h3" className="dialog-title">Role Permissions</DialogTitle>
                <p className="dialog-subtitle">Mange roles for this user</p>
                <div className="mt-2">{permissionsQuery.isLoading && <div>Loading...</div>}
              {permissionsQuery.error && <div className="text-red-500">Failed to load permissions.</div>}
              {permissionsQuery.data && (
                <ul className="list-disc pl-5">
                  {permissionsQuery.data.length === 0 && <li>No permissions assigned.</li>}
                  {permissionsQuery.data.map((perm, idx) => (
                    <li key={perm + "-" + idx}>{perm}</li>
                  ))}
                </ul>
              )}</div>
                <div className="flex mt-4 gap-5">
                  <button className="button px-5"  onClick={() => setIsDialogOpen(false)}>Save</button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog> */}