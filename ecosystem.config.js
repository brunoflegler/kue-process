module.exports = {
  apps: [
    {
      name: "Publish",
      script: "./srv/publish.js",
      instances: 2,
      exec_mode: "cluster",
      autorestart: true,
      merge_logs: true,
      watch: false,
      ignore_watch: ["node_modules"],
      max_memory_restart: "1G",
      error_file: "~/data/app/node/logs/receive.err.log",
      out_file: "~/data/app/node/logs/receive.out.log",
      env: {
        PORT: 3000,
        NODE_ENV: "development"
      },
      env_production: {
        PORT: 4000,
        NODE_ENV: "production"
      }
    },
    {
      name: "Receive",
      script: "./srv/receive.js",
      instances: 2,
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      ignore_watch: ["node_modules"],
      max_memory_restart: "1G",
      error_file: "~/data/app/node/logs/receive.err.log",
      out_file: "~/data/app/node/logs/receive.out.log",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    production: {
      key: "D:/ssh-ppk/admin_srv-geor00-dgm.pem",
      user: "admin",
      host: [
        {
          host: "srv-geor00-dgm.el.com.br",
          port: "9922"
        }
        /*   {
          host: "192.168.0.110",
          port: "22"
        } */
      ],
      ref: "origin/master",
      repo: "https://github.com/brunoflegler/kue-process.git",
      //path: "~/Developer/deploys",
      path: "~/data/app/node",
      "post-deploy":
        "yarn install && pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
};
