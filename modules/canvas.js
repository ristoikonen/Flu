


//import { Octokit } from "octokit";
//import { Octokit } from "https://cdn.skypack.dev/octokit";
import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";


function create(id, parent, width, height) {
    let divWrapper = document.createElement('div');
    let canvasElem = document.createElement('canvas');
    parent.appendChild(divWrapper);
    divWrapper.appendChild(canvasElem);
  
    divWrapper.id = id;
    canvasElem.width = width;
    canvasElem.height = height;
  
    let ctx = canvasElem.getContext('2d');
  
    return {
      ctx: ctx,
      id: id
    };
  }
  
  function createReportList(wrapperId) {
    let list = document.createElement('ul');
    list.id = wrapperId + '-reporter';
  
    let canvasWrapper = document.getElementById(wrapperId);
    canvasWrapper.appendChild(list);
  
    return list.id;
  }

  async function useOcta() {
    const token = "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";

    const owner = "ristoikonen";
    const repo = "Prod";
    const result = undefined;

    //const query = "div";

    //const owner = "octocat";
    //const repo = "Spoon-Knife";

        console.log('This is a useOcta');

        try {
            
            const octokit = new Octokit({ 
                auth: token,
                //username: owner,
                });
            
            // const result = await octokit.request("GET /repos/{owner}/{repo}/issues", {
            //     owner: owner,
            //     repo: repo,
            //     });

            //search/repositories/q=div"

            // const responseX = await octokit.request("GET /search/repositories/{owner}?q=div&per_page=10", {
            //     owner: owner,
            //     repo: repo,
            //     });

            // https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#constructing-a-search-query
            // https://docs.github.com/en/search-github/searching-on-github/searching-code

            const query = "q=h2+in:file+language:js+repo:ristoikonen/Prod";

            //const query = "q=h2";
            // const response = await octokit.rest.search.code?q=repo:octocat/Spoon-Knife+css({
            //       q: query
            //     });
            //const q = "html+" + query;
            // encodeURIComponent('GitHub Octocat in:readme user:defunkt');
            
            //const q = "function+in:file+language:js+repo:ristoikonen/prod";
            //const q = "function+repo:ristoikonen/prod";

            const q = "h2+user:ristoikonen+path:/";
                        

            // const response =  await octokit.rest.search.code({
            //         q,
            //       });

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
                    //currentPage++;
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

  
  export { create, createReportList,useOcta };
  