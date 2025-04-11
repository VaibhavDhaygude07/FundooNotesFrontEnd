import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../Services/DataService/data.service';


@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  title = "Keep";
  searchText: string = "";
  activeItem: string = 'Notes';

  constructor(private router: Router, private data: DataService) {}

  navItems = [
    { name: "Notes", icon: "lightbulb_outline", route: "/dashboard/notes" },
    { name: "Reminders", icon: "notifications_none", route: "/dashboard/reminders" },
    { name: "Edit labels", icon: "edit", route: "/dashboard/labels" },
    { name: "Archive", icon: "archive", route: "/dashboard/archive" },
    { name: "Trash", icon: "delete", route: "/dashboard/trash" },
  ]

  navigateTo(route: string, itemName: string) {
    this.activeItem = itemName;
    this.router.navigate([route]);
  }

  

  search(event: any) {
   console.log(event.target.value);
    this.data.outgoingData(event.target.value);
  }


}