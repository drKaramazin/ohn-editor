import { ElementClass } from './element-class';
import { ClassDescription } from './class-description';
import { Describe } from './class-description';

export const DESCRIPTION: ClassDescription = {
  [ElementClass.Application]: {
    icon: 'fas fa-globe',
  },
  [ElementClass.Sequence]: {
    icon: 'fas fa-cog',
  },
  [ElementClass.Page]: {
    icon: 'fas fa-file',
  },
  [ElementClass.Dict]: {
    icon: 'fas fa-dice-d20',
  },
  [ElementClass.Array]: {
    icon: 'fas fa-layer-group',
  },
  [ElementClass.CSVReport]: {
    icon: 'fas fa-file-csv',
  },
  [ElementClass.Image]: {
    icon: 'fas fa-file-image',
  },
  [ElementClass.Content]: {
    icon: 'fas fa-box-open',
  },
  [ElementClass.Randomization]: {
    icon: 'fas fa-random',
  },
  [ElementClass.Numeric]: {
    icon: 'fas fa-square-root-alt',
  }
};

export const DEFAULT_DESCRIPTION: Describe = {
  icon: 'far fa-file',
}
