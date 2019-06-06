import {
  Injectable
} from '@angular/core';

export class ContextItem {
  text: string;
  disabled: boolean;
  beginGroup: boolean;
  items: any;
}


const contextItems: ContextItem[] = [
  {
    text: 'Detail',
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
