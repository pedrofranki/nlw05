import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSocketIDConnection1619360973554 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "connections",
      new TableColumn({
        name: "socket_id",
        type: "uuid",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("connections", "socket_id");
  }
}
