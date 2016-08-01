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
    featured:{type:'bool', default:true},
    near_me:{type:'bool', default:true},
    favorited:{type:'bool', default:true},
    new:{type:'bool', default:true},
    lat:'double',
    long:'double',
    displayedElsewhere:'int'

  }
};
const CreatedSchema = {
  name:'Created',
  properties:{
    name:'string',
    created:'bool',
    }
};
let realm = new Realm({schema:[TagSchema, GuideSchema, CreatedSchema, ImageDescriptionSchema,LocalSchema]});



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
