/**
 * These settings define some of the core variables for the game world.
 * Think of these as the fundamental constants of the world.
 *
 * I do.
 */
const Environment = {
  worldEndDate: moment({year: 2092, month: 4, day: 1, hour: 9, minute: 47, second: 32}),
  timeSinceWorldEnd: moment.duration({months: 4, days: 7, hours: -4, minute: 13, second: 20}),
  meaningOfLife: 42,
}

module.exports = Environment;