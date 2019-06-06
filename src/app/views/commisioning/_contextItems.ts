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
    text: 'Detail',
    disabled: false,
    beginGroup: false,
    items: false
  },
  {
    text: 'Edit',
    disabled: true,
    beginGroup: false,
    items: false
  },
  {
    text: 'Delete',
    disabled: true,
    beginGroup: false,
    items: false
  },
  {
    text: 'Commisioning',
    disabled: false,
    beginGroup: true,
    items: [{
        text: 'Activate'
      },
      {
        text: 'Deactivate'
      },
    ]
  },
  {
    text: 'Comm Test',
    disabled: false,
    beginGroup: true,
    items: [{
        text: 'Ping! Modem'
      },
      {
        text: 'Ping! Meter'
      },
      {
        text: 'Restart Modem',
        disabled: true
      },
      {
        text: 'Signal Strength',
        disabled: true
      }
    ]
  },
  {
    text: 'Meter Reading',
    disabled: false,
    beginGroup: true,
    items: [{
        text: 'Instant Realtime'
      },
      {
        text: 'Load Profile'
      },
      {
        text: 'Billing'
      },
      {
        text: 'Event'
      }
    ]
  },
  {
    text: 'Meter Writing',
    disabled: false,
    beginGroup: true,
    items: [{
        text: 'Remote Trip'
      },
      {
        text: 'Limitation',
        disabled: true
      },
      {
        text: 'Change Password',
        disabled: true
      },
      {
        text: 'Upgrade Firmware',
        disabled: true
      },
      {
        text: 'Time Sync',
        disabled: true
      }
    ]
  }
];

@Injectable()
export class ContextItemService {
    getContextItems(): ContextItem[] {
        return contextItems;
    }
}
