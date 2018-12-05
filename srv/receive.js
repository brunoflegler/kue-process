const kue = require("kue");
const configRedis = require("../config/redis");

const q = kue.createQueue({
  prefix: "q",
  redis: {
    host: configRedis.host,
    port: configRedis.port,
    db: configRedis.db
  }
});

q.process("work1", 10, (job, done) => {
  console.log("title", job.data.title);
  done();
});
