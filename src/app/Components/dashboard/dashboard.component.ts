import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  title = "Keep ";
  searchText = " ";

  constructor(private router: Router) {} // Inject Router

  // Function to navigate to the archive page
  navigateToArchive() {
    this.router.navigate(['/dashboard/archive']); // Ensure route matches app-routing.module.ts
  }
  navItems = [
    { name: "Notes", icon: "lightbulb_outline" },
    { name: "Reminders", icon: "notifications_none" },
    { name: "Edit labels", icon: "edit" },
    { name: "Archive", icon: "archive" },
    { name: "Trash", icon: "delete" },
  ]

  

}