module.exports = {
    loop: function() {
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'worker');
        for (let room in Game.rooms) {
            for (let creep in Game.rooms[room].find(FIND_CREEPS)) {
                const doWork = () => this.workerMove(Game.rooms[room], creep);
                doWork();
            }
        }
    },

    workerMove: function(room: Room, creep: Creep) {
        // 如果已经装满了矿，回家卸货
        if (creep.store[RESOURCE_ENERGY] !== undefined && creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
            const spawn = room.find(FIND_MY_SPAWNS)[0];
            if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
                return;
            }
        }

        // 找到有能量的矿
        const sources = room.find(FIND_SOURCES_ACTIVE);
        if (sources.length === 0) {
            return;
        }

        // 尝试采矿
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    }
}