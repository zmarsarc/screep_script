"use strict";
var Status;
(function (Status) {
    Status[Status["Harvest"] = 0] = "Harvest";
    Status[Status["Transfer"] = 1] = "Transfer";
})(Status || (Status = {}));
module.exports = {
    loop: function () {
        var spawn = Game.spawns['Spawn1'];
        var sources = spawn.room.find(FIND_SOURCES_ACTIVE);
        var creeps = spawn.room.find(FIND_MY_CREEPS);
        for (var _i = 0, creeps_1 = creeps; _i < creeps_1.length; _i++) {
            var c = creeps_1[_i];
            var status_1 = c.memory.status;
            if (status_1 === Status.Transfer) {
                if (c.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    c.moveTo(spawn);
                    break;
                }
                if (c.store.getUsedCapacity(RESOURCE_ENERGY) === 0) {
                    c.memory.status = Status.Harvest;
                }
            }
            if (status_1 === Status.Harvest) {
                if (c.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                    c.moveTo(sources[0]);
                    break;
                }
                if (c.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
                    c.memory.status = Status.Transfer;
                }
            }
        }
    }
};
