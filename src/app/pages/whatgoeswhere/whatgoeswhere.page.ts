import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-whatgoeswhere',
  templateUrl: './whatgoeswhere.page.html',
  styleUrls: ['./whatgoeswhere.page.scss'],
})

export class WhatgoeswherePage {

    materials: {name: any, id: any}[] = [];
    materialstemp: string[] = [];
    searchResults: {name: any, id: any}[] = [];
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
            
            var obj = {func: "get_material_names"};
            
            this.http.post("https://recycle.hpc.tcnj.edu/php/materials-handler.php", JSON.stringify(obj)).subscribe(data => {
            
                var result = data as any[];

                for(var i = 0; i < result.length; i++){
                    this.materials.push({name: result[i]["material_name"], id: result[i]["material_id"]});
                }

                this.searchResults = this.materials;
            });
        }
    }

    popularMaterials(){
        var obj = {func: "get_material_stats"};
            
        this.http.post("https://recycle.hpc.tcnj.edu/php/graphs-handler.php", JSON.stringify(obj)).subscribe(data => {
        
            var result = data as any[];

            console.log(result["top_materials"]);

            //console.log();

            // want the top 6 materials to be displayed
            for(var i = 0; i < 6; i++){
                this.popMaterials.push({name: result["top_materials"][i]["material_name"], id: result["top_materials"][i]["material_id"]});
            }
        });
    }


   
    searchMaterials(ev: any) {

        // set val to the value of the searchbar
        const searchString = ev.target.value;

        if (searchString && searchString.trim() != '') {
            //Create an object that can be turned into a JSON string and sent to the database with an HTTP post
            var obj = {func: "live_search", searchString: searchString};
            
            //Post the search string and get a response
            this.http.post("https://recycle.hpc.tcnj.edu/php/materials-handler.php", JSON.stringify(obj)).subscribe(data => {
            
                var result = data as any[];

                this.searchResults = [];

                for(var i = 0; i < result.length; i++){
                    this.searchResults.push({name: result[i]["material_name"], id: result[i]["material_id"]}); 
                }


            },(error : any) =>
            {
                //If the connection doesn't work, an error message is sent.
                alert(error); 
            });
        }
        else{
            // Reset items back to all of the items
            this.getAllMaterials();

        }   

    }

    // this function is to send the material ID to the materials-specs page 
    openDetailsWithState(ev: any) {
        
        console.log("Ev: " + ev);
        console.log("On click ID: " + ev.target.getAttribute('data-material-id'));

        let navigationExtras: NavigationExtras = {
            state: {
              searchResults: ev.target.getAttribute('data-material-id')
            }
          };
        this.router.navigate(['/material-specs'], navigationExtras);
      }
   
    segmentChanged(ev: any) {
        //console.log('Segment changed', ev);
    }
}