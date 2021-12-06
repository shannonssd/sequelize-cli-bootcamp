import db from './models/index.mjs';

if (process.argv[2] === 'create') {
  const insertNewTrip = async () => {
    try {
      const newItem = await db.Trip.create({
        name: process.argv[3],
      });

      console.log('new item!:', newItem);
    } catch (error) {
      console.log(error);
    }
  };

  insertNewTrip();
}

if (process.argv[2] === 'add-attrac') {
  const insertNewAttrac = async () => {
    try {
      const trip = process.argv[3];
      const selectedTripId = await db.Trip.findOne({
        where: {
          name: trip,
        },
      });

      console.log('Trip Id:', selectedTripId);

      const newAttrac = db.Attraction.create({
        name: process.argv[4],
        tripId: selectedTripId.id,
      });

      console.log('new item!:', newAttrac);
    } catch (error) {
      console.log(error);
    }
  };

  insertNewAttrac();
}

if (process.argv[2] === 'trip') {
  const viewAllAttrac = async () => {
    try {
      const currentTrip = await db.Trip.findOne({
        where: {
          name: process.argv[3],
        },
      });
      const attracList = await db.Attraction.findAll({
        where: {
          tripId: currentTrip.id,
        },
      });
      for (let i = 0; i < attracList.length; i += 1) {
        console.log(`${i + 1}. ${attracList[i].name}\n`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  viewAllAttrac();
}
