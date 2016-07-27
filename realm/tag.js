function createTags(realm){


  realm.write(() => {
    realm.create('Tag', {
        name:'Dog Friendly'
      });
    });
  realm.write(() => {
    realm.create('Tag', {
        name:'Fishing'
      });
    });
  realm.write(() => {
    realm.create('Tag', {
      name:'Out and Back',
      type:'hike_type'
    });
  });
  realm.write(() => {
      realm.create('Tag', {
        name:'Loop',
        type:'hike_type'
      });
    });

  realm.write(() => {
    realm.create('Tag', {
      name:'Overnight',
      type:'day_length'
    });
  });
  realm.write(() => {
    realm.create('Tag',{
      name:'Single Day',
      type:'day_length'
    });
  });
  realm.write(() => {
    realm.create('Tag', {
        name:'Easy',
        type:'difficulty'
    });
  });
  realm.write(() => {
    realm.create('Tag', {
        name:'Intermediate',
        type:'difficulty'
    });
  });

  realm.write(() => {
    realm.create('Tag', {
        name:'Difficult',
        type:'difficulty'
    });
  });
  realm.write(() => {
    realm.create('Tag', {
        name:'Moderate',
        type:'difficulty'
    });
  });
  realm.write(() => {
    realm.create('Tag',{
      name:'All Season'
    });
  });
  realm.write(() => {
    realm.create('Tag',{
      name: 'Lake'
    });
  });

}
exports.createTags = createTags;
