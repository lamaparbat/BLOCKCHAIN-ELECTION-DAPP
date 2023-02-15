const { execSync } = require("child_process");

// switching node version to 16
execSync("node -v; source ~/.bash_profile; nvm use 16; node -v");