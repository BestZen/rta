import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { UserPage } from '../user/user';
import { ParticipantPage } from '../participant/participant';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ParticipantPage;
  tab3Root: any = UserPage;

  constructor() {

  }
}
