import { FunctionalComponent } from 'vue'

export type Selector<
  Value extends Record<PropertyKey, unknown>,
  Props extends Record<PropertyKey, unknown>
> = (initialContext: Value, props: Props) => Record<PropertyKey, unknown>

export type DefineContext<
  Value extends Record<PropertyKey, unknown>,
  Props extends Record<PropertyKey, unknown>,
  Selectors extends Selector<Value, Props>[]
> = {
  [Key in keyof Selectors]: Selectors[Key] extends Selector<Value, Props>
    ? ReturnType<Selectors[Key]>
    : {}
}

export type First<
  F extends Record<PropertyKey, unknown>,
  R extends Record<PropertyKey, unknown>[]
> = [F, ...R]

export type MergeContext<H extends Record<PropertyKey, unknown>[]> = H extends []
  ? {}
  : H extends First<infer C, []>
  ? C
  : H extends First<infer C, infer R>
  ? C & MergeContext<R>
  : {}

export type Context<
  Value extends Record<PropertyKey, unknown>,
  Props extends Record<PropertyKey, unknown>,
  Selectors extends Selector<Value, Props>[]
> = Value & MergeContext<DefineContext<Value, Props, Selectors>>

export type VContextProvider<Props extends Record<PropertyKey, unknown>> = FunctionalComponent<
  Props,
  {}
>
