import {
  Injectable
} from '@angular/core';

export class ContextItem {
  text: string;
  disabled: boolean;
  beginGroup: boolean;
  items: any;
}


const contextItems: ContextItem[] = [{
  text: 'Add',
  disabled: false,
  beginGroup: false,
  items: false
},
{
  text: 'Detail',
    disabled: false,
    beginGroup: false,
    items: false
  },
  {
    text: 'Edit',
    disabled: false,
    beginGroup: false,
    items: false
  },
  {
    text: 'Delete',
    disabled: false,
    beginGroup: false,
    items: false
  }
];

@Injectable()
export class ContextItemService {
    getContextItems(): ContextItem[] {
        return contextItems;
    }
}
