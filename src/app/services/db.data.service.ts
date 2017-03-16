import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// interface DbWorksPropertiesInterface {
//     role: string,
//     comPro: string;
//     href: string;
//     initialTime: string;
//     finalTime: string;
//     amount: string;
//     city: string;
//     country: string;
//     description: string;
// }
@Injectable()
export class DbDataService {
    public currentElasticDbState: any = null;
    public activeElasticDbStateSubject: Subject<Array<any>> = new Subject<Array<any>>();
    public activeElasticDbStateObservable: Observable<Array<any>> = this.activeElasticDbStateSubject.asObservable();
    constructor(private http: Http) { }

    private setElasticDbState(nextState: any): void {
        console.log('from the client ElasticDbService', nextState);
        this.currentElasticDbState = nextState;
        this.activeElasticDbStateSubject.next(nextState);
    }

    sendRequest(): void {
        console.log('db.data.service response')
        this.http.get('/db/data').subscribe((data: Response) => {
            try {
                console.log('here is the elasticData from service: ',data.json().elasticDBArray );
                this.setElasticDbState(data.json().elasticDBArray);
            }
            catch (err) {
                console.log(err);
            }
        });
    }

}