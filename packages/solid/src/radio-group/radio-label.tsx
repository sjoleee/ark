import { ark, type HTMLArkProps } from '../factory'
import { useRadioContext } from './radio-context'
import { useRadioGroupContext } from './radio-group-context'

export type RadioLabelProps = HTMLArkProps<'span'>

export const RadioLabel = (props: RadioLabelProps) => {
  const radioGroup = useRadioGroupContext()
  const context = useRadioContext()

  return <ark.span {...radioGroup().getRadioLabelProps(context)} {...props} />
}
