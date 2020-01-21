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
  }
};

export const DEFAULT_DESCRIPTION: Describe = {
  icon: 'far fa-file',
}
