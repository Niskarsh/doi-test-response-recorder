module.exports = {
  apps: [
    {
      name: 'doi-tester',  // Name of the application
      script: 'npm',   // The script to execute
      args: 'start',   // The command arguments (npm start)
      watch: false,    // Disable watching files for changes
    },
  ],
};
