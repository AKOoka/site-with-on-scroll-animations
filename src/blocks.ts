import AppText from './components/AppText.vue'
import AppGallery from './components/AppGallery.vue'
import AppForm from './components/AppForm.vue'
import { IBlock } from './types/IBlock'
import { AppearAnimation } from './types/AppearAnimation'

export const blocks: IBlock[] = [
  {
    name: 'first',
    nextBlockName: 'second',
    children: [
      {
        component: AppText,
        attributes: {
          heading: {
            type: 'h1',
            content: 'First'
          },
          'content-text': 'Lorem ipsum dolor sit amet et sapien sed elementum egestas dolore condimentum. Sed sodales venenatis arcu, id varius justo euismod in.',
          appearAnimation: AppearAnimation.Opacity
        }
      }
    ]
  },
  {
    name: 'second',
    nextBlockName: 'third',
    children: [
      {
        component: AppText,
        attributes: {
          heading: {
            type: 'h2',
            content: 'Second'
          },
          'content-text': 'Lorem ipsum dolor sit amet et sapien sed elementum egestas dolore condimentum. Fusce blandit ultrices sapien, in accumsan orci rhoncus eu. Sed sodales venenatis arcu, id varius justo euismod in. Curabitur egestas consectetur magna.',
          appearAnimation: AppearAnimation.SlidingRight
        }
      }
    ]
  },
  {
    name: 'third',
    nextBlockName: 'fourth',
    children: [
      {
        component: AppText,
        attributes: {
          heading: {
            type: 'h2',
            content: 'Third'
          },
          'content-text': 'Lorem ipsum dolor sit amet et sapien sed elementum egestas dolore condimentum. Fusce blandit ultrices sapien, in accumsan orci rhoncus eu. Sed sodales venenatis arcu, id varius justo euismod in. Curabitur egestas consectetur magna.',
          appearAnimation: AppearAnimation.SlidingLeft
        }
      }
    ]
  },
  {
    name: 'fourth',
    nextBlockName: 'fifth',
    children: [
      {
        component: AppText,
        attributes: {
          heading: {
            type: 'h2',
            content: 'Fourth'
          },
          'content-text': 'Lorem ipsum dolor sit amet et sapien sed elementum egestas dolore condimentum.  Fusce blandit ultrices sapien, in accumsan orci rhoncus eu. Sed sodales venenatis arcu, id varius justo euismod in. Curabitur egestas consectetur magna vitae.'
        }
      },
      {
        component: AppGallery,
        attributes: {
          'img-names': [
            'person-with-umbrella.jpg',
            'interior-wall.jpg',
            'airport-interior.jpg',
            'person-with-mask.jpg',
            'coral-shell.jpg',
            'city-street.jpg'
          ]
        }
      }
    ]
  },
  {
    name: 'fifth',
    children: [
      {
        component: AppText,
        attributes: {
          heading: {
            type: 'h2',
            content: 'Fifth'
          },
          'content-text': 'Lorem ipsum dolor si amet et sapien sed elementum egestas dolore condimentum.'
        }
      },
      {
        component: AppForm
      }
    ]
  }
]
