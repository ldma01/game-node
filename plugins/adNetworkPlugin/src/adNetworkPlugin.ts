import {
  GameWorker,
  GameFunction,
  ExecutableGameFunctionResponse,
  ExecutableGameFunctionStatus,
} from "@virtuals-protocol/game";
import axios from "axios";

interface IAdNetworkPluginOptions {
  apiKey: string;
}

class AdNetworkPlugin {
  private id: string;
  private name: string;
  private description: string;
  private apiKey: string;
  private apiEndpoint: string =
    "https://api.monitize.ai/api/agent/campaigns/{{campaignId}}/submit";
  private tweetNotificationEndpoint: string =
    "https://api.monitize.ai/api/agent/campaigns/{{campaignId}}/submit";

  constructor(options: IAdNetworkPluginOptions) {
    this.apiKey = options.apiKey;
    this.id = "ad_network_worker";
    this.name = "Ad Network Worker";
    this.description =
      "A worker that interacts with the Monitize.ai API to generate ad network promotions by retrieving assigned campaigns from the agent's portfolio, also notifies Monitize.ai when a tweet has been sent about a campaign.";
  }

  public getWorker(data?: {
    functions?: GameFunction<any>[];
    getEnvironment?: () => Promise<Record<string, any>>;
  }): GameWorker {
    return new GameWorker({
      id: this.id,
      name: this.name,
      description: this.description,
      functions: data?.functions || [
        this.fetchAssignedCampaignsFunction,
        this.notifyTweetSentFunction,
      ],
      getEnvironment: data?.getEnvironment,
    });
  }

  get fetchAssignedCampaignsFunction() {
    return new GameFunction({
      name: "fetch_assigned_campaigns",
      description:
        "Get all campaigns that are assigned to the agent for promotion. Use this to check what campaigns you need to work on.",
      args: [],
      executable: async (_, logger) => {
        try {
          logger("Fetching assigned campaigns from Monitize.ai...");

          const response = await axios.get(this.apiEndpoint, {
            headers: {
              "x-api-key": this.apiKey,
            },
          });

          const campaigns = response.data;
          if (campaigns.length === 0) {
            return new ExecutableGameFunctionResponse(
              ExecutableGameFunctionStatus.Done,
              "No campaigns assigned to the agent"
            );
          }
          const campaign = campaigns[0];
          const adNetworkMessage =
            `Use the following details to craft an engaging promotional twitter post:\n\n` +
            `   - Campaign Title: ${campaign.title}\n` +
            `   - Campaign Brief: ${campaign.brief}\n`;

          logger(adNetworkMessage);

          return new ExecutableGameFunctionResponse(
            ExecutableGameFunctionStatus.Done,
            adNetworkMessage
          );
        } catch (e) {
          return new ExecutableGameFunctionResponse(
            ExecutableGameFunctionStatus.Failed,
            "Failed to fetch assigned campaigns"
          );
        }
      },
    });
  }

  get notifyTweetSentFunction() {
    return new GameFunction({
      name: "notify_tweet_sent",
      description:
        "Notify Monitize.ai that a tweet has been sent about a specific campaign, this should be called after a tweet about a campaign has been sent to redeem the prize from advertisement.",
      args: [
        {
          name: "campaignId",
          type: "string",
          description: "The ID of the campaign that was tweeted about",
        },
        {
          name: "tweetId",
          type: "string",
          description: "The ID of the tweet that was sent",
          optional: true,
        },
      ],
      executable: async (args, logger) => {
        try {
          logger("Notifying Monitize.ai about the tweet...");

          const response = await axios.post(
            this.tweetNotificationEndpoint,
            {
              campaignId: args.campaignId,
              tweetId: args.tweetId,
            },
            {
              headers: {
                "x-api-key": this.apiKey,
              },
            }
          );

          logger(
            `Successfully notified Monitize.ai about tweet ${args.tweetId} for campaign ${args.campaignId}`
          );

          return new ExecutableGameFunctionResponse(
            ExecutableGameFunctionStatus.Done,
            "Successfully notified about tweet"
          );
        } catch (e) {
          return new ExecutableGameFunctionResponse(
            ExecutableGameFunctionStatus.Failed,
            "Failed to notify about tweet"
          );
        }
      },
    });
  }
}

export default AdNetworkPlugin;
