module.exports = {
    apps : [
        {
          name: "bitgit-frontend",
          script: "./server.js",
          watch: true,
          env: {
              "PORT": 4000,//you can choose
              "NODE_ENV": "development"
          },
          env_production: {
              "PORT": 8080,//you can choose
              "NODE_ENV": "production",
          }
        }
    ]
  }