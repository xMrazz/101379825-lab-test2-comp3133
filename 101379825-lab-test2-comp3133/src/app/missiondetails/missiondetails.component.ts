import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { SpacexDataService } from '../spacex-data.service';
import { Mission } from '../models/mission';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissionDetailsComponent implements OnInit {
  mission: Mission | undefined;

  constructor(
    private route: ActivatedRoute,
    private spacexService: SpacexDataService
  ) { }
  

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const flightNumber = params.get('flightNumber');
        if (!flightNumber) {
          return throwError(() => new Error('Flight number is missing'));
        }
        return this.spacexService.getLaunchById(flightNumber);
      })
    ).subscribe({
      next: (mission) => {
        this.mission = mission as Mission;
      },
      error: (error) => {
        console.error('Failed to load mission details:', error);
      }
    });
  }
}