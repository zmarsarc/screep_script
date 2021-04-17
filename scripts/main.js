"use strict";
module.exports = {
    loop: function () {
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], 'worker');
    },
    workerMove: function (room, creep) {
        // 如果已经装满了矿，回家卸货
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
            var spawn = room.find(FIND_MY_SPAWNS)[0];
            if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
                return;
            }
        }
        // 找到有能量的矿
        var sources = room.find(FIND_SOURCES_ACTIVE);
        if (sources.length === 0) {
            return;
        }
        // 尝试采矿
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    }
};
