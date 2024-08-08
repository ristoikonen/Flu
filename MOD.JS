

import { Octokit } from "octokit";


export function dd() {
    console.log('dd');
  }

// Define your module
const myModule = (function() {
    // Private variables and functions
    const privateVariable = 'This is a private variable';

    function privateFunction() {
        console.log('This is a private function');
    }

    // Public API
    return {
        publicVariable: 'This is a public variable',

        async publicFunction() {
            console.log('This is a public function');
            try {
                await octokit.request("GET /repos/{owner}/{repo}/issues", {
                owner: "github",
                repo: "docs",
                per_page: 2
                });
            
            } catch (error) {
                if (error.response) {
                    console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)
                }
                console.error(error)
            }
        }
    };


})();

// Export the module
module.exports = myModule;
// import { myModule } from "MOD.js";