export interface Core {
    core_serial?: string;
    land_success?: boolean;
  }
  
  export interface FirstStage {
    cores: Core[];
  }
  
  export interface Rocket {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
    first_stage: FirstStage; 
  }
  
  export interface Mission {
    mission_name: string;
    launch_year: string;
    details: string;
    mission_patch_small: string;
    launch_success?: boolean;
    land_success?: boolean;
    rocket: Rocket;
    flight_number: number;
  }