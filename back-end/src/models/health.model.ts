type HealthStatus = 'ONLINE' | 'FAILED';

export default class Health {
  private status: HealthStatus;
  private time: Date;

  constructor(status: HealthStatus, time: Date) {
    this.status = status;
    this.time = time;
  }
}
