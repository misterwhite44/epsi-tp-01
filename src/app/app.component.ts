import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/shared/header/header.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { NotificationComponent } from "./notification/notification.component";

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, HeaderComponent, FooterComponent, NotificationComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tp01_ANGULAR_ePsi';
}
