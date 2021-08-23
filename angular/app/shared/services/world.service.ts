import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { World } from '../../models/world'
import { Region } from '../../models/region'

@Injectable({
  providedIn: 'root'
})
export class WorldService {

    private npcsSource = new BehaviorSubject<any>([]);
	public  npcs$	     = this.npcsSource.asObservable();

    private selectedNpcSource = new BehaviorSubject<any>([]);
	public  selectedNpc$	     = this.selectedNpcSource.asObservable();

    private worldDataSource = new BehaviorSubject<World>(new World);
	public  worldData$	     = this.worldDataSource.asObservable();

    public showFile;

  constructor(private http: HttpClient,) { }

    getWorld = (id) => {
        this.http.get('/api/world/' + id).subscribe((data: {world: World}) => this.worldDataSource.next(data.world));
    }

    getRegion = (id) => {
        this.http.get('/api/region/' + id).subscribe((data: {region: Region}) => this.worldDataSource.next(data.region));
    }

    getNpc = (npcId) => {
        this.http.get('/api/npc/' + npcId).subscribe((data: {npc: any}) => this.selectedNpcSource.next(data.npc));
    }

    getNpcs = (regionId) => {
        return this.http.get('/api/npcs/region/' + regionId);
    }
    
    getAspects = () => {
        return this.http.get('/api/aspects');
    }

    updateNpc = (params) => {
        return this.http.post('/api/npcs/npc/update', params);
    }
    addNpc = (params) => {
        return this.http.post('/api/npcs/npc/add', params);
    }
    deleteNpc = (params) => {
        return this.http.post('/api/npcs/npc/delete', params);
    }
    // seedRegion = (params) => {
    //     const call = this.http.post('/api/npcs/seedregion', params).pipe(share());
    //     call.subscribe((data) => this.worldDataSource.next(data));
    //     return call;
    // }
    // getRegions = (params) => {
    //     return this.http.post('/api/npcs/region/get', params);
    // }
    // ageRegion = (params) => {
    //     const call = this.http.post('/api/npcs/ageregion', params).pipe(share());
    //     call.subscribe((data) => this.worldDataSource.next(data));
    //     return call;
    // }
    // updateRegion = (params) => {
    //     const call = this.http.post('/api/npcs/region/update', params).pipe(share());
    //     call.subscribe((data) => this.worldDataSource.next(data));
    //     return call;
    // }
    // clearRegion = (params) => {
    //     const call = this.http.post('/api/npcs/region/clear', params).pipe(share());
    //     call.subscribe((data) => this.worldDataSource.next(data));
    //     return call;
    // }
    // addRegion = (params) => {
    //     const call = this.http.post('/api/npcs/region/add', params).pipe(share());
    //     call.subscribe((data) => this.worldDataSource.next(data));
    //     return call;
    // }
    // deleteRegion = (params) => {
    //     const call = this.http.post('/api/npcs/region/delete', params).pipe(share());
    //     call.subscribe((data) => this.worldDataSource.next(data));
    //     return call;
    // }
    // deleteWorld = (params) => {
    //     const call = this.http.post('/api/npcs/world/delete', params).pipe(share());
    //     call.subscribe((data) => this.worldDataSource.next(data));
    //     return call;
    // }
    getDescriptives = (params) => {
        return this.http.post('/api/npcs/descriptives/get', params);
    }
    updateDescriptives = (params) => {
        return this.http.post('/api/npcs/descriptives/update', params);
    }
    updateNpcRecord = (table,params) => {
        return this.http.post('/api/npcs/'+table+'/update', params);
    }
    deleteNpcRecord = (table,params) => {
        return this.http.post('/api/npcs/'+table+'/delete', params);
    }
    addDescriptives = (params) => {
        return this.http.post('/api/npcs/descriptives/add', params);
    }
    deleteDescriptives = (params) => {
        return this.http.post('/api/npcs/descriptives/delete', params);
    }


}


