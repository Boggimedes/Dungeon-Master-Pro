import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Campaign } from '../../models/campaign'
import { GameMap} from '../../models/game-map'

@Injectable({
  providedIn: 'root'
})
export class StoryService {
    private campaignListSource    = new BehaviorSubject<Campaign[]>([]);
	public  campaignList$	        = this.campaignListSource.asObservable();
	private campaignSource    =  new BehaviorSubject<Campaign>(new Campaign);
	public  campaign$	        = this.campaignSource.asObservable();
	private mapSource    = new BehaviorSubject<GameMap>(new GameMap);
	public  map$	        = this.mapSource.asObservable();
    public day;

    constructor(private http: HttpClient) {

  }

    getCampaigns = () => {
        this.http.get('/api/campaigns').subscribe((data:{campaigns: Campaign[]}) => this.campaignListSource.next(data.campaigns));
    }

    getCampaign = (id) => {
        this.http.get('/api/campaign/' + id).subscribe((data:{campaign: Campaign}) => this.campaignSource.next(data.campaign));
    }

    getMap = (id) => {
        let cId = this.campaignSource.getValue() ? this.campaignSource.getValue().id : null;
        this.http.post('/api/map/' + id,{campaignId: cId}).subscribe((data:{map: GameMap}) => this.mapSource.next(data.map));
    }


}