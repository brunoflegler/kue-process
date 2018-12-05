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
      key: "D:/ssh-ppk/admin_srv-geor00-dgm.pem",
      // SSH user
      user: "admin",
      // SSH host
      host: [
        {
          host: "srv-geor00-dgm.el.com.br",
          port: "9922"
        }
      ],
      port: ["9922"],
      // SSH options with no command-line flag, see 'man ssh'
      // can be either a single string or an array of strings
      //ssh_options: "StrictHostKeyChecking=no",
      // GIT remote/branch
      ref: "origin/master",
      // GIT remote
      repo: "https://github.com/brunoflegler/kue-process.git",
      // path in the server
      path: "~/data/app/node",
      // Pre-setup command or path to a script on your local machine
      //"pre-setup": "apt-get install git ; ls -la",
      // Post-setup commands or path to a script on the host machine
      // eg: placing configurations in the shared dir etc
      //"post-setup": "ls -la",
      // pre-deploy action
      //"pre-deploy-local": "echo 'This is a local executed command'",
      // post-deploy action
      "post-deploy":
        "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};
