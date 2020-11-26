// Dependencies
const { exec, } = require('child_process');
const md5File = require('md5-file');

// Winston Logger
const logger = require('./logs');
const MLlog = logger.get('MLlog');

const sentimentProccess = () => {


    // ML child process
    const mlOutput = exec('python3 ./mlModel/sentiment_model_english.py', (error, stdout) => {
        if (error) {
            MLlog.error(error.stack);
            MLlog.error('ML Error code: ' + error.code);
            MLlog.error('ML Signal received: ' + error.signal);
        }
        MLlog.debug('ML Child Process STDOUT: ' + stdout);
    });

    mlOutput.on('exit', (code) => {
        MLlog.debug('ML Child process exited with exit code ' + code);
        // Log file checksum
        MLlog.debug('MD5: ' + md5File.sync('./productionData/dataset.json'));
    });

};

module.exports = { sentimentProccess, };
