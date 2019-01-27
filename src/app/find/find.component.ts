import { Component } from '@angular/core';
import { latLng, tileLgitayer, marker } from 'leaflet';

@Component({
    selector: 'app-find',
    templateUrl: './find.component.html',
    styleUrls: ['./find.component.scss']
})
export class FindComponent {
    options = {
        layers: [
            tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
        ],
        zoom: 15,
        center: latLng(54.3989846, 18.571970),
    };
    layers = [
        marker([54.3989846, 18.571970])
    ];
}
