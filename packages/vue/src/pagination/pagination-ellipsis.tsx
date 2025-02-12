import { defineComponent, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type Assign } from '../types'
import { getValidChildren, type ComponentWithProps } from '../utils'
import { usePaginationContext } from './pagination-context'

export type PaginationEllipsisProps = Assign<HTMLArkProps<'li'>, { index: number }>

export const PaginationEllipsis: ComponentWithProps<PaginationEllipsisProps> = defineComponent({
  name: 'PaginationEllipsis',
  props: {
    index: {
      type: Number as PropType<PaginationEllipsisProps['index']>,
      required: true,
    },
  },
  setup(props, { slots, attrs }) {
    const api = usePaginationContext()

    return () => (
      <ark.li {...api.value.getEllipsisProps({ index: props.index })} {...attrs}>
        {() => getValidChildren(slots)}
      </ark.li>
    )
  },
})
