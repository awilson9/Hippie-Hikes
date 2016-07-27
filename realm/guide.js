function createGuides(realm){


let bigcottonwood = realm.objects('Region').filtered('area="bigcottonwood"')[0];
let bryce = realm.objects('Region').filtered('area="bryce"')[0];
let uinta = realm.objects('Region').filtered('area="uinta"')[0];
let capreef = realm.objects('Region').filtered('area="capreef"')[0];
let timp = realm.objects('Region').filtered('area="timpanogos"')[0];
let bear = realm.objects('Region').filtered('area="bearriver"')[0];
let harr = realm.objects('Region').filtered('area="harriman"')[0];
let teton = realm.objects('Region').filtered('area="teton"')[0];

let dogfriendly = realm.objects('Tag').filtered('name="Dog Friendly"')[0];
let fishing = realm.objects('Tag').filtered('name="Fishing"')[0];
let out = realm.objects('Tag').filtered('name="Out and Back"')[0];
let loop = realm.objects('Tag').filtered('name="Loop"')[0];
let over = realm.objects('Tag').filtered('name="Overnight"')[0];
let single = realm.objects('Tag').filtered('name="Single Day"')[0];
let easy = realm.objects('Tag').filtered('name="Easy"')[0];
let inter = realm.objects('Tag').filtered('name="Intermediate"')[0];
let diff = realm.objects('Tag').filtered('name="Difficult"')[0];
let mod = realm.objects('Tag').filtered('name="Moderate"')[0];
let all = realm.objects('Tag').filtered('name="All Season"')[0];
let lake = realm.objects('Tag').filtered('name="Lake"')[0];

  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'catherine',
      img_index:2,
      description_1:'Lake Catherine'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'catherine',
      img_index:3,
      description_1:'Lake Martha'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'catherine',
      img_index:5,
      description_1:'Lake Mary'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'catherine',
      img_index:9,
      description_1:'Lake Martha'
    });
  });
  let guides = realm.objects('ImageDescription').filtered('guide="catherine"');
  realm.write(() => {
      realm.create('Guide', {
        name:'catherine',
        name_description:'Lake Catherine',
        location_loc:bigcottonwood,
        closest_to:'SLC',
        distance:3.9,
        elevation:1046,
        description:'This hike features three beautiful alpine lakes, Catherine, Mary, and Martha. Lake Mary is actually a reservoir that stores water for Salt Lake City’s culinary system. The size of course depends on the amount stored and the demand but is a beautiful lake to see either way. Martha is the smallest of the three and is just above Mary. Lake Catherine is the most picturesque of the three being surrounded by peaks. It’s located at the highest point. There is a 0.6 trail (one way) that climbs the to the top of Sunset Peak near Lake Catherine that climbs 430 feet. \n\nThe trailhead can be found at Brighton or Alta and is accessible from May to October. It’s a beautiful scenic hike with beautiful views but is a very popular hike. There is fishing you can do in a couple of the lakes as well.',
        img_descriptions:guides,
        hyperlapse:'2oIOO9-M8wU',
        gallSize:9,
        tags:[easy, out, dogfriendly, lake, single],
        display:0,
        lat:40.597284,
        long: -111.584576

      });
    });



  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'blanche',
      img_index:4,
      description_1:'Trail leading up to Lake Blanche with Sundial Peak in the distance ',
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'blanche',
      img_index:6,
      description_1:'Fireweed',
      description_2:'Looking towards the Salt Lake Valley'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'blanche',
      img_index:10,
      description_1:'Scratch marks from glaciers',
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'blanche',
      img_index:12,
      description_1:'More evidence of rock slides affecting the trail',
    });
  });
    realm.write(() => {
      realm.create('ImageDescription', {
        guide:'blanche',
        img_index:14,
        description_1:'Succulents',
      });
    });
    realm.write(() => {
      realm.create('ImageDescription', {
        guide:'blanche',
        img_index:15,
        description_1:'Black Twinberry',
      });
    });
    realm.write(() => {
      realm.create('ImageDescription', {
        guide:'blanche',
        img_index:16,
        description_1:'Area where the trail crosses with a rock slide',
      });
    });
  guides = realm.objects('ImageDescription').filtered('guide="blanche"');
  realm.write(() => {
    realm.create('Guide', {
      name:'blanche',
      name_description:'Lake Blanche',
      location_loc:bigcottonwood,
      closest_to:'SLC',
      distance:5.6,
      elevation:2690,
      description:'This hike can be a bit of a struggle to get to the top but once you get there the view that you’ve worked so hard for, all pays off. One of the most fascinating things about this hike is the long glacial streaks in the smooth stone near the top. Lake Blanche sits in an alpine basin that was dug out by a glacier during the last ice age. It’s amazing to see these artifacts left from long ago. Once high enough you will start to see Sundial Peak and will climb closer to it as it sits right behind Lake Blanche.\n\nTip: Explore the surrounding area including Lillian and Florence lakes. Bring a bottle of campfire whiskey and stay for a night before descending the next morning.',
      img_descriptions:guides,
      gallSize:16,
      tags:[out, diff, dogfriendly, lake, single],
      display:0,
      lat:40.6336,
      long:-111.724
    });
  });



  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'bryce',
      img_index:3,
      description_1:'Queens Garden',
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'bryce',
      img_index:5,
      description_1:'Queens Garden',
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'bryce',
      img_index:7,
      description_1:'Navajo Loop',
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'bryce',
      img_index:8,
      description_1:'Sunset Point',
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'bryce',
      img_index:11,
      description_1:'Navajo Loop',
      description_2:'Ascend/Descend'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'bryce',
      img_index:12,
      description_1:'Navajo Loop',
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'bryce',
      img_index:13,
      description_1:'Navajo Loop',
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'bryce',
      img_index:15,
      description_1:'Queens Garden',
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'bryce',
      img_index:16,
      description_1:'Thor\'s Hammer',
      description_2:'Navajo Loop'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'bryce',
      img_index:18,
      description_1:'Queens Garden',
    });
  });
  guides = realm.objects('ImageDescription').filtered('guide="bryce"');
  realm.write(() => {
    realm.create('Guide', {
      name:'bryce',
      name_description:'Queens Garden/Navajo Loop',
      location_loc:bryce,
      closest_to:'Tropic',
      distance:3.5,
      elevation:628,
      description: 'This is an amazing hike in the summer, fall, and winter. Each time offering spectacular views of the Bryce Canyon’s unique geology. Once you get down into the amphitheatre, between the points of Sunrise and Bryce, you will notice that there are many trails that intersect and weave through each other which makes for extra fun meandering. When in Southern Utah, you will surely of noticed The most interesting part of this hike is the varying perspectives of the hoodoos as you descend down from the rim and hike amongst the skyscraper sized formations.\n\nOnce down in the amphitheatre everything stays pretty level with no huge loss or gain in elevation. The immediate descent and ascent of Navajo Loop is the most difficult part of the hike.\n\nTip: Schedule a trip around the moon cycles. Bryce offers guided midnight star gazing hikes that are truly remarkable. Bryce sits at 7000 feet above sea level and offers captivating views of the night sky.\n\nI’ve done winter hiking in February, where the weather was lovely at 50 degrees with the sun shining and no breeze to account for. This hike is always able to be done but depending on the weather you will need different tools. Since the weather was so nice for us, the trail had been packed down and you could successfully do the hike with as little as hiking shoes up to using ice cleats and crampons with trekking sticks. With fresh and deep snow this would make an awesome snowshoeing hike.',
      img_descriptions:guides,
      hyperlapse:'iLbJw-icRJ0',
      gallSize:18,
      tags:[loop, mod, single, all],
      display:0,
      lat:37.6282535,
      long:-112.16295389999999
    });
  });



  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'grandaddy',
      img_index:2,
      description_1:'Grandaddy Lake',
      description_2:'170 acres | Cutthroat and Brook Trout'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'grandaddy',
      img_index:3,
      description_1:'Governor Dern Lake',
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'grandaddy',
      img_index:5,
      description_1:'Trail leaving Pine Island Lake'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'grandaddy',
      img_index:6,
      description_1:'Pine Island Lake',
      description_2:'80 acres | Good fishing'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'grandaddy',
      img_index:7,
      description_1:'Preestablished camping spots',
      description_2:'Must be 1/2 mile from any water source'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'grandaddy',
      img_index:9,
      description_1:'Mount Agassiz',
      description_2:'Near Governor Dern Lake'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'grandaddy',
      img_index:10,
      description_1:'Lily Pad Lake',
      description_2:'Too shallow for fishing'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'grandaddy',
      img_index:12,
      description_1:'American Bistort'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'grandaddy',
      img_index:12,
      description_1:'Indian Paintbrush',
      description_2:'Castilleja'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'grandaddy',
      img_index:17,
      description_1:'Governor Dern Lake'
    });
  });
  guides = realm.objects('ImageDescription').filtered('guide="grandaddy"');
  realm.write(() => {
    realm.create('Guide',{
      name:'grandaddy',
      name_description:'Grandaddy Basin',
      location_loc:uinta,
      closest_to:'Between Heber and Duchesne',
      distance: 6.1,
      elevation:940,
      description:'This is a wondrous hike that weaves in between so many beautiful lakes and, so many, meaning thousands. Where there aren’t lakes you can find far stretching meadows. The hike will weave you through tall trees and open spaces. When you stray off the trail, you’ll notice moist and marshy terrain. There are running creeks, ponds, lakes, marshes, and puddles. Some of these will go unseen because of their reflection quality. They just blend right in. If you’re an admirer of reflections, this is your place. When these lakes reflect their surroundings it creates quite the beautiful dimension.\n\nTip: Bring your fishing gear!\n\nThis is a popular hike for fisherman. Many of the lakes are full of fish but certain areas will feature less competition and more scenic views. While the first portion of the hike is quite popular, once you get up past Grandaddy Lake the amount of people you see will start to drop off, and you’ll feel like you have it to yourself. I’ve been once during the busy season and once out of season and I loved both times. Grandaddy Lake is the biggest lake and houses cutthroat and brook trout. There are many lakes beyond Grandaddy that are great for fishing. Island Pine Lake is one of the best for fishing. Rangers are common to be up there since it’s so popular so if you are fishing make sure to bring your license.',
      img_descriptions:guides,
      gallSize:18,
      tags:[loop, mod, fishing, over, lake],
      display:0,
      lat:40.567167,
      long: -110.8254433
    });
  });



  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'muley',
      img_index:1,
      description_1:'4WD road to trailhead'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'muley',
      img_index:2,
      description_1:'Dirt road leading to trailhead',
      description_2:'Parking available here'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'muley',
      img_index:4,
      description_1:'First arch'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'muley',
      img_index:5,
      description_1:'Saddle arch'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'muley',
      img_index:7,
      description_1:'Indian Paintbrush',
      description_2:'Castilleja'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'muley',
      img_index:8,
      description_1:'Last push up to the waterfold pocket'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'muley',
      img_index:9,
      description_1:'Following the bottom of the desert canyon'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'muley',
      img_index:10,
      description_1:'Following the bottom of the desert canyon'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'muley',
      img_index:12,
      description_1:'Petrified sand dunes'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'muley',
      img_index:13,
      description_1:'Following the slickrock ridge'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'muley',
      img_index:15,
      description_1:'Tarantula and Swap Mesa'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'muley',
      img_index:16,
      description_1:'Waterfold Pocket | Strike Valley'
    });
  });
  guides = realm.objects('ImageDescription').filtered('guide="muley"');
  realm.write(() => {
    realm.create('Guide', {
      name:'muley',
      name_description:'Upper Muley Twist',
      location_loc:capreef,
      closest_to:'Boulder',
      distance: 14.8,
      elevation:6600,
      description:'From the trailhead this hike is a 9.4 mile loop but if you are driving in an ordinary car you will need to find a parking spot when you see the sign advising only 4WD vehicles. This will add 4.8 miles to your total hiking time. When I did this hike we turned it into an overnighter and parked before the trailhead doing the 9.4 plus 4.8 making 14.2 miles total.\n\nThere is no developed trail but is pretty easy to follow and when the trail seems to disappear keep your eyes open for cairns which will easily keep you on track. Most of the trail follows the bottom of a desert canyon where you will get to enjoy many views of different natural arches. After getting out of the bottom of the canyon you will start climbing up the slickrock where you will be able to see the Waterfold Pocket. This wrinkle in the earth’s crust is truly magnificent. The wrinkle will be on one side with Tarantula and Swap Mesa beyond and Wingate Formation that houses all the arches previously seen. Scrambling up to this view was the most difficult part where I had lost the trail but if you don’t see a cairn for a minute or two make sure to retrace your steps until your back on track. It’s also very important to carry water in this area as there is no water in the canyon at all.\n\nTip: Get a free overnight permit at either the Capital Reef NP visitor center or Escalante park service. Turning this into an overnight gives you extra time to explore the slot canyons near the halfway point of the hike.',
      img_descriptions:guides,
      hyperlapse:'phDU3sbFAZQ',
      gallSize:18,
      tags:[loop, mod, over, all],
      display:0,
      lat:37.8583807,
      long:-111.03865080000003
    });
  });



  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'cascade',
      img_index:1,
      description_1:'Trail leading up to Inspiration Point'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'cascade',
      img_index:2,
      description_1:'Inspiration Point | Jenny Lake'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'cascade',
      img_index:6,
      description_1:'Hidden Falls'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'cascade',
      img_index:8,
      description_1:'Cathedral Group'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'cascade',
      img_index:9,
      description_1:'Jenny Lake'
    });
  });
  guides = realm.objects('ImageDescription').filtered('guide="cascade"');
  realm.write(() => {
    realm.create('Guide', {
      name:'cascade',
      name_description:'Cascade Canyon',
      location_loc:teton,
      closest_to:'Jackson Hole',
      distance:10,
      elevation:1110,
      description:'This is a beautiful trail that gives you amazing views around each corner. The trailhead starts at Jenny Lake Visitor Center where you can park. There is a trail that goes around Jenny Lake that is 6.6 miles but there is a ferry that will take you across. It’s well worth the extra cost to take the ferry.\n\nTip: When taking the ferry, keep your eye on the clock. If you miss the last trip back, you will have to do another 6 miles back.\n\nThe trail leads you back to spectacular views of Jenny Lake, Hidden Falls, and the Cathedral Group of the grand tetons you came to see. This is a popular area to see animals so keep a lookout and be smart.',
      img_descriptions:guides,
      gallSize:12,
      tags:[out, diff,single,lake],
      display:0,
      lat:43.7514791,
      long:-110.72232930000001
      });
  });



  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'cascadesprings',
      img_index:4,
      description_1:'Trail leading out of the parking lot into the springs'
    });
  });
  guides = realm.objects('ImageDescription').filtered('guide="cascadesprings"');
  realm.write(() => {
    realm.create('Guide', {
      name:'cascadesprings',
      name_description:'Cascade Springs',
      location_loc:timp,
      closest_to:'Midway',
      distance:1.17,
      elevation: 185,
      description:'This is a nice little path to take when driving through American Fork Canyon. The canyon is so spectacular during the fall which you’ll notice in the photos. There is an unbelievable amount of color and would urge a fall time visit. Cascade Springs allows a nice break from the drive and is more of a stroll than strenuous hike. Great for all ages, there are easy boardwalk trails, bridges, and benches that allow for good sightseeing. The lower trails are even wheelchair accessible. You might get lucky and catch the native cutthroat trout swimming through the springs.',
      img_descriptions:guides,
      gallSize:12,
      tags:[loop, easy,dogfriendly,single],
      display:0,
      lat:40.4599175,
      long:-111.55111629999999
    });
  });



  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'harriman',
      img_index:1,
      description_1:'Silver Lake Loop'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'harriman',
      img_index:2,
      description_1:'Ranch Loop'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'harriman',
      img_index:3,
      description_1:'River Trail'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'harriman',
      img_index:5,
      description_1:'Trumpeter Swans',
      description_2:'Silver Lake Loop'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'harriman',
      img_index:6,
      description_1:'Ranch Loop'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'harriman',
      img_index:7,
      description_1:'Ranch Loop'
    });
  });
  guides = realm.objects('ImageDescription').filtered('guide = "harriman"');
  realm.write(() => {
    realm.create('Guide',{
      name:'harriman',
      name_description:'Silver Lake Loop/Ranch Loop/River Trail',
      location_loc:harr,
      closest_to:'Island Park',
      distance:2.6,
      elevation:1680,
      description:'This area is unbelievably full of activity during all seasons but I have never felt overcrowded. This trail made me fall in love with cross country skiing. I felt the deep sense of silence and winter as I was looking on beyond Silver Lake and skiing in between the trees and watching giant snowflakes fall. This can be a great place to see some wildlife but you have to embrace the silence. I remember seeing a beautiful coyote and fox along with the trumpeter swans. As you can see following the Ranch Loop you will be able to see some beautiful historic buildings from a ranch long ago. If you need a reason to fall back in love with winter, I highly suggest coming to Harriman. This is another area where there are several interweaving loop trails that you can create your own way. There are marked signs showing maps at every trail intersection.',
      img_descriptions:guides,
      gallSize:8,
      tags:[loop, inter, dogfriendly, all,single,lake],
      display:0,
      lat:44.32568999999999,
      long:-111.46522500000003
    });
  });



  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'doglake',
      img_index:1,
      description_1:'Aspen trees'
    });
  });
  guides = realm.objects('ImageDescription').filtered('guide="doglake"');
  realm.write(() => {
    realm.create('Guide', {
      name:'doglake',
      name_description:'Dog Lake',
      location_loc:bigcottonwood,
      closest_to: 'SLC',
      distance:6,
      elevation:1680,
      description:'Dog Lake can be accessed from two different points in Mill Creek Canyon and Big Cottonwood Canyon. If bringing a dog along with you will want to make sure you take the Mill Creek Canyon side as dogs are forbidden in Big Cottonwood.\n\nI did this hike in late Fall at the end of October. The weather was great with a light jacket. The sun shining and tricking everyone that winter was far off.\n\nIt is a nice narrow trail that is popular with mountain bikers. The trail becomes dense with groves of quaking aspen. Be sure to keep your eyes open for them coming and going on the trail.\n\nTip: Avoid mountain bikers by going odd numbered days. The trail alternates allowing bikers on even days.\n\nThe trail stays moderately level until the last push that gets you up to the lake. The lake is quite small but very quaint. You can easily hike around the lake and explore around.\n\nThe area is surrounded in beautiful aspen quakies and while beautiful year round, I would say the perfect time is in the fall - just before the leaves fall.',
      img_descriptions:guides,
      gallSize:8,
      tags:[out, mod, dogfriendly, single],
      display:0,
      lat:40.6498,
      long:-111.648
    });
  });



  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'stewart',
      img_index:15,
      description_1:'Sundance Mountain Resort'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'stewart',
      img_index:16,
      description_1:'Sundance Mountain Resort'
    });
  });
  guides = realm.objects('ImageDescription').filtered('guide="stewart"');
  realm.write(() => {
    realm.create('Guide',{
      name:'stewart',
      name_description:'Stewart Falls',
      location_loc:timp,
      closest_to:'Pleasant Grove',
      distance:4.2,
      elevation:984,
      description:'This is an area that is always full of different kinds of activity and is great place for year-round hiking. This area is popular because the Stewart Falls trailhead is shared with Mt. Timpanogos trailhead. This article will be able to show you what the trail looks like in the summer and winter. The trail is very green and abundant with plant life. It can get hot on the trail but it’s really satisfying ending the hike with a refreshing waterfall. When I snowshoed through the hike was very beautiful and had this beautiful mysterious look the whole time. I felt like I was inside a human snow globe. I got to see the snow roll and settle off the mountains on one side and that made my heart stop for a minute as I was watching nature doing what it does. This happened frequently but I never felt in danger but I was always looking over and listening. It’s good to be aware, nature has a way of putting you in your place and I’m totally ok with that.\n\nStewart Falls is a beautiful two-tier waterfall that is over 200 feet tall.',
      img_descriptions:guides,
      hyperlapse:'mCjHij-sNK0',
      gallSize:17,
      tags:[out, mod, dogfriendly, all, single],
      display:0,
      lat:40.4043,
      long:-111.605
    });
  });



  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'whitepine',
      img_index:2,
      description_1:'Indian Paintbrush',
      description_2:'Castilleja'
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'whitepine',
      img_index:3,
      description_1:'Sticky Geranium',
    });
  });
  realm.write(() => {
    realm.create('ImageDescription', {
      guide:'whitepine',
      img_index:6,
      description_1:'Larkspur',
    });
  });
  guides = realm.objects('ImageDescription').filtered('guide="whitepine"');
  realm.write(() => {
    realm.create('Guide',{
      name:'whitepine',
      name_description:'White Pine Lake',
      location_loc:bear,
      closest_to:'Logan',
      distance:6.6,
      elevation:1250,
      description:'August is a great time to do this hike. The trail is abundant with wildflowers. It is a fairly flat and relaxing hike with a beautiful view of the lake at the end. Do some exploring around the lake when you reach it.',
      img_descriptions:guides,
      gallSize:6,
      tags:[out, mod, dogfriendly, single, lake],
      display:0,
      lat:40.57242,
      long:-111.69896
    });
  });



  realm.write(() => {
    realm.objects('Guide').filtered('name = "catherine"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "blanche"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "catherine"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "doglake"')[0]
    );
  });

  realm.write(() => {
    realm.objects('Guide').filtered('name = "blanche"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "doglake"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "blanche"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "catherine"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "bryce"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "grandaddy"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "bryce"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "muley"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "grandaddy"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "muley"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "grandaddy"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "cascade"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "muley"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "grandaddy"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "muley"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "bryce"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "cascade"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "blanche"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "cascade"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "grandaddy"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "cascadesprings"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "bryce"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "cascadesprings"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "harriman"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "harriman"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "bryce"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "harriman"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "stewart"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "doglake"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "blanche"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "doglake"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "catherine"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "stewart"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "blanche"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "stewart"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "cascade"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "whitepine"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "doglake"')[0]
    );
  });
  realm.write(() => {
    realm.objects('Guide').filtered('name = "whitepine"')[0].similar_hikes.push(
    realm.objects('Guide').filtered('name = "catherine"')[0]
    );
  });

}
exports.createGuides = createGuides;
