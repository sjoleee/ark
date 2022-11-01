import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { vi } from 'vitest'
import { NumberInput, NumberInputProps } from './number-input'
import { NumberInputDecrementButton } from './number-input-decrement-button'
import { NumberInputField } from './number-input-field'
import { NumberInputIncrementButton } from './number-input-increment-button'

const Component = (props: NumberInputProps) => (
  <NumberInput {...props}>
    <div>
      <NumberInputField />
      <NumberInputDecrementButton>Inc</NumberInputDecrementButton>
      <NumberInputIncrementButton>Dec</NumberInputIncrementButton>
    </div>
  </NumberInput>
)

describe('NumberInput', () => {
  it('should render', async () => {
    render(<Component />)
  })

  it('should increment on increment button click', async () => {
    render(<Component />)
    const input = screen.getByRole('spinbutton')
    const incButton = screen.getByRole('button', {
      name: /inc/i,
    })
    await user.click(incButton)

    expect(input).toHaveValue('1')
    await user.click(incButton)
    expect(input).toHaveValue('2')
  })

  it('should decrement on decrement button click', async () => {
    render(<Component />)
    const input = screen.getByRole('spinbutton')
    const decButton = screen.getByRole('button', {
      name: /dec/i,
    })
    await user.click(decButton)

    expect(input).toHaveValue('-1')
    await user.click(decButton)
    expect(input).toHaveValue('-2')
  })

  it('should call onChange on value change', async () => {
    const onChange = vi.fn()

    render(<Component onChange={onChange} />)

    await user.click(
      screen.getByRole('button', {
        name: /inc/i,
      }),
    )
    expect(onChange).toBeCalledWith({ value: '1', valueAsNumber: 1 })
  })

  it('should clamp vlaue on blur', async () => {
    render(<Component max={30} />)

    const input = screen.getByRole('spinbutton')
    await user.type(input, '35')
    await user.tab()

    expect(input).toHaveValue('30')
  })
})