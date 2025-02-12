/**
 * All html and svg elements for ark components.
 * This is mostly for `ark.<element>` syntax.
 */
import {
  polymorphicFactory,
  type HTMLPolymorphicComponents,
  type HTMLPolymorphicProps,
} from '@polymorphic-factory/solid'
import { type JSX } from 'solid-js'

export type HTMLArkComponents = HTMLPolymorphicComponents

export type HTMLArkProps<T extends keyof JSX.IntrinsicElements> = HTMLPolymorphicProps<T>

/**
 * The ark factory serves as an object of JSX elements to render React components which accept the `as` prop
 */
export const ark = polymorphicFactory()
