import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-whatgoeswhere',
  templateUrl: './whatgoeswhere.page.html',
  styleUrls: ['./whatgoeswhere.page.scss'],
})

export class WhatgoeswherePage {

    materialsBackup: { [key: number]: any } = {};

    materials: {id: any, name: any, type: any}[] = [];

    searchResults: {id: any, name: any, type: any}[] = [];

    type: string; // used to initialize tab to the view all page 

    popMaterials: {name: any, id: any}[] = [];

    constructor(private router: Router, public http: HttpClient) {

        this.getAllMaterials();
        this.popularMaterials();
        this.type = 'all';
    }

    getAllMaterials() {

        if(this.materials.length > 0){
            this.searchResults = this.materials;
        }
        else{
            
            var obj = {func: "get_all_materials"};
            
            this.http.post("https://recycle.hpc.tcnj.edu/php/materials-handler.php", JSON.stringify(obj)).subscribe(data => {
            
                var result = data as any[];

                for(var i = 0; i < result.length; i++){
                    this.materials.push({id: result[i]["material_id"], name: result[i]["material_name"], type: result[i]["material_type"]});

                    this.materialsBackup[result[i]["material_id"]] = result[i];
                }

                this.searchResults = this.materials;
            });
        }
    }

    popularMaterials(){
        var obj = {func: "get_material_stats"};
            
        this.http.post("https://recycle.hpc.tcnj.edu/php/graphs-handler.php", JSON.stringify(obj)).subscribe(data => {
        
            var result = data as any[];

            // want the top 6 materials to be displayed
            for(var i = 0; i < 6; i++){
                this.popMaterials.push({name: result["top_materials"][i]["material_name"], id: result["top_materials"][i]["material_id"]});
            }
        });
    }

    async searchMaterials(ev: any) {
        this.searchResults = this.materials;
        const searchString = ev.target.value;
      
        if (!searchString) {
          return;
        }
      
        this.searchResults = this.searchResults.filter(currMaterial => {
            return (currMaterial.name.toLowerCase().indexOf(searchString.toLowerCase()) > -1 || currMaterial.type.toLowerCase().indexOf(searchString.toLowerCase()) > -1);
        });
    }

    // this function is to send the material ID to the materials-specs page 
    openDetailsWithState(ev: any) {

        let navigationExtras: NavigationExtras = {
            state: {
              searchResults: this.materialsBackup[ev.target.getAttribute('data-material-id').toString()]
            }
          };
        this.router.navigate(['/material-specs'], navigationExtras);
    }
}