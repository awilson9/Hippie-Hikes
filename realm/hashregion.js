import realm from './index';

let regions = realm.objects('Region');
let guides = realm.objects('Guide');

var regionAreas = {}
var regionStates = {}

regions.forEach(function(region){
  var containedAreas = [];
  var containedStates = [];
  guides.forEach(function(guide){
    if(guide.location_loc.area==region.area){
      containedAreas.push(guide);
    }
    if(guide.location_loc.state==region.state){
      containedStates.push(guide);
    }
  });
  regionAreas[region.area] = containedAreas;
  regionStates[region.state] = containedStates;
});


var region = {
  areas:regionAreas,
  states:regionStates
};
export default region;
