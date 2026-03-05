import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { ReactNode } from 'react'

interface Props {
    children : ReactNode,
    show? : boolean,
    setShow : () => void
}

export default function Modal({ children , setShow , show = true } : Props) {

    return (
        <Dialog open={show} onClose={setShow} className="relative z-50">
            <DialogBackdrop className="fixed inset-0 bg-black/40" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-3xl bg-white rounded-lg shadow-xl">
                    {children}
                </DialogPanel>
            </div>
        </Dialog>
    )
}