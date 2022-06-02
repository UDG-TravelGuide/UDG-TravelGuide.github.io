import { Component } from '@angular/core';
import { faRoute, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public get faRouteIcon(): IconDefinition { return faRoute; }

  title = 'travel-guide-bo';
  colors = { primaryOrange: '#FF690F', backgroundColor: '#FFF6F0' };
}
