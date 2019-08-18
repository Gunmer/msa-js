/* tslint:disable:file-name-casing */
import {MigrationInterface, QueryRunner} from 'typeorm'

export class Migration1566161944888 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('CREATE TABLE "settings" ("name" text PRIMARY KEY NOT NULL, "file" text NOT NULL, "isSelected" integer NOT NULL)')
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE "settings"')
  }

}
