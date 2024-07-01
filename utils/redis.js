import redis from 'redis';
import { promisify } from 'util';

/**
 * A class for performing operations with Redis service
 */
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });

    this.client.on('connect', () => {
      // console.log('Redis client connected to the server');
    });
  }

  /**
   * this checks if connection to Redis is Alive
   * @return {boolean} true if connection alive or false if not
   */
  isAlive() {
    return this.client.connected;
  }

  /**
   * this gets value corresponding to key in redis
   * @key {string} the key to search for in redis
   * @return {string} the value of key
   */
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  /**
   * this creates a new key in redis with a specific TTL
   * @key {string} the key to be saved in redis
   * @value {string} the value to be asigned to key
   * @duration {number} the TTL of key
   * @return {undefined}  returns nothing
   */
  async set(key, value, duration) {
    this.client.setex(key, duration, value);
  }

  /**
   * this Deletes key in redis service
   * @key {string} the key to be deleted
   * @return {undefined}  returns nothing
   */
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
