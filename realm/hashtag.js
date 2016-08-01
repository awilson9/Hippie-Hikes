import realm from './index';

let tags = realm.objects('Tag');
let guides = realm.objects('Guide');

var taghash = {};

tags.forEach(function(tag){
  var containedGuides = [];
  guides.forEach(function(guide){
    guide.tags.forEach(function(guideTag){
      if(guideTag.name==tag.name){
        containedGuides.push(guide);
      }
    });
  });
  taghash[tag.name] = containedGuides;
});

export default taghash;
