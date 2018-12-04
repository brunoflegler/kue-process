const kue = require("kue");
const q = kue.createQueue({
  prefix: "q",
  redis: {
    host: "127.0.0.1",
    port: 6379,
    db: 1
  }
});

q.process("work1", (job, done) => {
  console.log("title", job.data.title);

  done();
});
