const { ShardingManager } = require("discord.js")
const shards = new ShardingManager("./index.js", {
  respawn: true,
  totalShards: 2,
})

shards.on("launch", shard => {
  console.log(`Starting shard: ${shard.id}`)
})
shards.spawn()