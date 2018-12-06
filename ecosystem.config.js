module.exports = {
  apps: [
    {
      name: "Publish",
      script: "./srv/publish.js",
      args: "",
      instances: 2,
      exec_mode: "cluster",
      autorestart: true,
      merge_logs: true,
      watch: true,
      ignore_watch: ["node_modules"],
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    },
    {
      name: "Receive",
      script: "./srv/receive.js",
      args: "",
      instances: 2,
      exec_mode: "cluster",
      autorestart: true,
      watch: true,
      ignore_watch: ["node_modules"],
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  deploy: {
    // "production" is the environment name
    production: {
      // SSH key path, default to $HOME/.ssh
      //key: "D:/ssh-ppk/admin_srv-geor00-dgm.pem",
      key: "D:/ssh-ppk/lenovo-linux.pem",
      // SSH user
      user: "bruno",
      // SSH host
      host: [
        /* {
          host: "srv-geor00-dgm.el.com.br",
          port: "9922"
        } */
        {
          host: "192.168.0.110",
          port: "22"
        }
      ],
      ref: "origin/master",
      repo: "https://github.com/brunoflegler/kue-process.git",
      path: "~/Developer/deploys",
      "post-deploy":
        "yarn install --production && pm2 startOrRestart ecosystem.config.json --env production"
    }
  }
};
