import Realm from 'realm';
var guides = require('./guide');
var tags = require('./tag');
var regions = require('./region');

const TagSchema =  {
  name:'Tag',
  properties:{
    name:'string',
    type:{type:'string', optional:true}
  }
};

const CoordinatesSchema = {
  name:'Coordinates',
  properties:{
    key:'int',
    latitude:'double',
    longitude:'double',
    altitude:{type:'double', optional:true},
    description:{type:'string', optional:true},
    guide:{type:'string', optional:true}
  }
};

const LocationSchema = {
  name:'Location',
  properties:{
    trail:'string',
    coordinates:{type:'list', objectType:'Coordinates'}
  }
};

const LocalSchema = {
  name:'Region',
  properties:{
    area:'string',
    description:'string',
    state:'string'
  }
};
const ImageDescriptionSchema = {
  name:'ImageDescription',
  properties:{
    guide:'string',
    img_index:'int',
    description_1:{type: 'string', optional:true},
    description_2:{type: 'string', optional:true}
  }
}

const GuideSchema = {
  name:'Guide',
  primaryKey:'name',
  properties:{
    name:'string',
    name_description:'string',
    location_loc:'Region',
    closest_to:'string',
    tags:{type:'list', objectType:'Tag'},
    distance:'double',
    elevation:'int',
    similar_hikes:{type:'list', objectType:'Guide'},
    description:'string',
    img_descriptions:{type:'list',objectType:'ImageDescription'},
    hyperlapse:{type:'string', optional:true},
    gallSize:'int',
    display:'int',
    featured:{type:'bool', default:false},
    favorited:{type:'bool', default:false},
    new:{type:'bool', default:true},
    downloaded:{type:'bool', default:false},
    displayedElsewhere:'int',
    waypoints:{type:'list', objectType:'Coordinates'}

  }
};
const CreatedSchema = {
  name:'Created',
  properties:{
    name:'string',
    created:'bool',
    }
};
let realm = new Realm({schema:[TagSchema, GuideSchema, CreatedSchema, ImageDescriptionSchema,LocalSchema, CoordinatesSchema, LocationSchema]});



let created = realm.objects('Created');
if(created.length==0){
  tags.createTags(realm);
  regions.createRegions(realm);
  guides.createGuides(realm);
  realm.write(() => {
    realm.create('Created', {
      name:'created',
      created:true
    });
  });
}

export default realm;
