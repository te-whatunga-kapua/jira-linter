import * as core from '@actions/core'
import * as github from '@actions/github'

function run() {
  const branch = github.context.payload.ref.split('/')[2]
  const jiraIssue = `${branch.split('-')[0]}-${branch.split('-')[1]}`
  const regex = new RegExp(`${jiraIssue}:`)
  const title = 
    github.context.payload &&
    github.context.payload.pull_request &&
    github.context.payload.pull_request.title
  core.info(title)
  const isValid = regex.test(title)
  if (!isValid) {
    core.setFailed(
      `Pull request title: "\n${title}\n" does not contain the valid Jira Issue code for this Branch "${jiraIssue}".`,
    )
  }
}

run()


