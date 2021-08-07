import { defineComponent } from 'vue'

export interface IBlockChild {
  component: ReturnType<typeof defineComponent>
  children?: IBlockChild[]
  attributes?: Record<string, string | number | Array<unknown> | Record<string, unknown>>
}

export interface IBlock {
  name: string,
  nextBlockName?: string
  children?: IBlockChild[]
}
