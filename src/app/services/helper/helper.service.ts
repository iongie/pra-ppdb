import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    // private elementRef: ElementRef
  ) { }

  // copyContentPin() {
  //   const textToCopy = this.elementRef.nativeElement.querySelector('#pin').innerHTML;
  //   navigator.clipboard.writeText(textToCopy)
  //     .then(() => {
  //       console.log('Content copied to clipboard');
  //     })
  //     .catch((error) => {
  //       console.error('Failed to copy: ', error);
  //     });
  // }

  minmaxCoor(coordinates: google.maps.LatLngLiteral[]) {
    return coordinates.reduce((acc, coord) => {
      return {
        maxLat: Math.max(acc.maxLat, coord.lat),
        minLat: Math.min(acc.minLat, coord.lat),
        maxLng: Math.max(acc.maxLng, coord.lng),
        minLng: Math.min(acc.minLng, coord.lng)
      };
    }, {
      maxLat: -Infinity,
      minLat: Infinity,
      maxLng: -Infinity,
      minLng: Infinity
    });
  }

  padNumber(value: string, digitCount: number): string {
    let paddedValue = value;
    while (paddedValue.length < digitCount) {
      paddedValue = '0' + paddedValue;
    }
    return paddedValue;
  }

  modifKodeWilayah(kode_wilayah: string) {
    return kode_wilayah.replace(/\./g, "_") + ".json";
  }
}
