import { Component, OnInit } from '@angular/core';
declare let L;
import '../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js'

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { StationService } from '../station.service.js';
@Component({
  selector: 'app-calcul-ditineraire',
  templateUrl: './calcul-ditineraire.component.html',
  styleUrls: ['./calcul-ditineraire.component.css']
})
export class CalculDitineraireComponent implements OnInit {
    private heures=['00','01','02','03','04','05','06','07','08','09','10',
                     '11','12','13','14','15','16','17','18','19','20','21','22','23'];
    private minutes=['00','05','10','15','20','25','30','35','40','45','50','55'];
   //carte
     villes =         
    [["Cité Olympique",36.838487, 10.181973], 
     ["10 décembre",36.844252, 10.184205], 
     ["El Fel",36.846970, 10.192433],
     ["My position",36.8601, 10.1934]
    ];
    private  cityIcon = L.icon({
      iconUrl: 'assets/metro.png',
      iconSize: [37,37],
      iconAnchor: [16,37],
      popupAnchor:  [0,-37]
    });
    // code pour cacher la légende
    private code:boolean = true;
    h;
    stations;
    // déclaration des variables de bsDatepicker
      //  bsValue = new Date();
        bsRangeValue: Date[];
        minDate: Date;
        maxDate: Date;
        bsConfig: Partial<BsDatepickerConfig>;
        isOpen = false;
    constructor(private stationService:StationService)
     { 
      this.minDate = new Date();
      this.maxDate = new Date();
      this.minDate.setDate(this.minDate.getDate() - 1);
      this.maxDate.setDate(this.maxDate.getDate() + 7);
     }
  
  ngOnInit()
   {
    this.stationService.getAllStations().subscribe(data=>{
      this.stations=data;
      console.log(this.stations);
      this.addMapWithMarkers();
    },err=>{console.log(err)})
   }



  addMapWithMarkers(){
    var map = L.map('map').setView([36.844252, 10.184205], 9);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
     
      L.mPolyline = L.FeatureGroup.extend({
        initialize: function(items, icon) {
          this._layers = {};
          this.addLayer(new L.Polyline(this._pointsArray(items)));
          this.addLayer(this._markersArray(items, icon));
        }, 
        _pointsArray: function(items) {
          var pointsArray = new Array();
          for (var i = 0; i < items.length; i++) {
            var item = items[i];
            pointsArray.push(new L.LatLng(item[1],item[2]));
          }
          return pointsArray;
        },
        _markersArray: function(items, icon) {
          var markers = new L.featureGroup();
          for	 (var i = 0; i < items.length; i++) {
            var item = items[i];
            let marker = new L.marker([item[1],item[2]], {icon: icon}).bindPopup(item[0]);
            markers.addLayer(marker);
          }
          markers.on('mouseover', function(e){ e.layer.openPopup(); })
              .on('mouseout', function(e){ e.layer.closePopup(); });
          return markers;
        }

      })
      var trajet = new L.mPolyline(this.villes, this.cityIcon);
      console.dir(trajet);
          map.addLayer(trajet);
          map.fitBounds(trajet.getBounds());

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((function (position) {
                var marker = L.marker([position.coords.latitude, position.coords.longitude]).addTo(map);
                console.log("position.coords.latitude="+position.coords.latitude+"position.coords.longitude"+position.coords.longitude);
                marker.bindPopup("Ma position :<br> Latitude : " + position.coords.latitude + ',<br>Longitude ' + position.coords.longitude).openPopup();
            }));
        } else {
            alert("La géolocalisation n'est pas supportée par ce navigateur.");
        }
}

hidePannelBody(){
  this.code=!this.code;
}

// When the user clicks on the button, scroll to the top of the document
topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
//Recherche Forms
onSearch(form){
  console.log(form);
}

}
