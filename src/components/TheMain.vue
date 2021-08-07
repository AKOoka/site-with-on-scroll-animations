<script lang="ts">
import { VNode, h, defineComponent, onMounted, ref, Ref, PropType } from 'vue'
import AppPageBlock from './AppPageBlock.vue'
import { IBlockBoundariesY } from '../types/IBlockBoundariesY'
import { IBlock, IBlockChild } from '../types/IBlock'

export default defineComponent({
  name: 'TheMain',
  props: {
    contentBlocks: {
      type: Array as PropType<IBlock[]>,
      required: true,
      validator (this: void, contentBlocks: IBlock[]): boolean {
        return contentBlocks instanceof Array
      },
      default (this: void): IBlock[] {
        return []
      }
    }
  },
  setup (props) {
    const pageBlocksBoundariesY: IBlockBoundariesY[] = []
    const visibleBlocks: Array<Ref<boolean>> = props.contentBlocks.map(() => ref(false))
    let timer = 0
    let boundariesIndex = 0

    const addBlockBoundariesY = (blockBoundariesY: IBlockBoundariesY): void => {
      pageBlocksBoundariesY.push(blockBoundariesY)
    }

    const checkBlockInView = (y: number, blockBoundariesY: IBlockBoundariesY): boolean => {
      return y >= blockBoundariesY.y && y <= blockBoundariesY.y + blockBoundariesY.height
    }

    const checkBlocksInView = (y: number) => {
      for (let i = 0; i < visibleBlocks.length; i++) {
        if (checkBlockInView(y, pageBlocksBoundariesY[i])) {
          clearTimeout(timer)
          timer = setTimeout(() => {
            visibleBlocks[i].value = checkBlockInView(y, pageBlocksBoundariesY[i])
          }, 50)
        } else {
          visibleBlocks[i].value = false
        }
      }
    }

    const resizeBoundariesY = (blockBoundariesY: IBlockBoundariesY): void => {
      pageBlocksBoundariesY[boundariesIndex] = blockBoundariesY
      boundariesIndex = (boundariesIndex + 1) % pageBlocksBoundariesY.length
      checkBlocksInView(window.scrollY + window.innerHeight / 2)
    }

    onMounted(() => {
      window.scroll({ top: 0 })
      visibleBlocks[0].value = true

      window.onscroll = () => {
        checkBlocksInView(window.scrollY + window.innerHeight / 2)
      }
    })

    const createNodeFromBlockChild = (block: IBlockChild): VNode => (
      h(
        block.component,
        block.attributes,
        { default () { return block.children?.map(c => createNodeFromBlockChild(c)) } }
      )
    )

    const createNodeBlockFromBlock = (): VNode[] => {
      return props.contentBlocks.map((v, i) => (
        h(
          AppPageBlock,
          {
            'block-id': v.name,
            'next-block-id': v.nextBlockName,
            visible: visibleBlocks[i].value,
            onMountedTemplate: addBlockBoundariesY,
            onResizeTemplate: resizeBoundariesY
          },
          { default () { return v.children?.map(v => createNodeFromBlockChild(v)) } }
        )
      ))
    }

    return () => (
      h(
        'main',
        {},
        { default () { return createNodeBlockFromBlock() } }
      )
    )
  }
})

</script>
