function createRegions(realm){
  createLocal(realm);

}

function createLocal(realm){
  realm.write(() => {
    realm.create('Region', {
      area:'bigcottonwood',
      description:'Big Cottonwood Canyon',
      state:'UT'
    });
  });
  realm.write(() => {
    realm.create('Region', {
      area:'bryce',
      description:'Bryce Canyon National Park',
      state:'UT'
    });
  });
  realm.write(() => {
    realm.create('Region', {
      area:'uinta',
      description:'High Uintas Wilderness Area',
      state:'UT'

    });
  });
  realm.write(() => {
    realm.create('Region', {
      area:'capreef',
      description:'Capitol Reef National Park',
      state:'UT'
    });
  });
  realm.write(() => {
    realm.create('Region', {
      area:'timpanogos',
      description:'Mount Timpanogos Wilderness',
      state:'UT'

    });
  });
  realm.write(() => {
    realm.create('Region', {
      area:'bearriver',
      description:'Bear River Range',
      state:'UT'
    });
  });

  realm.write(() => {
    realm.create('Region', {
      area:'harriman',
      description:'Harriman State Park',
      state:'ID'
    });
  });
  realm.write(() => {
    realm.create('Region', {
      area:'teton',
      description:'Grand Teton National Park',
      state:'WY'
    });
  });

}
exports.createRegions = createRegions;
