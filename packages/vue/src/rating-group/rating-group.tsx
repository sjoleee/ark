import { defineComponent, Fragment, type PropType } from 'vue'
import { ark, type HTMLArkProps } from '../factory'
import { type ComponentWithProps } from '../utils'
import { RatingGroupProvider } from './rating-group-context'
import { useRatingGroup, type UseRatingGroupContext } from './use-rating-group'

export type Assign<Target, Source> = Omit<Target, keyof Source> & Source

export type RatingGroupProps = Assign<HTMLArkProps<'input'>, UseRatingGroupContext>

const vueRatingGroupProps = {
  allowHalf: {
    type: Boolean as PropType<RatingGroupProps['allowHalf']>,
  },
  autoFocus: {
    type: Boolean as PropType<RatingGroupProps['autoFocus']>,
  },
  dir: {
    type: String as PropType<RatingGroupProps['dir']>,
  },
  disabled: {
    type: Boolean as PropType<RatingGroupProps['disabled']>,
  },
  form: {
    type: String as PropType<RatingGroupProps['form']>,
  },
  getRootNode: {
    type: Function as PropType<RatingGroupProps['getRootNode']>,
  },
  ids: {
    type: Object as PropType<RatingGroupProps['ids']>,
  },
  max: {
    type: Number as PropType<RatingGroupProps['max']>,
  },
  modelValue: {
    type: Number as PropType<RatingGroupProps['modelValue']>,
  },
  name: {
    type: String as PropType<RatingGroupProps['name']>,
  },
  readOnly: {
    type: Boolean as PropType<RatingGroupProps['readOnly']>,
  },
  translations: {
    type: Object as PropType<RatingGroupProps['translations']>,
  },
  value: {
    type: Number as PropType<RatingGroupProps['value']>,
  },
}

export const RatingGroup: ComponentWithProps<RatingGroupProps> = defineComponent({
  name: 'RatingGroup',
  props: vueRatingGroupProps,
  emits: ['change', 'update:modelValue', 'hover'],
  setup(props, { slots, attrs, emit }) {
    const api = useRatingGroup(emit, props)

    RatingGroupProvider(api)

    return () => (
      <ark.div {...api.value.rootProps} {...attrs}>
        <Fragment>
          <ark.input {...api.value.hiddenInputProps} />
          {slots.default?.()}
        </Fragment>
      </ark.div>
    )
  },
})
