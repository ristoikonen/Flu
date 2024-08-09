
import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";


  async function searchGitHub(searchText, repo = "") {
    const token = "";

    const owner = "ristoikonen";
    const result = undefined;

    console.log('Searching GitHub for ' + searchText);

    try {
        
        const octokit = new Octokit({ 
            auth: token,
         });
        
        if (repo === "")
        {
            const q = "q=:{searchtext}+in:file+language:js+repo:"  + owner ;
        }
        else {
            const q = "q=:{searchtext}+in:file+language:js+repo:"  + owner + "/" + repo;
        }
        
        const query = "q=:{searchtext}+in:file+language:js+repo:ristoikonen/Prod";


        const q = "h2+user:ristoikonen+path:/";


            const result =  await octokit.rest.search.code({
            q,
            });

            if (result && "data" in result && "items" in result.data) {
            const items = result.data.items;
            console.log('ok');
            for (const i in items) {
                try {
                    const item = items[i];
                    const url = item.html_url.replace("https://github.com/", "https://raw.githubusercontent.com/").replace("/blob", "");
                    const response = await fetch(url);
    
                    const text = await response.text();
                    console.log(item.html_url);
                    
                    console.log(text);

                    if (!item.html_url.endsWith(".html")) {

                        //const text = await response.text();
                        //console.log(text);
                        //parsehtml(text);
                        //const documents = YAML.parseAllDocuments(text);

                        // if (documents && documents.length) {
                        //     for (const i in documents) {
                        //         const document = documents[i];
                        //         if ((document.has("swagger") || document.has("openapi"))&& document.has("paths")) {
                        //             const filename = "./results/" + item.repository.full_name.replaceAll("/", "_") + "_" + i + "_" + item.name;
                        //             console.log(filename);
                        //             writeFileSync(filename, document.toString());
                        //         }
                        //     }
                        // }
                    // } else {
                    //     const node = await response.json();
                    //     if ((node["swagger"] || node["openapi"])&& node["paths"]) {
                    //         const filename = "./results/" + item.repository.full_name.replaceAll("/", "_") + "_" + i + "_" + item.name;
                    //         console.log(filename);
                    //         writeFileSync(filename, JSON.stringify(node, null, 2));
                    //     }
                    }
                }
                catch(e) {
                    console.error(e);
                }
            }

        }

        const response = await octokit.request("GET /search/repositories?q=div&per_page=10", {
            owner: owner,
            repo: repo,
            });

        console.log(`The status of the response is: ${response.status}`)
        console.log(`The request URL was: ${response.url}`)
        console.log(`The x-ratelimit-remaining response header is: ${response.headers["x-ratelimit-remaining"]}`)
        console.log(`The issue title is: ${response.data[0]}`)
        
        console.log(response.data);

        }  catch (error) {
            if (error.response) {
                console.error(`Error! Status: ${error.response.status}. Message: ${error.response.data.message}`)
            }
            console.error(error)
        }
    }

  
  export { searchGitHub };
  