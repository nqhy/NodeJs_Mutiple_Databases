import * as redis from "redis";

import "../../helpers/env";
import logger from "../../utils/logger";

export default class Redis {
  private static instance: Redis;

  private static port_redis: string = process.env.REDIS_PORT || 6379;

  public client;

  private static expiration: number = 3600;

  public excecute() {
    const client = redis.createClient(Redis.port_redis);
    client.on("connect", () => {
      logger({ type: "Notify", message: "Redis is Connected" });
    });
    client.on("error", err => {
      logger({ type: "Error", message: err });
    });

    Redis.client = client;
  }

  static getInstance() {
    if (!Redis.instance) {
      const instance = new Redis();
      Redis.instance = instance;
    }
    return Redis.instance;
  }
}
