import 'dotenv/config'
import { Octokit } from '@octokit/core'
import process from 'node:process'

const octokit = new Octokit({
    auth: process.env.auth,
    baseUrl: 'https://api.github.com',
})

const owner = 'hearuphill'
const repo = 'github-actions-demo'

// const {
//     data: { workflows },
// } = await octokit.request("GET /repos/{owner}/{repo}/actions/workflows", {
//     owner,
//     repo,
//     headers: {
//         "X-GitHub-Api-Version": "2022-11-28",
//     },
// });

// const workflow_id = workflows[0].id;

// https://docs.github.com/en/rest/actions/workflows?apiVersion=2022-11-28#create-a-workflow-dispatch-event

await octokit.request(
    'POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches',
    {
        owner,
        repo,
        workflow_id: 'input.yml',
        ref: 'main',
        inputs: {
            username: 'white',
        },
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
        },
    },
)
