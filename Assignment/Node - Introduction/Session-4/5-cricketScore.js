//AI Prompt:
// Create a Node.js function called getCricketScore() that fetches cricket match scores from a mock API using Promises. The function should simulate a 1-second API delay using setTimeout and should properly handle errors using reject and catch. Also provide an example of how to call the function.

function getCricketScore() {

    return new Promise(function(resolve, reject) {

        setTimeout(function() {

            let success = true;

            if (success) {

                let score = {
                    team: "India",
                    runs: 245,
                    wickets: 6,
                    overs: 40
                };

                resolve(score);

            } else {

                reject("Failed to fetch cricket score");

            }

        }, 1000);
    });
}


getCricketScore()
    .then(function(score) {

        console.log("Cricket Score:", score);

    })
    .catch(function(error) {

        console.log("Error:", error);

    });