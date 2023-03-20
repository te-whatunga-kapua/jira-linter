import * as core from '@actions/core'
import * as github from '@actions/github'
import * as exec from "@actions/exec"


export async function getCommitMessage(sha: string): Promise<string> {
  let message = "";

  const options = {
    listeners: {
      stdout: (data: Buffer) => {
        message += data.toString();
      }
    }
  };

  const args: string[] = ["rev-list", "--format=%B", "--max-count=1", sha];

  await exec.exec("git", args, options);
  message.trim();

  return message;
}

async function run(): Promise<void> {
  const branch = github.context.payload.ref.split('/')[2]
  const jiraIssue = `${branch.split('-')[0]}-${branch.split('-')[1]}`
  const regex = new RegExp(`${jiraIssue}:`)
  
  const commitSHA = github.context.sha;
  core.debug(`Commit Message SHA:${commitSHA}`);

  const message = await getCommitMessage(commitSHA);
  core.debug(`Commit Message Found:\n${message}`);
  
  const isValid = regex.test(message)
  if (!isValid) {
    core.setFailed(
      `Commit Message: "\n${message}\n" does not contain the valid Jira Issue code for this Branch "${jiraIssue}".`,
    )
  }
}



run()


