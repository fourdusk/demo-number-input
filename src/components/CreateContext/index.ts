import { h, Fragment, provide, InjectionKey, inject, defineComponent } from 'vue'
import { Selector, Context, VContextProvider } from './types'

/**
 * Compose context with hooks
 * @param useValue function for init context state
 * @param selectors hooks with context
 */
export function createContext<
  Props extends Record<PropertyKey, unknown>,
  Value extends Record<PropertyKey, unknown>,
  Selectors extends Selector<Value, Props>[]
>(useValue: (props: Props) => Value, ...selectors: Selectors) {
  const injectionKey: InjectionKey<Context<Value, Props, Selectors>> = Symbol()

  const NO_PROVIDER = {}

  const ContextProvider: VContextProvider<Props> = (props, { slots }) => {
    return h(
      defineComponent({
        name: ContextProvider.displayName ?? 'Provider',
        setup() {
          const initialContext = useValue(props)
          const hookContextValues = selectors.reduce((merged, selector) => {
            return Object.assign({}, merged, selector.call(null, initialContext, props))
          }, Object.create(null))

          provide(injectionKey, Object.assign({}, initialContext, hookContextValues))
          return () => h(Fragment, slots.default?.() ?? [])
        }
      })
    )
  }

  function useContext() {
    const context = inject(injectionKey, NO_PROVIDER) as Context<Value, Props, Selectors>

    if (context === NO_PROVIDER) {
      console.warn('The ContextProvider is never used.')
    }

    return context
  }

  return [ContextProvider, useContext] as const
}
