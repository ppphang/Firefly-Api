import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitUsers20250101010101 implements MigrationInterface {
  name = 'InitUsers20250101010101';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(200) NOT NULL UNIQUE,
        createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users`);
  }
}

