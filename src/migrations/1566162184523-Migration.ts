/* tslint:disable:file-name-casing */
import {MigrationInterface, QueryRunner} from 'typeorm'

export class Migration1566162184523 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('INSERT INTO settings(name, file, isSelected) VALUES ("default", "", 1)')
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DELETE FROM settings WHERE name = "default"')
  }

}
