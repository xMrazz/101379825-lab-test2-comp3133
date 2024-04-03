import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SpacexDataService } from '../spacex-data.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionListComponent implements OnInit {
  @Input() missions: Mission[] = [];

  constructor(private spacexService: SpacexDataService, private router: Router) {}

  ngOnInit() {
    if (!this.missions.length) {
      this.spacexService.getLaunches().subscribe(data => {
        this.missions = data;
      });
    }
  }

  goToMissionDetails(flightNumber: number) { 
    this.router.navigate(['/missions', flightNumber.toString()]); 
  } 
}