CREATE TABLE aim.kafka_pool_logs (
    pool_id            integer PRIMARY KEY ,
    last_sync_time      timestamp NOT NULL DEFAULT 'epoch',
    last_reply_time     timestamp NOT NULL DEFAULT 'epoch',
    CONSTRAINT pool_id_fk FOREIGN KEY (pool_id) REFERENCES aim.resource_pools (resource_pool_id)
      ON DELETE CASCADE
	    ON UPDATE CASCADE
);
