import { Component, OnInit } from '@angular/core';
import { SpacexDataService } from '../spacex-data.service';
import { Mission } from '../models/mission';

@Component({
  selector: 'app-missionfilter',
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css']
})
export class MissionfilterComponent implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];
  selectedYear: string = '';
  isLaunchSuccessActive: boolean | null = null;
  isLandingSuccessActive: boolean | null = null;

  constructor(private spacexService: SpacexDataService) {}

  ngOnInit(): void {
    this.spacexService.getLaunches().subscribe(data => {
      this.missions = data;
      this.filteredMissions = data;
    });
  }

  getYears(): number[] {
    return this.missions
      .map(mission => parseInt(mission.launch_year))
      .filter((year, index, array) => array.indexOf(year) === index)
      .sort();
  }

  onFilterChange(): void {
    this.filteredMissions = this.missions.filter(mission => {
      return (!this.selectedYear || mission.launch_year === this.selectedYear) &&
             (this.isLaunchSuccessActive === null || mission.launch_success === this.isLaunchSuccessActive) &&
             (this.isLandingSuccessActive === null || mission.rocket.first_stage.cores.some(core => core.land_success === this.isLandingSuccessActive));
    });
  }

  toggleLaunchSuccess(success: boolean): void {
    this.isLaunchSuccessActive = this.isLaunchSuccessActive === success ? null : success;
    this.onFilterChange();
  }

  toggleLandingSuccess(success: boolean): void {
    this.isLandingSuccessActive = this.isLandingSuccessActive === success ? null : success;
    this.onFilterChange();
  }
}