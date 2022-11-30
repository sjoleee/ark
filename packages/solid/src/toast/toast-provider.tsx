import { normalizeProps, useMachine } from '@zag-js/solid'
import * as toast from '@zag-js/toast'
import { createMemo, createUniqueId, mergeProps, type JSX } from 'solid-js'
import { createSplitProps } from '../create-split-props'
import { createContext } from '../createContext'
import type { Optional } from '../types'

export type ToastContext = () => ReturnType<typeof toast['group']['connect']>
export const [ToastContextProvider, useToast] = createContext<ToastContext>()

type ToastProviderParams = { children: JSX.Element }
export type ToastProviderProps = Partial<Optional<toast.GroupMachineContext, 'id'>> &
  ToastProviderParams

export const ToastProvider = (props: ToastProviderProps) => {
  const [toastProviderParams, machineProps] = createSplitProps<ToastProviderParams>()(props, [
    'children',
  ])
  const context = mergeProps({ id: createUniqueId() }, machineProps)
  const [state, send] = useMachine(toast.group.machine(context))
  const api = createMemo(() => toast.group.connect(state, send, normalizeProps))

  return <ToastContextProvider value={api}>{toastProviderParams.children}</ToastContextProvider>
}