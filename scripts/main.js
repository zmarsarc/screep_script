module.exports.loop = function () {
    var spawn = Game.spawns["Spawn1"];
    if (spawn.store.energy > 50) {
        spawn.spawnCreep([WORK, MOVE, CARRY], "miner");
    }
    for (var name_1 in Game.creeps) {
        runCreep(Game.creeps[name_1]);
    }
};
function runCreep(creep) {
    var source = creep.pos.findClosestByPath(FIND_SOURCES);
    if (source == null) {
        creep.say("no source");
        return;
    }
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
        if (creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns["Spawn1"].pos);
            return;
        }
    }
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source.pos);
        return;
    }
}
