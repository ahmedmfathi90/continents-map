import fs from 'fs';
import { merge } from 'topojson-client';
import { countryToContinentMap } from '../data/continents';

async function run() {
  const res = await fetch('https://unpkg.com/world-atlas@2.0.2/countries-110m.json');
  const topology = await res.json() as any;
  
  const continents = ["Africa", "Asia", "Europe", "South America", "Australia", "North America", "Antarctica"];
  
  const features = continents.map(continent => {
    const geometries = topology.objects.countries.geometries.filter((g: any) => countryToContinentMap[g.properties.name] === continent);
    const mergedGeo = merge(topology, geometries);
    return {
      type: "Feature",
      geometry: mergedGeo,
      properties: { continent }
    };
  });
  
  const geojson = {
    type: "FeatureCollection",
    features
  };
  
  fs.writeFileSync('src/data/continentsGeo.json', JSON.stringify(geojson));
  console.log("Done");
}
run();
