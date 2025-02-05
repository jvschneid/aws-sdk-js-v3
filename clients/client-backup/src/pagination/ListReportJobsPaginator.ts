// smithy-typescript generated code
import { Paginator } from "@smithy/types";

import { BackupClient } from "../BackupClient";
import {
  ListReportJobsCommand,
  ListReportJobsCommandInput,
  ListReportJobsCommandOutput,
} from "../commands/ListReportJobsCommand";
import { BackupPaginationConfiguration } from "./Interfaces";

/**
 * @internal
 */
const makePagedClientRequest = async (
  client: BackupClient,
  input: ListReportJobsCommandInput,
  ...args: any
): Promise<ListReportJobsCommandOutput> => {
  // @ts-ignore
  return await client.send(new ListReportJobsCommand(input), ...args);
};
/**
 * @public
 */
export async function* paginateListReportJobs(
  config: BackupPaginationConfiguration,
  input: ListReportJobsCommandInput,
  ...additionalArguments: any
): Paginator<ListReportJobsCommandOutput> {
  // ToDo: replace with actual type instead of typeof input.NextToken
  let token: typeof input.NextToken | undefined = config.startingToken || undefined;
  let hasNext = true;
  let page: ListReportJobsCommandOutput;
  while (hasNext) {
    input.NextToken = token;
    input["MaxResults"] = config.pageSize;
    if (config.client instanceof BackupClient) {
      page = await makePagedClientRequest(config.client, input, ...additionalArguments);
    } else {
      throw new Error("Invalid client, expected Backup | BackupClient");
    }
    yield page;
    const prevToken = token;
    token = page.NextToken;
    hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
  }
  // @ts-ignore
  return undefined;
}
