import { atlas, HTMLAtlasProps } from '../factory'
import { forwardRef } from '../forwardRef'
import { useEditableContext } from './editable-context'

export type EditableSubmitButtonProps = HTMLAtlasProps<'button'>

export const EditableSubmitButton = forwardRef<'button'>((props, ref) => {
  const { submitButtonProps } = useEditableContext()
  return <atlas.button {...props} {...submitButtonProps} ref={ref} />
})