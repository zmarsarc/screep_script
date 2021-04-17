enum Status { Harvest, Transfer}

interface CreepStatuser {
    status: Status
}

module.exports = {
    loop: function() {
        const spawn = Game.spawns['Spawn1'];
        
        const sources = spawn.room.find(FIND_SOURCES_ACTIVE);
        const creeps = spawn.room.find(FIND_MY_CREEPS);

        for (let c of creeps) {
            let status = (<CreepStatuser>c.memory).status;
            if (status === undefined) {
               status = Status.Harvest; 
            }

            if (status === Status.Transfer) {
                if (c.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    c.moveTo(spawn);
                    break;
                }
                if (c.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
                    (<CreepStatuser>c.memory).status = Status.Harvest;
                }
            }

            if (status === Status.Harvest) {
                if (c.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                    c.moveTo(sources[0]);
                    break;
                }
                if (c.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
                    (<CreepStatuser>c.memory).status = Status.Transfer;
                }
            }
        }
    }
}