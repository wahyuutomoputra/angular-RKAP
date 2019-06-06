import {
  Injectable
} from '@angular/core';

export class ContextItem {
  text: string;
  disabled: boolean;
  beginGroup: boolean;
  items: any;
  visible?: boolean;
}


const contextItems: ContextItem[] = [{
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
  },
  {
    text: 'Activation',
    disabled: false,
    beginGroup: true,
    items: false
  },
  {
    text: 'Change Password',
    disabled: false,
    beginGroup: true,
    items: false,
    visible: true
  },
  {
    text: 'Upgrade Firmware',
    disabled: false,
    beginGroup: false,
    items: false,
    visible: true
  },
  {
    text: 'Time Sync',
    disabled: false,
    beginGroup: false,
    items: false,
    visible: true
  }
];

@Injectable()
export class ContextItemService {
    getContextItems(): ContextItem[] {
        return contextItems;
    }
}
