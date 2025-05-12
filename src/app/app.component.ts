import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  CodeGameComponen } from "./components/code-game.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CodeGameComponen],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
